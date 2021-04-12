const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/public/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
