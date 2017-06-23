function traverseCoords(arr) {
	if(typeof(arr[0][0]) == 'number') {
		return arr
	}
	var ret = [];

	for(var i = 0; i < arr.length; ++i) {
		var res = traverseCoords(arr[i])
		for(var j = 0; j < res.length; ++j) {
			ret.push(res[j]);
		}
	}
	return ret;
}

function getAllCoords(feature) {
	var coords = feature["coordinates"]
	return traverseCoords([coords]);
}

function convert(jsonObj) {
	/**
	 * Converts osm-json data to tile-format as needed by kothic.js
	 */
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
		console.log("feature:")
		console.log(JSON.parse(JSON.stringify(feature)));
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

	jsonObj["bbox"] = [minX, minY, maxX, maxY];
    jsonObj["granularity"] = 10000;

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
