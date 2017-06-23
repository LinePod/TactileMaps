function renderMap() {
	
	//Lietzensee 
	//var bbox = [52.502874,13.280883,52.511624,13.296375];
	var bbox
	
	//Fuerstenfeldbrück
	var bbox = [48.16624,11.238501,48.1731835,11.2526178]


   	features = []

	if(document.getElementById("mainhighways").checked) {
		features.push(["way","highway","primary"]);
	}
	if(document.getElementById("secondaryhighways").checked) {
		features.push(["way","highway","secondary"]);
	}
	if(document.getElementById("residentialhighways").checked) {
		features.push(["way","highway","residential"]);
		features.push(["way","highway","tertiary"]);
		features.push(["way","highway","unclassified"]);
	}
	if(document.getElementById("water").checked) {
		features.push(["way","water","lake"]);
		features.push(["way","natural","water"]);
		features.push(["way","water","river"]);
		features.push(["way","waterway"]);
		features.push(["relation","natural","water"]);
		features.push(["relation","waterway"]);
	}
	if(document.getElementById("parks").checked) {
		features.push(["way","leisure","park"]);
		features.push(["way","landuse","grass"]);
	}

	if(document.getElementById("forest").checked) {
		features.push(["way","natural","wood"]);
		features.push(["relation","landuse","forest"]);
		features.push(["way","landuse","forest"]);
	}
	if(document.getElementById("trains").checked) {
		features.push(["way","railway"]) //,"light_rail"]);
		features.push(["node","station"]) //,"light_rail"]);
	}

	if(document.getElementById("busstations").checked) {
		features.push(["node","highway","bus_stop"]);
		features.push(["node","bus","yes"]);
	}

	if(document.getElementById("buildings").checked) {
		features.push(['way',"building"])
	}

	var address = document.getElementById("area").value;
	console.log("Address");
	console.log(address);

	if(address != "") {
		var bbox = getBoundingBoxForCity(address);
	}

	tile_data = getOSMData(features, bbox);
	console.log("tile-data:");
	console.log(JSON.parse(JSON.stringify(tile_data)));
	console.log("bbox:");
	console.log(bbox);
	var trans_bbox = [bbox[1],bbox[0],bbox[3],bbox[2]]
	console.log("trans bbox: ")
	console.log(trans_bbox)
	
	tile_data["features"] = clipFeatures(tile_data["features"], trans_bbox)

	console.log("After slice:");
	console.log(JSON.parse(JSON.stringify(tile_data)));

	// convert osm-json to tile-format
	convert(tile_data);
	invertYAxe(tile_data);

	Kothic.render(tile_data, 13, {
		styles: ['style']
	});

	var svgOut = ctx.getSvg();
	console.log("svg");
	console.log(svgOut);
	var container = document.getElementById("container");
	console.log("appending");
	container.appendChild(svgOut);

	//necessary for form submit
	return false;
}

function invertYAxe(data) {
	var type, coordinates, tileSize = data.granularity, i, j, k, l, feature;
	for (i = 0; i < data.features.length; i++) {
		feature = data.features[i];
		coordinates = feature.coordinates;
		type = data.features[i].type;
		if (type == 'Point') {
			coordinates[1] = tileSize - coordinates[1];
		} else if (type == 'MultiPoint' || type == 'LineString') {
			for (j = 0; j < coordinates.length; j++) {
				coordinates[j][1] = tileSize - coordinates[j][1];
			}
		} else if (type == 'MultiLineString' || type == 'Polygon') {
			for (k = 0; k < coordinates.length; k++) {
				for (j = 0; j < coordinates[k].length; j++) {
					coordinates[k][j][1] = tileSize - coordinates[k][j][1];
				}
			}
		} else if (type == 'MultiPolygon') {
			for (l = 0; l < coordinates.length; l++) {
				for (k = 0; k < coordinates[l].length; k++) {
					for (j = 0; j < coordinates[l][k].length; j++) {
						coordinates[l][k][j][1] = tileSize - coordinates[l][k][j][1];
					}
				}
			}
		}

		if ('reprpoint' in feature) {
			feature.reprpoint[1] = tileSize - feature.reprpoint[1];
		}
	}
}
