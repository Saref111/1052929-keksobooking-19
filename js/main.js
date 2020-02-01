'use strict';

var rentObjects = [];
var rentObjectType = ['palace', 'flat', 'house', 'bungalo'];
var rentObjectCheckTime = ['12:00', '13:00', '14:00'];
var rentObjectFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

map.classList.remove('map--faded');

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getRentObjects = function () {
  for (var i = 0; i < 8; i++) {
    rentObjects[i] = {};

    rentObjects[i].author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };

    var currentObjectFeatures = [];
    for (var j = 0; j < rentObjectFeatures.length; j++) {
      var sendIndex = getRandomInt(2);

      if (sendIndex === 1) {
        currentObjectFeatures.push(rentObjectFeatures[j]);
      }
    }

    if (currentObjectFeatures.length === 0) {
      currentObjectFeatures.push(rentObjectFeatures[getRandomInt(6) + 1]);
    }

    var currentObjectPhotos = [];
    for (var k = 0; k < getRandomInt(5) + 1; k++) {
      currentObjectPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + (k + 1) + '.jpg');
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
    };

    rentObjects[i].location = {
      x: getRandomInt(map.offsetWidth + 1),
      y: getRandomInt(map.offsetHeight + 1)
    };

  }
};

getRentObjects();

for (var i = 0; i < rentObjects.length; i++) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (rentObjects[i].location.x - 40) + 'px; top:' + (rentObjects[i].location.y - 40) + 'px;';
  mapPins.appendChild(pinElement);
}
