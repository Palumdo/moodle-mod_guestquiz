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
 * All the steps to restore mod_guestquiz are defined here.
 *
 * @package     mod_guestquiz
 * @category    backup
 * @copyright   2023 UCLouvain
 * @author      Dominique Palumbo
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

// For more information about the backup and restore process, please visit:.
// https://docs.moodle.org/dev/Backup_2.0_for_developers.
// https://docs.moodle.org/dev/Restore_2.0_for_developers.

/**
 * Defines the structure step to restore one mod_guestquiz activity.
 */
class restore_guestquiz_activity_structure_step extends restore_activity_structure_step {

    /**
     * Defines the structure to be restored.
     *
     * @return restore_path_element[].
     */
    protected function define_structure() {
        $paths = array();
        $userinfo = $this->get_setting_value('userinfo');

        $guestquiz = new restore_path_element('guestquiz', '/activity/guestquiz');
        $paths[] = $guestquiz;

        return $this->prepare_activity_structure($paths);
    }

    /**
     * Process the structure guestquiz before restore
     *
     *
     * @param object $data structure of data to restore.
     */
    protected function process_guestquiz($data) {
        global $DB;

        $data = (object)$data;
        $data->course = $this->get_courseid();

        // Insert the guestquiz record.
        $newid = $DB->insert_record('guestquiz', $data);

        // Immediately after inserting "activity" record, call this.
        $this->apply_activity_instance($newid);
    }

    /**
     * Defines post-execution actions.
     */
    protected function after_execute() {
        $this->add_related_files('mod_guestquiz', 'intro', null);
    }
}
