"use strict";

/**
 * book service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::book.book", ({ strapi }) => ({
  findCard: async (book_num) => {
    let result = await strapi.db.query("api::book.book").findOne({
      where: { book_num },
    });
    return result;
  },
}));
