define(['jasmine', 'publisher'], function(jasmine, Publisher) {
  "use strict";
  describe("Test trigger() subscriber list size => ", function() {
    it("On (cnk_on) subscribers list is empty.", function() {
      var o, publisher_;
      o = {
        name: 'Bogdan',
        surname: 'Volosincu',
        language: 'JavaScript'
      };
      publisher_ = new Publisher(o);
      expect(Object.keys(publisher_.trigger()).length).toEqual(0);
    });
  });
});
