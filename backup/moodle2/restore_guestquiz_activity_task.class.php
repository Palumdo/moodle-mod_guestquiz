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
 * The task that provides a complete restore of mod_guestquiz is defined here.
 *
 * @package     mod_guestquiz
 * @category    backup
 * @copyright   2023 UCLouvain
 * @author      Dominique Palumbo
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

// For more information about the backup and restore process, please visit:.
// https://docs.moodle.org/dev/Backup_2.0_for_developers.
// https://docs.moodle.org/dev/Restore_2.0_for_developers.

require_once($CFG->dirroot.'//mod/guestquiz/backup/moodle2/restore_guestquiz_stepslib.php');

/**
 * Restore task for mod_guestquiz.
 */
class restore_guestquiz_activity_task extends restore_activity_task {

    /**
     * Defines particular settings that this activity can have.
     */
    protected function define_my_settings() {
    }

    /**
     * Defines particular steps that this activity can have.
     *
     * @return base_step.
     */
    protected function define_my_steps() {
        $this->add_step(new restore_guestquiz_activity_structure_step('guestquiz_structure', 'guestquiz.xml'));
    }

    /**
     * Defines the contents in the activity that must be processed by the link decoder.
     *
     * @return array.
     */
    public static function define_decode_contents() {
        $contents = array();

        // Define the contents.

        return $contents;
    }

    /**
     * Defines the decoding rules for links belonging to the activity to be executed by the link decoder.
     *
     * @return array.
     */
    public static function define_decode_rules() {
        $rules = array();
        return $rules;
    }

    /**
     * Defines the restore log rules that will be applied by the when restoring mod_guestquiz logs.
     *
     * Must return one array of objects.
     *
     * @return array.
     */
    public static function define_restore_log_rules() {
        $rules = array();

        // Define the rules.
        $rules[] = new restore_log_rule('guestquiz', 'add', 'view.php?id={course_module}', '{guestquiz}');
        $rules[] = new restore_log_rule('guestquiz', 'update', 'view.php?id={course_module}', '{guestquiz}');
        $rules[] = new restore_log_rule('guestquiz', 'view', 'view.php?id={course_module}', '{guestquiz}');

        return $rules;
    }
    /**
     * Define the restore log rules that will be applied when restoring
     *
     * Course logs. It must return one array
     * of objects
     *
     * Note this rules are applied when restoring course logs
     * by the restore final task, but are defined here at
     * activity level. All them are rules not linked to any module instance (cmid = 0)
     *
     * @return array.
     */
    public static function define_restore_log_rules_for_course() {
        $rules = array();

        $rules[] = new restore_log_rule('guestquiz', 'view all', 'index.php?id={course}', null);

        return $rules;
    }
}
