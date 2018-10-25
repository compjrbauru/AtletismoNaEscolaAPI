/**
 * AtividadeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  atividadeTotal: async function (inputs, res) {
    var atividade = await Atividade.find().populate('Quiz');
    return res.json(atividade);
  }


};

