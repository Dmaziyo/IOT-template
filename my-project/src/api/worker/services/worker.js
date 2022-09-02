"use strict";

/**
 * worker service
 */
const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::worker.worker", ({ strapi }) => ({
  findCard: async (card_num) => {
    let result = await strapi.entityService.findOne("api::worker.worker", 1, {
      populate: { card_num },
    });
    return result;
  },
}));
