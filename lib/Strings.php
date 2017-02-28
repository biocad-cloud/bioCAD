<?php

/* The strings module functions in VisualBasic language */

class Strings {
	
	public static function Split($str, $deli) {
		
// split the phrase by any number of commas or space characters,
// which include " ", \r, \t, \n and \f
$words = preg_split("/" . $deli . "/", $str);
return $words;

	}
	
}

?>