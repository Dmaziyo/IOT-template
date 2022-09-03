'use strict';

/**
 * humid service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::humid.humid');
