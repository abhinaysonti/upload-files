//creating a server using express
const app = require("./app");
const mongoose = require("./db");
const port = 3000;
app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});

//creating a server in a diff way
const userController = require("./conrollers/userController");
const hostname = "127.0.0.1";
const port = 3000;

userController.server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
