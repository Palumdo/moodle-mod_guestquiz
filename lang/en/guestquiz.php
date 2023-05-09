<?php
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
 * Lang strings for the guestquiz module.
 *
 * @package    mod_guestquiz
 * @copyright  2023 UCLouvain
 * @author     Dominique Palumbo
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

$string['modulename']                         = 'GuestQuiz';
$string['modulenameplural']                   = 'GuestQuiz';
$string['modulename_help']                    = 'GuestQuiz is a tool to create quiz for guest user.';
$string['guestquizname']                      = 'Name';
$string['guestquizname_help']                 = 'Help with more explanation';
$string['mod_guestquiz']                      = 'GuestQuiz';
$string['pluginadministration']               = 'GuestQuiz administration';
$string['pluginname']                         = 'GuestQuiz';
$string['missingidandcmid']                   = 'Missing id and cmid';
$string['guestquiz:addinstance']              = 'Add a new guestquiz module';
$string['guestquiz:respond']                  = 'Respond to Guestquiz';
$string['guestquiz:create']                   = 'Create a GuestQuiz';
$string['guestquiz:build']                    = 'Build version of GuestQuiz';
$string['guestquizwrong']                     = 'Wrong answer';
$string['guestquizright']                     = 'Right answer';
$string['guestquiznotsupported']              = 'This question type is not supported';
$string['guestquizwaswrong']                  = 'was a wrong answer';
$string['guestquizwasright']                  = 'was a right answer';
$string['guestquizbadformat']                 = 'There is something wrong in the sGIFT format. Try to identify it by removing question by question.';
$string['guestquiztrue']                      = 'True';
$string['guestquizfalse']                     = 'False';
$string['guestquizvalidate']                  = 'Validate';
$string['guestquizgift']                      = 'sGIFT';
$string['guestquizgift_help']                 = 'This field support a subset of GIFT question format. For more info please read the documentation.';
$string['guestquizquestion']                  = 'Question';
$string['guestquizhelper']                    = "The GIFT format was a subset of GIFT and do not support all the gift possibility of Moodle. It's a limited subset. Supported questions type are numeric, boolean, short answer and multichoice. Please read the documentation <a href='https://docs.moodle.org/400/en/GIFT_format'>Here</a> and <a href='https://github.com/Palumdo/moodle-mod_guestquiz/wiki'>Here</a>. You can also use this little gift generator: <a href='/mod/guestquiz/helper.php?id={id}'>Here</a>.";
$string['guestquizhelper_new']                = "The GIFT format was a subset of GIFT and do not support all the gift possibility of Moodle. It's a limited subset. Supported questions type are numeric, boolean, short answer and multichoice. Please read the documentation <a href='https://docs.moodle.org/400/en/GIFT_format'>Here</a> and <a href='https://github.com/Palumdo/moodle-mod_guestquiz/wiki'>Here</a>. You can also a little gift generator but the link is only available after  the activity creation";
$string['guestquizhelper_title']              = "Small GIFT editor";
$string['guestquizboolean']                   = 'Boolean';
$string['guestquiztruefalse']                 = 'True/False';
$string['guestquizmultichoice']               = 'Multichoice';
$string['guestquiznumeric']                   = 'Numeric';
$string['guestquizshortanswer']               = 'Short answer';
$string['guestquizhelpertitle']               = 'Guest quiz GIFT helper';
$string['guestquizquestiontitle']             = 'Question title';
$string['guestquizquestiontext']              = 'Question text';
$string['guestquizhelperwelcome']             = 'These forms will help you to understand better the GIFT format. I see it as a playground to help you learn this format.';
$string['guestquizanswer']                    = 'Answer';
$string['guestquizfeedback']                  = 'Feedback';
$string['guestquiztolerance']                 = 'Tolerance';
$string['guestquizvalue']                     = 'Value';
$string['guestquizshortafter']                = 'Question end (if you want that the input will be inside the question and not after). Just try !';
$string['guestquizglobalfeedback']            = 'Global feedback';
$string['guestquizglobalfeedback_help']       = 'The global feedback will be always displayed after validation';
$string['guestquizgenerate']                  = 'Generate';
$string['guestquizcopycode']                  = 'Copy the following code';
$string['guestquizaccessright']               = 'You must be a teacher to go there';
$string['privacy:metadata']                   = 'The plugin guestquiz does not store any data.';
