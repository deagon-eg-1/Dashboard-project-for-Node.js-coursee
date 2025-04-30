// w07rfnCuQ9IxZxMg password db
// module.imports
const express = require("express");
const app = express();
const port = 2003;
const mongoose = require("mongoose");
const Article = require("./models/articleSchema");
const { log } = require("console");
app.set("view engine", "ejs");
const moment = require('moment');
const methodOverride = require('method-override');
const counterList = require("./models/country");




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
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))


// تحديد مسار المجلد العام
// جلب جميع المقالات من قاعدة البيانات
app.get("/", (req, res) => {
  Article.find()
    .then((articles) => {
      res.render("index", { articles ,moment: moment}); // عرض البيانات في صفحة EJS
      // console.log(articles);
      
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("حدث خطأ أثناء جلب البيانات");
    });
});

// تحديد مسار صفحة إضافة المقالات
app.get("/add.html", (req, res) => {
  res.render("add", {con : counterList});
});
// تحديد مسار صفحة عرض المقالات
app.get("/view.html", (req, res) => {
  res.render("view", {});
});
// تحديد مسار صفحة بحث في المقالات
app.get("/search.html", (req, res) => {
  res.render("search", {});
});
// تحديد مسار صفحة تعديل علي المقالات
app.get("/edit/:id", (req, res) => {
  Article.findById(req.params.id)
  .then((re) => {
      res.render("edit", { find : re , moment: moment,con: counterList}); // عرض البيانات في صفحة EJS
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("حدث خطأ أثناء جلب البيانات");
    });
});


// show details user in page view.html
// req.params.id بيجيب من قاعدة ابيانات المستخدم من قاعدة البيانات
app.get("/view/:id", (req, res) => {
  Article.findById(req.params.id)
  .then((re) => {
      res.render("view", { re , moment: moment}); // عرض البيانات في صفحة EJS
      // console.log(articles);
      
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("حدث خطأ أثناء جلب البيانات");
    });
});

    
// ارسال بيانات الي قاعدة البيانات
app.post("/add.html", (req, res) => {
  Article.create(req.body)
    .then(() => {
      console.log('send data success');
       res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('send data error');
    });
});



// حذف بيانات المستخدم في قاعدة البيانات
app.delete("/edit/:id", (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("delete data success");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("delete error");
    });

});




// تعديل بيانات المستخدم في قاعدة البيانات
app.put("/edit/:id", (req, res) => {
  Article.findByIdAndUpdate(req.params.id,req.body).then(() => {
    res.redirect('/')
  }).catch((err) => {
    console.log(err);
  });
});




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

