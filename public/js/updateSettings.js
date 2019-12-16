/* eslint-disable */

import axios from 'axios';
import { showAlert, showAlert1, showAlert2, showAlert3, showAlert4 } from './alert';

export const updatePrinter = async printer => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data: {
        printer
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Printer selected successfully');
      window.setTimeout(() => {
        location.reload();
      }, 2000);
    }
  } catch (err) {
    showAlert('danger', err.response.data.message);
  }
};

export const uploadSTLFiles = async data => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data
    });
    if (res.data.status === 'success') {
      showAlert4('success', 'STL File Uploaded successfully');
      window.setTimeout(() => {
        location.reload();
      }, 2000);
    }
  } catch (err) {
    showAlert4('danger', err.response.data.message);
  }
};

export const updateUser = async (printStatus, userID) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/' + userID,
      data: {
        printStatus
      }
    });

    if (res.data.status === 'success') {
      showAlert2('success', 'Print Status updated successfully');
      window.setTimeout(() => {
        location.reload();
      }, 2000);
    }
  } catch (err) {
    showAlert2('danger', err.response.data.message);
  }
};

export const deleteUser = async userID => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/api/v1/users/' + userID
    });
    if (res.status === 204) {
      showAlert3('success', 'User deleted successfully');
      window.setTimeout(() => {
        location.reload();
      }, 2000);
    }
  } catch (err) {
    showAlert3('danger', err.response.data.message);
  }
};

export const updateImage = async (userID, data, image) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/' + userID,
      data
    });
    if(image === 'image1') {
      if (res.data.status === 'success') {
        showAlert('success', 'Image updated successfully');
        window.setTimeout(() => {
          location.reload();
        }, 2000);
      }
    }
    if(image === 'image2') {
      if (res.data.status === 'success') {
        showAlert1('success', 'Image updated successfully');
        window.setTimeout(() => {
          location.reload();
        }, 2000);
      }
    }
    
  } catch (err) {
    showAlert('danger', err.response.data.message);
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/print');
      }, 2000);
    }
  } catch (err) {
    showAlert('danger', err.response.data.message);
  }
};

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Signed Up successfully');
      window.setTimeout(() => {
        location.reload(true);
      }, 2000);
    }
  } catch (err) {
    showAlert('danger', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if (res.data.status === 'success') location.assign('/print');
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
