import Ember from "ember";
import config from '../config/environment';

export default Ember.Service.extend({
  isMobileApp: config.cordova.enabled,
  cordova: Ember.inject.service(),
  i18n: Ember.inject.service(),

  promptReviewModal() {
    var _this = this;
    var i18n = _this.get("i18n");
    var rateTitle = i18n.t("app_review.title");
    var rateMessage = i18n.t("app_review.message");
    var rateCancelButton = i18n.t("app_review.cancel_button_label");
    var rateLaterButton = i18n.t("app_review.later_button_label");
    var rateButtonLabel = i18n.t("app_review.rate_button_label");
    var rateYesButtonLabel = i18n.t("app_review.yes_button_label");
    var rateNoButtonLabel = i18n.t("app_review.no_button_label");
    var appRateTitle = i18n.t("app_review.app_rate_prompt_title");
    var feedBackTitle = i18n.t("app_review.feedback_prompt_title");
    if(_this.get("isMobileApp")) {
      AppRate.preferences = {
        displayAppName: config.APP.REVIEW_APP_NAME,
        usesUntilPrompt: 1,
        promptAgainForEachNewVersion: false,
        inAppReview: true,
        storeAppURL: {
          ios: config.APP.APPLE_APP_ID,
          android: config.APP.ANDROID_APP_URL,
        },
        customLocale: {
          title: rateTitle,
          message: rateMessage,
          cancelButtonLabel: rateCancelButton,
          laterButtonLabel: rateLaterButton,
          rateButtonLabel: rateButtonLabel,
          yesButtonLabel: rateYesButtonLabel,
          noButtonLabel: rateNoButtonLabel,
          appRatePromptTitle: appRateTitle,
          feedbackPromptTitle: feedBackTitle,
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
