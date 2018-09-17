/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  inputs: {

    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
    },

    fullName:  {
      required: true,
      type: 'string',
    },

    escola: {
      required: true,
      type: 'string',
    },

    ano: {
      required: true,
      type: 'string',
    },

  },

  fn: async function (inputs, exits) {

    var newEmailAddress = inputs.emailAddress.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await Account.create(Object.assign({
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      fullName: inputs.fullName,
      tosAcceptedByIp: this.req.ip
    }, sails.config.custom.verifyEmailAddresses? {
      emailProofToken: await sails.helpers.strings.random('url-friendly'),
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
      emailStatus: 'unconfirmed'
    }:{}))
    .intercept('E_UNIQUE', 'emailAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    // If billing feaures are enabled, save a new customer entry in the Stripe API.
    // Then persist the Stripe customer id in the database.
    if (sails.config.custom.enableBillingFeatures) {
      let stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with({
        emailAddress: newEmailAddress
      });
      await Account.update(newUserRecord.id).set({
        stripeCustomerId
      });
    }

    // Store the user's new id in their session.
    this.req.session.userId = newUserRecord.id;

    if (sails.config.custom.verifyEmailAddresses) {
      // Send "confirm account" email
      await sails.helpers.sendTemplateEmail.with({
        to: newEmailAddress,
        subject: 'Please confirm your account',
        template: 'email-verify-account',
        templateData: {
          fullName: inputs.fullName,
          token: newUserRecord.emailProofToken
        }
      });
    } else {
      sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
    }

    // Since everything went ok, send our 200 response.
    return exits.success();

  }

};

