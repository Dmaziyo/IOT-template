module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/getWaterVolume",
      handler: "water-history.getWaterVolume",
      config: {
        auth: false,
      },
    },
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/getSpecificVolume",
      handler: "water-history.getSpecificVolume",
      config: {
        auth: false,
      },
    },
  ],
};
