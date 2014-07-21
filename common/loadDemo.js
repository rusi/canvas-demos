
// http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml

function includeJS(filename){
	var fileref = document.createElement('script');
	fileref.setAttribute("type","text/javascript");
	fileref.setAttribute("src", filename);

	document.getElementsByTagName("head")[0].appendChild(fileref)
}

function includeCSS(filename) {
	var fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);

	document.getElementsByTagName("head")[0].appendChild(fileref)
}

var framework = getStringParamFromUrl('framework', 'phaserjs');

includeJS(framework + "/pegman.js");
includeJS(framework + "/demo.js");
