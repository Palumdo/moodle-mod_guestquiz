// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * This generate the HTML from the GIFT format Matching and text question are not supported
 * Matching because it can be tricky to implement and Text because no one will read it.
 * It's not a real GIFT format it's more a sGift format s is for simple, subset, small,... 
 *
 * @package     mod_guestquiz
 * @copyright   2023 UCLouvain
 * @author      Dominique Palumbo 
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
 
/*
Question object description
  obj.title
  obj.question
  obj.type -> NUMERIC,BOOLEAN,MULTIPLE_CHOICE,SHORT_ANSWER,MULTIPLE_CHOICE_MULT,(MATCHING,TEXT) not supported
  obj.feedback -> Global feedback
  obj.answers[]
    obj.answers[].prefix
    obj.answers[].text
    obj.answers[].feedback
    obj.answers[].value
*/ 
function getQuestions(quiz) {
    // Clean unused data, html (except b,i,u,span,br).
    quiz = cleanUp(quiz); 
    // Try to manage escape chars.
    quiz = escapeCmdChar(quiz); 

    // Split string to questions.
    var questions = quiz.split(/\n\s*\n/);
    // Create question object.
    for (let i=0;i<questions.length;i++) {
        let str = questions[i];
        // Get the string where the question internal title start.
        str = str.substring(str.indexOf("::"));
        // Remove all carriage return.
        str = str.replaceAll(/\n/ig,'').trim();
        // Object question.
        questions[i] = {};
        // Global feedback 
        questions[i].feedback = ""; 
        // All block
        questions[i].str = str;
        // internal title is between :: ::
        let title = str.match(new RegExp("::" + "(.*?)" + "::"));
        // If there is one else use the question as title
        if (title !== null) {
            questions[i].title = title[1];
            if (str.slice(-1) == '}' ) {
                questions[i].question = str.slice(0, str.indexOf("{"));
                questions[i].question = questions[i].question.replace('::'+questions[i].title+'::', '').trim();
            } else {
                questions[i].question = questions[i].str.replace('::'+questions[i].title+'::', '').trim();
            }
        } else {
            if (str.slice(-1) == '}' ) {
                questions[i].title = str.slice(0, str.indexOf("{"));
                questions[i].question = questions[i].title;
            } else {
                questions[i].title = "NO_TITLE";
                questions[i].question = "";
            }
        }
        // Anwsers are between {}.
        let answers = str.match(new RegExp("{" + "(.*?)" + "}"));
        questions[i].answers = answers[1];
        // The first character of the answer will determine the type.
        // Matching and text are not supported
        let temp = questions[i].answers.trim().split(/((?<!\\)[=~](?:(?:\\[=~#\{\}])|(?:[^=~]))+)/g).filter(function(t){return t.trim()});
        type = "UNKNOWN";
        if (temp.length > 0) {
            if (temp[0].charAt(0) == '#') {
                type = "NUMERIC";
            } else if (['T','F','TRUE','FALSE'].indexOf(temp[0].toUpperCase()) > -1) {
                type = "BOOLEAN";
            } else if (temp.find(a =>a.includes("->")) !== undefined) {
                type = "MATCHING";
            } else if (temp.find(function (element) {return element.charAt(0) == "="}) !== undefined && temp.find(function (element) {return element.charAt(0) == "~"}) !== undefined) {
                type = "MULTIPLE_CHOICE";
            } else {
                if (temp.find(function (element) {return element.charAt(0) == "="}) !== undefined) {
                    type = "SHORT_ANSWER";
                }
                if (temp.find(function (element) {return element.charAt(0) == "~"}) !== undefined) {
                    type = "MULTIPLE_CHOICE_MULT";
                }
            }
        } else {
            type = "TEXT";
        }
        questions[i].type = type;
        // Detailed answers.
        switch (type) {
            case 'NUMERIC':
                temp = questions[i].answers.trim().slice(1).split(/((?<!\\)[=~](?:(?:\\[=~#\{\}])|(?:[^=~]))+)/g).filter(function(t){return t.trim()});
                questions[i].answers = [];
                for (let j=0;j<temp.length;j++) {
                    questions[i].answers[j] = {};
                    // Global feedback is supposed to be at the end of the block the last #### win
                    questions[i].feedback = globalFeedback(temp[j].split('####')); 
                    // Feedback
                    let split = temp[j].split('#');
                    let text = split[0];
                    questions[i].answers[j].feedback = getFeedback(split);
                    // Prefix.
                    questions[i].answers[j].prefix = "=";
                    // Value.
                    questions[i].answers[j].value = getValue(text.match(/\%(.*?)\%/));
                    // Answer text.
                    questions[i].answers[j].text = text.trim().replace(/%.*%/, '');
                    if (questions[i].answers[j].text.charAt(0) == '=') {
                      questions[i].answers[j].text = questions[i].answers[j].text.slice(1);
                    }
                }
                break;
            case 'BOOLEAN':
                questions[i].answers = [];
                questions[i].answers[0] = {};
                questions[i].answers[0].prefix = '~';
                questions[i].answers[0].text = 'True';
                questions[i].answers[0].feedback = '';
                questions[i].answers[0].value = 0;
                questions[i].answers[1] = {};
                questions[i].answers[1].prefix = '~';
                questions[i].answers[1].text = 'False';
                questions[i].answers[1].feedback = '';
                questions[i].answers[1].value = 0;
                if(temp[0] == 'T' || temp[0] == 'TRUE') {
                    questions[i].answers[0].value = 1;
                    questions[i].answers[0].prefix = '=';
                } else {
                    questions[i].answers[1].value = 1;
                    questions[i].answers[1].prefix = '=';
                }
                break;
            case 'MATCHING':
                questions[i].answers = [];
                for (let j=0;j<temp.length;j++) {
                    questions[i].answers[j] = {};
                    temp[j] = temp[j].slice(1);
                    let text = temp[j].split('->');
                    let textLeft = text[0];
                    let textRight = text[1];
                    questions[i].answers[j].prefix = "=";
                    questions[i].answers[j].textLeft = textLeft.trim();
                    questions[i].answers[j].textRight = textRight.trim();
                    questions[i].answers[j].feedback = "";
                    questions[i].answers[j].value = 1;
                }        
                break;
            case 'MULTIPLE_CHOICE':
                questions[i].answers = [];
                for (let j=0;j<temp.length;j++) {
                    questions[i].answers[j] = {};
                    // Global feedback is supposed to be at the end of the block the last #### win
                    questions[i].feedback = globalFeedback(temp[j].split('####')); 
                    // Prefix.
                    let prefix = temp[j].charAt(0);
                    questions[i].answers[j].prefix = prefix;
                    // Feedback
                    temp[j] = temp[j].slice(1); // Remove the prefix.
                    let split = temp[j].split('#');
                    // Answer text.
                    questions[i].answers[j].text = split[0].trim();
                    questions[i].answers[j].feedback = getFeedback(split);
                    // Value.
                    questions[i].answers[j].value = 0;
                    if(prefix == '=') {
                        questions[i].answers[j].value = 1;
                    }
                }
                break;
            case 'SHORT_ANSWER':
                questions[i].answers = [];
                for (let j=0;j<temp.length;j++) {
                  questions[i].answers[j] = {};
                  questions[i].feedback = globalFeedback(temp[j].split('####')); 
                  temp[j] = temp[j].slice(1); // Remove prefix.
                  let split = temp[j].split('#');
                  questions[i].answers[j].text = split[0].trim().replace(/%.*%/, '');
                  questions[i].answers[j].feedback = getFeedback(split);
                  questions[i].answers[j].prefix = "=";
                  questions[i].answers[j].value = 1;            
                }
                break;
            case 'MULTIPLE_CHOICE_MULT':
                questions[i].answers = [];
                for (let j = 0; j < temp.length; j++) {
                    questions[i].answers[j] = {};
                    questions[i].feedback = globalFeedback(temp[j].split('####')); 
                    // Prefix
                    questions[i].answers[j].prefix = temp[j].charAt(0);
                    temp[j] = temp[j].slice(1); // Remove prefix.
                    let split = temp[j].split('#');
                    let text = split[0];
                    questions[i].answers[j].feedback = getFeedback(split);
                    let percent = text.match(/\%(.*?)\%/);
                    questions[i].answers[j].text = text.trim().replace(/%.*%/, ''); // Percent before because it's remove.
                    questions[i].answers[j].value = 0;
                    if(percent !== null) {
                        questions[i].answers[j].value = 1/(100/percent[1]);
                    } 
                }        
                break;
            case 'TEXT':
                break;
            case 'UNKNOWN':
                break;
        }
        // Replace funny temp character by real escaped one
        questions[i].str = unescapeCmdChar(questions[i].str);
        questions[i].question = unescapeCmdChar(questions[i].question);
        questions[i].feedback = unescapeCmdChar(questions[i].feedback);
        for (let j=0; j < questions[i].answers.length;j++) {
          questions[i].answers[j].text = unescapeCmdChar(questions[i].answers[j].text);
          questions[i].answers[j].feedback = unescapeCmdChar(questions[i].answers[j].feedback);
        }
    }
    console.log(questions);
    return questions;
}

  function display(quiz) {
    try {
        var questions = getQuestions(quiz);
        let quizOut = "";
        for (let i=0; i<questions.length; i++) {
            let obj = questions[i];
            let id = i+1;
            switch (obj.type) {
                case 'NUMERIC':
                    quizOut += '<div id="q' + i + '"><b>Question ' + id + '</b> : ' + obj.question + '</div>';
                    quizOut += '<div id="a' + i + '">';
                    quizOut += '    <div class="form-outline">' +
                               '        <input type="number" id="typeNumber'+id+'" style="max-width:100px;" class="form-control"/>' +
                               '    </div>';
                    quizOut += '</div>';
                    break;
                case 'BOOLEAN':
                    quizOut += '<div id="q' + i + '"><b>Question ' + id + '</b> : ' + obj.question + '</div>';
                    quizOut += '<div id="a' + i + '">' +
                               '<div class="form-check">' +
                               '   <input class="form-check-input" type="radio" name="bool'+id+'Radio" id="bool'+id+'Radio_true" value="true">' +
                               '   <label class="form-check-label" for="bool'+id+'Radio_true">True</label>' +
                               '</div>' +
                               '<div class="form-check">' +
                               '   <input class="form-check-input" type="radio" name="bool'+id+'Radio" id="bool'+id+'Radio_false" value="false">' +
                               '   <label class="form-check-label" for="bool'+id+'Radio_false">False</label>' +
                               '</div>' +
                               '</div>';
                    break;
                case 'MATCHING':
                    quizOut += '<div id="q' + i + '"><b>Question ' + id + '</b> : ' + obj.question + '</div>';
                    quizOut += '<div id="a' + i + '">The question type matching is not supported</div>';
                    break;
              case 'MULTIPLE_CHOICE':
                  let value = "";
                  quizOut += '<div id="q' + i + '"><b>Question ' + id + '</b> : ' + obj.question + '</div>';
                  quizOut += '<div id="a' + i + '">';
                  for (let j=0; j < obj.answers.length; j++) {
                      quizOut += '<div class="form-check">' +
                                 '    <input class="form-check-input" type="radio" name="multi'+id+'Radio" id="multi'+id+'Radio_'+j+'" value="'+j+'">' +
                                 '    <label class="form-check-label" for="multi'+id+'Radio_'+j+'">'+obj.answers[j].text+'</label>' +
                                 '</div>';
                  }
                  quizOut += '</div>';
                  break;
              case 'SHORT_ANSWER':
                  let q = obj.str;
                  let t = q.match(new RegExp("::" + "(.*?)" + "::"));
                  if (t !== null) {
                    q = q.replace(t[0], '');
                  }
                  let shortInput = '<input type="text" class="form-control" style="max-width:25%;margin:0 5px 0 5px" id="short'+id+'">';
                  q = q.replace(/\{.*?[^\)]\}/g, shortInput);
                  quizOut += '<div class="input-group" id="q' + i + '"><b>Question ' + id + '</b> : ' + q + '</div>';
                  break;
              case 'MULTIPLE_CHOICE_MULT':
                  quizOut += '<div id="q' + i + '"><b>Question ' + id + '</b> : ' + obj.question + '</div>';
                  quizOut += '<div id="a' + i + '">';
                  for (let j=0; j < obj.answers.length; j++) {
                    // value j => obj.answers[j].text
                    quizOut += '<div class="form-check">' +
                               '    <input class="form-check-input" type="checkbox" name="multi'+id+'checkbox_'+j+'" id="multi'+id+'checkbox_'+j+'" value="'+j+'">' +
                               '    <label class="form-check-label" for="multi'+id+'checkbox_'+j+'">'+obj.answers[j].text+'</label>' +
                               '</div>';
                  }
                  quizOut += '</div>';
                  break;
            case 'TEXT':
                quizOut += '<div id="q' + i + '"><b>Question ' + id + '</b> : ' + obj.question + '</div>';
                quizOut += '<div id="a' + i + '">The question type text is not supported</div>';
                break;
            case 'UNKNOWN':
                break;
        }
        quizOut += '<div id="feedback_'+id+'" style="font-weight:bold;width:100%;border:1px solid black;border-radius:5px;height1.25em;padding:5px;margin:5px;background:#000"></div>';
      }
      $('#guestquiz_gift').empty();
      quizOut += '<button class="btn btn-primary" type="button" onclick="validate()">Validate</button>';
      $(quizOut).appendTo($('#guestquiz_gift'));
    } catch(error) {
      $("#ucl_guest_quiz_message").html('<span style="color:red">There is a format problem</span>');
    }
  }
 
function validate() {
    var questions = getQuestions(gQuiz);
    var score = 0;
    var nbquestion = 0;
    var point = 0;
    var fb = '';
    for (let i = 0;i < questions.length; i++) {
        let obj = questions[i];
        let id = i + 1;
        let name = "";
        let ret = "";
        switch (obj.type) {
          case 'NUMERIC':
              nbquestion++;
              name = 'typeNumber'+id;
              ret = $('#'+name).val();
              point = 0;
              $('#feedback_'+id).css('background','#0000');
              if (ret != '') {
                  let aVal = [];
                  for (let i = 0; i < obj.answers.length; i++) {
                      aVal = obj.answers[i].text.split(':');
                      if (ret >= aVal[0]-aVal[1] && ret <= parseFloat(aVal[0])+parseFloat(aVal[1])) {
                          // Keep the feedback and point with the biggest value.
                          if (obj.answers[i].value > point) { 
                            point = obj.answers[i].value;
                            fb = obj.answers[i].feedback;
                          }
                      }
                  }
              } else { // No answer.
                  $('#feedback_'+id).css('color','#ff0000');
                  $('#feedback_'+id).html('Wrong answer');
              }
              // Check that the answer was a good one.
              if (point > 0) {
                  score += point;
                  $('#feedback_'+id).css('color','rgb(84, 157, 84)');
                  if (fb == '') {
                    fb = 'Good answer';
                  }
                  $('#feedback_'+id).html(fb);
              } else {
                  $('#feedback_'+id).css('color','#ff0000');
                  $('#feedback_'+id).html('Wrong answer');
              }
              $('#feedback_'+id).html($('#feedback_'+id).html()+"<br><span style='color:black'>"+obj.feedback+"</span>");
              break;
          case 'BOOLEAN':
              nbquestion++;
              name = 'bool'+id+'Radio';
              ret = $('input[name="'+name+'"]:checked').val();
              $('#feedback_'+id).css('background','#0000');
              if ( (ret == 'true' && obj.answers[0].prefix == '=') || (ret == 'false' && obj.answers[1].prefix == '=')) {
                  $('#feedback_'+id).css('color','rgb(84, 157, 84)');
                  $('#feedback_'+id).html('Good answer');
                  score += 1;
              } else {
                  $('#feedback_'+id).css('color','#ff0000');
                  $('#feedback_'+id).html('Wrong answer');
              }
              break;
          case 'MATCHING':
                $('#feedback_'+id).css('background','#0000');
                $('#feedback_'+id).css('color','#ff0000');
                $('#feedback_'+id).html('Question type not supported');
                break;
          case 'MULTIPLE_CHOICE':
              nbquestion++;
              name = 'multi'+id+'Radio';
              $('#feedback_'+id).css('background','#0000');
              ret = $('input[name="'+name+'"]:checked').val();
              if (ret !== undefined) {
                  for (let i = 0; i < obj.answers.length; i++) {
                      if (ret == i && obj.answers[i].prefix == '=') {
                          $('#feedback_'+id).css('color','rgb(84, 157, 84)');
                          if(obj.answers[i].feedback != '') {
                              $('#feedback_'+id).html(obj.answers[i].feedback);
                          } else {
                              $('#feedback_'+id).html('Right answer');
                          }
                          score += 1;
                          i = obj.answers.length;
                        }
                      if (ret == i && obj.answers[i].prefix == '~') {
                          $('#feedback_'+id).css('color','#ff0000');
                          if(obj.answers[i].feedback != '') {
                              $('#feedback_'+id).html(obj.answers[i].feedback);
                          } else {
                              $('#feedback_'+id).html('Wrong answer');
                          }
                          i = obj.answers.length;
                      }
                  }
              } else {
                  $('#feedback_'+id).css('color','#ff0000');
                  $('#feedback_'+id).html('Wrong answer');
              }
              $('#feedback_'+id).html($('#feedback_'+id).html()+"<br><span style='color:black'>"+obj.feedback+"</span>");
              break;
          case 'SHORT_ANSWER':
              nbquestion++;
              name = 'short'+id;
              ret = $('#'+name).val();
              point = 0;
              $('#feedback_'+id).css('background','#0000');
              for (let i = 0; i < obj.answers.length; i++) {
                  if(ret.toLowerCase() == obj.answers[i].text.toLowerCase()) {
                    $('#feedback_'+id).css('color','rgb(84, 157, 84)');
                    if (obj.answers[i].feedback != '') {
                        $('#feedback_'+id).html(obj.answers[i].feedback);
                    } else {
                        $('#feedback_'+id).html('Good answer');
                    }
                    point = obj.answers[i].value;
                    score += obj.answers[i].value;
                  }
              }
              if (point == 0) {
                  $('#feedback_'+id).css('color','#ff0000');
                  $('#feedback_'+id).html('Wrong answer');
              }
              $('#feedback_'+id).html($('#feedback_'+id).html()+"<br><span style='color:black'>"+obj.feedback+"</span>");
              break;
          case 'MULTIPLE_CHOICE_MULT':
              nbquestion++;
              let lid = "";
              name = 'multi'+id+"checkbox_";
              fb = "";
              $('#feedback_'+id).css('background','#0000');
              $('#feedback_'+id).css('color','#000');
              for (let i = 0; i < obj.answers.length; i++) {
                  if ($('#'+name+i).is(":checked")) {
                      if (obj.answers[i].feedback != "")  {
                          if (obj.answers[i].value > 0) {
                              fb += "<span style='color:rgb(84, 157, 84)'>";
                          } else {
                              fb += "<span style='color:rgb(84, 157, 84)'>";
                          }
                          fb += obj.answers[i].text + " " + obj.answers[i].feedback + '</span><br>';
                      } else {
                          if (obj.answers[i].value > 0) {
                              fb += "<span style='color:rgb(84, 157, 84)'>" + obj.answers[i].text + " was a good answer.</span><br>";
                          } else {
                              fb += "<span style='color:#ff0000'>" + obj.answers[i].text + " was a wrong answer.<br>";
                          }
                      }
                      score += obj.answers[i].value;
                  }
              }
              if (fb != "") {
                  $('#feedback_'+id).html(fb);
              } else {
                  $('#feedback_'+id).css('color','#ff0000');
                  $('#feedback_'+id).html('Wrong answer');
              }
              $('#feedback_'+id).html($('#feedback_'+id).html()+"<br><span style='color:black'>"+obj.feedback+"</span>");
              break;
          case 'TEXT':
              $('#feedback_'+id).css('background','#0000');
              $('#feedback_'+id).css('color','#ff0000');
              $('#feedback_'+id).html('Question type not supported');
              break;
          case 'UNKNOWN':
              break;
        }
    }
    $('#guestquiz_score').html('Score:'+score.toFixed(2)+"/"+nbquestion);
    $('#guestquiz_score').css('display', '');
  }

function unescapeCmdChar(quiz) {
    quiz = quiz.replaceAll(/🧝/ig,'=');
    quiz = quiz.replaceAll(/🤦/ig,'~‍');
    quiz = quiz.replaceAll(/🧛/ig,'#‍‍');
    quiz = quiz.replaceAll(/🧟/ig,'<br>‍‍‍'); // Verify it !.
    quiz = quiz.replaceAll(/☻☻☻/ig,'‍‍‍');
    /*  
    let base64 = str.match(new RegExp('<img src="data' + '(.*?)' + 'image'));
    if (base64 !== null) {
      str = str.replace(base64[0], '<img src="data:image');
    }
    */
    return quiz;
}

function cleanUp(quiz) {
    // Put comment before category info
    quiz = quiz.replace('$CATEGORY', '////$CATEGORY');
    // Remove all comments.
    quiz = quiz.replace(/("([^\\"]|\\")*")|('([^\\']|\\')*')/g, (m) => m.replace(/\//g, '\1')).replace(/(\/\*[^*]+\*\/)|(\/\/[^\n]+)/g, '').replace(/\1/g, '/');
    // Remove all [html]
    quiz = quiz.replaceAll(/\[html\]/ig,'').trim();
    // Remove all html...
    //quiz = quiz.replaceAll(/(<([^>]+)>)/ig, "");
    var keep = {b: true,i: true,u: true,br: true, span: true};
    quiz = quiz.replace(/<\/?([a-z]+) ?[^>]*>/g, function(wholeMatch, tagName) {
        if (keep[tagName]) {
            return wholeMatch;
        }
        return '';
    });  

    // Remove first and last empty lines
    while (quiz.charAt(0) == '\n') {
        quiz = quiz.slice(1);
    }
    while (quiz.charAt(quiz.length-1) == '\n') {
        quiz = quiz.slice(0, -1);
    }
    
    return quiz;
}

function escapeCmdChar(quiz) {
    quiz = quiz.replaceAll(/☻☻☻=/ig,'🧝');
    quiz = quiz.replaceAll(/☻☻☻~/ig,'🤦‍');
    quiz = quiz.replaceAll(/☻☻☻#/ig,'🧛‍‍');
    quiz = quiz.replaceAll(/☻☻☻n/ig,'🧟‍‍‍');
    quiz = quiz.replaceAll(/🧟‍‍‍  🧟‍‍‍/ig,'🧟{‍‍‍‍‍');
    quiz = quiz.replaceAll(/🧟‍‍‍🧟‍‍‍/ig,'🧟{‍‍‍‍‍');

    return quiz;
}
// Global feedback.
function globalFeedback(gfb) {
    if (gfb.length > 1) {
        return gfb[1];
    } 
    return "";
}
// Feedback.
function getFeedback(split) {
    if (split.length > 1) {
        return split[1].trim();
    }
    return "";
}
// Answer value.
function getValue(percent) {
    if (percent === null) {
        return 1;
    } 
    return (1/(100/percent[1]));
}