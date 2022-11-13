module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/addPark",
      handler: "parkinglot.add",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/minusPark",
      handler: "parkinglot.minus",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/initPark",
      handler: "parkinglot.initParkinglot",
      config: {
        auth: false,
      },
    },
  ],
};
