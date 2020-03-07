'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var typeFilter = filterForm.querySelector('#housing-type');
  var priceFilter = filterForm.querySelector('#housing-price');
  var roomsFilter = filterForm.querySelector('#housing-rooms');
  var guestsFilter = filterForm.querySelector('#housing-guests');

  var featuresField = filterForm.querySelector('#housing-features');
  var wifiFilter = featuresField.querySelector('#filter-wifi');
  var dishwasherFilter = featuresField.querySelector('#filter-dishwasher');
  var parkingFilter = featuresField.querySelector('#filter-parking');
  var washerFilter = featuresField.querySelector('#filter-washer');
  var elevatorFilter = featuresField.querySelector('#filter-elevator');
  var conditionerFilter = featuresField.querySelector('#filter-conditioner');

  var isFeaturesMatched = function (arr, filterValue) {
    var reply = false;

    arr.forEach(function (element) {
      if (element === filterValue) {
        reply = true;
      }
    });

    return reply;
  };

  var filter = function (arr) {
    var filteredArray = arr;

    if (typeFilter.value !== 'any') {
      filteredArray = filteredArray.filter(function (element) {
        return element.offer.type === typeFilter.value;
      });
    }

    if (priceFilter.value === 'low') {
      filteredArray = filteredArray.filter(function (element) {
        return element.offer.price < 10000;
      });
    } else if (priceFilter.value === 'middle') {
      filteredArray = filteredArray.filter(function (element) {
        return element.offer.price >= 10000 && element.offer.price < 50000;
      });
    } else if (priceFilter.value === 'high') {
      filteredArray = filteredArray.filter(function (element) {
        return element.offer.price >= 50000;
      });
    }

    if (roomsFilter.value !== 'any') {
      filteredArray = filteredArray.filter(function (element) {
        return Number(element.offer.rooms) === Number(roomsFilter.value);
      });
    }

    if (guestsFilter.value !== 'any') {
      filteredArray = filteredArray.filter(function (element) {
        return Number(element.offer.capacity) === Number(guestsFilter.value);
      });
    }

    if (wifiFilter.checked) {
      filteredArray = filteredArray.filter(function (element) {
        return isFeaturesMatched(element.offer.features, wifiFilter.value);
      });
    }

    if (dishwasherFilter.checked) {
      filteredArray = filteredArray.filter(function (element) {
        return isFeaturesMatched(element.offer.features, dishwasherFilter.value);
      });
    }

    if (parkingFilter.checked) {
      filteredArray = filteredArray.filter(function (element) {
        return isFeaturesMatched(element.offer.features, parkingFilter.value);
      });
    }

    if (washerFilter.checked) {
      filteredArray = filteredArray.filter(function (element) {
        return isFeaturesMatched(element.offer.features, washerFilter.value);
      });
    }

    if (elevatorFilter.checked) {
      filteredArray = filteredArray.filter(function (element) {
        return isFeaturesMatched(element.offer.features, elevatorFilter.value);
      });
    }

    if (conditionerFilter.checked) {
      filteredArray = filteredArray.filter(function (element) {
        return isFeaturesMatched(element.offer.features, conditionerFilter.value);
      });
    }

    return filteredArray;
  };

  filterForm.addEventListener('change', function () {
    window.card.close();
    window.pin.delete();
    window.pin.show();
  });

  window.filter = {
    check: filter
  };
})();
