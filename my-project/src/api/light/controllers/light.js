'use strict';

/**
 * light controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::light.light');
