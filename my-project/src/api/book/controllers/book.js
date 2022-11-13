"use strict";

/**
 * book controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::book.book", ({ strapi }) => ({
  // 自制create，会判断是否存在该卡号
  async customCreate(ctx) {
    let book = ctx.request.body;

    let result = await strapi.services["api::book.book"].findCard(
      book.book_num
    );
    if (result) {
      return {
        code: 444,
        msg: "书号已存在!",
      };
    } else {
      book = await strapi.services["api::book.book"].create({
        data: {
          publishedAt: new Date(),
          book_num: book.book_num,
          name: book.name,
          position: book.position,
        },
      });
      return {
        code: 200,
        msg: "添加成功",
        ...book,
      };
    }
  },
}));
