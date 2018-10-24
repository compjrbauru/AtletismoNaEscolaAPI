
module.exports = {
  auth: async function (inputs, res) {
    console.log(inputs.session);
    if (inputs.session.authenticated) {
      return ok();
    } else {
      return res.status(true).send('You are not permitted to perform this action.',403);
    }
  }
};
