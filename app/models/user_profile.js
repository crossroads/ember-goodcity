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

  // permission:  DS.belongsTo('permission', { async: false }),
  userRoles: DS.hasMany('userRoles', { async: false }),

  roles: Ember.computed('userRoles.[]', function(){
    var roles = []
    this.get('userRoles').forEach(userRole => {
      roles.push(userRole.get('role'));
    });
    return roles;
  }),

  roleNames: Ember.computed('roles', function(){
    var roleNames = [];
    this.get('roles').forEach(role => {
      roleNames.push(role.get('name'));
    });
    return roleNames;
  }),

  permissionNames: Ember.computed('roles', function(){
    var permissionNames = []
    this.get('roles').forEach(role => {
      role.get('rolePermissions').forEach(rolePermision => {
        permissionNames.push(rolePermision.get('permission.name'));
      });
    });
    return permissionNames;
  }),

  // permissionNames

  isReviewer: Ember.computed('roleNames', function(){
    return this.get('roleNames').includes('Reviewer');
  }),

  isSupervisor: Ember.computed('roleNames', function(){
    return this.get('roleNames').includes('Supervisor');
  }),

  canManageUsers: Ember.computed('permissionNames', function(){
    return this.get('permissionNames').includes('can_manage_users');
  }),

  canManageHolidays: Ember.computed('permissionNames', function(){
    return this.get('permissionNames').includes('can_manage_holidays');
  }),

  isDonor: Ember.computed.empty('roleNames'),
  // isDonor: Ember.computed.empty("permission.name"),
  isStaff: Ember.computed.notEmpty("permission.name"),
  // isReviewer: Ember.computed.equal("permission.name", "Reviewer"),
  // isSupervisor: Ember.computed.equal("permission.name", "Supervisor"),

  mobileWithCountryCode: Ember.computed('mobile', function(){
    return this.get('mobile') ? ("+852" + this.get('mobile')) : "";
  }),

  fullName: Ember.computed('firstName', 'lastName', function(){
    return (this.get('firstName') + " " + this.get('lastName'));
  })
});
