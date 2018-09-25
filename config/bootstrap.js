/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  await Account.createEach([
    {
      emailAddress: 'teste@gmail.com',
      fullName: 'Teste da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 1',
      ano: '5'},
    {
      emailAddress: 'guilherme@gmail.com',
      fullName: 'guilherme da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 1',
      ano: '6'},
    {
      emailAddress: 'gustavo@gmail.com',
      fullName: 'gustavo da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 3',
      ano: '5'},
    {
      emailAddress: 'roberto@gmail.com',
      fullName: 'roberto da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 1',
      ano: '7'},
    {
      emailAddress: 'silva@gmail.com',
      fullName: 'silva da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 5',
      ano: '8'},
    {
      emailAddress: 'silvana@gmail.com',
      fullName: 'silvana da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 1',
      ano: '9'},
    {
      emailAddress: 'iodites@gmail.com',
      fullName: 'iodites da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 2',
      ano: '3'},
  ]);

  await questoes.createEach([
    {
      Pergunta: 'Qual maior corredor de todos os tempos?',
      RespostaCorreta: '1',
      Alternativas: {
        0: 'Bolt',
        1: 'Ninguém',
      },
      id: 1,
    },
    {
      Pergunta: 'Qual o record da maratona?',
      RespostaCorreta: '1',
      Alternativas: {
        0: '2h01',
        1: '1h40',
        2: '2h25',
      },
      id: 2,
    },
    {
      Pergunta: 'Qual o melhor time do mundo?',
      RespostaCorreta: '1',
      Alternativas: {
        0: 'Corinthians',
        1: 'São Paulo',
        2: 'Santos',
      },
      id: 3,
    },
    {
      Pergunta: 'Qual o esporte sem bola?',
      RespostaCorreta: '3',
      Alternativas: {
        0: 'Basquete',
        1: 'Futebol',
        2: 'Natação',
      },
      id: 4,
    },
    {
      Pergunta: 'Qual o esporte que tem o item mais rápido das olimpiadas?',
      RespostaCorreta: '1',
      Alternativas: {
        0: 'Corrida',
        1: 'Arremesso de peso',
        2: 'Badminton',
      },
      id: 5,
    },
    {
      Pergunta: 'Qual a maior prova das olimpiadas?',
      RespostaCorreta: '1',
      Alternativas: {
        0: 'Maratona',
        1: 'Natação',
        2: 'Futebol',
      },
      id: 6,
    },
  ]);

  await conteudo.createEach([
    {
      texto: 'texto do conteúdo oshdoiahsaiosfioa jsdpskdoskdosdkskkkkkkkkkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk kkkkkkk',
      owner: 1,
    },
  ])

  await quiz.createEach([
    {
      questoes: [1, 2, 3, 4, 5, 6],
      conteudo: 1,
      ownerAtividade: 1,
      id: 1,
    },
  ]);

  await ProvaPratica.createEach([
    {
      titulo: 'Atividade Corrida Rasa',
      id: 1,
      ownerProvaPratica: 1
    },
  ])

  await Atividade.createEach([
    {
      titulo: 'Atividade Corrida Rasa',
      quiz: 1,
      provaPratica: 1,
    },
  ]);

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
