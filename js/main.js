'use strict';

var rentObjects = [];
var rentObjectType = ['palace', 'flat', 'house', 'bungalo'];
var rentObjectCheckTime = ['12:00', '13:00', '14:00'];
var rentObjectFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var map = document.querySelector('.map');

map.classList.remove('map--faded');

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var getRentObjects = function () {
  for (var i = 0; i < 8; i++) {
    rentObjects[i] = {};

    rentObjects[i].author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    }

    var currentObjectFeatures = [];
    for (var j = 0; j < rentObjectFeatures.length; j++) {
      var sendIndex = getRandomInt(2);

      if (sendIndex === 1) {
        currentObjectFeatures.push(rentObjectFeatures[j]);
      }
    }

    if (currentObjectFeatures.length === 0) {
      currentObjectFeatures.push(rentObjectFeatures[getRandomInt(6) + 1])
    }

    var currentObjectPhotos = [];
    for (var j = 0; j < getRandomInt(5) + 1; j++) {
      currentObjectPhotos.push('http://o0.github.io/assets/images/tokyo/hotel'+ (j + 1) +'.jpg');
    }

    rentObjects[i].offer = {
      title: 'Apartment #' + (i + 1),
      address: ((i + 1) * 100) + ', ' + ((i + 1) * 50),
      price: Math.floor(10000 / (i + 1)),
      type: rentObjectType[Math.floor(Math.random() * rentObjectType.length)],
      rooms: Math.floor(Math.random() * 10) + 1,
      guests: Math.floor(Math.random() * 5) + 1,
      checkin: rentObjectCheckTime[Math.floor(Math.random() * rentObjectType.length)],
      checkout: rentObjectCheckTime[Math.floor(Math.random() * rentObjectType.length)],
      features: currentObjectFeatures,
      description: 'Very good place',
      photos: currentObjectPhotos
    }

    rentObjects[i].location = {
      x: getRandomInt(map.offsetWidth + 1),
      y: getRandomInt(map.offsetHeight + 1)
    }

  }
};

getRentObjects();
