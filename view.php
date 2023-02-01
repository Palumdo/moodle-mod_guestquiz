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
 *
 *
 * @package     mod_guestquiz
 * @copyright   2023 UCLouvain
 * @author      Dominique Palumbo
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require(__DIR__.'/../../config.php');
require_once(__DIR__.'/lib.php');

global $USER;

$PAGE->requires->jquery();
$PAGE->requires->jquery_plugin('ui');
$PAGE->requires->css('/mod/guestquiz/css/style.css');
$PAGE->requires->js('/mod/guestquiz/js/local.js');
$theme = $CFG->theme;

// Course_module ID, or.
$id = optional_param('id', 0, PARAM_INT);
// Module instance id.
if ($id) {
    $cm = get_coursemodule_from_id('guestquiz', $id, 0, false, MUST_EXIST);
    $course = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
    $guestquiz = $DB->get_record('guestquiz', array('id' => $cm->instance), '*', MUST_EXIST);
} else {
    throw new moodle_exception('missingidandcmid', 'guestquiz');
}

require_login($course, true, $cm);
$modulecontext = context_module::instance($cm->id);
$coursecontext = context_course::instance($course->id);

$PAGE->set_url('/mod/guestquiz/view.php', array('id' => $cm->id));
$PAGE->set_title(format_string($guestquiz->name));
$PAGE->set_heading(format_string($course->fullname));
$PAGE->set_context($modulecontext);

$txt = get_strings(array('guestquizwrong', 'guestquizright', 'guestquiznotsupported', 'guestquizwaswrong', 'guestquizwasright', 
                         'guestquizbadformat', 'guestquiztrue', 'guestquizfalse', 'guestquizvalidate', 'guestquizgift', 'guestquizquestion')
                         , 'mod_guestquiz');
$lngjs = '';
$atxt = get_object_vars ( $txt );
foreach ($atxt as $idx => $val) {
    $lngjs .= "allString['{$idx}'] = '{$val}';";
}

echo $OUTPUT->header();
// Display sGIFT in HTML.
echo("<div id='guestquiz-message'></div>");
echo("<div id='guestquiz-score'></div>");
echo("<div id='guestquiz-gift'></div>");
echo("<script>");
echo("    var gQuiz = '';");
echo("    var allString = [];");
echo("    ".$lngjs);
echo("    $(document).ready(function() {");
echo("        gQuiz = `".str_replace("\\", "@♫♪♫@", $guestquiz->gift)."`;");
echo("        var questions = display(gQuiz);");
echo("    });");
echo("</script>");
echo $OUTPUT->footer();
