var highways
var water
var trains

function renderMap() {

	bbox = [52.502874,13.280883,52.511624,13.296375];
	/*features = [["way","railway","light_rail"],
				["node","station","light_rail"],
				["way","leisure","park"],
				["way","water","lake"],
				["way","water","river"],
				["way","highway","primary"]]
	*/

   	features = []

	if(document.getElementById("mainhighways").checked) {
		features.push(["way","highway","primary"]);
	}
	if(document.getElementById("secondaryhighways").checked) {
		features.push(["way","highway","secondary"]);
	}
	if(document.getElementById("water").checked) {
		features.push(["way","water","lake"]);
		features.push(["way","water","river"]);
	}
	if(document.getElementById("parks").checked) {
		features.push(["way","leisure","park"]);
	}
	if(document.getElementById("trains").checked) {
		features.push(["way","railway","light_rail"]);
		features.push(["node","station","light_rail"]);
	}

	var address = document.getElementById("area").value;
	console.log("Address");
	console.log(address);
	var bbox = getBoundingBoxForCity(address);
	tile_data = getOSMData(features, bbox);

	convert(tile_data);
	invertYAxe(tile_data);
	MapCSS.onImagesLoad = function () {
		Kothic.render(tile_data, 13, {
			styles: ['style']
		});
		var svgOut = ctx.getSvg();
		console.log("svg");
		console.log(svgOut);
		var container = document.getElementById("container");
		console.log("appending");
		container.appendChild(svgOut);
	};
	MapCSS.preloadSpriteImage("style","style.svg");
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
