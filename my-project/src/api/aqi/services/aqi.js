'use strict';

/**
 * aqi service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::aqi.aqi');
