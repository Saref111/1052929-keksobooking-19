'use strict';

(function () {
  var disableElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].nodeName !== '#text') {
        arr[i].setAttribute('disabled', true);
      }
    }
  };

  var enableElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].nodeName !== '#text') {
        arr[i].removeAttribute('disabled');
      }
    }
  };

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  var getRandomSlicedArray = function (arr) {
    return arr.slice(0, getRandomInt(arr.length) + 1);
  };

  window.util = {
    disableElements: disableElements,
    enableElements: enableElements,
    getRandomInt: getRandomInt,
    getRandomSlicedArray: getRandomSlicedArray
  };
})();
