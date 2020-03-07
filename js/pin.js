'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElements = [];

  var successHandler = function (rentObjects) {
    var filteredObjects = window.filter.check(rentObjects);

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < filteredObjects.length; i++) {
      var rentObject = filteredObjects[i];
      var pinElement = pinTemplate.cloneNode(true);
      var pinImage = pinElement.querySelector('img');

      pinElement.style = 'left: ' + (rentObject.location.x - 50) + 'px; top:' + (rentObject.location.y - 70) + 'px;';
      pinImage.src = rentObject.author.avatar;
      pinImage.alt = rentObject.offer.title;

      pinElement.addEventListener('click', window.card.show(rentObject));

      pinElements.push(pinElement);
      if (fragment.children.length < window.data.MAX_PINS_QUANTITY) {
        fragment.appendChild(pinElement);
      }
    }

    mapPins.appendChild(fragment);
  };

  var showPins = function () {
    window.backend.load(successHandler, window.message.error);
  };

  var deletePins = function () {
    pinElements.forEach(function (pinElement) {
      pinElement.remove();
    });
  };

  window.pin = {
    show: showPins,
    delete: deletePins
  };
})();
