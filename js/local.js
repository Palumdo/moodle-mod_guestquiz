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
        // Global feedback.
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
                    let split = temp[j].split('#');
                    let text = split[0];
                    questions[i].answers[j].feedback = getFeedback(split); // Feedback.
                    questions[i].answers[j].prefix = "="; // Prefix.
                    questions[i].answers[j].value = getValue(text.match(/\%(.*?)\%/)); // Value.
                    questions[i].answers[j].text = text.trim().replace(/%.*%/, ''); // Answer text.
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
                    // Global feedback is supposed to be at the end of the block the last #### win.
                    questions[i].feedback = globalFeedback(temp[j].split('####'));
                    let prefix = temp[j].charAt(0); // Prefix.
                    questions[i].answers[j].prefix = prefix;
                    temp[j] = temp[j].slice(1); // Remove the prefix.
                    let split = temp[j].split('#');
                    questions[i].answers[j].text = split[0].trim(); // Answer text.
                    questions[i].answers[j].feedback = getFeedback(split); // Feedback.
                    // Value.
                    questions[i].answers[j].value = 0;
                    if(prefix == '=') {
                        questions[i].answers[j].value = 1;
                    }
                }
                break;
            case 'SHORT_ANSWER':
                questions[i].answers = [];
                for (let j = 0; j < temp.length; j++) {
                    questions[i].answers[j] = {};
                    questions[i].feedback = globalFeedback(temp[j].split('####'));
                    temp[j] = temp[j].slice(1); // Remove prefix.
                    let split = temp[j].split('#');
                    questions[i].answers[j].text = split[0].trim().replace(/%.*%/, ''); // Text.
                    questions[i].answers[j].feedback = getFeedback(split); // Feedback.
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
                    questions[i].answers[j].feedback = getFeedback(split);  // Feedback.
                    let percent = text.match(/\%(.*?)\%/); // Get the % before it was removed.
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
    var i = 0;
    try {
        var questions = getQuestions(quiz);
        let quizOut = "";
        for (i = 0; i < questions.length; i++) {
            let obj = questions[i];
            let id = i+1;
            quizOut += '<div class="guestquiz_question">';
            quizOut += '<div class="guestquiz_question_title" id="q' + i + '"><b>Question ' + id + '</b>('+obj.title+')</div>'
            if (obj.type != 'SHORT_ANSWER') {
              quizOut += '<div class="guestquiz_question_text">' + obj.question + '</div>';
            }
            switch (obj.type) {
                case 'NUMERIC':
                    quizOut += '<div id="a' + i + '">';
                    quizOut += '    <div class="form-outline">' +
                               '        <input type="number" id="typeNumber'+id+'" class="form-control guestquiz_numeric"/>' +
                               '    </div>';
                    quizOut += '</div>';
                    break;
                case 'BOOLEAN':
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
                    quizOut += '<div class="guestquiz_warning" id="a' + i + '">' + allString['guestquiznotsupported'] + '</div>';
                    break;
                case 'MULTIPLE_CHOICE':
                    let value = "";
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
                    let shortInput = '<input type="text" class="form-control guestquiz_shortinput" id="short'+id+'">';
                    q = q.replace(/\{.*?[^\)]\}/g, shortInput);
                    quizOut += '<div class="input-group" id="qsa' + i + '">' + q + '</div>';
                    break;
              case 'MULTIPLE_CHOICE_MULT':
                  quizOut += '<div id="a' + i + '">';
                  for (let j=0; j < obj.answers.length; j++) {
                    quizOut += '<div class="form-check">' +
                               '    <input class="form-check-input" type="checkbox" name="multi'+id+'checkbox_'+j+'" id="multi'+id+'checkbox_'+j+'" value="'+j+'">' +
                               '    <label class="form-check-label" for="multi'+id+'checkbox_'+j+'">'+obj.answers[j].text+'</label>' +
                               '</div>';
                  }
                  quizOut += '</div>';
                  break;
            case 'TEXT':
                quizOut += '<div class="guestquiz_warning" id="a' + i + '">' + allString['guestquiznotsupported'] + '</div>';
                break;
            case 'UNKNOWN':
                break;
        }
        quizOut += '</div>';
        quizOut += '<div class="guestquiz_feedback" id="feedback_'+id+'"></div>';
      }
      $('#guestquiz_gift').empty();
      quizOut += '<div class="guestquiz_validate"><button class="btn btn-primary" type="button" onclick="validate()">'+allString['guestquizvalidate']+'</button></div>';
      $(quizOut).appendTo($('#guestquiz_gift'));
    } catch(error) {
      console.log(error);
      $("#ucl_guest_quiz_message").html('<span class="guestquiz_error">'+allString['guestquizbadformat']+'</span>');
    }
  }

