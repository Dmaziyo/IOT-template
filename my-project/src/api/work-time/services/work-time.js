'use strict';

/**
 * work-time service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::work-time.work-time');
