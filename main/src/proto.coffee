###
  autor Volosincu Bogdan
###



((context, factory)->


  if typeof define == 'function' and define.amd
    define ['exports'], (exports)->
      context.Proto = factory context, exports
      return context.Proto
    return
  else if typeof exports != 'undefined'
    factory context, exports
    return
  else
    context.Proto = factory context, {}
    return

)(this, (context, Proto)->

  class Proto

    cbk_on = {}

    # callbacks attached to property,
    # this callbacks execute automatically when the property is called
    cbk_attached  = {}

    isFunction = (o) ->
      return typeof o is 'function'

    # creating a new object of proxyUtil with a _key_ will
    # break the closure of the original key pass to this constructor
    routekey = (_key_)->
      free_key = _key_;
      return o =
          route: ()->
            result = {}
            for k, i in cbk_attached[free_key]
              if k isnt undefined
                if i is 0
                  result = k.apply Proto.prototype, arguments
                else
                  k.apply Proto.prototype
            return result
      return


    constructor: (object) ->
      for key, value of object
        if isFunction value
          proxi = new routekey(key);
          Proto.prototype[key] = proxi.route
          cbk_attached[key] = [value]
        else
          Proto.prototype[key] = value


    # attach to property X the callback with priority 1..
    attachTo: (prop, theFunc, withPriority) ->
      if arguments[3] is undefined
        withPriority = cbk_attached[prop].length++

      if cbk_attached[prop][withPriority] is undefined  or cbk_attached[prop][withPriority] is null
        cbk_attached[prop][withPriority] = theFunc
      else
        Array.prototype.splice.call cbk_attached[prop], withPriority, 0, theFunc
      return

    on : (cbk_name,  cbk) ->
      cbk_on[cbk_name] = cbk
      return

    trigger : (context, cbk_name, params) ->
      rez = {}
      if typeof context is "string"
        params = cbk_name
        cbk_name = context
        context = Proto.prototype

        console.log typeof(params)
        if typeof(params) is 'array'
          rez = cbk_on[cbk_name].apply context, params
        else
          rez = cbk_on[cbk_name].call context, params
      else if arguments.length == 3
        console.log typeof(params)
        if typeof(params) is 'array'
          rez = cbk_on[cbk_name].apply context, params
        else
          rez = cbk_on[cbk_name].call context, params
      else
        rez = cbk_on

      return rez

  return Proto


)








