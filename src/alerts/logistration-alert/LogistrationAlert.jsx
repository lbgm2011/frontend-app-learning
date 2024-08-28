import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape, FormattedMessage } from '@edx/frontend-platform/i18n';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { Alert, Hyperlink } from '@openedx/paragon';
import { WarningFilled } from '@openedx/paragon/icons';

import genericMessages from '../../generic/messages';

const LogistrationAlert = ({ intl }) => {

  const currentUrl = new URL(global.location.href); // Get the current URL

  const lmsRegisterUrl = new URL(`${getConfig().LMS_BASE_URL}/register`); // Base URL for register
  const lmsLoginUrl = new URL(`${getConfig().LMS_BASE_URL}/login`); // Base URL for login

  // Preserve existing query parameters from the base URL
  const params = new URLSearchParams(global.location.search);

  // Add the 'next' parameter with the current URL encoded
  params.set('next', currentUrl.href);

  lmsRegisterUrl.search = params.toString();
  lmsLoginUrl.search = params.toString();


  const signIn = (
    <Hyperlink
      style={{ textDecoration: 'underline' }}
      destination={lmsLoginUrl.toString()}
    >
      {intl.formatMessage(genericMessages.signInLowercase)}
    </Hyperlink>
  );

  // TODO: Pull this registration URL building out into a function, like the login one above.
  // This is complicated by the fact that we don't have a REGISTER_URL env variable available.
  const register = (
    <Hyperlink
      style={{ textDecoration: 'underline' }}
      destination={lmsRegisterUrl.toString()}
    >
      {intl.formatMessage(genericMessages.registerLowercase)}
    </Hyperlink>
  );

  return (
    <Alert variant="warning" icon={WarningFilled}>
      <FormattedMessage
        id="learning.logistration.alert"
        description="Prompts the user to sign in or register to see course content."
        defaultMessage="To see course content, {signIn} or {register}."
        values={{
          signIn,
          register,
        }}
      />
    </Alert>
  );
};

LogistrationAlert.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(LogistrationAlert);
