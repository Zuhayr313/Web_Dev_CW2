const goalsDAO = require("../models/goalsModel");
const userDao = require("../models/userModel.js");
const path = require("path");

const db = new goalsDAO();
db.init();

exports.landing_page = function (req, res) {
  res.redirect('/about.html');
};

exports.show_login = function (req, res) {
  res.render("user/login");
};

exports.handle_login = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;

  //console.log( userDao.getUserByUsername(user));

  db.getAllUncompletedFitnessGoal()
    .then((list) => {

      userDao.getUserByUsername(user)
        .then((userInfo) => {

          res.render("fitness/fitnessPage", {
            fitnessGoals: list,
            userInformation: userInfo,
          })

        });

    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
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
      //res.redirect("/userFoundRegister");
      //res.render("user/userFoundRegister");
    }
    userDao.create(user, password);
    console.log("register user", user, "password", password);
    res.redirect("/login");
  });
};

//exports.post_User_Found_Register = function (req, res) {
// res.render("user/userFoundRegister");
//};

exports.loggedIn_landing = function (req, res) {
  db.getAllUncompletedFitnessGoal()
    .then((list) => {
      res.render("fitness/fitnessPage", {
        fitnessGoals: list,
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
  db.getAllUncompletedFitnessGoal()
    .then((list) => {
      res.render("fitness/fitnessPage", {
        fitnessGoals: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};
exports.show_Completed_Fitness_Goal = function (req, res) {
  db.getAllCompletedFitnessGoal()
    .then((list) => {
      res.render("fitness/completedFitnessGoals", {
        fitnessGoals: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.show_new_Fitness_Goal = function (req, res) {
  res.render("goals/newGoal", {
    title: "Fitness",
    user: "user",
  });
};
exports.post_new_Fitness_Goal = function (req, res) {
  console.log("processing post - new_Fitness_Goal controller");
  if (!req.body.goal) {
    response.status(400).send("Entries must have a goal.");
    return;
  }
  db.addGoal(req.body.goal, req.body.goal_Type, 'Fitness Goal', req.body.set_Achievement_Date, req.body.goal_reps);
  res.redirect("/fitnessPage");
};
exports.show_edit_Fitness_Goal = function (req, res) {
  let goalId = req.params._id;
  db.getGoalsById(goalId)
    .then((list) => {
      res.render("goals/editGoal", {
        title: "Fitness",
        user: "user",
        goalsList: list,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};
exports.post_edit_Fitness_Goal = function (req, res) {
  console.log("processing post - edit_Fitness_Goal controller");
  if (!req.body.goal) {
    response.status(400).send("Entries must have an goal.");
    return;
  }
  let goalId = req.params._id;
  db.updateGoal(goalId, req.body.goal, req.body.goal_Type, req.body.set_Achievement_Date, req.body.goal_Reps);
  res.redirect("/fitnessPage");
};
exports.post_fitness_delete_Goal = function (req, res) {
  console.log("processing post - delete_Goal controller");
  let goalId = req.params._id;
  db.deleteGoal(goalId);
  res.redirect("/fitnessPage");

};
exports.post_fitness_completed_Goal = function (req, res) {
  console.log("processing post - completed_Goal controller");
  let goalId = req.params._id;
  db.completeGoal(goalId);
  res.redirect("/fitnessPage");

};




exports.show_nutrition_Page = function (req, res) {
  db.getAllUncompletedNutritionGoal()
    .then((list) => {
      res.render("nutrition/nutritionPage", {
        nutritionGoals: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};
exports.show_Completed_Nutrition_Goal = function (req, res) {
  db.getAllCompletedNutritionGoal()
    .then((list) => {
      res.render("nutrition/completedNutritionPage", {
        nutritionGoals: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};
exports.show_new_Nutrition_Goal = function (req, res) {
  res.render("goals/newGoal", {
    title: "Nutrition",
    user: "user",
  });
};
exports.post_new_Nutrition_Goal = function (req, res) {
  console.log("processing post - new_Nutrition_Goal controller");
  if (!req.body.goal) {
    response.status(400).send("Entries must have a goal.");
    return;
  }
  db.addGoal(req.body.goal, req.body.goal_Type, 'Nutrition Goal', req.body.set_Achievement_Date, req.body.goal_reps);
  res.redirect("/nutritionPage");
};
exports.show_edit_Nutrition_Goal = function (req, res) {
  let goalId = req.params._id;
  db.getGoalsById(goalId)
    .then((list) => {
      res.render("goals/editGoal", {
        title: "Nutrition",
        user: "user",
        goalsList: list,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};
exports.post_edit_Nutrition_Goal = function (req, res) {
  console.log("processing post - edit_Nutrition_Goal controller");
  if (!req.body.goal) {
    response.status(400).send("Entries must have an goal.");
    return;
  }
  let goalId = req.params._id;
  db.updateGoal(goalId, req.body.goal, req.body.goal_Type, req.body.set_Achievement_Date, req.body.goal_Reps);
  res.redirect("/nutritionPage");
};
exports.post_Nutrition_delete_Goal = function (req, res) {
  console.log("processing post - Nutrition_delete_Goal controller");
  let goalId = req.params._id;
  db.deleteGoal(goalId);
  res.redirect("/nutritionPage");

};
exports.post_Nutrition_completed_Goal = function (req, res) {
  console.log("processing post - Nutrition_completed_Goal controller");
  let goalId = req.params._id;
  db.completeGoal(goalId);
  res.redirect("/nutritionPage");

};


exports.show_healthy_Lifestyle_Page = function (req, res) {
  db.getAllUncompletedHealthyLifestyleGoal()
    .then((list) => {
      res.render("healthyLifestyle/healthyLifestylePage", {
        healthyLifestyleGoals: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.show_Completed_Healthy_Lifestyle_Goal = function (req, res) {
  db.getAllCompletedHealthyLifestyleGoal()
    .then((list) => {
      res.render("healthyLifestyle/completedHealthyLifestylePage", {
        healthyLifestyleGoals: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.show_new_Healthy_Lifestyle_Goal = function (req, res) {
  res.render("goals/newGoal", {
    title: "Healthy-Lifestyle",
    user: "user",
  });
};
exports.post_new_Healthy_Lifestyle_Goal = function (req, res) {
  console.log("processing post - new_Healthy_Lifestyle_Goal controller");
  if (!req.body.goal) {
    response.status(400).send("Entries must have a goal.");
    return;
  }
  db.addGoal(req.body.goal, req.body.goal_Type, 'Healthy Lifestyle Goal', req.body.set_Achievement_Date, req.body.goal_reps);
  res.redirect("/healthyLifestylePage");
};

exports.show_edit_Healthy_Lifestyle_Goal = function (req, res) {
  let goalId = req.params._id;
  db.getGoalsById(goalId)
    .then((list) => {
      res.render("goals/editGoal", {
        title: "Healthy-Lifestyle",
        user: "user",
        goalsList: list,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};
exports.post_edit_Healthy_Lifestyle_Goal = function (req, res) {
  console.log("processing post - edit_Healthy_Lifestyle_Goal controller");
  if (!req.body.goal) {
    response.status(400).send("Entries must have an goal.");
    return;
  }
  let goalId = req.params._id;
  db.updateGoal(goalId, req.body.goal, req.body.goal_Type, req.body.set_Achievement_Date, req.body.goal_Reps);
  res.redirect("/healthyLifestylePage");
};

exports.post_Healthy_Lifestyle_delete_Goal = function (req, res) {
  console.log("processing post - Healthy_Lifestyle_delete_Goal controller");
  let goalId = req.params._id;
  db.deleteGoal(goalId);
  res.redirect("/healthyLifestylePage");

};
exports.post_Healthy_Lifestyle_completed_Goal = function (req, res) {
  console.log("processing post - Healthy_Lifestyle_completed_Goal controller");
  let goalId = req.params._id;
  db.completeGoal(goalId);
  res.redirect("/healthyLifestylePage");

};