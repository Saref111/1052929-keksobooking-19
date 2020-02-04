'use strict';

var rentObjectType = ['palace', 'flat', 'house', 'bungalo'];
var rentObjectCheckTime = ['12:00', '13:00', '14:00'];
var rentObjectFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var ROOMS = 10;

map.classList.remove('map--faded');

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getCurrentObjectFeatures = function (rentObjectFeatures) {
  var currentObjectFeatures = [];

  for (var i = 0; i < rentObjectFeatures.length; i++) {
    var sendIndex = getRandomInt(2);

    if (sendIndex === 1) {
      currentObjectFeatures.push(rentObjectFeatures[i]);
    }
  }

  if (currentObjectFeatures.length === 0) {
    currentObjectFeatures.push(rentObjectFeatures[4]); // Почему тут 6 рандомная цифра? Или может быть любая другая? Посталю пока 4, ведь длина массива - уже равно 6
  }

  return currentObjectFeatures;
}

var getCurrentObjectPhotos = function (count) {
  var currentObjectPhotos = [];

  for (var k = 0; k < getRandomInt(count) + 1; k++) {
    currentObjectPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + (k + 1) + '.jpg');
  }

  return currentObjectPhotos;
}

var getRentObjects = function () {
  var rentObjects = [];

  for (var i = 0; i < 8; i++) {
    rentObjects[i] = {};

    rentObjects[i].author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };

    rentObjects[i].offer = {
      title: 'Apartment #' + (i + 1),
      address: ((i + 1) * 100) + ', ' + ((i + 1) * 50),
      price: Math.floor(10000 / (i + 1)),
      type: rentObjectType[getRandomInt(rentObjectType.length)],
      rooms: getRandomInt(ROOMS) + 1,
      guests: getRandomInt(5) + 1,
      checkin: rentObjectCheckTime[getRandomInt(rentObjectCheckTime.length)],
      checkout: rentObjectCheckTime[getRandomInt(rentObjectCheckTime.length)],
      features: getCurrentObjectFeatures(rentObjectFeatures),
      description: 'Very good place',
      photos: getCurrentObjectPhotos(5)
    };

    rentObjects[i].location = {
      x: getRandomInt(map.offsetWidth + 1),
      y: getRandomInt(map.offsetHeight + 1)
    };

  }

  return rentObjects;
};

var showPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < rentObjects.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.style = 'left: ' + (rentObjects[i].location.x - 50) + 'px; top:' + (rentObjects[i].location.y - 70) + 'px;';
    pinImage.src = rentObjects[i].author.avatar;
    pinImage.alt = rentObjects[i].offer.title;
    fragment.appendChild(pinElement);
  }

  mapPins.appendChild(fragment);
};

getRentObjects();
showPins();
