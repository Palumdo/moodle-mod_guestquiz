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
 * Define the complete structure for backup, with file and id annotations.
 *
 * @package     mod_guestquiz
 * @category    backup
 * @copyright   2023 UCLouvain
 * @author      Dominique Palumbo
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Backup task for mod_guestquiz.
 */
class backup_guestquiz_activity_structure_step extends backup_activity_structure_step {

    /**
     * Define the structure of database tables for the backup
     *
     */
    protected function define_structure() {
        // Define each element separated.
        $guestquiz = new backup_nested_element('guestquiz', array('id'), array(
            'course', 'name', 'intro', 'introformat', 'gift'));

        // Define the source tables for the elements.
        $guestquiz->set_source_table('guestquiz', array('id' => backup::VAR_ACTIVITYID));
        // Define file annotations.
        $guestquiz->annotate_files('mod_guestquiz', 'intro', null);

        return $this->prepare_activity_structure($guestquiz);
    }
}
