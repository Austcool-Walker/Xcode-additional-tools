function initialize_page(tocInSubdirectories) {
    // Called on page load to setup the page.
    // pass "1" as the argument to initialize_page indicating that TOC files are in subdirectories instead of at the book level
    announce_page_loaded(tocInSubdirectories);
	
	var newDiv = document.createElement('div');
	newDiv.setAttribute('id', 'tooltip');
	newDiv.style.cssText = 'position:absolute; visibility:hidden; font-family: \'Lucida Grande\', Helvetica; font-size: 11px; border: 1px solid #AAA; padding: 3px;';
	document.body.appendChild(newDiv);
}

function announce_page_loaded(tocInSubdirectories) {
    // If we're in a frameset, tell the TOC frame this page was loaded, so it can track it.
    // tocInSubdirectories is passed through to help with locating TOC files
    if (top.frames.length) {
        top.frames[0].page_loaded(document.location, tocInSubdirectories);
    }   
}

function showtip(hovered,event){
// Makes the "tooltip" element visible and moves it to the 
	// (x,y) of the mouse event (plus some buffer zone)
	
	var agent = navigator.userAgent;
	if (agent.indexOf("MSIE") > 0 && agent.indexOf("Mac") > 0) { 
		// IE-Mac no longer supported, and the CSS functionality is not up to the par needed for this
		return;
	}
	
	var abstract_text = hovered.getElementsByTagName('img').item(0).getAttribute('abstract');
	if(!abstract_text) { 
		return; 
	} 
	
	// Event-handling code for cross-browser support
	var mouse_event;
	if(!event) { mouse_event = window.event; } else { mouse_event = event; }
	
	var tooltip = document.getElementById("tooltip");
	tooltip.innerHTML = abstract_text;
	
	tooltip.style.backgroundColor = "#FDFEC8";
	
	var xcoord = 0;
	var ycoord = 0;
	
	if(mouse_event.pageX || mouse_event.pageY) {
	 	xcoord = event.pageX;
	 	ycoord = event.pageY;
	} else if(mouse_event.clientX || mouse_event.clientY) {
		xcoord = mouse_event.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft);
		ycoord = mouse_event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
	}
	
	tooltip.style.left = xcoord + 4 + "px";
	tooltip.style.top = ycoord + 10 + "px";
	tooltip.style.visibility="visible";
}

function hidetip() {
	document.getElementById("tooltip").style.visibility="hidden";
}

function placeWatermark() {
    if (document.layers) {
        document.watermark.pageX = (window.innerWidth - document.watermark.document.myImage.width)/2;
        document.watermark.pageY = (window.innerHeight - document.watermark.document.myImage.height)/2;
        document.watermark.visibility = 'visible';
    }
}

function closeWatermark() {
	
	if(document.all){
		watermark.style.visibility = "hidden";
	} else if(document.layers) {
		document.watermark.visibility = "hidden";
	} else if(document.getElementById && !document.all) {
		document.getElementById("watermark").style.visibility = "hidden";
	}

}

