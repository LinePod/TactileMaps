(function (MapCSS) {
    'use strict';

    function restyle(style, tags, zoom, type, selector) {
        var s_default = {}, s_centerline = {}, s_ticks = {}, s_label = {};

        if ((type === 'way' && tags['highway'] === 'primary') && highways) {
            s_default['width'] = 3;
            s_default['color'] = 'black';
        }


        if ((type === 'node' && tags['railway'] === 'station')) {
            s_default['symbol-shape'] = cross;
            s_default['symbol-size'] = 5;
            s_default['width'] = 3;
            s_default['color'] = 'black';
        }

        if ((type === 'way' && tags['waterway'] === 'river') && water) {
            s_default['color'] = 'black';
            s_default['width'] = 3;
            s_default['dashes'] = [3,1];
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
    var presence_tags = ['shop'], value_tags = ['color', 'amenity', 'pk', 'building ', 'marking', 'service', 'addr:housenumber', 'population', 'leisure', 'waterway', 'aeroway', 'landuse', 'barrier', 'colour', 'railway', 'oneway', 'religion', 'tourism', 'admin_level', 'transport', 'name', 'building', 'place', 'residential', 'highway', 'ele', 'living_street', 'natural', 'boundary', 'capital'];

    MapCSS.loadStyle('style', restyle, [], [], presence_tags, value_tags);
    MapCSS.preloadExternalImages('style');
})(MapCSS);
