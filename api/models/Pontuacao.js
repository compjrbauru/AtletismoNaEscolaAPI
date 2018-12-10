/**
 * Pontuacao.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    pontuacao: {
      type: 'number',
      defaultsTo: 0
    },
    aluno: {
      model: 'Account',
      required: true,
    },
    atividade: {
      model: 'Atividade',
    },
    quiz: {
      model: 'Quiz',
    },
  }

};

