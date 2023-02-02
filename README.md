# Guest Quiz #

Guest Quiz is a Moodle activity created to allow guest students from Moodle to make simple and light quiz without account in an "Open" course in Moodle.
Nothing made by the guest is saved by the activity, all the processing of the quiz is made client side (on the student navigator).
It's nothing more than old-style questions book where the answers are at the bottom of the page upside down. 
It's made to allow the student to evaluate himself by himself with the help of the quiz.

The module uses a subset of the Moodle GIFT format. Only boolean, multichoice, number and short answers are supported. Text, missing word and matching are not.
The parser of this module is also far less efficient than the Moodle one. It's the reason I call the supported format sGIFT. The s is for small, subset, sad, simpler, simplet... Whatever you like.
I hope that it will be usable by everyone. Because they've no editor, you just copy paste a correct sGIFT format inside a text area. They've a simple playground for learning the sGIFT format in the settings page of the activity.

It was developped with the KISS principle and I hope it is.

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