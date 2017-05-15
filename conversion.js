function getAllCoords(feature) {
	var coords = feature["coordinates"]
	switch(feature["type"]) {
		case "Point":
			console.log("point")
			return [coords]
			break;
		case "LineString":
			console.log("line")
			return coords
			break;
		case "Polygon":
			console.log("poly")
			var tmp = []
			for(let ia = 0; ia<coords.length; ++ia) {
				//console.log(coords[ia])
				for(let ja = 0; ja<coords[ia].length; ++ja) {
					//console.log(coords[ia][ja])
					tmp.push(coords[ia][ja])
				}
			}
			//console.log(tmp)
			return tmp
			break;
		default:
			console.log("invalid feature")
			console.log(feature)
	}
}


function convert(jsonObj) {
	console.log(JSON.parse(JSON.stringify(jsonObj)));
	for(var i = 0; i < jsonObj["features"].length; ++i) {
		var cur_feature = jsonObj.features[i];
		cur_feature["type"] = cur_feature["geometry"]["type"];
		cur_feature["coordinates"] = cur_feature["geometry"]["coordinates"];
		cur_feature["geometry"] = {}
		delete(cur_feature["geometry"]);
	}
	console.log("after rename");
	console.log(JSON.parse(JSON.stringify(jsonObj)));

	var minX = 100,
		maxX = 0,
		minY = 100,
		maxY = 0;

	for(var i = 0; i < jsonObj["features"].length; ++i) {
		var feature = jsonObj.features[i];
		var coords = getAllCoords(feature)
		for(var j = 0; j < coords.length; ++j) {
			var xyCoords = coords[j]
			if (xyCoords[0] < minX) {
				minX = xyCoords[0]
			}
			if (xyCoords[0] > maxX) {
				maxX = xyCoords[0]
			}
			if (xyCoords[1] < minY) {
				minY = xyCoords[1]
			}
			if (xyCoords[1] > maxY) {
				maxY = xyCoords[1]
			}
		}
	}
	console.log("minX")
	console.log(minX)

	console.log("minY")
	console.log(minY)

	console.log("maxX")
	console.log(maxX)

	console.log("maxY")
	console.log(maxY)

	jsonObj["bbox"] = [minX, minY, maxX, maxY];
    jsonObj["granularity"] =10000;

	for(var i = 0; i < jsonObj["features"].length; ++i) {
		var feature = jsonObj.features[i];
		var coords = getAllCoords(feature)
		for(var j = 0; j < coords.length; ++j) {
			var xyCoords = coords[j]
			xyCoords[0] = Math.round((xyCoords[0]-minX)/(maxX-minX)*10000)
			xyCoords[1] = Math.round((xyCoords[1]-minY)/(maxY-minY)*10000)
		}
	}
	console.log("after number translation");
	console.log(JSON.parse(JSON.stringify(jsonObj)));
}
