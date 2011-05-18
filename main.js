var {Application} = require("stick");

export("app", "init");

var app = Application();
app.configure("notfound", "error", "static", "params", "mount");
app.static(module.resolve("public"));
app.mount("/", require("./actions"));

var server;
var start = function() {
   print ('starting it', server.addWebsocket);
   // see https://gist.github.com/555596
   var context = server.getDefaultContext();
   context.addWebSocket("/websocket", function (socket) {
      // export socket to let us play with it
      exports.socket = socket;
      socket.onmessage = function(m) {
         print("MESSAGE", m);
      };

      socket.onclose = function() {
         print("CLOSE");
      };
   });
   return;
};

// Script run from command line
if (require.main === module) {
   server = require("ringo/httpserver").main(module.id);
   start();
}