function validate() {
    var questions = getQuestions(gQuiz);
    var score = 0;
    var nbquestion = 0;
    var point = 0;
    var fb = '';
    $('.guestquiz_feedback').css('padding', '5px');
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
                if (ret != '') {
                    let aVal = [];
                    // Must loop to all possible solution to keep the one with the highest value.
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
                    dspFeedback(id, false, allString['guestquizwrong'], obj.feedback);
                }
                // Check that the answer was a good one.
                if (point > 0) {
                    score += point;
                    if (fb == '') {
                      fb = allString['guestquizright'];
                    }
                    dspFeedback(id, true, fb, obj.feedback);
                } else {
                    dspFeedback(id, false, allString['guestquizwrong'], obj.feedback);
                }
                break;
            case 'BOOLEAN':
                nbquestion++;
                name = 'bool'+id+'Radio';
                ret = $('input[name="'+name+'"]:checked').val();
                if ( (ret == 'true' && obj.answers[0].prefix == '=') || (ret == 'false' && obj.answers[1].prefix == '=')) {
                    dspFeedback(id, true, allString['guestquizright'], obj.feedback);
                    score += 1;
                } else {
                    dspFeedback(id, false, allString['guestquizwrong'], obj.feedback);
                }
                break;
            case 'MATCHING':
                dspFeedback(id, false, allString['guestquiznotsupported'], obj.feedback);
                break;
            case 'MULTIPLE_CHOICE':
                nbquestion++;
                name = 'multi'+id+'Radio';
                ret = $('input[name="'+name+'"]:checked').val();
                if (ret !== undefined) {
                    for (let i = 0; i < obj.answers.length; i++) {
                        if (ret == i && obj.answers[i].prefix == '=') {
                            if(obj.answers[i].feedback != '') {
                                dspFeedback(id, true, obj.answers[i].feedback, obj.feedback);
                            } else {
                                dspFeedback(id, true, allString['guestquizright'], obj.feedback);
                            }
                            score += 1;
                            i = obj.answers.length;
                          }
                        if (ret == i && obj.answers[i].prefix == '~') {
                            if(obj.answers[i].feedback != '') {
                                dspFeedback(id, false, obj.answers[i].feedback, obj.feedback);
                            } else {
                                dspFeedback(id, false, allString['guestquizwrong'], obj.feedback);
                            }
                            i = obj.answers.length;
                        }
                    }
                } else {
                    dspFeedback(id, false, allString['guestquizwrong'], obj.feedback);
                }
                break;
            case 'SHORT_ANSWER':
                nbquestion++;
                name = 'short'+id;
                ret = $('#'+name).val();
                point = 0;
                for (let i = 0; i < obj.answers.length; i++) {
                    if(ret.toLowerCase() == obj.answers[i].text.toLowerCase()) {
                      if (obj.answers[i].feedback != '') {
                          dspFeedback(id, true, obj.answers[i].feedback, obj.feedback);
                      } else {
                          dspFeedback(id, true, allString['guestquizright'], obj.feedback);
                      }
                      point = obj.answers[i].value;
                      score += obj.answers[i].value;
                    }
                }
                if (point == 0) {
                    dspFeedback(id, false, allString['guestquizwrong'], obj.feedback);
                }
                break;
            case 'MULTIPLE_CHOICE_MULT':
                nbquestion++;
                let lid = "";
                name = 'multi'+id+"checkbox_";
                fb = "";
                for (let i = 0; i < obj.answers.length; i++) {
                    if ($('#'+name+i).is(":checked")) {
                        if (obj.answers[i].feedback != "")  {
                            if (obj.answers[i].value > 0) {
                                fb += "<span class='guestquiz_right'>";
                            } else {
                                fb += "<span class='guestquiz_wrong'>";
                            }
                            fb += obj.answers[i].text + " " + obj.answers[i].feedback + '</span><br>';
                        } else {
                            if (obj.answers[i].value > 0) {
                                fb += "<span class='guestquiz_right'>" + obj.answers[i].text + " " + allString['guestquizwasright'] + ".</span><br>";
                            } else {
                                fb += "<span class='guestquiz_wrong'>" + obj.answers[i].text + " " + allString['guestquizwaswrong'] + ".</span><br>";
                            }
                        }
                        score += obj.answers[i].value;
                    }
                }
                if (fb != "") {
                    dspFeedback(id, true, fb, obj.feedback);
                } else {
                    dspFeedback(id, false, allString['guestquizwrong'], obj.feedback);
                }
                break;
            case 'TEXT':
                dspFeedback(id, false, allString['guestquiznotsupported'], obj.feedback);
                break;
          case 'UNKNOWN':
              break;
        }
    }
    $('#guestquiz_score').html('Score:'+score.toFixed(2)+"/"+nbquestion);
    $('#guestquiz_score').css('display', 'block');
    $("#page").scrollTop(0);
  }

