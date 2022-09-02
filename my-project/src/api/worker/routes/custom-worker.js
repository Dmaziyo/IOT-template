module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/changeState/:id",
      handler: "worker.changeState",
    },
    {
      method: "GET",
      path: "/getWorkingPeople",
      handler: "worker.workingPeople",
    },
    {
      // Route with custom policies
      method: "POST",
      path: "/restaurants/:id/reservation",
      handler: "Restaurant.reservation",
      config: {
        policies: ["is-authenticated", "has-credit-card"],
      },
    },
  ],
};
