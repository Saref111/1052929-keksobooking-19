'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersElements = mapFilters.childNodes;

  var showMap = function () {
    window.pin.show();

    form.classList.remove('ad-form--disabled');
    window.util.enableElements(formFieldsets);

    window.util.enableElements(mapFiltersElements);

    map.classList.remove('map--faded');
    mainPin.removeEventListener('mousedown', showMapHandler);
  };

  var showMapHandler = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      showMap();

      window.form.setHandlers();
    }
  };

  var getInitialState = function () {
    window.util.disableElements(formFieldsets);
    window.util.disableElements(mapFiltersElements);

    mainPin.addEventListener('mousedown', showMapHandler);
    mainPin.addEventListener('keydown', showMapHandler);
  };

  window.map = {
    getInitialState: getInitialState
  };

})();
