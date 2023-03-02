'use strict';

/**
 * parking-spot service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::parking-spot.parking-spot');
