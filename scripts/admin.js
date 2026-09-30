// admin navigation and controls

(() => {
  const { $, $$, renderRegistrations, openEventForm } = window.CampusCollective;

  function initializeAdmin() {
    $("#newEventButton2").addEventListener("click", () => openEventForm());
    $("#registrationSearch").addEventListener("input", renderRegistrations);
    $("#registrationFilter").addEventListener("change", renderRegistrations);
    $$(".side-link").forEach((button) =>
      button.addEventListener("click", () => {
        const panel = button.dataset.panel;
        $$(".side-link").forEach((item) =>
          item.classList.toggle("active", item === button),
        );
        $$(".panel").forEach((item) =>
          item.classList.toggle("hidden", item.id !== panel),
        );
        closeAdminMenu();
      }),
    );
    $$("[data-go]").forEach((button) =>
      button.addEventListener("click", () =>
        document
          .querySelector(`[data-panel="${button.dataset.go}"]`)
          .click(),
      ),
    );
    $$(".admin-trigger").forEach((button) =>
      button.addEventListener("click", () => {
        $("#studentApp").classList.add("hidden");
        $(".site-header").classList.add("hidden");
        $("#adminApp").classList.remove("hidden");
        window.scrollTo(0, 0);
      }),
    );
    $("#backToStudent").addEventListener("click", () => {
      closeAdminMenu();
      $("#adminApp").classList.add("hidden");
      $("#studentApp").classList.remove("hidden");
      $(".site-header").classList.remove("hidden");
    });
    $("#backToSite").addEventListener("click", (event) => {
      event.preventDefault();
      $("#backToStudent").click();
    });
    const menuButton = $("#menuButton");
    const navLinks = $("#navLinks");
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }),
    );

    const adminMenuButton = $("#adminMenuButton");
    const adminSidebar = $("#adminSidebar");
    const sidebarBackdrop = $("#sidebarBackdrop");
    function closeAdminMenu() {
      adminSidebar.classList.remove("open");
      sidebarBackdrop.classList.remove("open");
      adminMenuButton.setAttribute("aria-expanded", "false");
      adminMenuButton.setAttribute("aria-label", "Open admin navigation");
    }
    adminMenuButton.addEventListener("click", () => {
      const isOpen = adminSidebar.classList.toggle("open");
      sidebarBackdrop.classList.toggle("open", isOpen);
      adminMenuButton.setAttribute("aria-expanded", String(isOpen));
      adminMenuButton.setAttribute(
        "aria-label",
        isOpen ? "Close admin navigation" : "Open admin navigation",
      );
    });
    sidebarBackdrop.addEventListener("click", closeAdminMenu);
  }

  window.CampusCollective.initializeAdmin = initializeAdmin;
})();
