function appendPatterns(c2sObj) {

	//dotsPattern
	
	var dotPattern = c2sObj.__document.createElementNS("http://www.w3.org/2000/svg",'pattern');
	dotPattern.setAttribute('id','dotPattern');
	dotPattern.setAttribute('width','30');
	dotPattern.setAttribute('height','30');
	dotPattern.setAttribute("patternUnits", "userSpaceOnUse");

	var dot = c2sObj.__document.createElementNS("http://www.w3.org/2000/svg",'circle');
	dot.setAttribute('cx','15');
	dot.setAttribute('cy','15');
	dot.setAttribute('r','2');
	dot.setAttribute('stroke','black');
	dot.setAttribute('stroke-width','2');
	dot.setAttribute('fill','none');

	dotPattern.appendChild(dot);
	c2sObj.__defs.appendChild(dotPattern);
	
	//horzLinesPattern
	
	var horzLinePattern = c2sObj.__document.createElementNS("http://www.w3.org/2000/svg",'pattern');
	horzLinePattern.setAttribute('id','horzLinePattern');
	horzLinePattern.setAttribute('width','30');
	horzLinePattern.setAttribute('height','20');
	horzLinePattern.setAttribute("patternUnits", "userSpaceOnUse");

	var line = c2sObj.__document.createElementNS("http://www.w3.org/2000/svg",'line');
	line.setAttribute('x1','0');
	line.setAttribute('y1','10');
	line.setAttribute('x2','30');
	line.setAttribute('y2','5');
	line.setAttribute('stroke','black');
	line.setAttribute('stroke-width','2');
	line.setAttribute('fill','none');

	horzLinePattern.appendChild(line);
	c2sObj.__defs.appendChild(horzLinePattern);
}
