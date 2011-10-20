var {Application} = require("stick");

export("app", "init");

var app = Application();
app.configure("notfound", "error", "static");
app.static(module.resolve("public"));

var server;
var sockets = {};
var start = function() {
   var context = server.getDefaultContext();
   context.addWebSocket("/ringo-chat", function (socket) {
      socket.uid = java.util.UUID.randomUUID().toString();
      socket.onmessage = function(msg) {
         var message = JSON.parse(msg);
         for (var uid in sockets) {
            sockets[uid].send(JSON.stringify(message.data));
         }
      };

      socket.onclose = function() {
         delete sockets[socket.uid];
      };
      socket.send(JSON.stringify({
         type: 'hello',
         uid: socket.uid
      }));
      sockets[socket.uid] = socket;
   });
   return;
};

// Script run from command line
if (require.main === module) {
   server = require("ringo/httpserver").main(module.id);
   start();
}
