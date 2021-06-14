import $ from "jquery";
import { inject as controller } from "@ember/controller";
import { getOwner } from "@ember/application";
import addressDetails from "./address_details";
import AjaxPromise from "./../../utils/ajax-promise";

export default addressDetails.extend({
  deliveryController: controller("delivery"),

  actions: {
    saveContactDetails() {
      var controller = this;
      var addressProperties = this.getProperties("street", "flat", "building");
      addressProperties.districtId = this.selectedDistrict;
      addressProperties.addressType = "collection";

      var contactProperties = {};
      contactProperties.name = $("#userName").val();
      contactProperties.mobile = "+852" + $("#mobile").val();

      var deliveryId = this.get("deliveryController.model.id");
      var delivery = this.store.peekRecord("delivery", deliveryId);
      var offer = delivery.get("offer");
      var schedule = delivery.get("schedule");

      var loadingView = getOwner(this).lookup("component:loading").append();

      contactProperties.addressAttributes = addressProperties;

      var properties = {
        delivery: {
          id: delivery.id,
          deliveryType: delivery.get("deliveryType"),
          offerId: offer.id,
          scheduleAttributes: schedule._attributes,
          contactAttributes: contactProperties,
        },
      };

      new AjaxPromise(
        "/confirm_delivery",
        "POST",
        controller.get("session.authToken"),
        properties
      )
        .then(function (data) {
          controller.store.pushPayload(data);
          controller.set("inProgress", false);
          loadingView.destroy();

          controller
            .transitionToRoute("delivery.thank_offer")
            .then((newRoute) =>
              newRoute.controller.set("contact", delivery.get("contact"))
            );
        })
        .catch((error) => {
          loadingView.destroy();
          throw error;
        });
    },
  },
});
