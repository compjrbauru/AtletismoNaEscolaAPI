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

  exits: {

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

    success: {
      responseType: 'json',
    },


  },

  signup: async function (inputs, res) {
    var newEmailAddress = inputs.body.emailAddress.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await Account.create(Object.assign({
      emailAddress: newEmailAddress,
      password: inputs.body.passwords,
      fullName: inputs.body.fullName,
      escola: inputs.body.escola,
      ano: inputs.body.ano,
    }))
    .intercept('E_UNIQUE', 'emailAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    return res.ok();

  }

};

