//Javascript file
var setIntervalID;
var setTimeOutID;
var correctAnswer = 0;
var uncorrectAnswer = 0;
var unAnswerred = 0;
var count = 30;
var current = 0;

$(document).ready(function(){

var questionArray = [
    {question : "When was William Shakespeare born?",
    answers :["23rd April 1564","23rd May 1654","15th June 1632", "4th May 1564"],
    correctAnswer  : "23rd April 1564",
    image : ""}, 
    
    {question: "Who was Henry VIII's first wife?",
    answers: ["Cleopatra", "Catherine of Aragon", "Catherine Howard", "Jeanne Seymour"],
    correctAnswer : "Catherine of Aragon",
    image : ""},

    {question: "When did Margaret Thatcher become Prime Minister?",
    answers: ["1982", "1979", "1980", "1975"],
    correctAnswer: "1979",
    image: ""},

    {question: "When did the Cold War ended?",
    answers: ["1978", "1985", "1989", "1998"],
    correctAnswer: "1989",
    image: ""},

    {question: "When was the euro introduced as legal currency on the world market?",
    answers: ["January, 1st 1999", "January, 1st 2001", "December, 31st 1999", "December, 31st 2001"],
    correctAnswer: "January, 1st 1999",
    image: ""},

    {question: "Which British coin was also known as a bob?",
    answers: ["Crown", "Florin", "Shiling", "Penny"],
    correctAnswer: "Shiling",
    image: ""}]

//console.log(questionArray[0].question, questionArray[0].answers);


function getQuestion() {
    $("#timer").html(count + " secs");
    $("#questions-zone").html(questionArray[current].question);
    var answersArr = questionArray[current].answers;
    console.log(answersArr);
    var buttonsArr = [];

    $.each(answersArr, function(index){ 
        console.log("in the for loop");
        //var button = $("<button>");
        $("#answer-zone").append("<button>"+ answersArr[index] + "</button>");
        index++;
        //button.text(answersArr[index]);
        //button.attr("data-id", index);
        //$("answer-zone").append(button);
    })


    window.triviaCounter = setInterval(timer, 1000);
};

function timer() {
    count--;
    if (count <= 0) {
        setTimeout(function() {
            nextQuestion();
        });

    } else {
        $("#timer").html(count + " secs");
    }
};

function nextQuestion() {
    current++;
    clearInterval(window.triviaCounter);
    count = 30;
    $("#timer").html("");
    setTimeout(function() {
        //reset();
        getQuestion();
    }, 1000)
};

// function reset() {
//     $('div[id]').each(function(item) {
//         $(this).html('');
//     });
//     $('.correct').html('Correct answers: ' + _t.answers.correct);
//     $('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
// };

// _t.answer = function(correct) {
//     var string = correct ? 'correct' : 'incorrect';
//     _t.answers[string]++;
//     $('.' + string).html(string + ' answers: ' + _t.answers[string]);
// };
// return _t;
// };

var Trivia;

$("#start").click(function() {
    //$(this).hide();
   // $("div").html("");
    //Trivia = new $(window());
    getQuestion();
});

$("answer-zone").on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        index = questionArray[current].correctAnswer,
        correct = questionArray[current].answers[index];

    if (userPick !== index) {
        uncorrectAnswer++;
    } else {
       correctAnswer++;
    }
    nextQuestion();
});


// function initial(){
//     $("#start").click(function(){
//     clearInterval(setIntervalID);
//     setIntervalID = setInterval(getQuestion,30000);
//     })
// }




});
