import { attr, belongsTo, hasMany } from "@ember-data/model";
import { equal } from "@ember/object/computed";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import Addressable from "./addressable";

export default Addressable.extend({
  firstName: attr("string"),
  lastName: attr("string"),
  mobile: attr("string"),
  createdAt: attr("date"),
  userRoleIds: attr(""),
  email: attr(""),
  receiveEmail: attr(""),
  otherPhone: attr(""),
  title: attr(""),

  lastConnected: attr("date"),
  lastDisconnected: attr("date"),

  image: belongsTo("image", { async: false }),
  permission: belongsTo("permission", { async: true }),
  reviewedOffers: hasMany("offers", { inverse: "reviewedBy", async: false }),
  donations: hasMany("offers", { inverse: "createdBy", async: false }),
  printerId: attr("number"),
  printer: belongsTo("printer", { async: false }),

  userRoles: hasMany("userRoles", { async: false }),

  roles: computed("userRoles.[]", function () {
    var roles = [];
    this.get("userRoles").forEach((userRole) => {
      roles.push(userRole.get("role"));
    });
    return roles;
  }),

  roleIds: computed("userRoles.[]", function () {
    return this.get("userRoles").getEach("roleId");
  }),

  i18n: service(),

  isSupervisor: equal("permission.name", "Supervisor"),

  nameInitial: computed("firstName", function () {
    return this.get("firstName").charAt(0).capitalize();
  }),

  roleInitials: computed("permission", function () {
    var permission = this.get("permission.name") || "Donor";
    return "(" + permission.capitalize().charAt(0) + ")";
  }),

  displayImageUrl: computed("image", function () {
    return (
      this.get("image.thumbImageUrl") || "assets/images/default_user_image.jpg"
    );
  }),

  hasImage: computed("image", {
    get: function () {
      return this.get("image.thumbImageUrl");
    },
    set: function (key, value) {
      return value;
    },
  }),

  fullName: computed("firstName", "lastName", function () {
    return this.get("firstName") + " " + this.get("lastName");
  }),

  onlineStatus: computed("lastConnected", "lastDisconnected", function () {
    if (!this.get("lastConnected") && !this.get("lastDisconnected")) {
      return this.get("i18n").t("not_connected");
    } else if (this.get("lastDisconnected") > this.get("lastConnected")) {
      return false;
    } else if (this.get("lastDisconnected") < this.get("lastConnected")) {
      return this.get("i18n").t("online");
    }
  }),
});
