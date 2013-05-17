# passwordCheck.js

This is a password strength meter in JavaScript, inspired by [Steve Moitozo here](http://www.geekwisdom.com/dyn/passwdmeter), but now completely reworked.

## Assumptions

We assume a few rules that make a password "stronger":

* We want at least 8 characters
* We want at least one character of each of the following groups:
  * Lowercase letters
  * Uppercase letters
  * Numbers
  * Special characters
* More unique characters are better than less
* Repetitions (like "aa" or "bb" or "1111") are bad
* Sequences (like "12345" or "abc" or "xyz") are bad too

## Return value

The function returns a percentage. 100% is the minimally strong password, based
on our assumptions. Anything below that is weak, anything above is always
stronger.

## Usage

    passwordCheck("hell0th3re!", function(result) {
    	alert(result);
    });
