// startup entry point.

(() => {
  const app = window.CampusCollective;
  app.initializeEvents();
  app.initializeAdmin();
  app.renderEvents();
  app.renderAdmin();
})();
