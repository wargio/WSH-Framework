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
if (typeof ECMA5 == 'undefined')
    console.require('ECMA5.js', true);
if (typeof File == 'undefined')
    console.require('File.js', true);
if (typeof FileSystem == 'undefined')
    console.require('FileSystem.js', true);

var Composer = function(filename, ofilename) {
    var ______logger = console.log;
    var ______console = console;
    var ______File = File;
    var ______FS = FileSystem;
    var ______pwd = console.pwd;
    var ______list = [];
    var ______Composer = Composer;
    ______FS.mkdir(console.pwd + "\\composer_tmp");
    console.chdir(console.pwd + "\\composer_tmp");
    (function(rootfilename) {
        requirescr = function(filename, standard) {
            if (typeof filename == 'undefined') throw new Error("Invalid require parameter (" + filename + ")")
            var wsh = new ActiveXObject("WScript.Shell");
            var jslib = wsh.ExpandEnvironmentStrings('%JSLIB%') + '\\';
            if (jslib == "%JSLIB%\\") throw new Error("Missing environment variable JSLIB.");
            var f = new ActiveXObject("Scripting.FileSystemObject");
            if (standard) {
                filename = jslib + filename;
            } else if (f.FileExists(jslib + filename)) {
                filename = jslib + filename;
            } else if (filename.indexOf(______pwd) < 0) {
                filename = ______pwd + '\\' + filename;
            }
            if (f.FileExists(filename)) {
                var fullpath = f.GetFile(filename).Path;
                ______logger("Adding: " + fullpath);
                if (______list.indexOf(fullpath) < 0) {
                    ______list.push(fullpath);
                } else {
                    return;
                }
            } else {
                ______logger('Missing file \'' + filename + '\'.');
                ______console.close();
            }
            f = null;
            var ______fp = new ______File(fullpath, ______File.READ);
            var ______buf = ______fp.read().match(/\bconsole\b.require\(.+\)/g);
            ______fp.close();
            ______fp = null;
            if (!______buf) return;
            for (var i = 0; i < ______buf.length; i++) {
                ______buf[i] = ______buf[i].match(/\w+\.js|true/g)
                requirescr(______buf[i][0], ______buf[i][1]);
            }
        };
        try {
            requirescr(rootfilename);
            requirescr('default.js', true);
        } catch (e) {
            console.log("Name:        " + e.name)
            console.log("Number:      " + e.number)
            console.log("Message:     " + e.message)
            console.log("Description: " + e.description)
            console.exit(1);
        }
    })(filename);
    this.list = ______list;
    if (!ofilename.match(/\w:\\/)) ofilename = console.pwd + "\\" + ofilename;
    console.log("\nBuilding " + ofilename)
    var fpo = new File(ofilename, File.WRITE);
    var now = (new Date).toISOString();
    fpo.write("//[Composer] filename: " + ofilename + "\n");
    fpo.write("//[Composer] Build Date: " + now + "\n");
    fpo.write("var __BUILD_DATE__ = \"" + now + "\";\n");
    for (var i = this.list.length - 1; i >= 0; i--) {
        console.log(this.list[i]);
        var fp = new File(this.list[i], File.READ);
        var buf = fp.read().replace(/\(function\(\)\s*\{\s*var\s*a\s*=\s*ActiveXObject[\s\S]*\}\)\(\);/, '');
        fp.close();
        fp = null;
        buf = buf.replace(/if\s+\(typeof\s[A-Za-z0-9]*.*\)\s+throw\s+new\s+Error\(.*\);/, '');
        //buf = buf.replace(/if\s+\(.+\)\s+console\.require\(.+\);/g, '');
        buf = buf.replace(/require:\s+function[\(\s\w,\)\{=;\.\'\"%!&\}\+\\]+}[,]/, 'require:function(){},');
        fpo.write(buf + '\n');
    }
    fpo.write("//[Composer] END\n");
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