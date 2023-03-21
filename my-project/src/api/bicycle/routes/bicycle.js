"use strict";

/**
 * bicycle router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::bicycle.bicycle");
