var highways
var water
var trains

function renderMap() {
	highways = document.getElementById("highways").checked
	water = document.getElementById("water").checked
	trains = document.getElementById("trains").checked
	convert(tile_data)
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
	MapCSS.preloadSpriteImage("style","style.png");
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
