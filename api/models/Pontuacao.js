/**
 * Pontuacao.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    pontuacaoQuiz: {
      type: 'string',
      required: true,
    },
    pontuacaoAula: {
      type: 'number',
      required: true,
    },
    aluno: {
      model: 'Account',
    },
    atividade: {
      model: 'Atividade',
    },
  }

};

