module.exports = {


  friendlyName: 'Login',


  description: 'Log in using the provided email and password combination.',


  inputs: {

    emailAddress: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    rememberMe: {
      type: 'boolean'
    }

  },


  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged in.',
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
      responseType: 'unauthorized'
    }

  },


  login: async function (inputs, exits) {
    var userRecord = await Account.findOne({
      emailAddress: inputs.body.emailAddress.toLowerCase(),
    }).populate('escola');

    if(!userRecord) {
      throw 'badCombo';
    }

    await sails.helpers.passwords.checkPassword(inputs.body.password, userRecord.password).intercept('incorrect', 'BadCombo').intercept('success', 'success');

    if (inputs.body.rememberMe) {
      if (this.req.isSocket) {
        sails.log.warn(
          'Received `rememberMe: true` from a virtual request, but it was ignored\n'+
          'because a browser\'s session cookie cannot be reset over sockets.\n'+
          'Please use a traditional HTTP request instead.'
        );
      } else {
        this.req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge;
      }
    }
    inputs.session.User = userRecord;

    return exits.json(userRecord);

  }

};
