define([], function() {
  "use strict";
  if (Object.prototype.keys === void 0) {
    Object.prototype.keys = function(o) {
      var keys, prop;
      keys = (function() {
        var results;
        results = [];
        for (prop in o) {
          if (o.hasOwnProperty(prop)) {
            results.push(prop);
          }
        }
        return results;
      })();
      return keys;
    };
  }
  if ([].indexOf === void 0) {
    Array.prototype.indexOf = function(element, fromIndex) {
      var el, i, index;
      if (fromIndex === void 0) {
        fromIndex = 0;
      }
      index = -1;
      if (this.length > 0) {
        for (i in this) {
          el = this[i];
          if (el === element) {
            index = i;
          }
        }
      }
      return index;
    };
  }
});
