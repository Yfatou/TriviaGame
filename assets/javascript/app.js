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

//This function will get the question in the array and display it in the right div
//then it take the choice of answers for that question and display them in the div
function getQuestion() {
    $("#timer").html("Time Remaining: " + count + " secs");
    $("#questions-zone").html(questionArray[current].question);
    var answersArr = questionArray[current].answers;
    console.log(answersArr);
    var buttonsArr = [];

    //For loop that goes trough the answer array and display the different choices
    $.each(answersArr, function(index){ 
        //$("#answer-zone").append("<button>"+ answersArr[index] + "</button>");
        //index++;
        var a = $("<button>");
          a.addClass("answer");
          a.attr("data-name", answersArr[index]);
          a.text(answersArr[index]);
          $("#answer-zone").append(a);
          buttonsArr.push(answersArr[index]);
          console.log(buttonsArr[index]);
          index++;
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
        $("#timer").html("Time Remaining: " + count + " secs");
    }
};

function nextQuestion() {
    current++;
    $("#answer-zone").empty();
    clearInterval(window.triviaCounter);
    count = 30;
    $("#timer").html("");
    setTimeout(function() {
        getQuestion();
    }, 1000)
};


$("#start").click(function() {
    $(this).hide();
    getQuestion();
});

//$("#answer-zone").on("click", function() {
$("button").click(function(){  
    console.log("in button click function") ;
    var userPick = $(this).val();
    console.log(userPick);
    //$(this).data("id"),
        index = questionArray[current].correctAnswer,
        correct = questionArray[current].answers[index];

    if (userPick !== index) {
        uncorrectAnswer++;
    } else {
       correctAnswer++;
    }
    nextQuestion();
});



});
