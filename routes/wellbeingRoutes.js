const express = require('express');
const router = express.Router();
const controller = require('../controllers/wellbeingControllers.js');
const { login } = require('../auth/auth.js')
const { verify } = require('../auth/auth.js')

router.get("/", controller.landing_page);

router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get("/loggedIn", verify, controller.loggedIn_landing);
router.get("/logout", controller.logout);

router.get("/fitnessPage", controller.show_fitness_Page);
router.get("/completedFitnessGoal", controller.show_Completed_Fitness_Goal);
router.get("/newFitnessGoal", controller.show_new_Fitness_Goal);
router.post("/newFitnessGoal", controller.post_new_Fitness_Goal);
router.get('/editFitnessGoal/:_id', controller.show_edit_Fitness_Goal);
router.post('/editFitnessGoal/:_id', controller.post_edit_Fitness_Goal);
router.post('/deleteGoal/:_id', controller.post_fitness_delete_Goal);
router.post('/completedGoal/:_id', controller.post_fitness_completed_Goal);

router.get("/nutritionPage", controller.show_nutrition_Page);
router.get("/completedNutritionPage", controller.show_Completed_Nutrition_Goal);
router.get("/newNutritionGoal", controller.show_new_Nutrition_Goal);
router.post("/newNutritionGoal", controller.post_new_Nutrition_Goal);
router.get('/editNutritionGoal/:_id', controller.show_edit_Nutrition_Goal);
router.post('/editNutritionGoal/:_id', controller.post_edit_Nutrition_Goal);
router.post('/deleteNutritionGoal/:_id', controller.post_Nutrition_delete_Goal);
router.post('/completedNutritionGoal/:_id', controller.post_Nutrition_completed_Goal);

router.get("/healthyLifestylePage", controller.show_healthy_Lifestyle_Page);
router.get("/completedHealthyLifestylePage", controller.show_Completed_Healthy_Lifestyle_Goal);
router.get("/newHealthyLifestyleGoal", controller.show_new_Healthy_Lifestyle_Goal);
router.post("/newHealthy-LifestyleGoal", controller.post_new_Healthy_Lifestyle_Goal);
router.get('/editHealthyLifestyleGoal/:_id', controller.show_edit_Healthy_Lifestyle_Goal);
router.post('/editHealthy-LifestyleGoal/:_id', controller.post_edit_Healthy_Lifestyle_Goal);
router.post('/deleteHealthyLifestyleGoal/:_id', controller.post_Healthy_Lifestyle_delete_Goal);
router.post('/completedHealthyLifestyleGoal/:_id', controller.post_Healthy_Lifestyle_completed_Goal);


router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
});
router.use(function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});
module.exports = router;