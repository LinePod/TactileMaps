(function (MapCSS) {
    'use strict';

    function restyle(style, tags, zoom, type, selector) {
        var s_default = {}, s_centerline = {}, s_ticks = {}, s_label = {};

        if ((type === 'way' && tags['highway'] === 'primary')) {
            s_default['width'] = 1;
            s_default['color'] = 'black';
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
