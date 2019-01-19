const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === "/thoughts/feed.json") {
      res.writeHead(200, { "Content-Type": "application/json" });
      var otherArray = ["item1", "item2"];
      var otherObject = { item1: "item1val", item2: "item2val" };
      var json = JSON.stringify({
        version: "https://jsonfeed.org/version/1",
        title: "mxstbr.com",
        home_page_url: "https://mxstbr.com/",
        feed_url: "https://mxstbr.com/thoughts/feed.json",
        items: []
      });
      res.end(json);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
