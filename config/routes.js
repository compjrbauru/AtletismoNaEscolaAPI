/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

 'post /signup':'AccountController.signup',
 'post /login': 'LoginController.login',

 'get /todas-atividades': 'AtividadeController.atividadeTotal',
 'get /quizes-livres-conteudo': 'QuizController.QuizesLivresConteudo',
 'get /quizes-livres-atividade': 'QuizController.QuizesLivresAtividade',

 'post /pontuacao': 'PontuacaoController.verifyCreatePontuacao',
 'get /pontuacao': 'PontuacaoController.getAllPontuacao',
 'get /pontuacao-aluno': 'PontuacaoController.pontuacaoAluno',
 'get /pontuacao-colegio': 'PontuacaoController.pontuacaoColegio',
 
 'post /conteudo': 'ConteudoController.createConteudo',
 'get /conteudo/:id?': 'ConteudoController.getConteudo',
 'patch /conteudo/:id': 'ConteudoController.patchConteudo',
 'delete /conteudo/:id': 'ConteudoController.deleteConteudo',

 'get /questao/:id?': 'QuestoesController.getQuestao',
 'post /questao': 'QuestoesController.createQuestao',
 'delete /questao/:id': 'QuestoesController.deleteQuestao',
 'patch /questao/:id': 'QuestoesController.patchQuestao',

 'get /quiz/:id?': 'QuizController.getQuizes',
 'patch /quiz/:id': 'QuizController.patchQuiz',
 'post /quiz': 'QuizController.createQuiz',
 'delete /quiz/:id': 'QuizController.deleteQuiz',

 'get /atividade/:id?': 'AtividadeController.getAtividade',
 'post /atividade': 'AtividadeController.createAtividade',
 'delete /atividade/:id': 'AtividadeController.deleteAtividade',
 'patch /atividade/:id': 'AtividadeController.patchAtividade',
 
};
