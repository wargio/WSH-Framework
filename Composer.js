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

console.require('File.js');
console.require('FileSystem.js');

var Composer = function(filename, ofilename) {
    var ______logger = console.log;
    var ______console = console;
    var ______File = File;
    var ______FS = FileSystem;
    var ______pwd = console.pwd;
    ______FS.mkdir(console.pwd + "\\composer_tmp");
    console.chdir(console.pwd + "\\composer_tmp");
    this.list = (function(rootfilename) {
        var list = [];
        ______logger("Building fake environment");
        var File = undefined;
        var FileSystem = undefined;
        var filename = undefined;
        var ofilename = undefined;
        var console = {
            pwd: ______console.pwd,
            script: ______console.script,
            scriptpath: ______console.scriptpath,
            args: [],
            chdir: ______console.chdir,
            print: function(a) {},
            close: function() {},
            exit: function() {

            },
            stdin: ______console.stdin,
            stdinEOF: function() {
                return true;
            },
            stdout: ______console.stdout,
            readline: function() {
                return null;
            },
            require: function(filename) {
                var wsh = new ActiveXObject("WScript.Shell");
                var jslib = wsh.ExpandEnvironmentStrings('%JSLIB%');
                var f = new ActiveXObject("Scripting.FileSystemObject");
                if (f.FileExists(filename)) {
                    list.push(filename);
                } else if (f.FileExists(jslib + '\\' + filename)) {
                    list.push(jslib + '\\' + filename);
                    filename = jslib + '\\' + filename;
                } else {
                    throw new Error('Missing file \'' + filename + '\'.');
                }
                ______logger("Added: " + filename);
                f = null;
                var ______fp = new ______File(filename, ______File.READ);
                var ______buf = ______fp.read().replace(/\(function\(\)\s*\{\s*var\s*a\s*=\s*ActiveXObject[\s\S]*\}\)\(\);/, '');
                ______fp.close();
                ______fp = null;
                eval(______buf);
            },
            log: function(x) {},
            args: []
        };
        ______logger("Finding required files.");
        console.require(rootfilename);
        ______logger("Adding default.js");
        console.require('default.js');
        return list;
    })(filename);
    console.log("\nBuilding " + ofilename)
    var fpo = new File(ofilename, File.WRITE);
    for (var i = this.list.length - 1; i >= 0; i--) {
        console.log(this.list[i]);
        var fp = new File(this.list[i], File.READ);
        var buf = fp.read().replace(/\(function\(\)\s*\{\s*var\s*a\s*=\s*ActiveXObject[\s\S]*\}\)\(\);/, '');
        fp.close();
        fp = null;
        buf = buf.replace(/if\s*\(typeof\s[A-Za-z0-9]*.*\)\s*throw\s*new\s*Error\(.*\);/, '');
        buf = buf.replace(/if\s*\(typeof\s[A-Za-z0-9]*.*\)\s*console\.require\(.*\);/g, '');
        fpo.write(buf + '\n');
    }
    fpo.close();
    console.log("\nFile written " + ofilename);
    console.chdir(______pwd);
    FileSystem.rmdir(console.pwd + "\\composer_tmp");
};
if (console.args.length == 2) {
    Composer(console.args[0], console.args[1]);
} else {
    console.log("    usage: cscript " + console.script + " [filename.js] [composed.filename.js]");
}