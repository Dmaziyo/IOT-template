'use strict';

/**
 * parking-history service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::parking-history.parking-history');
