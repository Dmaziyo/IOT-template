"use strict";

/**
 * worker router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::worker.worker");
