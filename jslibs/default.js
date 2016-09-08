console = (function() {
    var wsh = new ActiveXObject("WScript.Shell");
    var t = {
        pwd: wsh.CurrentDirectory,
        args: new Array(WScript.Arguments.length),
        log: function(a) {
            WScript.Echo(a);
        },
        print: function(a) {
            this.stdout.Write(a);
        },
        close: function() {
            WScript.Quit(1);
        },
        exit: function() {
            WScript.Quit(1);
        },
        stdin: WScript.StdIn,
        stdinEOF: function() {
            return this.stdin.AtEndOfStream;
        },
        stdout: WScript.StdOut,
        readline: function() {
            return this.stdin.ReadLine();
        },
        require: function(filename) {
            var s = null;
            var jslib = wsh.ExpandEnvironmentStrings('%JSLIB%');
            var f = new ActiveXObject("Scripting.FileSystemObject");
            if (f.FileExists(filename)) {
                s = f.openTextFile(filename, 1);
            } else if (f.FileExists(jslib + '\\' + filename)) {
                s = f.openTextFile(jslib + '\\' + filename, 1);
            } else {
                throw new Error('Missing file \'' + filename + '\'.');
            }
            if (s) {
                eval(s.readAll());
                s.Close();
            }
            f = s = d = null;
            //console.log('Require: ' + filename);
        }
    };
    for (var i = 0; i < WScript.Arguments.length; i++) {
        t.args[i] = WScript.Arguments(i);
    }
    return t;
})();