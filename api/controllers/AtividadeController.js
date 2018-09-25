/**
 * AtividadeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  atividadeTotal: async function (inputs, res) {
    var atividade = Atividade.find().populate('quiz').populate('provaPratica');
    return res.json(atividade);
  }


};

