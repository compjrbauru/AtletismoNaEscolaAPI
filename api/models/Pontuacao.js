/**
 * Pontuacao.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    pontuacaoQuiz: {
      type: 'number',
    },
    pontuacaoAula: {
      type: 'number',
    },
    aluno: {
      model: 'Account',
      required: true,
    },
    atividade: {
      model: 'Atividade',
      required: true,
    },
  }

};

