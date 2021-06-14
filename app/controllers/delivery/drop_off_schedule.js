import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import Controller from "@ember/controller";
import { getOwner } from "@ember/application";
import AjaxPromise from "./../../utils/ajax-promise";
import { translationMacro as t } from "ember-i18n";

export default Controller.extend({
  selectedId: null,
  selectedDate: null,
  datePrompt: t("gogovan.book_van.date"),
  timePrompt: t("gogovan.book_van.time"),
  i18n: service(),

  slots: computed("timeslot.[]", function () {
    return this.store.peekAll("timeslot").sortBy("name");
  }),

  available_dates: computed("available_dates.[]", {
    get: function () {
      new AjaxPromise(
        "/available_dates",
        "GET",
        this.get("session.authToken"),
        { schedule_days: 40 }
      ).then((data) => this.set("available_dates", data));
    },
    set: function (key, value) {
      return value;
    },
  }),

  actions: {
    bookSchedule() {
      var controller = this;
      var loadingView = getOwner(this).lookup("component:loading").append();
      var selectedSlot = controller.get("selectedId");
      var slotName = controller
        .get("slots")
        .filterBy("id", selectedSlot.get("id"))
        .get("firstObject.name");

      var scheduleProperties = {
        slot: selectedSlot.id,
        scheduledAt: controller.get("selectedDate"),
        slotName: slotName,
      };

      var deliveryId = this.get("model.id");
      var delivery = this.get("store").peekRecord("delivery", deliveryId);
      var offer = delivery.get("offer");

      var properties = {
        delivery: {
          id: deliveryId,
          deliveryType: "Drop Off",
          offerId: offer.id,
          scheduleAttributes: scheduleProperties,
        },
      };

      new AjaxPromise(
        "/confirm_delivery",
        "POST",
        this.get("session.authToken"),
        properties
      )
        .then(function (data) {
          controller.store.pushPayload(data);
          controller.set("inProgress", false);
          offer.set("state", "scheduled");
          loadingView.destroy();
          if (controller.get("session.isAdminApp")) {
            controller.transitionToRoute("review_offer.logistics", offer);
          } else {
            controller.transitionToRoute("offer.transport_details", offer);
          }
        })
        .catch((error) => {
          loadingView.destroy();
          throw error;
        });
    },
  },
});
