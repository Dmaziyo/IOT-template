"use strict";

/**
 * battery router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::battery.battery");
