/**
 * Atividade.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    titulo: {
      type: 'string',
      required: true,
      unique: true,
    },
    quiz: {
      collection: 'Quiz',
      via: 'ownerAtividade',
    },
    provaPratica: {
      type: 'string',
      required: true,
    },
  },

};

