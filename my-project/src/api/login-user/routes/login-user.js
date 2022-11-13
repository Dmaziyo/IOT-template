'use strict';

/**
 * login-user router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::login-user.login-user');
