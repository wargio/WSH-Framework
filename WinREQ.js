(function() {
    var a = ActiveXObject;
    var w = new a("WScript.Shell");
    var f = new a("Scripting.FileSystemObject");
    var e = w.ExpandEnvironmentStrings('%JSLIB%');
    if (!e || e == '%JSLIB%') throw new Error("Missing environment variable '%JSLIB%'.");
    var s = f.openTextFile(e + '\\default.js', 1);
    var d = s.readAll();
    s.Close();
    eval(d);
    f = s = d = null;
})();
if (typeof WMI == 'undefined')
    console.require('WMI.js');
if (typeof Options == 'undefined')
    console.require('Options.js');

var options = new Options({
    '-a': {
        args: 0,
        exec: function(args) {
            var wmi = new WMI();
            wmi.load("All");
            wmi.print();
        },
        usage: "     -a               | Shows everything."
    },
    '-h': {
        args: 0,
        exec: function(args) {
            var wmi = new WMI();
            console.log("Available values:")
            for (var elem in wmi) {
                if (typeof wmi[elem] == 'object')
                    console.log("   " + elem);
            }
        },
        usage: "     -h               | Help page."
    },
    '-l': {
        args: 1,
        exec: function(args) {
            var wmi = new WMI();
            wmi.load(args[1].replace("Win32_", ""));
            wmi.print();
        },
        usage: "     -l [value]       | Help page."
    }
}, "Use -h for the help page to know which value to input.");
options.main();