const fs = require('fs');
const path = require('path');
const multer = require('multer');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  const filetypes = /stl/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload STL file!', 400), false);
  }
};

const multerFilter1 = (req, file, cb) => {
  const filetypes = /jpg|jpeg|mp4/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid File type', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const upload1 = multer({ storage: multerStorage, fileFilter: multerFilter1 });

exports.uploadUserSTL = upload.fields([
  { name: 'submission1', maxCount: 1 },
  { name: 'submission2', maxCount: 1 }
]);

exports.uploadImage = upload1.fields([{ name: 'round1' }, { name: 'round2' }]);

exports.saveImage = catchAsync(async (req, res, next) => {
  if (req.files) {
    if (!req.files.round1 && !req.files.round2) {
      return next();
    }

    if (req.files.round1) {
      req.files.round1[0].filename = `${req.files.round1[0].fieldname}-${
        req.params.id
      }-${Date.now()}${path.extname(req.files.round1[0].originalname).toLowerCase()}`;

      const imgPath = path.join(__dirname, `/../public/img/gallery/`);
      await fs.writeFile(
        `${imgPath}${req.files.round1[0].filename}`,
        req.files.round1[0].buffer,
        err => {
          if (err) throw err;
        }
      );
    }
    if (req.files.round2) {
      req.files.round2[0].filename = `${req.files.round2[0].fieldname}-${
        req.params.id
      }-${Date.now()}${path.extname(req.files.round2[0].originalname).toLowerCase()}`;

      const imgPath = path.join(__dirname, `/../public/img/gallery/`);
      await fs.writeFile(
        `${imgPath}${req.files.round2[0].filename}`,
        req.files.round2[0].buffer,
        err => {
          if (err) throw err;
        }
      );
    }
  }
  next();
});

exports.saveUserSTL = catchAsync(async (req, res, next) => {
  if (req.files) {
    if (!req.files.submission1 && !req.files.submission2) {
      return next();
    }

    if (req.files.submission1) {
      req.files.submission1[0].filename = `${req.files.submission1[0].fieldname}-${req.user.id}.stl`;

      const imgPath = path.join(__dirname, `/../public/img/users/`);
      await fs.writeFile(
        `${imgPath}${req.files.submission1[0].filename}`,
        req.files.submission1[0].buffer,
        err => {
          if (err) throw err;
        }
      );
    }
    if (req.files.submission2) {
      req.files.submission2[0].filename = `${req.files.submission2[0].fieldname}-${req.user.id}.stl`;
      const imgPath = path.join(__dirname, `/../public/img/users/`);
      await fs.writeFile(
        `${imgPath}${req.files.submission2[0].filename}`,
        req.files.submission2[0].buffer,
        err => {
          if (err) throw err;
        }
      );
    }
  }

  next();
});

const filterObj = (obj, ...allowerdFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowerdFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError('You cannot update password'), 400);
  }
  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'printer',
    'printStatus'
  );
  if (req.files) {
    if (req.files.submission1) {
      filteredBody.submission1 = req.files.submission1[0].filename;
    }
    if (req.files.submission2) {
      filteredBody.submission2 = req.files.submission2[0].filename;
    }
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError('You cannot update password'), 400);
  }

  const filteredBody = filterObj(req.body, 'printStatus');
  const user = await User.findById(req.params.id);

  if (req.files) {
    if (req.files.round1) {
      user.round1.push(req.files.round1[0].filename);
      filteredBody.round1 = user.round1;
    }

    if (req.files.round2) {
      user.round2.push(req.files.round2[0].filename);
      filteredBody.round2 = user.round2;
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false
  });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      data: user
    }
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});
