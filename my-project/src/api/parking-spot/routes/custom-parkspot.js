module.exports = {
  routes: [
    {
      method: "POST",
      path: "/recharge",
      handler: "parking-spot.recharge",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/checkState",
      handler: "parking-spot.checkState",
      config: {
        auth: false,
      },
    },
  ],
};
