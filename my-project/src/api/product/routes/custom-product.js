module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/getAllProduct/:id",
      handler: "product.getAll",
      config: {
        auth: false,
      },
    },
  ],
};
