'use strict';

/**
 * battery service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::battery.battery');
