/**
 * ConteudoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    createConteudo: async function (req, res) {
        if (req.session.User === undefined || req.session.User.role != 'superadmin')
            return res.badRequest('ACESSO RESTRITO');

        await Conteudo.create(req.body);
        return res.status(200).json('ok');
    },

    getConteudo: async function (req, res) {
        let id = req.param('id');
        let response = (id) ? await Conteudo.findOne({id: id}).populate('owner') : await Conteudo.find().populate('owner');
        return res.status(200).json(response);
    },

    patchConteudo: async function (req, res) {
        if (req.session.User === undefined || req.session.User.role != 'superadmin')
            return res.badRequest('ACESSO RESTRITO');

        let id = req.param('id');
        await Conteudo.update({id: id}).set(req.body);
        let record = await Conteudo.findOne({id: id}).populate('owner');
        return res.status(200).json(record);
    },

    deleteConteudo: async function (req, res) {
        if (req.session.User === undefined || req.session.User.role != 'superadmin')
            return res.badRequest('ACESSO RESTRITO');

        let id = req.param('id');
        await Conteudo.destroy({id: id});
        return res.status(200).json('ok');
    },
};

