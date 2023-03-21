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
      path: "/bicycle/changeState",
      handler: "bicycle.changeState",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/bicycle/changeState1",
      handler: "bicycle.changeState",
      config: {
        auth: false,
      },
    },
  ],
};
