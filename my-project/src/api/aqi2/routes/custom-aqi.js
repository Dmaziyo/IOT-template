module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/getAllAqi2s/:id",
      handler: "aqi2.getAll",
      config: {
        auth: false,
      },
    },
  ],
};
