module.exports = {
  routes: [
    {
      method: "POST",
      path: "/createBicycle",
      handler: "bicycle.createBicycle",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/bicycle/changeState/:id/:type",
      handler: "bicycle.changeState",
      config: {
        auth: false,
      },
    },
  ],
};
