(function (MapCSS) {
    'use strict';

    function restyle(style, tags, zoom, type, selector) {
        var s_default = {}, s_centerline = {}, s_ticks = {}, s_label = {};

        if ((selector === 'line' && tags['highway'] === 'primary')) {
            s_default['width'] = 2;
            s_default['color'] = 'black';
        }

        if ((selector === 'line' && tags['highway'] === 'secondary')) {
            s_default['width'] = 2;
            s_default['color'] = 'black';
        }

        if ((selector === 'line' && tags['highway'] === 'residential')) {
            s_default['width'] = 2;
            s_default['color'] = 'black';
        }

        if (((selector === 'area' && tags['landuse'] === 'grass')) 
         || ((selector === 'area' && tags['natural'] === 'grass')) 
         || ((selector === 'area' && tags['natural'] === 'meadow')) 
         || ((selector === 'area' && tags['leisure'] === 'park')) 
         || ((selector === 'area' && tags['landuse'] === 'meadow')) 
         || ((selector === 'area' && tags['landuse'] === 'recreation_ground'))
         || ((selector === 'area' && tags['landuse'] === 'farmland'))) {

            s_default['fill-pattern'] = 'dotPattern';
        }

        if ((selector === 'node' && tags['railway'] === 'station')) {
            s_default['symbol-shape'] = plateau;
            s_default['symbol-size'] = 30;
        }

        if ((selector === 'node' && tags['station'] === 'light_rail')) {
            s_default['symbol-shape'] = plateau;
            s_default['symbol-size'] = 30;
        }

        if ((selector === 'line' && tags['railway'] === 'light_rail')) {
            s_default['color'] = 'black';
            s_default['dashes'] = [20,20];
            s_default['width'] = 2;
        }

        if ((selector === 'area' && (tags['water'] === 'lake' || tags['water'] === 'river' || tags['natural'] === 'water'))) {
            s_default['fill-pattern'] = 'horzLinePattern';
        }

        if ((selector === 'area' && (tags['waterway'] === 'lake' || tags['waterway'] === 'river' || tags['natural'] === 'water'))) {
            s_default['fill-pattern'] = 'horzLinePattern';
        }

        if (type === 'way' && (tags['waterway'] === 'river' || tags['waterway'] === 'stream' || tags['waterway'] === 'canal')) {
            s_default['fill-pattern'] = 'horzLinePattern';
        }

        if (Object.keys(s_default).length) {
            style['default'] = s_default;
        }
        if (Object.keys(s_centerline).length) {
            style['centerline'] = s_centerline;
        }
        if (Object.keys(s_ticks).length) {
            style['ticks'] = s_ticks;
        }
        if (Object.keys(s_label).length) {
            style['label'] = s_label;
        }
        return style;
    }

    var sprite_images = {
        'style.svg': {
            width: 30,
            height: 30,
            offset: 0
        },
    }
    
    var presence_tags = ['shop'];
    var value_tags = ['station','railway','water','leisure','highway','name'];
    //var value_tags = ['color', 'amenity', 'pk', 'building ', 'marking', 'service', 'addr:housenumber', 'population', 'leisure', 'waterway', 'aeroway', 'landuse', 'barrier', 'colour', 'railway', 'oneway', 'religion', 'tourism', 'admin_level', 'transport', 'name', 'building', 'place', 'residential', 'highway', 'ele', 'living_street', 'natural', 'boundary', 'capital'];

    MapCSS.loadStyle('style', restyle, sprite_images, [], presence_tags, value_tags);
    MapCSS.preloadExternalImages('style');
})(MapCSS);
