/**
 * Quiz/prova.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    questoes: {
      collection: 'questoes',
      via: 'owner'
    },
    conteudo: {
      collection: 'Conteudo',
      via: 'owner',
    },
  },

};

