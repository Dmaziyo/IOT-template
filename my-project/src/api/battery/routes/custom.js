module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/getAllBatteries/:id",
      handler: "battery.getAll",
      config: {
        auth: false,
      },
    },
  ],
};
