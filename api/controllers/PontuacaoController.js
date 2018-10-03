/**
 * PontuacaoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    verifyCreatePontuacao: async function (req, res) { // Verifica, ao criar uma pontuação se ela já existe ou não
        var pontuacoes = await Pontuacao.find({
            aluno: req.body.aluno,
            atividade: req.body.atividade
        });
        if (pontuacoes.length > 0)
            return res.badRequest('Pontuação já existe!');
        await Pontuacao.create(req.body);
        return res.status(200).json('ok');
    }

};

