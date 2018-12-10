/**
 * Quiz/prova.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    questoes: {
      collection: 'Questoes',
      via: 'owner'
    },
    conteudo: {
      collection: 'Conteudo',
      via: 'owner',
    },
    titulo: {
      type: 'string',
      required: true,
      unique: true,
    },
    ordem: {
      type: 'json',
      required: true,
      columnType: 'array',
    },
  },

};

