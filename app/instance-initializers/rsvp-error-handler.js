import RSVP from "rsvp";

export function initialize(appInstance) {
  let rollbarService = appInstance.lookup('service:rollbar');

  RSVP.on('error', function(reason) {
    rollbarService.error(reason);
  });
}

export default {
  name: 'rsvp-error-handler',
  initialize
};
