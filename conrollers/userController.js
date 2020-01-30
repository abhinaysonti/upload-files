const http = require("http");
const url = require("url");
const User = require("./../models/userModel");

//creating users without any frameworks
exports.server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);

  if (
    (reqUrl.pathname == "/users" || reqUrl.pathname == "/user") &&
    req.method === "POST"
  ) {
    console.log("Request Type:" + req.method + " Endpoint: " + reqUrl.pathname);
    body = "";

    req.on("data", function(chunk) {
      body += chunk;
    });

    req.on("end", () => {
      postBody = JSON.parse(body);

      // console.log(postBody);
      User.create(postBody)
        .then(() => {
          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(postBody));
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
});

const dal = require("./../dal");
const mongoose = require("./../db");

//create a user using framework
exports.createUser = async (req, res) => {
  try {
    const newUser = await dal.addUserDB(req);
    res.status(201).json({
      status: "success",
      data: {
        newUser
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message
    });
  }
};
