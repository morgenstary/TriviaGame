var pos = 0;
var correct = 0;
var test, test_status, question, choice, choices, chA, chB, chC, chD;

var questions = [
  ["What is the collective name for a group of lions?", "A pack", " A bunch", " A pride", " A school", "C"],
  ["What are the only two mammals that lay eggs?", "A porcupine and a bat", "A kangaroo and a blue whale", "A beaver and a ostrich", "A spiny anteater and a duck billed platypus", "D"],
  ["What kind of animal is a Komodo dragon?", "A lizard", "A large frog", "A large butterfly", "A salamander", "A"],
  ["What kind of creature is a Portuguese man o' war?", "A bull", "A jellyfish", "A spider", "A bird", "B"],
  ["How many legs does a lobster have?", "6", "10", "8", "2", "B"],
  ["What type of animal is a Flemish giant?", "A whale", "A cat", "A rabbit", "A dog", "C"],
  ["From which animal is mohair obtained?", "The angora goat", "The himalayan yak", "The scottish sheep", "The african fox", "A"],
  ["What is the natural habitat of arboreal animals?", "In dark caves", "In hot and dry climates", "In the ocean", "In or amongst trees", "D"]
];

$(document).ready(function () {
  var $jumbotron = $(".jumbotron");
  var $start = $("#start");

  $start.click(function () {

    $(".header").hide("slow");
    $(".jumbotron").show();
    // set the timer to 60 seconds
    timer.setTimer(60);
    // start the 1 secound count down/
    timer.startTimer();

    

  });
});

function get(x) {
  return document.getElementById(x);
}

function renderQuestion() {
  test = get("test");
  if (pos >= questions.length) {
    test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct</h2>";
    get("test_status").innerHTML = "Test completed";
    clearInterval(timer.timerInterval);
    $("#timer-display").hide();
    
    
    
    // resets the variable to allow users to restart the test
    pos = 0;
    correct = 0;
    // stops rest of renderQuestion function running when test is completed
    return false;
  }
  get("test_status").innerHTML = "Question " + (pos + 1) + " of " + questions.length;
  question = questions[pos][0];
  chA = questions[pos][1];
  chB = questions[pos][2];
  chC = questions[pos][3];
  chD = questions[pos][4];
  test.innerHTML = "<h3>" + question + "</h3>";
  // the += appends to the data started on the line above
  test.innerHTML += "<input type='radio' name='choices' value='A'> " + chA + "<br>";
  test.innerHTML += "<input type='radio' name='choices' value='B'> " + chB + "<br>";
  test.innerHTML += "<input type='radio' name='choices' value='C'> " + chC + "<br>";
  test.innerHTML += "<input type='radio' name='choices' value='D'> " + chD + "<br><br>";
  test.innerHTML += "<button class='btn btn-primary btn-lg' onclick='checkAnswer()'>Submit Answer</button>";
}



function checkAnswer() {
  // use getElementsByName because there's an array which it will loop through
  choices = document.getElementsByName("choices");
  for (var i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      choice = choices[i].value;
    }
  }
  // checks if answer matches the correct choice
  if (choice == questions[pos][5]) {
    //each time there is a correct answer this value increases
    correct++;
  }
  // changes position of which character user is on
  pos++;
  // then the renderQuestion function runs again to go to next question
  renderQuestion();
}

window.addEventListener("load", renderQuestion, false);


// Timer object
var timer = {
  // property that represents the amount of seconds left on the timer (default is 30)
  secondsLeft: 30,
  // method that sets the secondsLeft on the timer object(used to set a new time before starting the timer)
  setTimer: function (seconds) {
    // set seconds left to whatever is passed in
    this.secondsLeft = seconds;
  },
  // method changes the innerHTML value of the timer div to the ammount of seconds left on the timer object
  changeHTML: function () {
    // hook in to #timer change html to secondsLeft
    $("#timer").html(timer.secondsLeft);
  },
  // property that represents the interval that will count down every second
  timerInterval: null,
  // manages the starting and clearing of our interval after it reaches 0
  startTimer: function () {
    // create a new interval that runs every 1s
    this.timerInterval = setInterval(function () {
      // if secondsLeft is greate than 0
      if (timer.secondsLeft > 1) {
        // take one off of seconds left
        timer.secondsLeft--;
        // change the html in #timer to show the seconds left
        timer.changeHTML();
      }
      // if seconds left is less than or equal to 0
      else {
        // clear the interval and stop counting down
        clearInterval(timer.timerInterval);
        test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct</h2>";
        get("test_status").innerHTML = "Time's Up!";
        $("#timer-display").hide();

      }
    }, 1000);
  }
}







































