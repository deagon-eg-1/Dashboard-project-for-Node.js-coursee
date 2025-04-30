// w07rfnCuQ9IxZxMg password db
// module.imports
const express = require("express");
const app = express();
const port = process.env.PORT || 2003;
const mongoose = require("mongoose");
app.set("view engine", "ejs");
const methodOverride = require("method-override");
const allRouters = require('./router/allRouters')

// auto reload
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
const { isPromise } = require("util/types");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));


//  الاتصال بقاعدة البيانات
mongoose
  .connect(
    "mongodb+srv://elmohtarfmo:w07rfnCuQ9IxZxMg@cluster0.jkyw9ph.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


  app.use( allRouters)