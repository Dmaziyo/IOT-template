"use strict";

/**
 * swim-member service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::swim-member.swim-member",
  ({ strapi }) => ({
    findCard: async (card_num) => {
      let result = await strapi.db
        .query("api::swim-member.swim-member")
        .findOne({
          where: { card_num },
        });
      return result;
    },
  })
);
