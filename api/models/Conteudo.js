/**
 * Conteudo.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    texto: {
      type: 'string',
    },
    owner: {
      model: 'Quiz',
    },
    titulo: {
      type: 'string',
      required: true,
      unique: true,
    }
  },
  
};

