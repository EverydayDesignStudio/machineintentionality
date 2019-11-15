/* eslint-disable */

import '@babel/polyfill';
import {
  login,
  logout,
  signup,
  updatePrinter,
  uploadSTLFiles,
  updateUser,
  updateImage
} from './updateSettings';

const printerForm = document.querySelector('.printer-form');
const uploadSTLForm = document.querySelector('.upload-stl-file-form');

const statusForm = document.querySelector('.set-status-form');
const round1Form = document.querySelector('.round-1-form');
const round2Form = document.querySelector('.round-2-form');

const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logoutBtn = document.querySelector('.logout');

if (printerForm) {
  printerForm.addEventListener('submit', e => {
    e.preventDefault();
    const printer = document.getElementById('printer').value;
    updatePrinter(printer);
  });
}

if (uploadSTLForm) {
  uploadSTLForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    if (document.getElementById('submission1')) {
      form.append(
        'submission1',
        document.getElementById('submission1').files[0]
      );
    }
    if (document.getElementById('submission2')) {
      form.append(
        'submission2',
        document.getElementById('submission2').files[0]
      );
      form.append('printStatus', 'received')
    }
    uploadSTLFiles(form);
  });
}

if (statusForm) {
  statusForm.addEventListener('submit', e => {
    e.preventDefault();
    const printStatus = document.getElementById('printStatusSelect').value;
    const userID = document.querySelector('.active-edit').dataset.id;
    updateUser(printStatus, userID);
  });
}

if (round1Form) {
  round1Form.addEventListener('submit', e => {
    e.preventDefault();
    const userID = document.querySelector('.active-edit').dataset.id;
    const form = new FormData();
    if (document.getElementById('round1')) {
      form.append('round1', document.getElementById('round1').files[0]);
    }
    updateImage(userID, form, 'image1');
  });
}

if (round2Form) {
  round2Form.addEventListener('submit', e => {
    e.preventDefault();
    const userID = document.querySelector('.active-edit').dataset.id;
    const form = new FormData();
    if (document.getElementById('round2')) {
      form.append('round2', document.getElementById('round2').files[0]);
    }
    updateImage(userID, form, 'image2');
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);
