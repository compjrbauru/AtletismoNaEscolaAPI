/**
 * QuizController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    QuizesLivresConteudo: async function (inputs, res) { // Retorna todos os quizes que nao tem conteudo associado
        let quizes = await Quiz.find().populate('conteudo');
        let livres = [];
        quizes.forEach(quiz => {
            if (quiz.conteudo.length == 0){ // Se nao tiver conteudo associado (array sem dados)
                livres.push(quiz);
            }
        });
        return res.json(livres);
    },

    QuizesLivresAtividade: async function (inputs, res) { // Retorna todos os quizes que nao tem atividade associado
        let quizes = await Quiz.find().populate('ownerAtividade');
        let livres = [];
        quizes.forEach(quiz => {
            if (!quiz.ownerAtividade)
                livres.push(quiz);
        });
        return res.json(livres);
    }
};