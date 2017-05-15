function appendPatterns(c2sObj) {
	var circlesPattern = c2sObj.__document.createElementNS("http://www.w3.org/2000/svg",'pattern');
	circlesPattern.setAttribute('id','circlePattern');
	circlesPattern.setAttribute('width','30');
	circlesPattern.setAttribute('height','30');
	circlesPattern.setAttribute("patternUnits", "userSpaceOnUse");

	var circle = c2sObj.__document.createElementNS("http://www.w3.org/2000/svg",'circle');
	circle.setAttribute('cx','15');
	circle.setAttribute('cy','15');
	circle.setAttribute('r','10');
	circle.setAttribute('stroke','black');
	circle.setAttribute('stroke-width','2');
	circle.setAttribute('fill','none');

	circlesPattern.appendChild(circle);
	c2sObj.__defs.appendChild(circlesPattern);
	return;
}
