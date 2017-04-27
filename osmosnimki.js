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

    var sprite_images = {
        'adm1_4_6.png': {
            width: 4,
            height: 4,
            offset: 0
        },
        'adm1_5.png': {
            width: 5,
            height: 5,
            offset: 4
        },
        'adm1_6_test2.png': {
            width: 6,
            height: 6,
            offset: 9
        },
        'adm_4.png': {
            width: 4,
            height: 4,
            offset: 15
        },
        'adm_5.png': {
            width: 5,
            height: 5,
            offset: 19
        },
        'adm_6.png': {
            width: 6,
            height: 6,
            offset: 24
        },
        'airport_world.png': {
            width: 11,
            height: 14,
            offset: 30
        },
        'aut2_16x16_park.png': {
            width: 16,
            height: 16,
            offset: 44
        },
        'autobus_stop_14x10.png': {
            width: 14,
            height: 10,
            offset: 60
        },
        'bull2.png': {
            width: 12,
            height: 12,
            offset: 70
        },
        'cemetry7_2.png': {
            width: 14,
            height: 14,
            offset: 82
        },
        'cinema_14x14.png': {
            width: 14,
            height: 14,
            offset: 96
        },
        'desert22.png': {
            width: 16,
            height: 8,
            offset: 110
        },
        'glacier.png': {
            width: 10,
            height: 10,
            offset: 118
        },
        'hotell_14x14.png': {
            width: 14,
            height: 14,
            offset: 128
        },
        'kindergarten_14x14.png': {
            width: 14,
            height: 14,
            offset: 142
        },
        'kust1.png': {
            width: 14,
            height: 14,
            offset: 156
        },
        'lib_13x14.png': {
            width: 13,
            height: 12,
            offset: 170
        },
        'med1_11x14.png': {
            width: 11,
            height: 14,
            offset: 182
        },
        'metro_others6.png': {
            width: 16,
            height: 16,
            offset: 196
        },
        'mountain_peak6.png': {
            width: 3,
            height: 3,
            offset: 212
        },
        'mus_13x12.png': {
            width: 13,
            height: 12,
            offset: 215
        },
        'parks2.png': {
            width: 12,
            height: 12,
            offset: 227
        },
        'post_14x11.png': {
            width: 14,
            height: 11,
            offset: 239
        },
        'pravosl_kupol_11x15.png': {
            width: 11,
            height: 15,
            offset: 250
        },
        'rest_14x14.png': {
            width: 14,
            height: 14,
            offset: 265
        },
        'rw_stat_stanzii_2_blue.png': {
            width: 9,
            height: 5,
            offset: 279
        },
        'sady10.png': {
            width: 16,
            height: 16,
            offset: 284
        },
        'school_13x13.png': {
            width: 13,
            height: 13,
            offset: 300
        },
        'sud_14x13.png': {
            width: 14,
            height: 13,
            offset: 313
        },
        'superm_12x12.png': {
            width: 12,
            height: 12,
            offset: 326
        },
        'swamp_world2.png': {
            width: 23,
            height: 24,
            offset: 338
        },
        'tankstelle1_10x11.png': {
            width: 10,
            height: 11,
            offset: 362
        },
        'teater_14x14.png': {
            width: 14,
            height: 14,
            offset: 373
        },
        'town_4.png': {
            width: 4,
            height: 4,
            offset: 387
        },
        'town_6.png': {
            width: 6,
            height: 6,
            offset: 391
        },
        'tramway_14x13.png': {
            width: 14,
            height: 13,
            offset: 397
        },
        'univer_15x11.png': {
            width: 15,
            height: 11,
            offset: 410
        },
        'wc-3_13x13.png': {
            width: 13,
            height: 13,
            offset: 421
        },
        'zoo4_14x14.png': {
            width: 14,
            height: 14,
            offset: 434
        }
    }, external_images = [], presence_tags = ['shop'], value_tags = ['color', 'amenity', 'pk', 'building ', 'marking', 'service', 'addr:housenumber', 'population', 'leisure', 'waterway', 'aeroway', 'landuse', 'barrier', 'colour', 'railway', 'oneway', 'religion', 'tourism', 'admin_level', 'transport', 'name', 'building', 'place', 'residential', 'highway', 'ele', 'living_street', 'natural', 'boundary', 'capital'];

    MapCSS.loadStyle('osmosnimki', restyle, sprite_images, external_images, presence_tags, value_tags);
    MapCSS.preloadExternalImages('osmosnimki');
})(MapCSS);
