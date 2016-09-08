FileSystem = (function() {
    var s = new ActiveXObject("WScript.Shell");
    var f = new ActiveXObject("Scripting.FileSystemObject");
    var fs = function() {};
    fs.chdir = function(path) {
        if (path != undefined)
            s.CurrentDirectory = path;
    };
    fs.pwd = function(path) {
        if (path != undefined)
            s.CurrentDirectory = path;
    };
    fs.chdir = function(path) {
        f.CurrentDirectory = path;
    };
    fs.exists = function(filename) {
        if (filename == undefined)
            throw new Error('Bad argument');
        return f.FileExists(filename) || f.FolderExists(filename);
    }
    fs.direxists = function(filename) {
        if (filename == undefined)
            throw new Error('Bad argument');
        return f.FolderExists(filename);
    }
    fs.rm = function(filename) {
        if (filename == undefined)
            throw new Error('Bad argument');
        if (f.FileExists(filename))
            f.DeleteFile(filename);
    }
    fs.mkdir = function(filename) {
        if (filename == undefined)
            throw new Error('Bad argument');
        if (!f.FolderExists(filename))
            f.CreateFolder(filename);
    }
    fs.rmdir = function(filename) {
        if (filename == undefined)
            throw new Error('Bad argument');
        if (!f.FolderExists(filename))
            f.DeleteFolder(filename);
    }
    fs.cp = function(source, destination) {
        if (source == undefined || destination == undefined)
            throw new Error('Bad argument');
        if (f.FileExists(source))
            f.CopyFile(source, destination, false);
    }
    fs.cpdir = function(source, destination) {
        if (source == undefined || destination == undefined)
            throw new Error('Bad argument');
        if (f.FolderExists(source))
            f.CopyFolder(source, destination, false);
    }
    fs.stat = function(source) {
        if (source == undefined)
            throw new Error('Bad argument');
        if (!f.FileExists(source) && !f.FolderExists(source))
            return null;
        var r = f.GetFile(source);
        return {
            size: r.Size,
            created: r.DateCreated,
            accessed: r.DateLastAccessed,
            path: r.Path,
            modified: r.DateLastModified,
            name: r.Name,
            flags: r.Attributes,
            type: r.Type
        };
    }
    fs.stat.NONE = 0;
    fs.stat.READONLY = 1;
    fs.stat.HIDDEN = 2;
    fs.stat.SYSTEM = 4;
    fs.stat.VOLUME = 8;
    fs.stat.DIRECTORY = 16;
    fs.stat.ARCHIVE = 32;
    fs.stat.ALIAS = 1024;
    fs.stat.COMPRESSED = 2048;
    return fs;
})();