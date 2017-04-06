if (typeof console == 'undefined')
    throw new Error("Missing require default.js");
if (typeof ECMA5 == 'undefined')
    console.require('ECMA5.js', true);
if (typeof JSON == 'undefined')
    console.require('JSON.js');

HTTPRequest = (function() {
    var Response = function(xhr) {
        this.heads = ("" + xhr.getAllResponseHeaders()).trim().split('\r\n');
        this.headers = {};
        for (var i = 0; i < this.heads.length; i++) {
            this.heads[i] = this.heads[i].replace(/: /, "{RPLME}").split('{RPLME}');
            this.headers[this.heads[i][0]] = this.heads[i][1];
        }
        this.code = xhr.status;
        this.response = xhr.responseText;
        this.state = xhr.readyState;
        this.print = function() {
            console.log("HTTP code: " + this.code);
            console.log("HTTP state: " + this.state);
            console.log("HTTP headers:");
            for (var i = 0; i < this.headers.length; i++) {
                console.log("HTTP     " + this.headers[i][0] + ": " + this.headers[i][1]);
            }
            console.log("HTTP response:");
            console.log("HTTP     " + this.response);
        };
    };
    var HTTPRequest = function(debug) {
        this.debug = debug ? true : false;
        this._xhr = new ActiveXObject("MSXML2.ServerXMLHTTP.6.0");
        this.async = false;
        this.log = function(msg) {
            if (this.debug)
                console.log(msg);
        }
        this.log("[HTTPRequest] Logging on!");
        this.open = function(url, method) {
            this.log("[HTTPRequest] Url: " + url + "; Method: " + method);
            this._xhr.open(method, url, this.async);
        };
        this.setOption = function(option, value) {
            this.log("[HTTPRequest] Option: " + option + "; Value: " + value);
            this._xhr.setOption(option, value);
        };
        this.setProxy = function(ipport) {
            this.log("[HTTPRequest] Proxy: " + ipport);
            this._xhr.setProxy(HTTPRequest.PROXY.PROXY, ipport, "");
        };
        this.setProxyCredentials = function(username, password) {
            this.log("[HTTPRequest] Username: " + username);
            this._xhr.setProxyCredentials(username, password);
        }
        this.setHeader = function(key, value) {
            this.log("[HTTPRequest] Header: " + key + "; Value: " + value);
            this._xhr.setRequestHeader(key, value);
        };
        this.send = function(data) {
            this.log("[HTTPRequest] Data length: " + (data ? data.length : 0));
            this._xhr.send(data);
            return new Response(this._xhr);
        };
        this.setTimeouts = function(resolveD, connectD, sendD, receiveD) {
            var resolve = (resolveD ? resolveD : 120) * 1000;
            var connect = (connectD ? connectD : 120) * 1000;
            var send = (sendD ? sendD : 120) * 1000;
            var receive = (receiveD ? receiveD : 120) * 1000;
            this._xhr.setTimeouts(resolve, connect, send, receive);
        }
        this.abort = function() {
            this.log("[HTTPRequest] abort!");
            this._xhr.abort();
        };
    };
    HTTPRequest.SSL = {
        SERVER_CERT_IGNORE_UNKNOWN_CA: 256,
        SERVER_CERT_IGNORE_WRONG_USAGE: 512,
        SERVER_CERT_IGNORE_CERT_CN_INVALID: 4096,
        SERVER_CERT_IGNORE_CERT_DATE_INVALID: 8192,
        SERVER_CERT_IGNORE_ALL_SERVER_ERRORS: 13056
    };
    HTTPRequest.METHOD = {
        GET: "GET",
        HEAD: "HEAD",
        OPTIONS: "OPTIONS",
        POST: "POST"
    }
    HTTPRequest.OPTION = {
        URL: -1,
        URL_CODEPAG: 0,
        ESCAPE_PERCENT_IN_UR: 1,
        IGNORE_SERVER_SSL_CERT_ERROR_FLAG: 2,
        SELECT_CLIENT_SSL_CER: 3
    };
    HTTPRequest.PROXY = {
        DEFAULT: 0,
        PRECONFIG: 0,
        DIRECT: 1,
        PROXY: 2
    };
    HTTPRequest.STATE = {
        UNSENT: 0,
        OPENED: 1,
        HEADERS_RECEIVED: 2,
        LOADING: 3,
        DONE: 4
    };
    return HTTPRequest;
})();