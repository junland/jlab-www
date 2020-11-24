/**
 * @license
 * Copyright (c) 2018 Mahdi Farra (https://codepen.io/mahdi/pen/rOqpBJ)
 * Modifications by John Unland
 * SPDX-License-Identifier: MIT
 */

document.addEventListener('DOMContentLoaded', function() {

  document.getElementsByTagName('form')[0].onsubmit = function(evt) {
    evt.preventDefault(); // Preventing the form from submitting
    checkWord(); // Do your magic and check the entered word/sentence
    window.scrollTo(0,150);
  }

  // Get the focus to the text input to enter a word right away.
  document.getElementById('terminalTextInput').focus();
  
  function clearTerminal(){
    term = document.getElementById('terminalReslutsCont');
    while (term.firstChild) {
      term.removeChild(term.firstChild);
     }
  }

  // Getting the text from the input
  var textInputValue = document.getElementById('terminalTextInput').value.trim();

  //Getting the text from the results div
  var textResultsValue = document.getElementById('terminalReslutsCont').innerHTML;

  // Clear text input
  var clearInput = function(){
    document.getElementById('terminalTextInput').value = "";
  }

  // Scroll to the bottom of the results div
  var scrollToBottomOfResults = function(){
    var terminalResultsDiv = document.getElementById('terminalReslutsCont');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }

  // Scroll to the bottom of the results
  scrollToBottomOfResults();

  // Add text to the results div
  var addTextToResults = function(textToAdd){
    document.getElementById('terminalReslutsCont').innerHTML += "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  }

  // Getting the list of keywords for help & posting it to the screen
  var postHelpList = function(){
    // Array of all the help keywords
    var helpKeyWords = [
      "### Useful Commands ###",
      "- 'projects' will display information several projects that I'm working on or have completed.",
      "- 'linkedin' will open a new window to my Linkedin account.",
      "- 'date' will display the current date and time.",
      "- 'credits' will display credits.",
      "- 'clear' will clear the screen.",
      "### Fun Commands ###",
      "- 'open [Website URL]' will open a website URL to open it in the browser. (Without www.)",
      "- 'google [Keyword]' will search Google for your keyword(s).",
      "- 'youtube [Keyword]' will search Youtube for your keyword(s).",
      "- 'wiki [Keyword]' will search Wikipedia for your keyword(s).",
    ].join('<br>');
    addTextToResults(helpKeyWords);
  }

  // Getting the time and date based on browser time.
  var getTimeAndDate = function(){
    var timeAndDate = new Date();
    var timeHours = timeAndDate.getHours();
    var timeMinutes = timeAndDate.getMinutes();
    var dateDay = timeAndDate.getDate();
    console.log(dateDay);
    var dateMonth = timeAndDate.getMonth() + 1; // Because JS starts counting months from 0
    var dateYear = timeAndDate.getFullYear(); // Otherwise we'll get the count like 98,99,100,101...etc.

    if (timeHours < 10){ // if 1 number display 0 before it.
      timeHours = "0" + timeHours;
    }

    if (timeMinutes < 10){ // if 1 number display 0 before it.
      timeMinutes = "0" + timeMinutes;
    }

    var currentTime = timeHours + ":" + timeMinutes;
    var currentDate = dateMonth + "/" + dateDay + "/" + dateYear;

    addTextToResults(currentDate + " at " + currentTime)
  }

  // Opening links in a new window
  var openLinkInNewWindow = function(linkToOpen){
    window.open(linkToOpen, '_blank');
    clearInput();
  }

  // Having a specific text reply to specific strings
  var textReplies = function() {
    switch(textInputValueLowerCase){
      // funny replies [START]
        
      case "linkedin":
        clearInput();
        addTextToResults('Linking to Linkedin profile...');
        openLinkInNewWindow('https://www.linkedin.com/in/junland/');
        break;
      
      case "projects":
        clearInput();
        addTextToResults('jlab.space - Landing page for projects powered by Nginx and Linux.');
        addTextToResults("<a target='_blank' href='https://github.com/project-gemstone'>Project Gemstone</a> - Expirmental distributed Linux operating system.");
        break;

      case "credits":
        clearInput();
        addTextToResults("'Web Terminal' - Forked Codepen Project from <a target='_blank' href='https://codepen.io/mahdi/pen/rOqpBJ'>Mahdi Farra</a>. (MIT Licensed)");
        break;

      case "youtube":
        clearInput();
        addTextToResults("Type youtube + something to search for.");
        break;

      case "google":
        clearInput();
        addTextToResults("Type google + something to search for.");
        break;

      case "date":
        clearInput();
        getTimeAndDate();
        break;
      
      case "clear":
        clearInput();
        clearTerminal();
        break;

      case "help":
      case "?":
        clearInput();
        postHelpList();
        break;

      default:
      clearInput();
      addTextToResults("<p><i>The command " + "<b>" + textInputValue + "</b>" + " was not found. Type <b>Help</b> to see all commands.</i></p>");
      break;
    }
  }

// Main function to check the entered text and assign it to the correct function
  var checkWord = function() {
    textInputValue = document.getElementById('terminalTextInput').value.trim(); //get the text from the text input to a variable
    textInputValueLowerCase = textInputValue.toLowerCase(); //get the lower case of the string

    if (textInputValue != ""){ //checking if text was entered
      addTextToResults("<p class='userEnteredText'>$> " + textInputValue + "</p>");
      if (textInputValueLowerCase.substr(0,5) == "open ") { //if the first 5 characters = open + space
        openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5));
        addTextToResults("<i>The URL " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,8) == "youtube ") {
        openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8));
        addTextToResults("<i>I've searched on YouTube for " + "<b>" + textInputValue.substr(8) + "</b>" + " it should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,7) == "google ") {
        openLinkInNewWindow('https://www.google.com/search?q=' + textInputValueLowerCase.substr(7));
        addTextToResults("<i>I've searched on Google for " + "<b>" + textInputValue.substr(7) + "</b>" + " it should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,5) == "wiki "){
        openLinkInNewWindow('https://wikipedia.org/w/index.php?search=' + textInputValueLowerCase.substr(5));
        addTextToResults("<i>I've searched on Wikipedia for " + "<b>" + textInputValue.substr(5) + "</b>" + " it should be opened now.</i>");
      } else{
        textReplies();
      }
    }
  };

});
