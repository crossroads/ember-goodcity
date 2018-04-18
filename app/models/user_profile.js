import Ember from 'ember';
import DS from 'ember-data';
import Addressable from './addressable';

var attr = DS.attr;

export default Addressable.extend({
  firstName:   attr('string'),
  lastName:    attr('string'),
  mobile:      attr('string'),
  donationAmount: attr('string'),
  donationDate: attr('date'),

  userRoles: DS.hasMany('userRoles', { async: false }),

  roles: Ember.computed('userRoles.[]', function(){
    var roles = []
    if(this.get('userRoles.length')){
      this.get('userRoles').forEach(userRole => {
        roles.push(userRole.get('role'));
      });
      return roles;
    }
  }),

  roleNames: Ember.computed('roles', function(){
    if(this.get('roles.length')){
      return this.get('roles').getEach('name');
    }
  }),

  permissionNames: Ember.computed('roles', function(){
    var permissionNames = []
    if(this.get('roles.length')){
      this.get('roles').forEach(role => {
        role.get('rolePermissions').forEach(rolePermision => {
          permissionNames.push(rolePermision.get('permission.name'));
        });
      });
      return permissionNames;
    }
  }),

  isReviewer: Ember.computed('roleNames', function(){
    if(this.get('permissionNames.length')){
      return this.get('roleNames').indexOf('Reviewer') >= 0;
    }
  }),

  isSupervisor: Ember.computed('roleNames', function(){
    if(this.get('permissionNames.length')){
      return this.get('roleNames').indexOf('Supervisor') >= 0;
    }
  }),

  canManageUsers: Ember.computed('permissionNames', function(){
    if(this.get('permissionNames.length')){
      return this.get('permissionNames').indexOf('can_manage_users') >= 0;
    }
  }),

  canManageHolidays: Ember.computed('permissionNames', function(){
    if(this.get('permissionNames.length')){
      return this.get('permissionNames').indexOf('can_manage_holidays') >= 0;
    }
  }),

  isDonor: Ember.computed.empty('roleNames'),
  // isDonor: Ember.computed.empty("permission.name"),
  // isStaff: Ember.computed.notEmpty("permission.name"),
  // isReviewer: Ember.computed.equal("permission.name", "Reviewer"),
  // isSupervisor: Ember.computed.equal("permission.name", "Supervisor"),

  mobileWithCountryCode: Ember.computed('mobile', function(){
    return this.get('mobile') ? ("+852" + this.get('mobile')) : "";
  }),

  fullName: Ember.computed('firstName', 'lastName', function(){
    return (this.get('firstName') + " " + this.get('lastName'));
  })
});

