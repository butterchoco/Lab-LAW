const app = require("./app");

var server_port = process.env.PORT || 8001;
app.listen(server_port, (err) => {
  if (err) throw err;
  console.log("> Read on http://localhost:" + server_port);
});
