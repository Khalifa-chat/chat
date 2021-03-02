const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();

const PAGE_ACCESS_TOKEN = "EAADAAXPTv5sBAFNEIh7FO6sRU6mKb1u9qzGL7WD3DeXZBkF2ZAiQZBlFi09zdj0HOaVnxFs49sgNLFkuyAbgl6dccuMZBUw6HnbWjZCdBmt9NDM1K7pR030LZBHFithFZCNlfYxjrOZCt7BkNP6pIYj1yOap0kHSqTw9OIpiOU37oBsvBVQVNfuh";

app.set("port", (process.env.PORT || 8000));

app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());

app.get("/", function (req, res) {
    res.send(" كلاسي هوم مرحبا بك في منظومة الماسنجر");
});

app.get("/", function (req, res) {
    var data = {
        "greeting": [
            {
                "locale": "default",
                "text": "Hello!"
            }
        ]
    }

    request(
        {
            url: "https://graph.facebook.com/v10.0/me/messenger_profile?access_token=" + PAGE_ACCESS_TOKEN,
            method: "POST",
            headers: { "Content-Type": "application/json" },
       form: data
        },
        function (error, response, body){
           console.log(response);
           console.log(body);  
        }
    );
});

app.get("/webhook", function (req, res) {
    const PAGE_VERIFY_TOKEN = "khalifa0913964002";

    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (token === PAGE_VERIFY_TOKEN) {
        res.status(200).send(challenge);
    }
    else {
        res.status(403);
    }
});

app.post("/webhook", function (req, res) {
    var data = req.body;

    if (data.object === "page") {
        data.entry.forEach(function (entry) {
            var pageID = entry.id;
            var timeStanp = enry.time;

            entry.messaging.forEach(function (event) {
                if (event.message) {
                    // handle message
                }
                else if (event.postback) {
                    // handle postback
                }
            });
        });
        res.sendStatus(200);
    }
});
app.listen(app.get("port"), function () {
    console.log("server is running and listening on port " + app.get("port"));
});
