console = (function() {
    var wsh = new ActiveXObject("WScript.Shell");
    var t = {
        pwd: wsh.CurrentDirectory,
        script: WScript.ScriptName,
        scriptpath: WScript.ScriptFullName,
        args: new Array(WScript.Arguments.length),
        chdir: function(path) {
            wsh.CurrentDirectory = path;
        },
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
        stderr: WScript.StdErr,
        stdinEOF: function() {
            return this.stdin.AtEndOfStream;
        },
        stdout: WScript.StdOut,
        readline: function() {
            return this.stdin.ReadLine();
        },
        require: function(filename, standard) {
            var s = null;
            var jslib = wsh.ExpandEnvironmentStrings('%JSLIB%');
            var f = new ActiveXObject("Scripting.FileSystemObject");
            if (!standard && f.FileExists(filename)) {
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
        },
        exec: function(cmd, sync, flags) {
            if(typeof flags != 'number')
                flags = 0;
            if(typeof sync != 'boolean')
                sync = false;
            try {
                ret = wsh.run(cmd, flags, sync);
            } catch (err) {
                if (err.message == null || err.message == "")
                    err.message = "Failed to execute '" + cmd + "'";
                console.log("Exception: " + err.message);
                return false;
            }
            return ret;
        },
        sleep: function(time){
            if(!time || time < 1)
                throw new Error('Invalid argument for sleep.');
            WScript.Sleep(time);
        }
    };
    for (var i = 0; i < WScript.Arguments.length; i++) {
        t.args[i] = WScript.Arguments(i);
    }
    //Hides the window and activates another window.
    t.exec.SW_HIDE = 0;
    // Activates and displays a window.
    // If the window is minimized or maximized, Windows restores it to its original size and position.
    // An application should specify this flag when displaying the window for the first time.
    t.exec.SW_SHOW_NORMAL = 1;
    // Activates the window and displays it as a minimized window.
    t.exec.SW_SHOW_MINIMIZED = 2;
    // Activates the window and displays it as a maximized window.
    t.exec.SW_SHOW_MAXIMIZED = 3;
    // Displays a window in its most recent size and position.
    // The active window remains active.
    t.exec.SW_SHOW_NO_ACTIVATE = 4;
    // Activates the window and displays it in its current size and position.
    t.exec.SW_SHOW = 5;
    // Minimizes the specified window and activates the next top-level window in the z-order.
    t.exec.SW_MINIMIZE = 6;
    // Displays the window as a minimized window.
    // The active window remains active.
    t.exec.SW_SHOW_MIN_NO_ACTIVE = 7;
    // Displays the window in its current state.
    // The active window remains active.
    t.exec.SW_SHOW_NA = 8;
    // Activates and displays the window.
    // If the window is minimized or maximized, Windows restores it to its original size and position.
    // An application should specify this flag when restoring a minimized window.
    t.exec.SW_RESTORE = 9;
    // Sets the show state based on the SW_ flag specified in the STARTUPINFO structure passed to the CreateProcess function by the program that started the application.
    // An application should call ShowWindow with this flag to set the initial show state of its main window.
    t.exec.SW_SHOW_DEFAULT = 10;

    return t;
})();