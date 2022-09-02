"use strict";

/**
 * worker router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::worker.worker", {
  config: {
    create: {
      // disables authorization requirement for the `find` route
      policies: ["admin::isAuthenticatedAdmin"],
      // here you can also customize auth & middlewares
    },
  },
});
