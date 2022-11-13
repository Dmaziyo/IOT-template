module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/getAllTemp2s/:id",
      handler: "temp2.getAll",
      config: {
        auth: false,
      },
    },
  ],
};
