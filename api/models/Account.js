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

    isSuperAdmin: {
      type: 'boolean',
      description: 'Whether this user is a "super admin" with extra permissions, etc.',
      extendedDescription:
`Super admins might have extra permissions, see a different default home page when they log in,
or even have a completely different feature set from normal users.  In this app, the \`isSuperAdmin\`
flag is just here as a simple way to represent two different kinds of users.  Usually, it's a good idea
to keep the data model as simple as possible, only adding attributes when you actually need them for
features being built right now.

For example, a "super admin" user for a small to medium-sized e-commerce website might be able to
change prices, deactivate seasonal categories, add new offerings, and view live orders as they come in.
On the other hand, for an e-commerce website like Walmart.com that has undergone years of development
by a large team, those administrative features might be split across a few different roles.

So, while this \`isSuperAdmin\` demarcation might not be the right approach forever, it's a good place to start.`
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
    }

  },

};

