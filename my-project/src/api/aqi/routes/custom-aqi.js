module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/getAllAqi1s/:id",
      handler: "aqi.getAll",
      config: {
        auth: false,
      },
    },
  ],
};
