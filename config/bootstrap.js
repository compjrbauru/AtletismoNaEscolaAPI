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
      id: 1,
      emailAddress: 'teste@gmail.com',
      fullName: 'Teste da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 1',
      ano: '5'},
    {
      id: 2,
      emailAddress: 'guilherme@gmail.com',
      fullName: 'guilherme da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 1',
      ano: '6'},
    {
      id: 3,
      emailAddress: 'gustavo@gmail.com',
      fullName: 'gustavo da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 3',
      ano: '5'},
    {
      id: 4,
      emailAddress: 'roberto@gmail.com',
      fullName: 'roberto da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 1',
      ano: '7'},
    {
      id: 5,
      emailAddress: 'silva@gmail.com',
      fullName: 'silva da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 5',
      ano: '8'},
    {
      id: 6,
      emailAddress: 'silvana@gmail.com',
      fullName: 'silvana da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 1',
      ano: '9'},
    {
      id: 7,
      emailAddress: 'iodites@gmail.com',
      fullName: 'iodites da Silva',
      password: await sails.helpers.passwords.hashPassword('abc123'),
      escola: 'Escola 2',
      ano: '3'},
  ]);

  var q = [];
  for(let j=7; j<20; j++){ // Cria perguntas
    q.push({
      Pergunta: 'Pergunta ' + j,
      RespostaCorreta: '1',
      Alternativas: {
        0: 'res1',
        1: 'res2',
        2: 'res3',
      },
      id: j,
    });
  }

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
    ...q,
  ]);

  await Conteudo.createEach([
    {
      texto: 'texto do conteúdo oshdoiahsaiosfioa jsdpskdoskdosdkskkkkkkkkkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk kkkkkkk',
      owner: 1,
      id: 1,
    },
    {
      texto: 'TEXTO CONTEUDO 2',
      owner: 2,
      id: 2,
    },
    {
      texto: 'TEXTO CONTEUDO 3',
      owner: 3,
      id: 3,
    },
    {
      texto: 'TEXTO CONTEUDO 4',
      owner: 4,
      id: 4,
    },
  ])

  await quiz.createEach([
    {
      questoes: [1, 2, 3, 4, 5, 6],
      conteudo: 1,
      ownerAtividade: 1,
      id: 1,
    },
    {
      questoes: [7, 8, 9, 10],
      conteudo: 2,
      ownerAtividade: 2,
      id: 2,
    },
    {
      questoes: [11, 12, 13, 14],
      conteudo: 3,
      ownerAtividade: 3,
      id: 3,
    },
    {
      questoes: [15, 16, 17, 18],
      conteudo: 4,
      ownerAtividade: 4,
      id: 4,
    },
  ]);

  await Provapratica.createEach([
    {
      titulo: 'Aula Pratica 1',
      id: 1,
      ownerProvaPratica: 1
    },
    {
      titulo: 'Aula Pratica 2',
      id: 2,
      ownerProvaPratica: 2
    },
    {
      titulo: 'Aula Pratica 3',
      id: 3,
      ownerProvaPratica: 3
    },
    {
      titulo: 'Aula Pratica 4',
      id: 4,
      ownerProvaPratica: 4
    },
  ])

  await Atividade.createEach([
    {
      id: 1,
      titulo: 'Atividade Corrida Rasa',
      quiz: 1,
      provaPratica: 1,
    },
    {
      id: 2,
      titulo: 'Atividade Corrida Rasa Prolongada',
      quiz: 2,
      provaPratica: 2,
    },
    {
      id: 3,
      titulo: 'Atividade 3',
      quiz: 3,
      provaPratica: 3,
    },
    {
      id: 4,
      titulo: 'Atividade 4',
      quiz: 4,
      provaPratica: 4,
    },
  ]);


  let p = [];
  let numalunos = await Account.count();
  let numatividades =  await Atividade.count();
  for(let i=1; i<=numalunos; i++){
    for(let j=1; j<=numatividades; j++){
      p.push({  
        pontuacaoQuiz: Math.floor(Math.random() * 90) + 30, // Valor random 
        pontuacaoAula: Math.floor(Math.random() * 120) + 70,
        aluno: i,
        atividade: j,
      });
    }
    
  }

  await Pontuacao.createEach(p);

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
