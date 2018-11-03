//Javascript file
var setIntervalID;
var correctAnswer = 0; //Counter for teh correct answers
var uncorrectAnswer = 0; //Counter for the incorrect answers
var unAnswerred = 0;//counter for the unanswerred questions
var count = 10;//the number of seconds to answer a question
var current = 0; //the id of the current question
var right = false;//to store if the player answered right or no
var answerred = false;//to store if the player answered the question or not

$(document).ready(function(){

var questionArray = [ //Array of questions
    {question : "When was William Shakespeare born?",
    answers :["April 26th 1564","May 23rd 1654","June 15th 1632", "May 4th 1564"],
    rightAnswer  : "April 26th 1564",
    image : "/TriviaGame/assets/images/ShakespeareGif.webp"}, 
    
    {question: "Who was Henry VIII's first wife?",
    answers: ["Cleopatra", "Catherine of Aragon", "Catherine Howard", "Jeanne Seymour"],
    rightAnswer : "Catherine of Aragon",
    image : "/TriviaGame/assets/images/catherineAGif.webp"},

    {question: "When did Margaret Thatcher become Prime Minister?",
    answers: ["1982", "1979", "1980", "1975"],
    rightAnswer: "1979",
    image: "/TriviaGame/assets/images/ThatcherGif.webp"},

    {question: "When did the Cold War ended?",
    answers: ["1978", "1985", "1989", "1998"],
    rightAnswer: "1989",
    image: "/TriviaGame/assets/images/coldWarGif.webp"},

    {question: "When was the euro introduced as legal currency on the world market?",
    answers: ["January, 1st 1999", "January, 1st 2001", "December, 31st 1999", "December, 31st 2001"],
    rightAnswer: "January, 1st 1999",
    image: "/TriviaGame/assets/images/euroGif.webp"},

    {question: "Which British coin was also known as a bob?",
    answers: ["Crown", "Florin", "Shiling", "Penny"],
    rightAnswer: "Shiling",
    image: "/TriviaGame/assets/images/shiling.jpeg"}]

function initial(){
    getQuestion();
}

//to reset the divs before the next question
function reset(){
    console.log("in start over reset");
    $("#questions-zone").empty();
    $("#answer-zone").empty();
    $("#img-zone").empty();
    $("#startOver").hide();
    right = false;
    answerred = false;
};

//This function will get the question in the array and display it in the right div
//then it take the choice of answers for that question and display them in the div
function getQuestion() {
    reset();
    
    if (questionArray[current]){//we are not at the end of the questions array
        $("#timer").html("Time Remaining: " + count + " secs");
        $("#questions-zone").html(questionArray[current].question);//Display the current question
        var answersArr = questionArray[current].answers;

        //For loop that goes trough the answer array and display the different choices of answer
        $.each(answersArr, function(index){ 
            //The different choices of answer are displayed in buttons
            $("#answer-zone").append("<button>"+ answersArr[index] + "</button>");
            index++;
        })
        setIntervalID = setInterval(timer, 1000);
    }else { //No more question in the array, game over
        $("#questions-zone").html("All done, heres how you did!");
        $("#answer-zone").html("<br> Corrects answers: " + correctAnswer);
        $("#answer-zone").append("<br> Incorrects answers: " + uncorrectAnswer);
        $("#answer-zone").append("<br> Unanswered: " + (questionArray.length - (correctAnswer + uncorrectAnswer)));
        $("#startOver").text("Start Over?").appendTo("#answer-zone").show();
    } 
};



//The timer function will decrement the time and get to the next question if the time is over
function timer() {
    count--;
    //If the time remaining is 0 seconds
    if (count <= 0) {
        setTimeout(function() {//TimeOut
            nextQuestion();    //and we display the other question
        });

    } else {//otherwise it displays the time remaining
        $("#timer").html("Time Remaining: " + count + " secs");
    }
};

//Function to display the next question
function nextQuestion() {
    current++;      //Increment the value of the current question
    $("#questions-zone").empty();//Delete the content of the question zone  
    $("#answer-zone").empty();//Clear the content of the answer zone to avoid having multiple buttons
    $("#img-zone").empty();
    clearInterval(setIntervalID);
    displayResult(); //Display to the player the result of the last question
    count = 10; //Set the counter to 10 seconds
    $("#timer").html("");
    setTimeout(function() {
        getQuestion(); //get the next question
    }, 2000)
};

//This function, tell the player how he/she did at the previous question
function displayResult() {
    if (right == true){//The player answered right
        $("#timer").html("Time Remaining: " + count + " secs")
        $("#questions-zone").html("Well done - Congrats!!");
        $("#img-zone").html("<img src=" + questionArray[current-1].image + ">");
    }
    else { if (answerred){ //The player choose the wrong answer
        $("#timer").html("Time Remaining: " + count + " secs")
        $("#questions-zone").html("Uh oh... Nice Try.");
        $("#answer-zone").html("The Correct Answer was: " + questionArray[current-1].rightAnswer);
        $("#img-zone").html("<img src=" + questionArray[current-1].image + ">");
        } 
        else {//The player did not answer before the end of the timer
            $("#timer").html("Time Remaining: " + count + " secs")
            $("#questions-zone").html("Out of time...");
            $("#answer-zone").html("The Correct Answer was: " + questionArray[current-1].rightAnswer);
            $("#img-zone").html("<img src=" + questionArray[current-1].image + ">");
            }
    }
   
};

//The game begin when the user click on the start button
$("#start").click(function() {
    $(this).hide();//hide the start button
    reset();
    initial();
    //getQuestion();
});

//To restart the game when the user click on the button Start Over
$("#startOver").on("click", function() {
    $(this).hide();//hide the start button
    reset();
    initial();
    //getQuestion();
});


//When the user click on an answer
$("#answer-zone").on("click", "button", function() {
    answerred = true; 
    var userAnswer = $(this).text(); //value of the button clicked
    rightA = questionArray[current].rightAnswer; //the right expected answer for this question

    if (userAnswer == rightA) { //if the answer is right
        right = true;
        correctAnswer++;
    } else { //wrong answer
        right = false;
        uncorrectAnswer++;
    }
    nextQuestion(); //display the next question
});


});
