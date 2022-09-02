'use strict';

/**
 * worker controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::worker.worker');
