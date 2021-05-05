const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

function readFiles(dirname, onFileContent) {
  fs.unlink("./public/data.json", (err) => {
    if (err) {
      console.error(err)
      return
    }
  });
  console.log("file deleted and ready to rewrite");
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      throw err;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          throw err;
        }
        onFileContent(filename, content);
      });
    });
  });
}

function pushData(fname, data) {
  const info = data.toString();
  var array = info.split("\n");
  var jsonKeys = array[0].split(",");
  array.splice(0, 1);
  var jsonResult = new Array;
  for (i in array) {
    var temp = array[i].split(",");
    var json = {};
    for (j in temp) {
      json[jsonKeys[j]] = temp[j];
    }
    jsonResult.push(json);
  }

  fs.writeFile('./public/data.json', JSON.stringify(jsonResult), err => {
    // error checking
    if (err) throw err;

    console.log("New data added");
  });

  /*fetch("http://188.166.191.81:8000/push", {
    method: "POST",
    body: JSON.stringify(jsonResult),
    headers: {
      "Content-Type": "application/json"
    }
  });*/
}

app.post("/load", (req, res) => {
  readFiles("./public/files/", pushData);
});

// listen for requests :)
const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});