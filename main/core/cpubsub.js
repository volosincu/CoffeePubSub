
/*
  autor Volosincu Bogdan
 */
(function(context, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      context.cpubsub = factory(context, exports);
      return context.cpubsub;
    });
  } else if (typeof exports !== 'undefined') {
    factory(context, exports);
  } else {
    context.cpubsub = factory(context, {});
  }
})(this, function(context, cpubsub) {
  cpubsub = function(object) {
    var _self, cbk_attached, cbk_on, isFunction, key, proxi, routekey, value;
    _self = Object.create(this);
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
          var i, j, k, len, ref, result;
          result = {};
          ref = cbk_attached[free_key];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            k = ref[i];
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
    _self.__proto__.attachTo = function(prop, theFunc, withPriority) {
      if (arguments[2] === void 0) {
        withPriority = cbk_attached[prop].length++;
      }
      if (cbk_attached[prop][withPriority] === void 0 || cbk_attached[prop][withPriority] === null) {
        cbk_attached[prop][withPriority] = theFunc;
      } else {
        Array.prototype.splice.call(cbk_attached[prop], withPriority, 0, theFunc);
      }
    };
    _self.__proto__.on = function(cbk_name, cbk) {
      cbk_on[cbk_name] = cbk;
    };
    _self.__proto__.trigger = function(context, cbk_name, params) {
      var rez;
      rez = {};
      if (typeof context === "string") {
        params = cbk_name;
        cbk_name = context;
        context = _self;
        if (Object.prototype.toString.call(params) === '[object Array]') {
          rez = cbk_on[cbk_name].apply(context, params);
        } else {
          rez = cbk_on[cbk_name].call(context, params);
        }
      } else if (arguments.length === 3) {
        if (Object.prototype.toString.call(params) === '[object Array]') {
          rez = cbk_on[cbk_name].apply(context, params);
        } else {
          rez = cbk_on[cbk_name].call(context, params);
        }
      } else {
        rez = cbk_on;
      }
      return rez;
    };
    _self.__proto__.off = function(event) {
      var removed;
      removed = false;
      if ((Object.keys(cbk_on).indexOf(event)) > -1) {
        removed = delete cbk_on[event];
      }
      return removed;
    };
    return _self;
  };
  return cpubsub;
});