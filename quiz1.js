function startQuiz() {
  //var quiz = new Quiz(questions);
  render();
  document.querySelector("#start").innerHTML = "GOOD LUCK! Hopefully after taking this Quiz you all will be happy. Atlest we FINISHED";

}

function refreshPage(){
  window.location.reload();
}


function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer))
    {
        this.score++;
        window.alert("CORRECT!");
        this.questionIndex++;
    }
    else {
    window.alert("INCORRECT!");
    this.questionIndex++;
  }
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function render() {
    if(quiz.isEnded()) {
        finalScore();
        retryButtonAppear();

    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
        showScores();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        render();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var scores = "<h1>SCOREBOARD</h1>";
    scores += "<h2 id='score'> Your Score Is: " + quiz.score + "</h2>";
    var element = document.getElementById("score");
    element.innerHTML = scores;
};

function finalScore(){
  var finalScore = "<h1>FINAL SCORE:</h1>";
  finalScore += quiz.score;
  var element = document.getElementById("score");
  element.innerHTML = finalScore;
  var grade = document.getElementById("failOrpass");
  grade.innerHTML = percentage(quiz.score, quiz.questions.length);

};

function percentage(currentScore, totalQuestions){
  var grade = Math.round((currentScore/totalQuestions)  * 100);
  if (grade < 50)
  {
    return "You scored a " + grade + "%...YOU FAILED"
  }
  else
  {
    return "You scored a " + grade + "%...YOU PASSED!";
  }
};

function retryButtonAppear(){
     document.getElementById("tryagain").innerHTML = '<button onclick="refreshPage()" type="button" class="btn btn-success"">RETRY</button>';
}

var questions = [
    new Question("Where is the digit 3 in the number 3,769?", ["Ones place", "Hundreds place","Thousands place", "Tens place"], "Thousands place"),
    new Question("What does HTML stand for?", ["Hypertext Markup Language", "Hello Mary Lane","Hyper Max Language", "Hyper Minimun Language"], "Hypertext Markup Language"),
    new Question("Do Elephant lay egg or give birth to a baby?",["Elephant lay eggs","Elephants give birth","Elephants can't have babies", "None of the Above"], "Elephants give birth"),
    new Question("<img src='https://github.com/akaur5089/Project2Module1/blob/master/ImageQues1.jpg?raw=true'/><br/>What is the total amount of money shown in the picture? ", ["$1.00","$0.50","$1.25", "None of these"], "$1.25"),
    new Question("How did this code make you feel?", ["Both of these", "SAD SAD", "<img src=https://github.com/akaur5089/Project2Module1/blob/master/1.png?raw=true'/>Picture 1","<img src='https://github.com/akaur5089/Project2Module1/blob/master/2.png?raw=true'/>Picture 2"], "SAD SAD"),
];


var quiz = new Quiz(questions);
var retryquiz = new Quiz(questions);

render();
