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
            return res.badRequest('PONTUAÇÃO JÁ EXISTE!');
        var aluno = await Account.findOne({
            id: req.body.aluno,
        });
        var newTotal = aluno.totalpontos + req.body.pontuacaoAula;
        await Pontuacao.create(req.body);
        await Account.update({id: req.body.aluno}).set({totalpontos: newTotal});
        
        return res.status(200).json('ok');
    },

    pontuacaoAluno: async function (req, res) { // Retorna todas as pontuacoes do aluno logado
        if (req.session.User === undefined)
            res.badRequest('USUÁRIO NÃO RECONHECIDO')
        const pontuacoesAluno = await Pontuacao.find({
            aluno: req.session.User.id,
        }).populate('atividade');
        return res.status(200).json(pontuacoesAluno);
    },

    pontuacaoColegio: async function (req, res) { // Retorna todas as pontuacoes do colegio do aluno logado
        if (req.session.User === undefined)
            res.badRequest('USUÁRIO NÃO RECONHECIDO')
        
        var alunosColegio = await Account.find({ // Acha os alunos da mesma sala e escola
            where: {
                escola: req.session.User.escola.id,
                ano: req.session.User.ano,
                role: 'aluno',
            },
            sort: 'totalpontos DESC'
        });

        ranking = alunosColegio.map(aluno => { // Simplifica o objeto de retorno somente com dados que serao usados
            var returnObj = {};
            returnObj['fullName'] = aluno.fullName;
            returnObj['totalpontos'] = aluno.totalpontos;
            returnObj['id'] = aluno.id;
            return returnObj;
        })

        return res.status(200).json(ranking);
    },

    getAllPontuacao: async function (req, res) {
        let pontuacoes = await Pontuacao.find().populate('atividade').populate('aluno');
        return res.status(200).json(pontuacoes);
    },

};

