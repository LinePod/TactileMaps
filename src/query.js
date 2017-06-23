OVERPASS_API_ENDPOINT = "http://overpass-api.de/api/interpreter?"
GOOGLE_API_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json?"

/**
 * Example feature
 * ['way','railway','light_rail']
 */

function StringToXMLDom(string){
	var xmlDoc=null;
	if (window.DOMParser)
	{
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(string,"text/xml");
	}
	else // Internet Explorer
	{
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.loadXML(string);
	}
	return xmlDoc;
}

function getBoundingBoxForCity(cityname) {
	var url = GOOGLE_API_ENDPOINT += "address=" + cityname + "&key=AIzaSyALoBUF5NWliDqkax9RfYYa2QnwylZKdXE"
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send(null);
	console.log("response:");
    var data = JSON.parse(xmlHttp.responseText);
	console.log(data);

	var bbox = [];
	bbox.push(data.results[0].geometry.viewport.southwest.lat)
	bbox.push(data.results[0].geometry.viewport.southwest.lng)
	bbox.push(data.results[0].geometry.viewport.northeast.lat)
	bbox.push(data.results[0].geometry.viewport.northeast.lng)
	console.log("bbox");
	console.log(bbox);
	return bbox
}

function getOSMData(features, bbox)
{
	var url = OVERPASS_API_ENDPOINT;
	url += "data=[out:xml];("
	for(var i=0; i<features.length; ++i) {
		var f = features[i];
		if(f.length == 3) {
			url += f[0] + '["' + f[1] + '"]' + '["' + f[1] + '"~"' + f[2] + '"](' 
				+ bbox[0] + ','+ bbox[1] + ','+ bbox[2] + ','+ bbox[3] + ');'
		}
		else {
			url += f[0] + '["' + f[1] + '"](' 
				+ bbox[0] + ','+ bbox[1] + ','+ bbox[2] + ','+ bbox[3] + ');'
		}
	}

	url += ');out;>;out skel qt;'

	console.log("url:");
	console.log(url);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send(null);
	console.log("response:");
    var data = StringToXMLDom(xmlHttp.responseText);
	console.log(data);
	data = osmtogeojson(data, {"flatProperties":true});
	console.log("converted:");
	console.log(data);
	return data
}
