# Guest Quiz #

Guest Quiz is a Moodle activity created to allow guest student from moodle to make simple and light quiz without account in an "Open" Moodle.
Nothing made by the guest is saved by the activity, all the processing of the quiz are made client side (on the student navigator).
It's nothing more than old style question book where the answers are at the bottom of the page upside down. 
It's made to allow the student to evaluate himself by himself.

The module use a subset of the Moodle GIFT format. Only boolean, multichoice, number and short answer are supported. Text, Missing word and matching are not.
The parser of this module is also far less performant than the Moodle one. It's the reason I call the supported format sGIFT. The s is for small, subset, sad, simpler, simplet... Whatever you like.

I hope that it will be usable by everyone. Because they've no editor, you just copy paste a correct sGIFT format inside a text area.

More info in the WIKI : <https://github.com/Palumdo/moodle-mod_guestquiz/wiki/>

## License ##

2023 UCLouvain

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program.  If not, see <http://www.gnu.org/licenses/>.