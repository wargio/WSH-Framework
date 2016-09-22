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

Options = (function() {
    return function(opts, custom_message) {
        this.message = custom_message ? custom_message : null;
        this.opts = opts;
        this.main = function() {
            if (console.args.length > 0 && opts[console.args[0]]) {
                if (opts[console.args[0]].args == console.args.length - 1)
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
                console.log(opts[option].usage);
            }
            console.close();
        }
    }
})();