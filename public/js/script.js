/* eslint-disable */

$('.icon').click(function() {
  $(this).toggleClass('open');
});

$('#submission1').on('change', function() {
  var fileName = $(this).val();
  var fileName = $(this)
    .val()
    .replace('C:\\fakepath\\', '');
  $(this)
    .next('.custom-file-label')
    .html(fileName);
});

$('#submission2').on('change', function() {
  var fileName = $(this).val();
  var fileName = $(this)
    .val()
    .replace('C:\\fakepath\\', '');
  $(this)
    .next('.custom-file-label')
    .html(fileName);
});

$('#round1').on('change', function() {
  var fileName = $(this).val();
  var fileName = $(this)
    .val()
    .replace('C:\\fakepath\\', '');
  $(this)
    .next('.custom-file-label')
    .html(fileName);
});

$('#round2').on('change', function() {
  var fileName = $(this).val();
  var fileName = $(this)
    .val()
    .replace('C:\\fakepath\\', '');
  $(this)
    .next('.custom-file-label')
    .html(fileName);
});

$(document).ready(function() {
  $('#submission1').change(function() {
    if ($(this).val()) {
      $('.file-btn').attr('disabled', false);
    }
  });
});

$(document).ready(function() {
  $('#submission2').change(function() {
    if ($(this).val()) {
      $('.file-btn').attr('disabled', false);
    }
  });
});

$(document).ready(function() {
  $('#round1').change(function() {
    if ($(this).val()) {
      $('.status-select-btn').attr('disabled', false);
    }
  });
});

$(document).ready(function() {
  $('#round2').change(function() {
    if ($(this).val()) {
      $('.status-select-btn').attr('disabled', false);
    }
  });
});

$('.openEdit').on('click', function() {
  $(this).addClass('active-edit');
  var selectedPrintVal = document.querySelector('.active-edit').dataset
    .printstatus;
  $('#printStatusSelect').val(selectedPrintVal);
});

$('#setStatusModal').on('hidden.bs.modal', function(e) {
  $('.openEdit').removeClass('active-edit');
});

$('.openUpload1').on('click', function() {
  $(this).addClass('active-edit');
});

$('#round1Modal').on('hidden.bs.modal', function(e) {
  $('.openUpload1').removeClass('active-edit');
});

$('.openUpload2').on('click', function() {
  $(this).addClass('active-edit');
});

$('#round2Modal').on('hidden.bs.modal', function(e) {
  $('.openUpload2').removeClass('active-edit');
});
