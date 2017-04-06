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

if (typeof UI == 'undefined')
    console.require('UI.js');

console.log('UI');
var ui = new UI({
    window: {
        name: 'Test View',
        width: 500,
        height: 500
    }
});
console.log('UI.share');
ui.share('clickme', function() {
    console.log('console check mate!');
});
ui.html('<input type="button" onclick="shared(\'clickme\')();" value="Try!">');
console.log('UI.show');
ui.show();
console.log('UI.wait');
ui.wait();
console.log('Exit');

