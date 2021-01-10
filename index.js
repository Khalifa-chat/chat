const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();

app.set("port", (process.env.PORT || 8000));

app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());

app.get("/", function (req, res) {
    res.send("مرحبا بك في منظومة الماسنجر");
});

app.get("/webhook", function (req, res) {
    const PAGE_VERIFY_TOKEN = "khalifa0913964002";

    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (token === PAGE_VERIFY_TOKEN) {
        res.status(200).send(challenge);
    }
    else{
        res.status(403);
    }
});

app.listen(app.get("port"), function () {
    console.log("server is running and listening on port " + app.get("port"));
});
