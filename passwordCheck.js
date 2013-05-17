/**
 * Copyright (c) 2013 Eugen Rochko
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function (window) {
  'use strict';

  var passwordCheck;

  passwordCheck = function (input, callback) {
    var points, length, characters, i;

    //console.log('Called to examine ' + input);

    points     = 0;
    length     = input.length;
    characters = [];

    // The longer the better, min 8 characters
    points += Math.floor((length / 8) * 10);
    //console.log(points + ' points for length');

    // Unique characters are good
    for (i = 0; i < length; i += 1) {
      if (characters.indexOf(input[i]) === -1) {
        characters.push(input[i]);
        points += 1;
        //console.log('1 point for unique appearance of ' + input[i]);
      }
    }

    // At least one of each: lowercase letter, uppercase letter, number, special character
    if (input.search(/[a-z]/) != -1) {
      points += 1;
      //console.log('1 point for at least one lowercase letter');
    }

    if (input.search(/[A-Z]/) != -1) {
      points += 2;
      //console.log('2 points for at least one uppercase letter');
    }

    if (input.search(/[0-9]/) != -1) {
      points += 3;
      //console.log('3 points for at least one number letter');
    }

    if (input.search(/[\W]/) != -1) {
      points += 4;
      //console.log('4 points for at least one special character');
    }

    // Consecutive repetitions are bad
    // Sequences are bad
    for (i = 0; i < length - 1; i += 1) {
      if (input[i] === input[i + 1] || input[i + 1].charCodeAt() === input[i].charCodeAt() + 1) {
        points -= 1;
        //console.log('Removing 1 point for a "' + input[i + 1] + '" after a "' + input[i] + '"');
      }
    }

    // The minimally strong password should have
    // 10 points for length
    // 10 points for variety
    // 8 points for unique characters
    // No minus points for sequences/repetitions
    // That means 28 points. We call the callback with the percentage
    // 100% is the minimally strong password. Anything below is weak, it is
    // always stronger upwards
    callback.apply(null, [Math.floor((points / 28) * 100)]);
  };

  window.passwordCheck = passwordCheck;
} (window));
