'use strict';

/**
 * light service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::light.light');
