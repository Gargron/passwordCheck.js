# passwordCheck.js

This is a password strength measuring JavaScript originally made by [Steve Moitozo here](http://www.geekwisdom.com/dyn/passwdmeter). I took and refactored the script.

## Usage

    passwordCheck("hell0th3re!", function(result) {
    	alert(result.verdict);
    });

## TODO

* Cut down the number of regex searches