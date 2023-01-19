var sliding_scale_min = 15;
var sliding_scale_max = 30;
var quantity_max = 4;

var deleteCookie = function(name) {
  document.cookie = name +"=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
['webhookSent','name','email','phone','additional1','additional2','additional3','additionals','pricePer','quantity','donation','total','paypalEmail'].forEach(cookie=>deleteCookie(cookie));

if (!navigator.cookieEnabled) {
  location.href="nocookies.html";
}

document.addEventListener('DOMContentLoaded', function() {
  labelDomElements();
  updateTotal();
  addEventListeners();
  if (mobileCheck()) {
    pricePerField.type = 'tel';
    quantityField.type = 'tel';
  }
}, false);

var labelDomElements = function() {
  window.nameField = document.getElementById('name');
  window.emailField = document.getElementById('email');
  window.phoneField = document.getElementById('phone');
  window.pricePerField = document.getElementById('admission-cost');
  window.quantityField = document.getElementById('admission-quantity');
  window.additional1 = document.getElementById('additional-1-section');
  window.additional2 = document.getElementById('additional-2-section');
  window.additional3 = document.getElementById('additional-3-section');
  window.additionalField1 = document.getElementById('additional_1');
  window.additionalField2 = document.getElementById('additional_2');
  window.additionalField3 = document.getElementById('additional_3');
  window.donationQuestion = document.getElementById('donation_question');
  window.donationSection = document.getElementById('donations');
  window.donationField = document.getElementById('donation');
  window.totalField = document.getElementById('total');
  window.totalField2 = document.getElementById('total-2');
  window.totalDonationField1 = document.getElementById('total-donation');
  window.totalDonationField2 = document.getElementById('total-donation-2');
  window.totalDetailsField = document.getElementById('total-details');
  window.totalDetailsField2 = document.getElementById('total-details-2');
  window.checkoutButton = document.getElementById('checkout');
  window.backButton = document.getElementById('back');
  window.paymentForm = document.getElementById('payment-form');
  window.paymentSection = document.getElementById('payment');
  window.warningField1 = document.getElementById('warning');
  window.warningField2 = document.getElementById('warning-2');
  window.inputs = document.querySelectorAll('.form-control');
};

var addEventListeners = function() {
  pricePerField.addEventListener('change', costUpdated, false);
  quantityField.addEventListener('change', quantityUpdated, false);
  quantityField.addEventListener('keyup', toggleAdditionals, false);
  donationQuestion.addEventListener('change', toggleDonations, false);
  donationField.addEventListener('change', DonationUpdated, false);
  checkoutButton.addEventListener('click', checkout, false);
  backButton.addEventListener('click', back, false);
  inputs.forEach(el => el.addEventListener('blur', event => {
    validateField(event.target);
  }));
};

var toggleAdditionals = function() {
  var quantity = parseInt(quantityField.value);
  if (isNaN(quantity) || quantity == 1) {
    hide(additional1);
    hide(additional2);
    hide(additional3);
  } else if (quantity == 2) {
    show(additional1);
    hide(additional2);
    hide(additional3);
  } else if (quantity == 3) {
    show(additional1);
    show(additional2);
    hide(additional3);
  } else if (quantity == 4) {
    show(additional1);
    show(additional2);
    show(additional3);
  }
};

var toggleDonations = function() {
  if (donationQuestion.value == 'Yes') {
    donationSection.classList.remove('d-none');
  } else {
    donationField.value = '0';
    donationSection.classList.add('d-none');
    updateTotal();
  }
};

var hide = function(el) {
  el.style.display = 'none';
  el.querySelector('input').value = '';
  el.querySelector('.warning').style.visibility = 'hidden';
}

var show = function(el) {
  el.style.display = 'block';
}

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

var DonationUpdated = function() {
  donationField.value = donationField.value.split('.')[0];
  var donation = parseInt(donationField.value);
  if (isNaN(donation) || donation < 0) {
    donationField.value = 0;
  }
  updateTotal();
};

var quantityUpdated = function() {
  quantityField.value = quantityField.value.split('.')[0];
  var quantity = parseInt(quantityField.value);
  if (isNaN(quantity) || quantity < 1) {
    quantityField.value = '1';
  } else if (quantity > quantity_max) {
    quantityField.value = quantity_max;
  }
  updateTotal();
  toggleAdditionals();
};

var updateTotal = function() {
  var pricePer = parseInt(pricePerField.value);
  var quantity = parseInt(quantityField.value);
  var donation = parseInt(donationField.value);
  var total = pricePer * quantity + donation;
  totalField.textContent = total;
  totalField2.textContent = total;
  if (quantity > 1) {
    totalDetailsField.textContent = quantity + ' admissions at $' + pricePer + ' each';
    totalDetailsField2.textContent = quantity + ' admissions at $' + pricePer + ' each';
  } else {
    totalDetailsField.textContent = '1 admission';
    totalDetailsField2.textContent = '1 admission';
  }
  if (donation > 0) {
    totalDonationField1.textContent = 'Additional donation: $' + donation;
    totalDonationField2.textContent = 'Additional donation: $' + donation;
  } else {
    totalDonationField1.textContent = 'No additonal donation';
    totalDonationField2.textContent = 'No additional donation';
  }
};

var checkout = function(e) {
  e.preventDefault();
  if (validateAllFields()) {
    paymentForm.classList.add('d-none');
    paymentSection.classList.remove('d-none');
  }
};

var validateField = function(el) {
  const warningField = el.parentElement.querySelector('.warning');
  el.value == '' ? warningField.style.visibility = 'visible' : warningField.style.visibility = 'hidden';
};

var validateAllFields = function() {
  inputs.forEach(el => validateField(el));
  return mainInputCompleted() && additionalFieldsCompleted();
};

var mainInputCompleted = function() {
  return nameField.value != '' && emailField.value != '' && phoneField.value != '';
}

var additionalFieldsCompleted = function() {
  const quantity = parseInt(quantityField.value);
  if (quantity == 4) {
    return additionalField1.value != '' && additionalField2.value != '' && additionalField3.value != '';
  } else if (quantity == 3) {
    return additionalField1.value != '' && additionalField2.value != '';
  } else if (quantity == 2) {
    return additionalField1.value != ''
  } else {
    return true;
  }
};

var back = function() {
  paymentSection.classList.add('d-none');
  paymentForm.classList.remove('d-none');
};

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
