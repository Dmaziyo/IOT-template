module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/getAllTemp1s/:id",
      handler: "temp.getAll",
      config: {
        auth: false,
      },
    },
  ],
};
