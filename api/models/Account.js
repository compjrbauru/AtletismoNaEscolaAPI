/**
 * Account.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    emailAddress: {
      type: 'string',
      required: true,
      isEmail: true,
      maxLength: 200,
      unique: true,
    },

    password: {
      type: 'string',
      protect: true,
    },

    fullName: {
      type: 'string',
      required: true,
      maxLength: 120,
    },

    escola: {
      required: true,
      type: 'string',
    },

    ano: {
      required: true,
      type: 'string',
    },

    role: {
      type: 'string',
      isIn: ['superadmin', 'diretor', 'professor', 'aluno'],
      defaultsTo: 'aluno',
    },

    passwordResetToken: {
      type: 'string',
      description: 'A unique token used to verify the user\'s identity when recovering a password.  Expires after 1 use, or after a set amount of time has elapsed.'
    },

    passwordResetTokenExpiresAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment when this user\'s `passwordResetToken` will expire (or 0 if the user currently has no such token).',
      example: 1502844074211
    },

    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'changeRequested', 'confirmed'],
      defaultsTo: 'confirmed',
      description: 'The confirmation status of the user\'s email address.',
      extendedDescription:
`Users might be created as "unconfirmed" (e.g. normal signup) or as "confirmed" (e.g. hard-coded
admin users).  When the email verification feature is enabled, new users created via the
signup form have \`emailStatus: 'unconfirmed'\` until they click the link in the confirmation email.
Similarly, when an existing user changes their email address, they switch to the "changeRequested"
email status until they click the link in the confirmation email.`
    },

    Pontuacoes: {
      collection: 'Pontuacao',
      via: 'aluno',
    },

    totalpontos: {
      type: 'number',
      defaultsTo: 0,
    },

  },

};

