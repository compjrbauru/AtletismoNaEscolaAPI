/**
 * ColegioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    createColegio: async function (req, res) {
        if (req.session.User === undefined || req.session.User.role != 'superadmin')
            return res.badRequest('ACESSO RESTRITO');

        await Colegio.create(req.body);
        return res.status(200).json('ok');
    },

    getColegio: async function (req, res) {
        let id = req.param('id');
        let response;
        if (id)
            response = await Colegio.findOne({id: id});
        else
            response = await Colegio.find();
        return res.status(200).json(response);
    },

    patchColegio: async function (req, res) {
        if (req.session.User === undefined || req.session.User.role != 'superadmin')
            return res.badRequest('ACESSO RESTRITO');
        
        let id = req.param('id');
        await Colegio.update({id: id}).set(req.body);
        let record = await Colegio.findOne({id: id});
        return res.status(200).json(record);
    },

    deleteColegio: async function (req, res) {
        if (req.session.User === undefined || req.session.User.role != 'superadmin')
            return res.badRequest('ACESSO RESTRITO');

        let id = req.param('id');
        let accounts = await Account.find({
            escola: id 
        }).populate('Pontuacoes');

        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
              await callback(array[index], index, array);
            }
        }
        
        await asyncForEach(accounts, async account => {
            if (account.Pontuacoes) {
                await asyncForEach(account.Pontuacoes, async pontuacao => {
                    await Pontuacao.destroy({id: pontuacao.id});
                })
            }
            await Account.destroy({ id: account.id });
        });

        await Colegio.destroy({id: id});
        return res.status(200).json('ok');
    },

};
  
  