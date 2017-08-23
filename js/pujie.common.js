var thisdomain = "http://localhost:3000/";
$.fn.stairUp = function(opt){
	var settings = $.extend({
		level:1
	},opt);
	out=$(this);
	for(i=0;i<settings.level;i++){
		out=out.parent();
	}
	return out;
}