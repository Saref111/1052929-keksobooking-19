'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersElements = mapFilters.childNodes;
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var addressInput = form.querySelector('#address');
  var mainPinDefaultCoordinates = null;

  var getMainPinDefaultCoordinates = function () {
    mainPinDefaultCoordinates = {
      x: mainPin.style.left,
      y: mainPin.style.top
    };
  };

  var setMainPinDefaultCoordinates = function () {
    mainPin.style.left = mainPinDefaultCoordinates.x;
    mainPin.style.top = mainPinDefaultCoordinates.y;
  };


  var pinMoveHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';


      if (mainPin.offsetLeft > map.offsetWidth - mainPin.offsetWidth) {
        mainPin.style.left = (map.offsetWidth - mainPin.offsetWidth) + 'px';
      } else if (mainPin.offsetTop > map.offsetHeight - mainPin.offsetHeight) {
        mainPin.style.top = (map.offsetHeight - mainPin.offsetHeight) + 'px';
      } else if (mainPin.offsetTop < map.offsetTop) {
        mainPin.style.top = map.offsetTop + 'px';
      } else if (mainPin.offsetLeft < map.offsetTop) {
        mainPin.style.left = map.offsetTop + 'px';
      }
    };

    var mouseUpHandler = function (evtUp) {
      evtUp.preventDefault();

      addressInput.value = window.util.getAddress(mainPin);

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var successHandler = function (data) {
    window.data.cacheRentObjects = data;
    var filteredData = window.filter.advertisement(data);

    window.pin.render(filteredData);
    window.util.enableElements(mapFiltersElements);
    mapFiltersContainer.classList.remove('hidden');
  };

  var showMap = function () {
    window.backend.load(successHandler, window.message.error);

    form.classList.remove('ad-form--disabled');
    window.util.enableElements(formFieldsets);


    map.classList.remove('map--faded');
    mainPin.removeEventListener('mousedown', showMapHandler);
    mainPin.removeEventListener('keydown', showMapHandler);
  };

  var showMapHandler = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      showMap();

      window.form.setHandlers();
    }
  };

  var getInitialState = function () {
    mainPin.removeEventListener('mousedown', pinMoveHandler);
    setMainPinDefaultCoordinates();
    window.util.disableElements(formFieldsets);
    window.util.disableElements(mapFiltersElements);
    form.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    mapFiltersContainer.classList.add('hidden');

    mainPin.addEventListener('mousedown', showMapHandler);
    mainPin.addEventListener('keydown', showMapHandler);
    mainPin.addEventListener('mousedown', pinMoveHandler);
  };

  window.map = {
    getInitialState: getInitialState,
    getMainPinDefaultCoordinates: getMainPinDefaultCoordinates
  };

})();
