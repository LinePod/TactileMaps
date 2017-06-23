function clipFeatures(features, bbox) {
	var clippedFeatures = []
	for(var i=0; i<features.length; ++i) {
		console.log("processing feature:")
		console.log(JSON.parse(JSON.stringify(features[i])))
		featureGeometry = features[i]["geometry"]
		switch(featureGeometry["type"]) {
			case "Point":
				console.log("got a point")
				lineclipResult = lineclip([featureGeometry["coordinates"],featureGeometry["coordinates"]],bbox)[0]
				console.log(lineclipResult)
				if(typeof(lineclipResult) != "undefined" && lineclipResult != []) {
					clippedFeatures.push(features[i])
				}
				break;

			case "MultiPoint":
				console.log("got a multipoint")
				var validPoints = []
				for(var j=0; j<featureGeometry["coordinates"].length; ++j) {
					lineclipResult = lineclip([featureGeometry["coordinates"][j],featureGeometry["coordinates"][j]],bbox)[0]
					if(typeof(lineclipResult) != "undefined" && lineclipResult != []) {
						validPoints.push(featureGeometry["coordinates"][j])
					}
				}
				featureGeometry["coordinates"] = []
				for(var j=0; j<validPoints.length; ++j) {
					featureGeometry["coordinates"].push(validPoints[i])
				}
				if(featureGeometry["coordinates"] != []) {
					clippedFeatures.push(features[i])
				}

				break;

			case "LineString":
				console.log("got a line")
				lineclipResult = lineclip(featureGeometry["coordinates"],bbox)[0]
				console.log(lineclipResult)
				if(typeof(lineclipResult) != "undefined" && lineclipResult != []) {
					featureGeometry["coordinates"] = lineclipResult
					clippedFeatures.push(features[i])
				}
				break;

			case "MultiLineString":
				console.log("got a multiline")
				var validLines = []
				for(var j=0; j<featureGeometry["coordinates"].length; ++j) {
					lineclipResult = lineclip(featureGeometry["coordinates"][j],bbox)[0]
					console.log(lineclipResult)
					if(typeof(lineclipResult) != "undefined" && lineclipResult != []) {
						validLines.push(lineclipResult)
					}
				}
				featureGeometry["coordinates"] = []
				for(var j=0; j<validLines.length; ++j) {
					featureGeometry["coordinates"].push(validLines[i])
				}
				if(featureGeometry["coordinates"] != []) {
					clippedFeatures.push(features[i])
				}
				break;

			case "Polygon":
				console.log("got a polygon")
				lineclipResult = lineclip(featureGeometry["coordinates"][0], bbox)
				console.log(lineclipResult)
				if(typeof(lineclipResult) != "undefined" && lineclipResult != []) {
					featureGeometry["coordinates"] = lineclipResult
					clippedFeatures.push(features[i])
				}
				break;

			case "MultiPolygon":
				console.log("got a multipolygon")
				var validPolygons = []
				for(var j=0; j<featureGeometry["coordinates"].length; ++j) {
					lineclipResult = lineclip(featureGeometry["coordinates"][j][0], bbox)
					console.log(lineclipResult)
					if(typeof(lineclipResult) != "undefined" && lineclipResult != [])  {
						validPolygons.push(lineclipResult)
					}
					featureGeometry["coordinates"][j] = lineclipResult
				}
				featureGeometry["coordinates"] = []
				for(var j=0; j<validPolygons.length; ++j) {
					featureGeometry["coordinates"].push(validPolygons[i])
				}
				if(featureGeometry["coordinates"] != []) {
					clippedFeatures.push(features[i])
				}
				break;
			default:
				throw "unexpected type error"
		}
		console.log("clipped feature:")
		console.log(JSON.parse(JSON.stringify(features[i])))
	}
	return clippedFeatures
}
