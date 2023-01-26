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
 * Display information about all the mod_guestquiz modules in the requested course.
 *
 * @package     mod_guestquiz
 * @copyright   2023 UCLouvain
 * @author      Dominique Palumbo
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(dirname(__FILE__).'/../../config.php');
require_once(dirname(__FILE__).'/lib.php');

$id = required_param('id', PARAM_INT);
$course = $DB->get_record('course', array('id' => $id), '*', MUST_EXIST);

require_course_login($course);

$params = array(
    'context' => context_course::instance($course->id)
);
$event = \mod_guestquiz\event\course_module_instance_list_viewed::create($params);
$event->add_record_snapshot('course', $course);
$event->trigger();

$strguestquizs = get_string('modulenameplural', 'guestquiz');

$PAGE->requires->css('/mod/guestquiz/styles.css');
$PAGE->set_url('/mod/guestquiz/index.php', array('id' => $id));
$PAGE->set_pagelayout('incourse');
$PAGE->navbar->add($strguestquizs);
$PAGE->set_title($strguestquizs);
$PAGE->set_heading($course->fullname);
echo $OUTPUT->header();

if (! $guestquizs = get_all_instances_in_course('guestquiz', $course)) {
    echo $OUTPUT->heading(get_string('thereareno', 'moodle', $strguestquizs), 2);
    echo $OUTPUT->continue_button(new moodle_url('/course/view.php', ['id' => $course->id]));
    echo $OUTPUT->footer();
    die;
}

$timenow = time();
$strname = get_string('name');
$strweek = get_string('week');
$strtopic = get_string('topic');

$table = new html_table();
if ($course->format == 'weeks') {
    $table->head = array ($strweek, $strname);
    $table->align = array ('center', 'left');
} else if ($course->format == 'topics') {
    $table->head = array ($strtopic, $strname);
    $table->align = array ('center', 'left', 'left', 'left');
} else {
    $table->head = array ($strname);
    $table->align = array ('left', 'left', 'left');
}

foreach ($guestquizs as $guestquiz) {
    if (!$guestquiz->visible) {
        // Show dimmed if the mod is hidden.
        $link = '<a class="dimmed" href="view.php?id='.$guestquiz->coursemodule.'">'.format_string($guestquiz->name).'</a>';
    } else {
        // Show normal if the mod is visible.
        $link = '<a href="view.php?id='.$guestquiz->coursemodule.'">'.format_string($guestquiz->name).'</a>';
    }

    if ($course->format == 'weeks' || $course->format == 'topics') {
        $table->data[] = array ($guestquiz->section, $link);
    } else {
        $table->data[] = array ($link);
    }
}

echo $OUTPUT->heading($strguestquizs, 2);
echo html_writer::table($table);
echo $OUTPUT->footer();
