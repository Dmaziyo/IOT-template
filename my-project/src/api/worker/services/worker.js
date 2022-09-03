"use strict";

/**
 * worker service
 */
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::worker.worker", ({ strapi }) => ({
  findCard: async (card_num) => {
    let result = await strapi.db.query("api::worker.worker").findOne({
      where: { card_num },
    });
    return result;
  },
}));
