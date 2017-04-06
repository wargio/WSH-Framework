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

var opts = {
    '--all': {
        args: 0,
        short: '-a',
        exec: function(args) {
            var wmi = new WMI();
            wmi.load("All");
            wmi.print();
        },
        usage: "               | Shows everything."
    },
    '--objects': {
        args: 0,
        short: '-o',
        exec: function(args) {
            var wmi = new WMI();
            console.log("Available objects:")
            for (var elem in wmi) {
                if (typeof wmi[elem] == 'object')
                    console.log("   " + elem);
            }
        },
        usage: "               | Shows all the possible objects."
    },
    '--list': {
        args: 1,
        short: '-l',
        exec: function(args) {
            var wmi = new WMI();
            wmi.load(args[1].replace("Win32_", ""));
            wmi.print();
        },
        usage: "[value]        | shows a specific object."
    }
};

var options = new Options(opts, "Use -h for the help page to know which value to input.");
options.main();