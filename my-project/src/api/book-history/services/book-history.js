'use strict';

/**
 * book-history service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-history.book-history');