function unescapeCmdChar(quiz) {
    quiz = quiz.replaceAll(/🧝/ig,'=');
    quiz = quiz.replaceAll(/🤦/ig,'~‍');
    quiz = quiz.replaceAll(/🧛/ig,'#‍‍');
    quiz = quiz.replaceAll(/🧟/ig,'<br>‍‍‍'); // Verify it !.
    quiz = quiz.replaceAll(/☻☻☻/ig,'‍‍‍');
    let base64 = quiz.match(new RegExp('<img src="data' + '(.*?)' + 'image'));
    if (base64 !== null) {
      quiz = quiz.replace(base64[0], '<img src="data:image');
    }
    return quiz;
}

function cleanUp(quiz) {
    // Put comment before category info
    quiz = quiz.replace('$CATEGORY', '////$CATEGORY');
    // Remove all [html]
    quiz = quiz.replaceAll(/\[html\]/ig,'').trim();
/*
    // Remove all html...
    var keep = {b: true,i: true,u: true,br: true, span: true};
    quiz = quiz.replace(/<\/?([a-z]+) ?[^>]*>/g, function(wholeMatch, tagName) {
        if (keep[tagName]) {
            return wholeMatch;
        }
        return '';
    });
*/
    // Remove all comments.
    quiz = quiz.replaceAll(/https☻☻☻:\/\//ig,'👨‍🎨'); // Escape url before remove comments.
    quiz = quiz.replace(/("([^\\"]|\\")*")|('([^\\']|\\')*')/g, (m) => m.replace(/\//g, '\1')).replace(/(\/\*[^*]+\*\/)|(\/\/[^\n]+)/g, '').replace(/\1/g, '/');
    quiz = quiz.replaceAll(/👨‍🎨/ig,'https☻☻☻://'); // Restore url after remove comments.

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
// Display feedback.
function dspFeedback(id, success, text, gfb) {
    $('#feedback_'+id).css('background','#0000');
    $('#feedback_'+id).css('color','#ff0000');
    if (success) {
        $('#feedback_'+id).css('color','#49A049');
    }
    $('#feedback_'+id).html(text);
    $('#feedback_'+id).html($('#feedback_'+id).html()+"<br><span class='guestquiz_gfb'>"+gfb+"</span>");
}
