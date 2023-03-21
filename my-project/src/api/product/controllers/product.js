"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async getAll(ctx) {
    const id = ctx.params.id;
    console.log(id);
    let products = await strapi.db
      .query("api::product.product")
      .findMany({ where: { vid: id } });
    console.log(products);

    return {
      count: products.length,
      products,
    };
  },
}));
