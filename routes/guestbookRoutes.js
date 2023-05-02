const express = require('express');
const router = express.Router();
const controller = require('../controllers/guestbookControllers.js');
const { login } = require('../auth/auth')
const { verify } = require('../auth/auth')

router.get("/", controller.landing_page);

router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get("/loggedIn", verify, controller.loggedIn_landing);
router.get("/logout", controller.logout);

router.get("/fitnessPage", controller.show_fitnessPage);
router.get("/nutritionPage", controller.show_nutritionPage);
router.get("/healthyLifestylePage", controller.show_healthyLifestylePage);

router.get('/new', verify, controller.show_new_entries);
router.post('/new', verify, controller.post_new_entry);
router.get('/posts/:author', controller.show_user_entries);


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