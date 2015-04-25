/* jshint esnext: true */
  
'use strict';

class LotteryManager {
  constructor(data) {
    this.data = data;
  }
}

(function() {
  var doc = document.currentScript.ownerDocument;
  var lotteryPrototype = Object.create(HTMLElement.prototype);

  lotteryPrototype.createdCallback = function() {
    var template = doc.querySelector('#lottery-template');
    var usr = template.content.cloneNode(true);
    this.shadow = this.createShadowRoot();
    this.shadow.appendChild(usr);
  };

  lotteryPrototype.attachedCallback = function() {
    fetch('http://apis.is/lottery')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        var instance = json.results[0];
        this.shadow.querySelector('.numbers').textContent = instance.lotto;
        this.shadow.querySelector('.link').setAttribute('href', instance.link);
        this.shadow.querySelector('.date').textContent = instance.date;
      }.bind(this)).catch(function(ex) {
        this.shadow.querySelector('.error').textContent = 'Something went wrong';
      }.bind(this));
  };

  // Register our newly created lottery element.
  var lottery = doc.registerElement(
    'lottery-display', {'prototype': lotteryPrototype}
  );
})();
