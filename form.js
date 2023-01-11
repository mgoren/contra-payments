var sliding_scale_min = 15;
var sliding_scale_max = 30;

document.addEventListener('DOMContentLoaded', function() {
  window.nameField = document.getElementById('name');
  window.emailField = document.getElementById('email');
  window.phoneField = document.getElementById('phone');
  window.pricePerField = document.getElementById('admission-cost');
  window.quantityField = document.getElementById('admission-quantity');
  window.noteSection = document.getElementById('note');
  window.noteField = document.getElementById('order_note');
  window.totalField = document.getElementById('total');
  window.totalField2 = document.getElementById('total-2');
  window.totalDetailsField = document.getElementById('total-details');
  window.totalDetailsField2 = document.getElementById('total-details-2');
  window.checkoutButton = document.getElementById('checkout');
  window.backButton = document.getElementById('back');
  window.paymentForm = document.getElementById('payment-form');
  window.paymentSection = document.getElementById('payment');
  updateTotal();
  pricePerField.addEventListener('change', costUpdated, false);
  quantityField.addEventListener('change', quantityUpdated, false);
  quantityField.addEventListener('keyup', toggleNote, false);
  checkoutButton.addEventListener('click', checkout, false);
  backButton.addEventListener('click', back, false);
}, false);

var toggleNote = function() {
  var quantity = quantityField.value;
  if (!isNaN(quantity) && quantity > 1) {
    noteSection.style.display = 'block';
  } else {
    noteSection.style.display = 'none';
  }
};

var costUpdated = function() {
  pricePerField.value = pricePerField.value.split('.')[0];
  var pricePer = parseInt(pricePerField.value);
  if (isNaN(pricePer) || pricePer > sliding_scale_max) {
    pricePerField.value = sliding_scale_max;
  } else if (pricePer < sliding_scale_min) {
    pricePerField.value = sliding_scale_min;
  }
  updateTotal();
};

var quantityUpdated = function() {
  quantityField.value = quantityField.value.split('.')[0];
  var quantity = parseInt(quantityField.value);
  if (isNaN(quantity) || quantity < 1) {
    quantityField.value = '1';
  } else if (quantity > 9) {
    quantityField.value = '9';
  }
  toggleNote();
  updateTotal();
};

var updateTotal = function() {
  var pricePer = parseInt(pricePerField.value);
  var quantity = parseInt(quantityField.value);
  var total = pricePer * quantity;
  totalField.textContent = total;
  totalField2.textContent = total;
  if (quantity > 1) {
    totalDetailsField.textContent = '(' + quantity + ' admissions at $' + pricePer + ' each)';
    totalDetailsField2.textContent = '(' + quantity + ' admissions at $' + pricePer + ' each)';
  } else {
    totalDetailsField.textContent = '(1 admission)';
    totalDetailsField2.textContent = '(1 admission)';
  }
};

var checkout = function(e) {
  e.preventDefault();
  paymentForm.classList.add('d-none');
  paymentSection.classList.remove('d-none');
};

var back = function() {
  paymentSection.classList.add('d-none');
  paymentForm.classList.remove('d-none');
};