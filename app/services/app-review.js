import Ember from "ember";
import config from '../config/environment';

export default Ember.Service.extend({
  isMobileApp: config.cordova.enabled,
  cordova: Ember.inject.service(),
  i18n: Ember.inject.service(),

  promptReviewModal() {
    var _this = this;
    var i18n = _this.get("i18n");
    if(this.get("isMobileApp")) {
      AppRate.preferences = {
        displayAppName: config.APP.REVIEW_APP_NAME,
        usesUntilPrompt: 1,
        promptAgainForEachNewVersion: true,
        inAppReview: true,
        storeAppURL: {
          ios: config.APP.APPLE_APP_ID,
          android: config.APP.ANDROID_APP_URL,
        },
        customLocale: {
          title: i18n.t("app_review.title"),
          message: i18n.t("app_review.message"),
          cancelButtonLabel: i18n.t("app_review.cancel_button_label"),
          laterButtonLabel: i18n.t("app_review.later_button_label"),
          rateButtonLabel: i18n.t("app_review.rate_button_label"),
          yesButtonLabel: i18n.t("app_review.yes_button_label"),
          noButtonLabel: i18n.t("app_review.no_button_label"),
          appRatePromptTitle: i18n.t("app_review.app_rate_prompt_title"),
          feedbackPromptTitle: i18n.t("app_review.feedback_prompt_title"),
        },
        callbacks: {
          handleNegativeFeedback: function(){
            console.log("negative feedback registered");
          },
          onRateDialogShow: function(){
            console.log("Rate dilogue shown");
          },
          onButtonClicked: function(buttonIndex){
            console.log("onButtonClicked -> " + buttonIndex + "clicked");
          }
        }
      };
      AppRate.promptForRating(true);
    }
  }
});
