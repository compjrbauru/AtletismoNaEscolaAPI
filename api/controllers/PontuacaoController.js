/**
 * PontuacaoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    verifyCreatePontuacao: async function (req, res) { // Verifica, ao criar uma pontuação se ela já existe ou não
        if (req.session.User === undefined)
            return res.badRequest('USUÁRIO NÃO RECONHECIDO');
        else if (req.session.User.role === 'aluno')
            return res.badRequest('ACESSO RESTRITO');
        var pontuacoes = await Pontuacao.find({
            aluno: req.body.aluno,
            atividade: req.body.atividade
        });
        if (pontuacoes.length > 0)
            return res.badRequest('PONTUAÇÃO JÁ EXISTE!');
        var aluno = await Account.findOne({
            id: req.body.aluno,
        });
        var newTotal = aluno.totalpontos + req.body.pontuacao;
        await Pontuacao.create(req.body);
        await Account.update({id: req.body.aluno}).set({totalpontos: newTotal});
        
        return res.status(200).json('ok');
    },

    pontuacaoAluno: async function (req, res) { // Retorna todas as pontuacoes do aluno logado
        if (req.session.User === undefined)
            return res.badRequest('USUÁRIO NÃO RECONHECIDO');

        const pontuacoesAluno = await Pontuacao.find({
            aluno: req.session.User.id,
        }).populate('atividade').populate('quiz');
        return res.status(200).json(pontuacoesAluno);
    },

    pontuacaoQuiz: async function (req, res) {
        if (req.session.User === undefined)
            return res.badRequest('USUÁRIO NÃO RECONHECIDO');

        await Pontuacao.create({
            aluno: req.session.User.id,
            quiz: req.body.id,
            pontuacao: req.body.pontuacao,
        });
        var aluno = await Account.findOne({
            id: req.session.User.id,
        });
        var newTotal = aluno.totalpontos + req.body.pontuacao;
        await Account.update({id: req.session.User.id}).set({totalpontos: newTotal});
        return res.status(200).json('ok');
    },

    pontuacaoColegio: async function (req, res) { // Retorna todas as pontuacoes do colegio do aluno logado
        if (req.session.User === undefined)
            return res.badRequest('USUÁRIO NÃO RECONHECIDO');
        let role = req.session.User.role;
        var alunosColegio;
        if (role === 'aluno' || role === 'professor')
            alunosColegio = await Account.find({ // Acha os alunos da mesma sala e escola
                where: {
                    escola: req.session.User.escola.id,
                    ano: req.session.User.ano,
                    role: 'aluno',
                },
                sort: 'totalpontos DESC'
            });
        else if (role === 'diretor')
            alunosColegio = await Account.find({ // Acha os alunos da mesma sala e escola
                where: {
                    escola: req.session.User.escola.id,
                    role: 'aluno',
                },
                sort: 'totalpontos DESC'
            });
        else if (role === 'superadmin')
            alunosColegio = await Account.find({ // Acha os alunos da mesma sala e escola
                where: {
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

    getPontuacao: async function (req, res) {
        let id = req.param('id');
        let pontuacao = (id)? await Pontuacao.findOne({id: id}).populate('aluno').populate('atividade').populate('quiz') :  await Pontuacao.find().populate('atividade').populate('aluno').populate('quiz');
        return res.status(200).json(pontuacao);
    },

    patchPontuacao: async function (req, res) {
        if (req.session.User === undefined)
            return res.badRequest('USUÁRIO NÃO RECONHECIDO');
        else if (req.session.User.role === 'aluno')
            return res.badRequest('ACESSO RESTRITO');

        let id = req.param('id');

        let existing_pontuacao = await Pontuacao.findOne({id: id});
        let old_pontuacao = existing_pontuacao.pontuacao;

        var aluno = await Account.findOne({
            id: req.body.aluno,
        });

        var newTotal = aluno.totalpontos + req.body.pontuacao - old_pontuacao;
        await Account.update({id: req.body.aluno}).set({totalpontos: newTotal});
        await Pontuacao.update({id: id}).set(req.body);

        let pontuacao = await Pontuacao.findOne({id: id}).populate('aluno').populate('atividade');
        return res.status(200).json(pontuacao);
    },

    deletePontuacao: async function (req, res) {
        if (req.session.User === undefined)
            return res.badRequest('USUÁRIO NÃO RECONHECIDO');
        else if (req.session.User.role === 'aluno')
            return res.badRequest('ACESSO RESTRITO');

        let id = req.param('id');
        let [deleted] = await Pontuacao.destroy({id: id}).fetch(); // Deleta a pontuação e pega o dado deletado
        let account = await Account.findOne({id: deleted.aluno});
        let newTotal = account.totalpontos - deleted.pontuacao;
        await Account.update({id: deleted.aluno}).set({totalpontos: newTotal});
        return res.status(200).json('ok');
    },

};

