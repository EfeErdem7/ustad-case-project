const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const path = require("path");

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));

app.db = router.db;

app.use(cors());
app.use(jsonServer.bodyParser);
app.use(auth);
app.use(router);

app.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
