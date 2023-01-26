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
 * The task that provides a complete backup of mod_guestquiz is defined here.
 *
 * @package     mod_guestquiz
 * @category    backup
 * @copyright   2023 UCLouvain
 * @author      Dominique Palumbo
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once(dirname(__FILE__) . '/backup_guestquiz_stepslib.php');

/**
 * The class provides all the settings and steps to perform one complete backup of mod_guestquiz.
 */
class backup_guestquiz_activity_task extends backup_activity_task {
    /**
     * Defines particular settings for the plugin.
     */
    protected function define_my_settings() {
    }

    /**
     * Defines particular steps for the backup process.
     */
    protected function define_my_steps() {
        $this->add_step(new backup_guestquiz_activity_structure_step('guestquiz_structure', 'guestquiz.xml'));
    }

    /**
     * Codes the transformations to perform in the activity in order to get transportable (encoded) links.
     *
     * @param string $content the url.
     * @return string.
     */
    public static function encode_content_links($content) {
        return $content;
    }
}
