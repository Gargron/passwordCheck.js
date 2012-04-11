/*
 * passwordCheck.js
 *
 * Author
 * Steve Moitozo <god at zilla dot us>      -- geekwisdom.com
 *
 * Refactored by
 * Eugen Rochko  <gargron at gmail dot com> -- zeonfederated.com
 *
 * License
 * MIT License (see below)
 *
 * ---------------------------------------------------------------
 * Copyright (c) 2006 Steve Moitozo <god at zilla dot us>
 * 
 * Permission is hereby granted, free of charge, to any person 
 * obtaining a copy of this software and associated documentation 
 * files (the "Software"), to deal in the Software without 
 * restriction, including without limitation the rights to use, 
 * copy, modify, merge, publish, distribute, sublicense, and/or 
 * sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following 
 * conditions:
 * 
 * The above copyright notice and this permission notice shall 
 * be included in all copies or substantial portions of the 
 * Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY 
 * KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE 
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE 
 * OR OTHER DEALINGS IN THE SOFTWARE. 
 * ---------------------------------------------------------------
 * 
 * Password Strength Factors and Weightings
 * ========================================
 *
 * Password length:
 * ----------------
 * level 0 (3 point):   less than 4 characters
 * level 1 (6 points):  between 5 and 7 characters
 * level 2 (12 points): between 8 and 15 characters
 * level 3 (18 points): 16 or more characters
 * 
 * Letters:
 * ----------------
 * level 0 (0 points):  no letters
 * level 1 (5 points):  all letters are lower case
 * level 2 (7 points):  letters are mixed case
 * 
 * Numbers:
 * ----------------
 * level 0 (0 points):  no numbers exist
 * level 1 (5 points):  one number exists
 * level 1 (7 points):  3 or more numbers exists
 * 
 * Special characters:
 * ----------------
 * level 0 (0 points):  no special characters
 * level 1 (5 points):  one special character exists
 * level 2 (10 points): more than one special character exists
 * 
 * Combinatons:
 * ----------------
 * level 0 (1 points):  letters and numbers exist
 * level 1 (1 points):  mixed case letters
 * level 1 (2 points):  letters, numbers and special characters 
 * 					    exist
 * level 1 (2 points):  mixed case letters, numbers and special 
 * 					    characters exist
 * 
 * 
 */

(function(window, undefined) {
	window.passwordCheck = function(string, callback) {
		var intScore   = 0,
		    strVerdict = "weak",
		    len        = string.length,
		    regexes    = [

				/[a-z]/,                                                                        // lowercase letters
				/[A-Z]/,                                                                        // uppercase letters
				/[\d]/,                                                                         // numbers
				/(.*[0-9].*[0-9].*[0-9])/,                                                      // >= 3 numbers
				/.[!,@,#,$,%,^,&,*,?,_,~]/,                                                     // special characters
				/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/,                         // >= 2 special characters
				/([a-z].*[A-Z])|([A-Z].*[a-z])/,                                                // both upper and lowercase letters
				/([a-zA-Z].*[0-9]|[0-9].*[a-zA-Z])/,                                            // both numbers and letters
				/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/ // letters, numbers, special characters

			],
			result;

		// PASSWORD LENGTH
		if      (len < 5)             intScore = (intScore + 3);
		else if (len > 4 && len < 8)  intScore = (intScore + 6);
		else if (len > 7 && len < 16) intScore = (intScore + 12);
		else if (len > 15)            intScore = (intScore + 18);

		if (string.search(regexes[0]) !== -1) intScore = (intScore + 1);
		if (string.search(regexes[1]) !== -1) intScore = (intScore + 5);

		if (string.search(regexes[2]) !== -1) intScore = (intScore + 5);
		if (string.search(regexes[3]) !== -1) intScore = (intScore + 5);

		if (string.search(regexes[4]) !== -1) intScore = (intScore + 5);
		if (string.search(regexes[5]) !== -1) intScore = (intScore + 5);

		if (string.search(regexes[6]) !== -1) intScore = (intScore + 2);
		if (string.search(regexes[7]) !== -1) intScore = (intScore + 2);
		if (string.search(regexes[8]) !== -1) intScore = (intScore + 2);

		if      (intScore < 16)                  strVerdict = "very weak";
		else if (intScore > 15 && intScore < 25) strVerdict = "weak";
		else if (intScore > 24 && intScore < 35) strVerdict = "mediocre";
		else if (intScore > 34 && intScore < 45) strVerdict = "strong";
		else                                     strVerdict = "stronger";

		result = {
			'score'  : intScore,
			'verdict': strVerdict
		};

		if(typeof callback == "function") return callback(result);
		else                              return result;
	};
})( window );