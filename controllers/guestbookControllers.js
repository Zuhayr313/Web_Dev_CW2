const guestbookDAO = require("../models/guestbookModel");
const userDao = require("../models/userModel.js");
const path = require("path");

const db = new guestbookDAO();
db.init();

exports.landing_page = function (req, res) {
  res.redirect('/about.html');
};

exports.show_login = function (req, res) {
  res.render("user/login");
};

exports.handle_login = function (req, res) {
  res.render("fitness/fitnessPage");
  //res.render("newEntry", {
  //  title: "Guest Book",
  //  user: "user"
  //});
};

exports.show_register_page = function (req, res) {
  res.render("user/register");
};

exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;

  if (!user || !password) {
    res.send(401, "no user or no password");
    return;
  }
  userDao.lookup(user, function (err, u) {
    if (u) {
      res.send(401, "User exists:", user);
      return;
    }
    userDao.create(user, password);
    console.log("register user", user, "password", password);
    res.redirect("/login");
  });
};

exports.loggedIn_landing = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.render("entries", {
        title: "Guest Book",
        user: "user",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};


exports.show_fitness_Page = function (req, res) {
  res.render("fitness/fitnessPage");
  //res.render("newEntry", {
  //  title: "Guest Book",
  //  user: "user"
  //});
};
exports.show_new_Fitness_Goal = function (req, res) {
  res.render("fitness/newFitnessGoal", {
    title: "Fitness Goal",
    user: "user",
  });
};
exports.post_new_Fitness_Goal = function (req, res) {
  console.log("processing post - new_Fitness_Goal controller");
  // if (!req.body.author) {
  //   response.status(400).send("Entries must have an author.");
  //  return;
  // }
  // db.addEntry(req.body.author, req.body.subject, req.body.contents);
  res.redirect("/fitnessPage");
};
exports.show_edit_Fitness_Goal = function (req, res) {
  res.render("fitness/editFitnessGoal", {
    title: "Fitness Goal",
    user: "user",
  });
};
exports.post_edit_Fitness_Goal = function (req, res) {
  console.log("processing post - edit_Fitness_Goal controller");
  // if (!req.body.author) {
  //   response.status(400).send("Entries must have an author.");
  //  return;
  // }
  // db.addEntry(req.body.author, req.body.subject, req.body.contents);
  res.redirect("/fitnessPage");
};


exports.show_nutrition_Page = function (req, res) {
  res.render("nutrition/nutritionPage");
  //res.render("newEntry", {
  //  title: "Guest Book",
  //  user: "user"
  //});
};

exports.show_healthy_Lifestyle_Page = function (req, res) {
  res.render("healthyLifestyle/healthyLifestylePage");
  //res.render("newEntry", {
  //  title: "Guest Book",
  //  user: "user"
  //});
};

/*
exports.landing_page = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.render("entries", {
        title: "Guest Book",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};
*/

exports.show_new_entries = function (req, res) {
  res.render("newEntry", {
    title: "Guest Book",
    user: "user",
  });
};

exports.post_new_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.author) {
    response.status(400).send("Entries must have an author.");
    return;
  }
  db.addEntry(req.body.author, req.body.subject, req.body.contents);
  res.redirect("/loggedIn");
};

exports.show_user_entries = function (req, res) {
  let user = req.params.author;
  db.getEntriesByUser(user)
    .then((entries) => {
      res.render("entries", {
        title: "Guest Book",
        user: "user",
        entries: entries,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};

