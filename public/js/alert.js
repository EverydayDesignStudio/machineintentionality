/* eslint-disable */
export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, msg) => {
  hideAlert();

  const markup = `<div class="alert alert-dismissible alert-${type}" role="alert">${msg}                      
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button></div>`;
  document
    .querySelector('.alert-insert')
    .insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

export const showAlert1 = (type, msg) => {

  hideAlert();

  const markup = `<div class="alert alert-dismissible alert-${type}" role="alert">${msg}                      
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button></div>`;
  document
    .querySelector('.alert-insert1')
    .insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

export const showAlert2 = (type, msg) => {
  hideAlert();

  const markup = `<div class="alert alert-dismissible alert-${type}" role="alert">${msg}                      
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button></div>`;
  document
    .querySelector('.alert-insert2')
    .insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

export const showAlert3 = (type, msg) => {
  hideAlert();

  const markup = `<div class="alert alert-dismissible alert-${type}" role="alert">${msg}                      
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button></div>`;
  document
    .querySelector('.alert-insert3')
    .insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

export const showAlert4 = (type, msg) => {
  hideAlert();

  const markup = `<div class="alert alert-dismissible alert-${type}" role="alert">${msg}                      
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button></div>`;
  document
    .querySelector('.alert-insert4')
    .insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};