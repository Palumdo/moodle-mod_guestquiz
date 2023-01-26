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
 * Library of interface functions and constants.
 *
 * @package     mod_guestquiz
 * @copyright   2023 UCLouvain
 * @author      Dominique Palumbo
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Return if the plugin supports $feature.
 *
 * @param string $feature Constant representing the feature.
 * @return true | null True if the feature is supported, null otherwise.
 */
function guestquiz_supports($feature) {
    switch ($feature) {
        case FEATURE_GRADE_HAS_GRADE:
            return false;
        case FEATURE_GRADE_OUTCOMES:
            return false;
        case FEATURE_MOD_INTRO:
            return true;
        case FEATURE_BACKUP_MOODLE2:
            return true;
        case FEATURE_SHOW_DESCRIPTION:
            return true;
        case FEATURE_COMPLETION_TRACKS_VIEWS:
            return false;
        case FEATURE_MOD_PURPOSE:
            return MOD_PURPOSE_ASSESSMENT;
        default:
            return null;
    }
}
/**
 * Saves a new instance of the guestquiz into the database.
 *
 * Given an object containing all the necessary data, (defined by the form
 * in mod_form.php) this function will create a new instance and return the id
 * number of the instance.
 *
 * @param object $guestquiz An object from the form.
 * @param guestquiz_mod_form $mform The form.
 * @return int The id of the newly inserted record.
 */
function guestquiz_add_instance($guestquiz, $mform) {
    global $DB, $CFG;

    $guestquiz->timecreated = time();
    $formdata = $mform->get_data();
    $guestquiz = guestquiz_fill_data($formdata, $guestquiz);

    $id = $DB->insert_record('guestquiz', $guestquiz);

    return $id;
}
/**
 * Set the data form to a guestquiz object.
 *
 * @param object $formdata The form.
 * @param object $guestquiz An object from the form.
 *
 * @return object
 */
function guestquiz_fill_data($formdata, $guestquiz) {
    $guestquiz->gift = $formdata->gift;
    return $guestquiz;
}
/**
 * Updates an instance of the guestquiz in the database.
 *
 * Given an object containing all the necessary data (defined in mod_form.php),
 * this function will update an existing instance with new data.
 *
 * @param object $guestquiz An object from the form in mod_form.php.
 * @param guestquiz_mod_form $mform The form.
 * @return bool True if successful, false otherwise.
 */
function guestquiz_update_instance($guestquiz, $mform) {
    global $DB, $CFG;

    $guestquiz->timemodified = time();
    $guestquiz->id = $guestquiz->instance;

    $formdata = $mform->get_data();
    $guestquiz = guestquiz_fill_data($formdata, $guestquiz);

    return $DB->update_record('guestquiz', $guestquiz);
}
/**
 * Removes an instance of the guestquiz from the database.
 *
 * @param int $id Id of the module instance.
 * @return bool True if successful, false on failure.
 */
function guestquiz_delete_instance($id) {
    global $DB;
    $result = true;
    $exists = $DB->get_record('guestquiz', array('id' => $id));
    if (!$exists) {
        return false;
    }
    $DB->delete_records('guestquiz', array('id' => $id));

    return $result;
}
