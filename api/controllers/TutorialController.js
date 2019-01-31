/**
 * TutorialController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getTutorial: async function (req, res) {
        if (req.session.User === undefined)
            return res.badRequest('USUÁRIO NÃO RECONHECIDO');

        // Caça um tutorial
        let [tut] = await Tutorial.find().limit(1);
        
        return res.status(200).json(tut);
    },

    editTutorial: async function (req, res) {
        if (req.session.User === undefined)
            return res.badRequest('USUÁRIO NÃO RECONHECIDO');
        else if (req.session.User.role !== 'superadmin')
            return res.badRequest('ACESSO RESTRITO');

        // Caça um tutorial
        let [tut] = await Tutorial.find().limit(1);

        // Caso nao tenha nenhuma, cria um Tutorial
        if (tut === undefined) {
            await Tutorial.create(req.body);
            return res.status(200).json('ok');
        }
        // Caso ja tenha um tutorial, atualiza o HTML do iframe
        await Tutorial.update({id: tut.id}).set(req.body);
        return res.status(200).json('ok');
    },

};

