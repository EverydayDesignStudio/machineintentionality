const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Overview Page',
    bg: '../assests/print_background.png'
  });
};

exports.getAbout = (req, res) => {
  res.status(200).render('about', {
    title: 'About',
    color: 'background-color: #e4f5e7;'
  });
};

exports.getPrint = (req, res) => {
  res.status(200).render('print', {
    title: 'Print',
    bg: '../assests/print_background.png'
  });
};

exports.getGallery = catchAsync(async (req, res) => {
  const users = await User.find({ role: { $ne: 'admin' } });
  res.status(200).render('gallery', {
    title: 'Gallery',
    users,
    bg: '../assests/gallery_background.png'
  });
});

exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
    color: 'background-color: #424394;'
  });
};

exports.getSignup = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your account',
    color: 'background-color: #A29ACB;'
  });
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find({ role: { $ne: 'admin' } });
  res.status(200).render('users', {
    title: 'User List',
    users,
    color: 'background-color: #A29ACB;'
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const userEdit = await User.findById(req.params.id);
  const { id } = req.params;
  if (!userEdit) {
    return next(new AppError('There is no user with that id', 404));
  }
  res.status(200).render('user', {
    title: `User | ${userEdit.name}`,
    data: JSON.stringify(userEdit),
    id,
    color: 'background-color: #e4f5e7;'
  });
});
