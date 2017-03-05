<?php

/* The strings module functions in VisualBasic language */

class Strings {
	
	public static function Split($str, $deli) {
		
// split the phrase by any number of commas or space characters,
// which include " ", \r, \t, \n and \f
$words = preg_split("/" . $deli . "/", $str);
return $words;

	}
	
// 如果查找不到字串在目标字符串之上的位置，则函数返回0
// 假若能够查找得到，则会返回以1为准的位置
	public static function InStr($str, $find_subString, $begin) {

$p = strpos($str, $find_subString, $begin)

if ($p === false) {
	return 0;
} else {
	return ($p + $begine + 1);
}

	}
}

?>