/**
 * AtividadeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  getAtividade: async function (req, res) {
    let id = req.param('id');
    let response;
    if (id)
      response = await Atividade.findOne({id: id});
    else 
      response = await Atividade.find();
    return res.status(200).json(response);
  },

  patchAtividade: async function (req, res) {
    if (req.session.User === undefined || req.session.User.role == 'aluno')
      return res.badRequest('ACESSO RESTRITO');
    
    let id = req.param('id');
    await Atividade.update({id: id}).set(req.body);
    let record = await Atividade.findOne({id: id});
    return res.status(200).json(record);
  },

  deleteAtividade: async function (req, res) {
    if (req.session.User === undefined || req.session.User.role == 'aluno')
      return res.badRequest('ACESSO RESTRITO');

    let id = req.param('id');

    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    let pontuacoes_atividade = await Pontuacao.find({atividade: id}).populate('aluno');
    await asyncForEach(pontuacoes_atividade, async (pontuacao) => { // Espera tirar os pontos da pontuacao do total de pontos
      let total = pontuacao.aluno.totalpontos;
      let newTotal = total - pontuacao.pontuacao;
      await Account.updateOne({id: pontuacao.aluno.id}).set({totalpontos: newTotal});
      await Pontuacao.destroy({id: pontuacao.id});
    });

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

