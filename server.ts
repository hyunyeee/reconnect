import https from "https";
import fs from "fs";
import next from "next";

const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
};

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => {
      handle(req, res);
    })
    .listen(3000, () => {
      console.log("▶ HTTPS Next.js running at https://localhost:3000");
    });
});
