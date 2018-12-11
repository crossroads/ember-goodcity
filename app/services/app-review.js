import Ember from "ember";
import config from '../config/environment';

export default Ember.Service.extend({
  isMobileApp: config.cordova.enabled,
  cordova: Ember.inject.service(),
  i18n: Ember.inject.service(),

  promptReviewModal() {
    var _this = this;
    var i18n = _this.get("i18n");
    var rateTitle = i18n.t("app_review.title").string;
    var rateMessage = i18n.t("app_review.message").string;
    var rateCancelButtonLabel = i18n.t("app_review.cancel_button_label").string;
    var rateLaterButtonLabel = i18n.t("app_review.later_button_label").string;
    var rateButtonLabelName = i18n.t("app_review.rate_button_label").string;
    var rateYesButtonLabel = i18n.t("app_review.yes_button_label").string;
    var rateNoButtonLabel = i18n.t("app_review.no_button_label").string;
    var rateAppRatePromptTitle = i18n.t("app_review.app_rate_prompt_title").string;
    var rateFeedbackPromptTitle = i18n.t("app_review.feedback_prompt_title").string;
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
          cancelButtonLabel: rateCancelButtonLabel,
          laterButtonLabel: rateLaterButtonLabel,
          rateButtonLabel: rateButtonLabelName,
          yesButtonLabel: rateYesButtonLabel,
          noButtonLabel: rateNoButtonLabel,
          appRatePromptTitle: rateAppRatePromptTitle,
          feedbackPromptTitle: rateFeedbackPromptTitle,
        },
        callbacks: {
          handleNegativeFeedback: function(){
            window.open('mailto:contact@goodcity.hk','_system');
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
