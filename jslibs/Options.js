/*
#########################################
 EXAMPLE of opts
#########################################

 var opts = {
    '-c': {
        args: 2,
        exec: function(args) {
            console.log("     " + args[0]  + " + "  + args[1]);
            console.log("Sum: " + (args[0] + args[1]));
        },
        usage: "     -c [num0] [num1] "
    },
    '-s': {
        args: 2,
        exec: function(args) {
            console.log("     " + args[0]  + " - "  + args[1]);
            console.log("Sub: " + (args[0] - args[1]));
        },
        usage: "     -s [num0] [num1] "
    },
    '-p': {
        args: 1,
        exec: function(args) {
            console.log("     " + args[0]  + " * "  + args[0]);
            console.log("Pow: " + (args[0] * args[0]));
        },
        usage: "     -p [num0] [num1] "
    },
    '-d': {
        args: 2,
        exec: function(args) {
            console.log("     " + args[0]  + " / "  + args[1]);
            console.log("Div: " + (args[0] / args[1]));
        },
        usage: "     -d [num0] [num1] "
    }
}

var options = new Options(opts);
options.main();

#########################################
*/
if (typeof console == 'undefined')
    throw new Error("Missing require default.js");
if (typeof Helpers == 'undefined')
    console.require('Helpers.js', true);

Options = (function() {
    return function(opts, custom_message) {
        this.message = custom_message ? custom_message : null;
        this.opts = opts;
        this.short = {};
        this.shortinv = {};
        this.longest = 0;
        for (var opt in this.opts) {
            if (this.opts[opt].short) {
                if (this.longest < (opt.length + this.opts[opt].short.length))
                    this.longest = (opt.length + this.opts[opt].short.length);
                this.short[this.opts[opt].short] = opt;
                this.shortinv[opt] = this.opts[opt].short;
            } else if (this.longest < opt.length)
                this.longest = opt.length;
        }
        this.pad = String.alloc(this.longest, 0x20);
        delete(this.longest);
        this.main = function() {
            if (typeof this.short[console.args[0]] == 'string') {
                console.args[0] = this.short[console.args[0]]
            }
            if (console.args.length > 0 && opts[console.args[0]]) {
                if (opts[console.args[0]].args < 0 || opts[console.args[0]].args == console.args.length - 1)
                    opts[console.args[0]].exec(console.args);
                else
                    this.usage();

            } else {
                console.log("Unknown option: " + console.args[0]);
                this.usage();
            }
        }
        this.usage = function() {
            if (this.message)
                console.log("   " + this.message);
            console.log("   Usage: cscript " + console.script + " [option] [[arg0] ....]");
            for (var option in this.opts) {
                if (this.shortinv[option]) {
                    var len = this.shortinv[option].length + option.length;
                    console.log("     " + this.shortinv[option] + "/" + option + this.pad.substr(len, this.pad.length) + " " + opts[option].usage);
                } else {
                    console.log("     " + option + this.pad.substr(option.length, this.pad.length) + " " + opts[option].usage);
                }
            }
            console.close();
        }
    }
})();