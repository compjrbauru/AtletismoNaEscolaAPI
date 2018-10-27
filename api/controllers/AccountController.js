/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  signup: async function (inputs, res) {
    var newEmailAddress = inputs.body.emailAddress.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await Account.create(Object.assign({
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(inputs.body.password),
      fullName: inputs.body.fullName,
      escola: inputs.body.escola,
      ano: inputs.body.ano,
    }))
    .intercept('E_UNIQUE', 'emailAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    return res.ok();

  },

  getAccount: async function (req, res) {
    let id = req.param('id');
    let response = (id) ? await Account.findOne({id: id}) : await Account.find();
    return res.status(200).json(response);
  },

  createAccount: async function (req, res) {
    if (req.session.User === undefined || req.session.User.role == 'aluno')
      return res.badRequest('ACESSO RESTRITO');

    await Account.create(req.body);
    return res.status(200).json('ok');
  },

  deleteAccount: async function(req, res) {
    if (req.session.User === undefined || req.session.User.role == 'aluno')
      return res.badRequest('ACESSO RESTRITO');

    let id = req.param('id');
    await Pontuacao.destroy({aluno: id});
    await Account.destroy({id: id});
    return res.status(200).json('ok');
  },

  patchAccount: async function (req, res) {
    if (req.session.User === undefined || req.session.User.role == 'aluno')
      return res.badRequest('ACESSO RESTRITO');

    let id = req.param('id');
    await Account.update({id: id}).set(req.body);
    let record = await Account.findOne({id: id});
    return res.status(200).json(record);
  }

};

