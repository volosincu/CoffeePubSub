// Generated by CoffeeScript 1.7.1

/*
  autor Volosincu Bogdan
 */
(function(context, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      context.Publisher = factory(context, exports);
      return context.Publisher;
    });
  } else if (typeof exports !== 'undefined') {
    factory(context, exports);
  } else {
    context.Publisher = factory(context, {});
  }
})(this, function(context, Publisher) {
  Publisher = function(object) {
    var cbk_attached, cbk_on, isFunction, key, proxi, routekey, value, _self;
    _self = this;
    _self.prototype = {};
    cbk_on = {};
    cbk_attached = {};
    isFunction = function(o) {
      return typeof o === 'function';
    };
    routekey = function(_key_) {
      var free_key, o;
      free_key = _key_;
      return o = {
        route: function() {
          var i, k, result, _i, _len, _ref;
          result = {};
          _ref = cbk_attached[free_key];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            k = _ref[i];
            if (k !== void 0) {
              if (i === 0) {
                result = k.apply(_self, arguments);
              } else {
                k.apply(_self);
              }
            }
          }
          return result;
        }
      };
    };
    for (key in object) {
      value = object[key];
      if (isFunction(value)) {
        proxi = new routekey(key);
        _self[key] = proxi.route;
        cbk_attached[key] = [value];
      } else {
        _self[key] = value;
      }
    }
    _self.constructor.prototype.attachTo = function(prop, theFunc, withPriority) {
      if (arguments[2] === void 0) {
        withPriority = cbk_attached[prop].length++;
      }
      if (cbk_attached[prop][withPriority] === void 0 || cbk_attached[prop][withPriority] === null) {
        cbk_attached[prop][withPriority] = theFunc;
      } else {
        Array.prototype.splice.call(cbk_attached[prop], withPriority, 0, theFunc);
      }
    };
    _self.constructor.prototype.on = function(cbk_name, cbk) {
      cbk_on[cbk_name] = cbk;
    };
    _self.constructor.prototype.trigger = function(context, cbk_name, params) {
      var rez;
      rez = {};
      if (typeof context === "string") {
        params = cbk_name;
        cbk_name = context;
        context = _self;
        if (typeof params === 'array') {
          rez = cbk_on[cbk_name].apply(context, params);
        } else {
          rez = cbk_on[cbk_name].call(context, params);
        }
      } else if (arguments.length === 3) {
        if (typeof params === 'array') {
          rez = cbk_on[cbk_name].apply(context, params);
        } else {
          rez = cbk_on[cbk_name].call(context, params);
        }
      } else {
        rez = cbk_on;
      }
      return rez;
    };
    return _self;
  };
  return Publisher;
});
