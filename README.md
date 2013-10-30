grunt-default-config-list
=========================

This is a tool to show default config parameters of grunt plugins.

## Included Plugins
- grunt-contrib-concat
- grunt-contrib-copy
- grunt-contrib-sass
- grunt-contrib-clean
- grunt-contrib-htmlmin
- grunt-contrib-csslint
- grunt-contrib-cssmin
- grunt-contrib-coffee
- grunt-contrib-jst
- grunt-contrib-jshint
- grunt-contrib-uglify
- grunt-contrib-connect
- grunt-contrib-handlebars
- grunt-contrib-compress
- grunt-contrib-stylus
- grunt-contrib-jade
- grunt-contrib-imagemin
- grunt-contrib-less
- grunt-contrib"

## Excluded Plugins
- grunt-contrib-nodeunit
- grunt-contrib-watch
- grunt-contrib-requirejs
- grunt-contrib-qunit
- grunt-contrib-jasmine
- grunt-contrib-compass
- grunt-contrib-yuidoc

## How to use it.

You can download all grunt-contribute modules by `npm install` and type `grunt`.The default configration parameters of all modules are displayed and stored into `default_config.json` . Be sure that this tool works well when the default configrations are specified by `this.options({...});` in their task files.

Some of plugins listed above are excluded in the list because their default configrations cannot be obtained by this method.

You can customized the list of plugins by changing `devDependencies` in package.json.

Enjoy!

 ```javascript
% npm install
... install all plugins stuffs ...
% grunt
{
  "concat": {
    "options": {
      "separator": "\n",
      "banner": "",
      "footer": "",
      "stripBanners": false,
      "process": false
    }
  },
  "copy": {
    "options": {
      "processContent": false,
      "processContentExclude": []
    }
  },
  "sass": {
    "options": {}
  },
  "clean": {
    "options": {
      "force": true,
      "no-write": true
    }
  },
  "htmlmin": {
    "options": {}
  },
  "csslint": {
    "options": {}
  },
  "cssmin": {
    "options": {
      "report": false
    }
  },
  "coffee": {
    "options": {
      "bare": false,
      "join": false,
      "sourceMap": false,
      "separator": "\n"
    }
  },
  "jst": {
    "options": {
      "namespace": "JST",
      "templateSettings": {},
      "separator": "\n\n"
    }
  },
  "jshint": {
    "options": {
      "force": false,
      "reporterOutput": null
    }
  },
  "uglify": {
    "options": {
      "banner": "",
      "footer": "",
      "compress": {
        "warnings": false,
        "sequences": true,
        "properties": true,
        "dead_code": true,
        "drop_debugger": true,
        "unsafe": false,
        "unsafe_comps": false,
        "conditionals": true,
        "comparisons": true,
        "evaluate": true,
        "booleans": true,
        "loops": true,
        "unused": true,
        "hoist_funs": true,
        "hoist_vars": false,
        "if_return": true,
        "join_vars": true,
        "cascade": true,
        "side_effects": true,
        "pure_getters": false,
        "pure_funcs": null,
        "negate_iife": true,
        "screw_ie8": false,
        "global_defs": {}
      },
      "mangle": {
        "except": [],
        "eval": false,
        "sort": false,
        "toplevel": false,
        "screw_ie8": false
      },
      "beautify": false,
      "report": false
    }
  },
  "connect": {
    "options": {
      "protocol": "http",
      "port": 8000,
      "hostname": "localhost",
      "base": ".",
      "directory": null,
      "keepalive": false,
      "debug": false,
      "livereload": false,
      "open": false
    }
  },
  "handlebars": {
    "options": {
      "namespace": "JST",
      "separator": "\n\n",
      "wrapped": true,
      "amd": false,
      "commonjs": false,
      "knownHelpers": [],
      "knownHelpersOnly": false
    }
  },
  "compress": {
    "options": {
      "archive": null,
      "mode": null,
      "level": 1
    }
  },
  "stylus": {
    "options": {
      "banner": "",
      "compress": true
    }
  },
  "jade": {
    "options": {
      "namespace": "JST",
      "separator": "\n\n",
      "amd": false
    }
  },
  "imagemin": {
    "options": {
      "optimizationLevel": 7,
      "progressive": true,
      "pngquant": true
    }
  },
  "less": {
    "options": {}
  }
}
```

You can choose some plugins by specifying a task name.

```javascript
%grunt concat
{
  "concat": {
    "options": {
      "separator": "\n",
      "banner": "",
      "footer": "",
      "stripBanners": false,
      "process": false
    }
  }
}
```

In the forthcoming 0.4.2, options parameters defined in the task script are displayed in a verbose mode such as

```
Running "concat:dist" (concat) task
Verifying property concat.dist exists in config...OK
Files: src/foo.js -> dist/foo.js
Options: separator="\n", banner="", footer="", stripBanners=false, process=false
Reading /home/ohtsu/tmp/grunt_test/Gruntfile.js...OK
Not actually writing dist/foo.js...OK
File "dist/foo.js" created.

Done, without errors.
```
