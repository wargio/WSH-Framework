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

var output = console.exec("cscript UI_Example.build.js", false, console.exec.SW_MINIMIZE);

console.log("output: \n\n" + output);