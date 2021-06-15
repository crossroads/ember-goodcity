import DS from "ember-data";
import { equal } from "@ember/object/computed";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import Addressable from "./addressable";

export default Addressable.extend({
  firstName: DS.attr("string"),
  lastName: DS.attr("string"),
  mobile: DS.attr("string"),
  createdAt: DS.attr("date"),
  userRoleIds: DS.attr(""),
  email: DS.attr(""),
  receiveEmail: DS.attr(""),
  otherPhone: DS.attr(""),
  title: DS.attr(""),

  lastConnected: DS.attr("date"),
  lastDisconnected: DS.attr("date"),

  image: DS.belongsTo("image", { async: false }),
  permission: DS.belongsTo("permission", { async: true }),
  reviewedOffers: DS.hasMany("offers", { inverse: "reviewedBy", async: false }),
  donations: DS.hasMany("offers", { inverse: "createdBy", async: false }),
  printerId: DS.attr("number"),
  printer: DS.belongsTo("printer", { async: false }),

  userRoles: DS.hasMany("userRoles", { async: false }),

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
