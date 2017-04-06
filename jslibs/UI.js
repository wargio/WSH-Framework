UI = (function(root) {
    var UI = function(options) {
        this.context = {};
        this.console = console;
        this.context.funcs = {};
        this.context.ie = new ActiveXObject("InternetExplorer.Application");
        this.context.ie.TheaterMode = false;
        this.context.ie.ToolBar = false;
        this.context.ie.RegisterAsDropTarget = false;
        this.context.ie.StatusBar = false;
        this.context.ie.MenuBar = false;
        // like fullscreen but with bar on the top
        this.context.ie.Offline = false;
        this.context.ie.Navigate("about:blank");
        if (options.window.width)
            this.context.ie.Width = options.window.width;
        else
            this.context.ie.Width = 400;
        if (options.window.height)
            this.context.ie.Height = options.window.height;
        else
            this.context.ie.Height = 400;
        if (options.window.name)
            this.context.ie.Document.title = options.window.name;
        else
            this.context.ie.Document.title = "WScript UI";
        if (options.window.fullscreen)
            this.context.ie.FullScreen = true;
        if (options.window.resizeable)
            this.context.ie.Resizable = options.window.resizeable;
        else
            this.context.ie.Resizable = false;

        this.context.ie.Document.body.padding = '0';
        this.context.ie.Document.body.margin = '0';
        this.shared = {};
        this.context.ie.Document.parentWindow.UI_object = this;
        this.context.script = this.context.ie.Document.createElement('script');
        this.context.script.innerHTML = "window.root = function(){return window.UI_object;}; window.shared = function(name){return (name != null) ? window.UI_object.shared[name] : null;}\n\n";
        this.context.ie.Document.body.appendChild(this.context.script);
        this.show = function() {
            while (this.context.ie.Busy) WScript.Sleep(200);
            this.context.ie.Visible = true;
        };
        this.wait = function() {
            try {
                while (this.context.ie.Visible) WScript.Sleep(500);
            } catch (e) {
            }
        };
        this.close = function() {
            this.context.ie.Quit();
        };
        this.focus = function() {
            this.context.ie.Document.parentWindow.focus();
        };
        this.share = function(name, value) {
            this.shared[name] = value;
        };
        this.html = function(html) {
            this.context.ie.Document.body.innerHTML = html;
        };
    };
    return UI;
})(this);