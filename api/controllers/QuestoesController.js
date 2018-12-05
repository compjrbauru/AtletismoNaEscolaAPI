/**
 * QuestaoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    createQuestao: async function (req, res) {
        if (req.session.User === undefined || req.session.User.role == 'aluno')
            return res.badRequest('ACESSO RESTRITO');
        
        await Questoes.create(req.body);
        return res.status(200).json('ok');
    },

    getQuestao: async function (req, res) {
        let id = req.param('id');
        let response;
        if (id)
            response = await Questoes.findOne({id: id});
        else   
            response = await Questoes.find();
        return res.status(200).json(response);
    },

    patchQuestao: async function (req, res) {
        if (req.session.User === undefined || req.session.User.role == 'aluno')
            return res.badRequest('ACESSO RESTRITO');
        
        let id = req.param('id');
        await Questoes.update({id: id}).set(req.body);
        let record = await Questoes.findOne({id: id});
        return res.status(200).json(record);
    },

    deleteQuestao: async function (req,res) {
        if (req.session.User === undefined || req.session.User.role == 'aluno')
            return res.badRequest('ACESSO RESTRITO');
        
        let id = req.param('id');

        let record = await Questoes.findOne({
            id: id
        }).populate('owner');
        if (record.owner != null) { // Se tiver quiz associado a questao, deleta ele da ordem pra nao bugar para o aluno
            const o_index = record.owner.ordem.indexOf(parseInt(id));
            record.owner.ordem.splice(o_index, 1);
    
            let r = await Quiz.update({
                id: record.owner.id
            }).set({
                ordem: record.owner.ordem,
            });
        }
        await Questoes.destroy({id: id});
        return res.status(200).json('ok');
    },
};