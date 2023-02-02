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

opcache_invalidate(__FILE__, true);

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
} else {
    throw new moodle_exception('missingidandcmid', 'guestquiz');
}

require_login($course, true, $cm);

if (!has_capability('mod/guestquiz:create', context_module::instance($cm->id))) {
    throw new moodle_exception('guestquizaccessright', 'guestquiz');
}

$PAGE->set_context(context_module::instance($cm->id));
$PAGE->set_url('/mod/guestquiz/helper.php', array());
$PAGE->set_title(get_string('guestquizhelper_title', 'mod_guestquiz'));
$PAGE->set_pagelayout('course');
echo $OUTPUT->header();
?>
<div id="guestquiztitle"><?php echo(get_string('guestquizhelpertitle', 'mod_guestquiz'))?></div>
<div id="guestquizhelperwelcome"><?php echo(get_string('guestquizhelperwelcome', 'mod_guestquiz'))?></div>
<div class="container">
    <div class="row">
        <button onclick="displayForm('bool');" type="button" class="btn btn-white"><?php echo(get_string('guestquiztruefalse', 'mod_guestquiz'))?></button>&nbsp;
        <button onclick="displayForm('multichoice');" type="button" class="btn btn-white"><?php echo(get_string('guestquizmultichoice', 'mod_guestquiz'))?></button>&nbsp;
        <button onclick="displayForm('numeric');" type="button" class="btn btn-white"><?php echo(get_string('guestquiznumeric', 'mod_guestquiz'))?></button>&nbsp;
        <button onclick="displayForm('short');" type="button" class="btn btn-white"><?php echo(get_string('guestquizshortanswer', 'mod_guestquiz'))?></button>
    </div>
    <div class="row">
      <form class="guestquiz-form">
          <!-- TOP -->
          <div id="guestquiz-top">
              <div class="row">
                  <div class="col-6">
                      <div class="form-group">
                          <label for="guestquiz-code"><?php echo(get_string('guestquizquestiontitle', 'mod_guestquiz'))?></label>
                          <input type="text" class="form-control" id="guestquiz-code">
                      </div>
                  </div>
              </div>
              <div class="form-group">
                  <label for="guestquiz-question"><?php echo(get_string('guestquizquestiontext', 'mod_guestquiz'))?></label>
                  <input type="text" class="form-control" id="guestquiz-question">
              </div>
          </div>
          <!-- BOOLEAN -->
          <div class="guestquiz-middle" id="guestquiz-boolean">
              <b><?php echo(get_string('guestquizboolean', 'mod_guestquiz'))?></b>
              <div class="form-check">
                  <input type="radio" class="form-check-input" id="guestquiz-true" value="True" name="guestquiz-rb-bool">
                  <label class="form-check-label" for="guestquiz-true"><?php echo(get_string('guestquiztrue', 'mod_guestquiz'))?></label>
              </div>
              <div class="form-check">
                  <input type="radio" class="form-check-input" id="guestquiz-false" value="False" name="guestquiz-rb-bool">
                  <label class="form-check-label" for="guestquiz-false"><?php echo(get_string('guestquizfalse', 'mod_guestquiz'))?></label>
              </div>
          </div>
          <!-- MULTICHOICE -->
          <div class="guestquiz-middle" id="guestquiz-multichoice" style="display:none;">
              <b><?php echo(get_string('guestquizmultichoice', 'mod_guestquiz'))?></b>
              <div class="container">
                  <div class="row">
                      <div class="col-1"></div>
                      <div class="col-1">%</div>
                      <div class="col-5"><?php echo(get_string('guestquizanswer', 'mod_guestquiz'))?></div>
                      <div class="col-5"><?php echo(get_string('guestquizfeedback', 'mod_guestquiz'))?></div>
                  </div>
              </div>
              <div class="container">
                  <div class="row">
                      <div class="col-1"><input class="form-check-input guestquiz-margin" type="checkbox" id="guestquiz-multi-check0" value="0" name="guestquiz-multi-check"></div>
                      <div class="col-1"><input type="number" id="guestquiz-multi-num0" class="form-control guestquiz-numeric"></div>
                      <div class="col-5"><input type="text" id="guestquiz-multi-answer0" class="form-control"></div>
                      <div class="col-5"><input type="text" id="guestquiz-multi-feedback0" class="form-control"></div>
                  </div>
                  <div class="row">
                      <div class="col-1"><input class="form-check-input guestquiz-margin" type="checkbox" id="guestquiz-multi-check1" value="1" name="guestquiz-multi-check"></div>
                      <div class="col-1"><input type="number" id="guestquiz-multi-num1" class="form-control guestquiz-numeric"></div>
                      <div class="col-5"><input type="text" id="guestquiz-multi-answer1" class="form-control"></div>
                      <div class="col-5"><input type="text" id="guestquiz-multi-feedback1" class="form-control"></div>
                  </div>
                  <div class="row">
                      <div class="col-1"><input class="form-check-input guestquiz-margin" type="checkbox" id="guestquiz-multi-check2" value="2" name="guestquiz-multi-check"></div>
                      <div class="col-1"><input type="number" id="guestquiz-multi-num2" class="form-control guestquiz-numeric"></div>
                      <div class="col-5"><input type="text" id="guestquiz-multi-answer2" class="form-control"></div>
                      <div class="col-5"><input type="text" id="guestquiz-multi-feedback2" class="form-control"></div>
                  </div>
                  <div class="row">
                      <div class="col-1"><input class="form-check-input guestquiz-margin" type="checkbox" id="guestquiz-multi-check3" value="3" name="guestquiz-multi-check"></div>
                      <div class="col-1"><input type="number" id="guestquiz-multi-num3" class="form-control guestquiz-numeric"></div>
                      <div class="col-5"><input type="text" id="guestquiz-multi-answer3" class="form-control"></div>
                      <div class="col-5"><input type="text" id="guestquiz-multi-feedback3" class="form-control"></div>
                  </div>
                  <div class="row">
                      <div class="col-1"><input class="form-check-input guestquiz-margin" type="checkbox" id="guestquiz-multi-check4" value="4" name="guestquiz-multi-check"></div>
                      <div class="col-1"><input type="number" id="guestquiz-multi-num4" class="form-control guestquiz-numeric"></div>
                      <div class="col-5"><input type="text" id="guestquiz-multi-answer4" class="form-control"></div>
                      <div class="col-5"><input type="text" id="guestquiz-multi-feedback4" class="form-control"></div>
                  </div>
                  <div class="row">
                      <div class="col-1"><input class="form-check-input guestquiz-margin" type="checkbox" id="guestquiz-multi-check5" value="5" name="guestquiz-multi-check"></div>
                      <div class="col-1"><input type="number" id="guestquiz-multi-num5" class="form-control guestquiz-numeric"></div>
                      <div class="col-5"><input type="text" id="guestquiz-multi-answer5" class="form-control"></div>
                      <div class="col-5"><input type="text" id="guestquiz-multi-feedback5" class="form-control"></div>
                  </div>
              </div>
          </div>
          <!-- NUMERIC -->
          <div class="guestquiz-middle" id="guestquiz-numeric" style="display:none;">
              <b><?php echo(get_string('guestquiznumeric', 'mod_guestquiz'))?></b>
              <div class="container">
                  <div class="row">
                      <div class="col-2">%</div>
                      <div class="col-2"><?php echo(get_string('guestquizvalue', 'mod_guestquiz'))?></div>
                      <div class="col-2"><?php echo(get_string('guestquiztolerance', 'mod_guestquiz'))?></div>
                      <div class="col-6"><?php echo(get_string('guestquizfeedback', 'mod_guestquiz'))?></div>
                  </div>
                  <div class="row">
                      <div class="col-2"><input type="number" id="guestquiz-numeric-pourcent0" class="form-control guestquiz-numeric"></div>
                      <div class="col-2"><input type="number" id="guestquiz-numeric-value0" class="form-control guestquiz-numeric"></div>
                      <div class="col-2"><input type="number" id="guestquiz-numeric-tolerance0" class="form-control guestquiz-numeric"></div>
                      <div class="col-6"><input type="text"   id="guestquiz-numeric-feedback0" class="form-control"></div>
                  </div>
                  <div class="row">
                      <div class="col-2"><input type="number" id="guestquiz-numeric-pourcent1" class="form-control guestquiz-numeric"></div>
                      <div class="col-2"><input type="number" id="guestquiz-numeric-value1" class="form-control guestquiz-numeric"></div>
                      <div class="col-2"><input type="number" id="guestquiz-numeric-tolerance1" class="form-control guestquiz-numeric"></div>
                      <div class="col-6"><input type="text"   id="guestquiz-numeric-feedback1" class="form-control"></div>
                  </div>
                  <div class="row">
                      <div class="col-2"><input type="number" id="guestquiz-numeric-pourcent2" class="form-control guestquiz-numeric"></div>
                      <div class="col-2"><input type="number" id="guestquiz-numeric-value2" class="form-control guestquiz-numeric"></div>
                      <div class="col-2"><input type="number" id="guestquiz-numeric-tolerance2" class="form-control guestquiz-numeric"></div>
                      <div class="col-6"><input type="text"   id="guestquiz-numeric-feedback2" class="form-control"></div>
                  </div>
              </div>
          </div>              
          <!-- SHORT Answer -->
          <div class="guestquiz-middle" id="guestquiz-short"  style="display:none;">
              <b><?php echo(get_string('guestquizshortanswer', 'mod_guestquiz'))?></b>
              <div class="container">
                  <div class="row">
                      <div><?php echo(get_string('guestquizanswer', 'mod_guestquiz'))?></div>
                  </div>              
                  <div class="row">
                      <div><input type="text" id="guestquiz-short-answer0" class="form-control"></div>
                  </div>
                  <div class="row">
                      <div><input type="text" id="guestquiz-short-answer1" class="form-control"></div>
                  </div>
                  <div class="row">
                      <div><input type="text" id="guestquiz-short-answer2" class="form-control"></div>
                  </div>
                  <div class="row">
                      <div><input type="text" id="guestquiz-short-answer3" class="form-control"></div>
                  </div>
                  <div class="row">
                      <label for="guestquiz-short-after"><?php echo(get_string('guestquizshortafter', 'mod_guestquiz'))?></label>
                  </div>
                  <div class="row">
                      <div><input type="text" id="guestquiz-short-after" class="form-control"></div>
                  </div>
              </div>
          </div>
          <!-- BOTTOM -->
          <div id="guestquiz-bottom">
              <div class="form-group">
                  <label for="guestquiz-gfb"><?php echo(get_string('guestquizglobalfeedback', 'mod_guestquiz'))?></label>
                  <input type="text" class="form-control" id="guestquiz-gfb" placeholder="<?php echo(get_string('guestquizglobalfeedback_help', 'mod_guestquiz'))?>">
              </div>
              <button onclick="generateGIFT(gtype);" type="button" class="btn btn-primary"><?php echo(get_string('guestquizgenerate', 'mod_guestquiz'))?></button>
          </div>    
      </form>    
    </div>
    <div style="font-size:1.15em;font-weight:bold;"><?php echo(get_string('guestquizcopycode', 'mod_guestquiz'))?></div>
    <div id="guestquiz-gift"></div>
</div>
<?php
echo $OUTPUT->footer();
