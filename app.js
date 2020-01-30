const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

//to upload a file as a stream
const Busboy = require("busboy");

app.post("/uploadFile", (req, res) => {
  var busboy = new Busboy({ headers: req.headers });
  // Listen for event when Busboy finds a file to stream.
  busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
    // We are streaming! Handle chunks
    file.on("data", function(data) {
      // Here we can act on the data chunks streamed.
    });
    const writable = fs.createWriteStream(`./upload/${filename}`);
    file.pipe(writable);
    // Completed streaming the file.
    file.on("end", function(stream) {
      //Here I need to get the stream to send to SQS
      res.end("file uploaded");
    });
  });
  // Listen for event when Busboy is finished parsing the form.
  busboy.on("finish", function() {
    res.statusCode = 200;
    res.end();
  });
  // Pipe the HTTP Request into Busboy.
  req.pipe(busboy);
});

module.exports = app;
