define(['jasmine', 'cpubsub'], function(jasmine, cpubsub) {
  "use strict";
  describe("(trigger-spec.coffee) Test trigger() subscriber list size => ", function() {
    it("On (cnk_on) subscribers list is empty.", function() {
      var o, pubsub_;
      o = {
        name: 'Bogdan',
        surname: 'Volosincu',
        language: 'JavaScript'
      };
      pubsub_ = cpubsub.createChannel(o);
      expect(Object.keys(pubsub_.trigger()).length).toEqual(0);
    });
  });
});
