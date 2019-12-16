const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/users', userController.getAllUsers);

router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadUserSTL,
  userController.saveUserSTL,
  userController.updateMe
);

router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.get(
  '/',
  authController.protect,
  //   authController.restrictTo('admin'),
  userController.getAllUsers
);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    userController.uploadImage,
    userController.saveImage,
    userController.updateUser
  ).delete(userController.deleteUser);

module.exports = router;
