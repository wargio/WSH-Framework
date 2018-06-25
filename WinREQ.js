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


var print_object = function(who) {
    var max = 0,
        pad = '                                         ';
    for (var entry in who) {
        if (who[entry] && max < entry.length)
            max = entry.length;
    }
    for (var entry in who) {
        if (who[entry])
            console.log("    " + entry + ": " + pad.substr(0, max - entry.length) + who[entry]);
    }
    console.log(" ");
}

var toUnit = function(n) {
    if (typeof n == 'string') {
        n = parseInt(n);
    }
    if (n < Math.pow(1024, 4)) {
        return (n/Math.pow(1024, 3)).toFixed(0) + ' GB';
    } else if (n < Math.pow(1024, 3)) {
        return (n/Math.pow(1024, 2)).toFixed(0) + ' MB';
    } else if (n < Math.pow(1024, 2)) {
        return (n/1024).toFixed(0) + ' KB';
    } else {
        return n + ' bytes';
    }
}

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
    },
    '--info': {
        args: 0,
        short: '-i',
        exec: function(args) {
            var info = {
                'Serial Number': '',
                'Manufacturer': '',
                'Model': '',
                'OS': '',
                'RAM': '',
                'HDD': '',
                'CPU': '',
                'Display': ''
            };
            var wmi = new WMI();
            wmi.load("BIOS");
            wmi.load("OperatingSystem");
            wmi.load("PhysicalMemory");
            wmi.load("ComputerSystem");
            wmi.load("DiskDrive");
            wmi.load("DesktopMonitor");
            wmi.load("Processor");
            info['Serial Number'] = wmi.BIOS[0].serialNumber;
            info.OS = wmi.OperatingSystem[0].caption;
            info.RAM = toUnit(wmi.PhysicalMemory[0].capacity) + ' (' + wmi.PhysicalMemory[0].speed + ' MHz)';
            info.Manufacturer = wmi.ComputerSystem[0].manufacturer;
            info.Model = wmi.ComputerSystem[0].model;
            info.HDD = toUnit(wmi.DiskDrive[0].size);
            info.CPU = wmi.Processor[0].name;
            info.Display = wmi.DesktopMonitor[0].screenWidth + 'x' + wmi.DesktopMonitor[0].screenHeight + ' pixels';
            console.log('INFO:')
            print_object(info);
        },
        usage: "               | shows all the infos about the PC."
    }
};

var options = new Options(opts, "Use -h for the help page to know which value to input.");
options.main();
