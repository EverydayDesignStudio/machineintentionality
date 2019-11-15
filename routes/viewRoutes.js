const express = require('express');
const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.getAbout);
router.get('/gallery', viewController.getGallery);
router.get('/print', viewController.getPrint);

router.get('/login', viewController.getLogin);
router.get(
  '/signup',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getSignup
);
router.get('/users', viewController.getAllUsers);

module.exports = router;
