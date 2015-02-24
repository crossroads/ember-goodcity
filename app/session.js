import Ember from 'ember';
import './computed/local-storage';

export default Ember.Object.extend({
  authToken: Ember.computed.localStorage(),
  otpAuthKey: Ember.computed.localStorage(),
  language: Ember.computed.localStorage(),

  currentUser: function() {
    var store = this.container.lookup('store:main');
    return store.all('user_profile').get('firstObject') || null;
  }.property().volatile(),

  clear: function() {
    this.set("authToken", null);
    this.set("otpAuthKey", null);
  }
});
