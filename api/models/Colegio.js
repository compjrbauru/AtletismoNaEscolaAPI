/**
 * Colegio.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nome: {
      type: 'string',
      required: true,
    },
    endereco: {
      type: 'string',
      required: true,
    }
  },

};

