module.exports = function(grunt) {
  var fs = require('fs');
  // excluded list of plugins in which we cannot obtain a default configration
  var excludeList = 'grunt-contrib-nodeunit grunt-contrib-watch grunt-contrib-requirejs grunt-contrib-jasmine grunt-contrib-qunit grunt-contrib-yuidoc grunt-contrib-compass';

  grunt.option('write', false);
  grunt.option('force', true);
  grunt.option('verbose', false);
  if (!grunt.option('help')) {
    grunt.log.muted = true; // disable to output log message
  }

  var config_list = {}; // store default config parameters

  var emptytxt = 'empty.txt'; // empty file for src/dst options
  fs.openSync(emptytxt, 'w+');

  // init and dummy Config file for every plugins which is overrided by default
  var initConfig = {};
  var dummyConfig = {
    options : {},
    dist : {
      src: [emptytxt],
      dest: emptytxt
    }
  };

  var taskList = [];  // store task list name

  // override grunt.registerMultiTask to get this.options(default) in context
  var registerMultiTask_orig = grunt.registerMultiTask;
  grunt.registerMultiTask = function(name, info, fn) {
    var fn_orig = fn;
    fn = function() {
      var context = this;
      // define this.options() as an accessor property so as not to be overwritten
      Object.defineProperty(context, 'options', {
        get: function() {return function() {
          var args = [{}].concat(grunt.util.toArray(arguments)).concat([
            grunt.config([name, 'options'])
          ]);
          var options = grunt.util._.extend.apply(null, args);
          // store default options int config_list
          config_list[grunt.task.current.name] = {options: grunt.util._.clone(options)};
          return options;
        }; }
      });
      fn_orig.apply(context, arguments);
    };
    registerMultiTask_orig.call(this, name, info, fn);
  };

  // When some configres are required, store it into the configList with a messsage
  var requires_orig = grunt.config.requires;
  grunt.config.requires = function() {
    var props = grunt.util.toArray(arguments).map(grunt.config.getPropString);
    var flag = true;
    props.forEach(function(prop) {
      if (grunt.config.get(prop) == null) {
        var msg = '*** this config option must be required ***';
        var name = grunt.task.current.name;
        if (config_list[name].options === undefined) {
          config_list[name].options = {};
        }
        config_list[name].options[prop] = msg;
        flag = false;
      }
    });
    requires_orig.apply(this, arguments);
  };

  // report default config lists after done
  var fail_report_orig =  grunt.fail.report;
  grunt.fail.report = function() {
    fail_report_orig.apply(this, arguments);
    console.log(JSON.stringify(config_list, null, 2));
    fs.writeFileSync('default_config.json', JSON.stringify(config_list));
  };

  // read all plugins devDepencies in package.json
  // that is obtained by npm install grunt-contrib
  var pkg =  grunt.file.readJSON('package.json');
  for(var plugins in pkg.devDependencies) {
    // do not load plugins in the excludedList
    if (excludeList.indexOf(plugins) === -1) {
      grunt.loadNpmTasks(plugins);
    }
  }

  // initialize all configs to dummyConfig
  for(var key in grunt.task._tasks) {
    taskList.push(key);
    initConfig[key] = dummyConfig;
  }
  grunt.initConfig(initConfig);

  // register and execute all tasks
  grunt.registerTask('default', taskList);
};
