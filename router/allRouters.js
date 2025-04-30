const express = require("express");
const app = express.Router();
const Article = require("../models/articleSchema");
const moment = require("moment");
const counterList = require("../models/country");

// تحديد مسار المجلد العام
// جلب جميع المقالات من قاعدة البيانات
app.get("/", (req, res) => {
  Article.find()
    .then((articles) => {
      res.render("index", { articles, moment: moment }); // عرض البيانات في صفحة EJS
      // console.log(articles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("حدث خطأ أثناء جلب البيانات");
    });
});

// تحديد مسار صفحة إضافة المقالات
app.get("/add.html", (req, res) => {
  res.render("add", { con: counterList });
});

// تحديد مسار صفحة تعديل علي المقالات
app.get("/edit/:id", (req, res) => {
  Article.findById(req.params.id)
    .then((re) => {
      res.render("edit", { find: re, moment: moment, con: counterList }); // عرض البيانات في صفحة EJS
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
      res.render("view", { re, moment: moment }); // عرض البيانات في صفحة EJS
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
      console.log("send data success");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("send data error");
    });
});

// search usar in db
app.post("/search", (req, res) => {
  const searchText = req.body.searchText;
  Article.find({ $or: [{ firstName: searchText }, { lastName: searchText }] })
    .then((rest) => {
      res.render("search", { dUser: rest, moment: moment });
    })
    .catch((err) => {
      console.log(err);
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
  Article.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
