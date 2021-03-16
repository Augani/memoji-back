const bodyParser = require("body-parser");
var express = require("express");
var cors = require('cors')
var Pair = require("./pair");
var app = express();
app.use(cors());
app.use(bodyParser.json());

let URL = (n) =>
  `https://res.cloudinary.com/augani/image/upload/v1615924685/Memoji/Memoji-${n}.png`;
function List() {
  let data = [];
  let y = [...Pair["bm"], ...Pair["wf"], ...Pair["wm"]];
  y.map((m) => {
    data.push(URL(m));
  });
  return JSON.stringify(data);
}

function random(gen = null, skin = null, all) {
  if (all != 1) return List();
  let p =
    gen === "b" && skin === "m"
      ? Pair["bm"]
      : gen === "f" && skin === "w"
      ? Pair["wf"]
      : gen === "m" && skin === "w"
      ? Pair["wm"]
      : [...Pair["bm"], ...Pair["wf"], ...Pair["wm"]];
  let b = Math.floor(Math.random() * Math.floor(p.length));
  return URL(p[b]);
}

app.get("/v1/:n?/:g?/:s?", function (req, res) {
  let q = req.params.n || 1;
  let gender = req.params.g || null;
  let skin = req.params.s || null;
  res.status(200).send(random(gender, skin, q));
});

app.get("/", function(req,res){
    res.send("Use api only")
})

app.listen(process.env.port || 4000);
