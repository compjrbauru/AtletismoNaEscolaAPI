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
  },

  getAtividade: async function (req, res) {
    let id = req.param('id');
    let response;
    if (id)
      response = await Atividade.findOne({id: id}).populate('quiz');
    else 
      response = await Atividade.find().populate('quiz');
    return res.status(200).json(response);
  },

  patchAtividade: async function (req, res) {
    if (req.session.User === undefined || req.session.User.role == 'aluno')
      return res.badRequest('ACESSO RESTRITO');
    
    let id = req.param('id');
    await Atividade.update({id: id}).set(req.body);
    let record = await Atividade.findOne({id: id}).populate('quiz');
    return res.status(200).json(record);
  },

  deleteAtividade: async function (req, res) {
    if (req.session.User === undefined || req.session.User.role == 'aluno')
      return res.badRequest('ACESSO RESTRITO');

    let id = req.param('id');
    await Atividade.destroy({id: id});
    return res.status(200).json('ok');
  },

  createAtividade: async function (req, res) {
    if (req.session.User === undefined || req.session.User.role == 'aluno')
      return res.badRequest('ACESSO RESTRITO');

    await Atividade.create(req.body);
    return res.status(200).json('ok');
  },

};

