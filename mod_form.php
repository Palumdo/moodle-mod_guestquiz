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
 * The main mod_guestquiz configuration form.
 *
 * For each criteria used for the peer evaluation the teacher can add additional info on it.
 * They've default text for the tooltips and here the teacher can add more info.
 * He can also add is own sixth criteria.
 * Evaluation is based on (Participation Responsability Scientific Expertise Technical Expertise General Attitude).
 *
 * @package    mod_guestquiz
 * @copyright  2023 UCLouvain
 * @author     Dominique Palumbo
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot.'/course/moodleform_mod.php');

/**
 * Module instance settings form.
 *
 * @package    mod_guestquiz
 * @copyright  2023 UCLouvain
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class mod_guestquiz_mod_form extends moodleform_mod {

    /**
     * Defines forms elements
     */
    public function definition() {
        global $CFG, $COURSE, $PAGE;

        $PAGE->requires->jquery();
        $mform = $this->_form;
        // Adding the "general" fieldset, where all the common settings are showed and the standard "name" field.
        $mform->addElement('header', 'general', get_string('general', 'form'));
        $mform->addElement('text', 'name', get_string('guestquizname', 'mod_guestquiz'), array('size' => '64'));
        if (!empty($CFG->formatstringstriptags)) {
            $mform->setType('name', PARAM_TEXT);
        } else {
            $mform->setType('name', PARAM_CLEANHTML);
        }
        $mform->addRule('name', null, 'required', null, 'client');
        $mform->addRule('name', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');
        $mform->addHelpButton('name', 'guestquizname', 'mod_guestquiz');
        // Adding the standard "intro" and "introformat" fields.
        if ($CFG->branch >= 29) {
            $this->standard_intro_elements();
        } else {
            $this->add_intro_editor();
        }
        $helperstr = str_replace('{id}', $PAGE->cm->id, get_string('guestquizhelper', 'mod_guestquiz'));
        $mform->addElement('html', "<div style='margin-left:25%'>".$helperstr."</div>");
        $mform->addElement('textarea', 'gift', get_string('guestquizgift', 'mod_guestquiz'), 'wrap="virtual" rows="25" cols="80"');
        $mform->addHelpButton('gift', 'guestquizgift', 'mod_guestquiz');
        // Add standard elements and buttons.
        $this->standard_coursemodule_elements();
        $this->add_action_buttons();
    }

    /**
     * Load all the values from guestquiz of the current activity.
     *
     * @param array &$defaultvalues with all the default values.
     */
    public function data_preprocessing(&$defaultvalues) {
        global $DB;

        $guestquiz = $DB->get_record('guestquiz', array('id' => $this->current->id), '*', IGNORE_MISSING);
        if ($guestquiz != false) {
            $defaultvalues['guestquiz_gift'] = $guestquiz->gift;
        } else {
            $defaultvalues['guestquiz_gift'] = "empty";
        }
    }
}
