/**
 * Quiz/questoes.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    Alternativas: {
      type: 'json',
      columnType: 'array'
    },
    Pergunta: {
      type: 'string',
    },
    RespostaCorreta: {
      type: 'string',
    },
    owner: {
      model: 'Quiz',
    }
  },

};

