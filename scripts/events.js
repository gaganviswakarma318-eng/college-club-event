// event and registration interaction, form handling, and admin controls

(() => {
  const {
    state,
    $,
    $$,
    save,
    renderEvents,
    renderAdmin,
    toast,
  } = window.CampusCollective;

  function openRegistration(name) {
    $("#registrationTitle").textContent = name;
    $("#registrationEvent").value = name;
    $("#registrationModal").classList.remove("hidden");
  }

  function openEventForm(id) {
    const event = state.events.find((item) => item.id === id);
    $("#eventForm").reset();
    $("#eventId").value = event?.id || "";
    $("#eventFormLabel").textContent = event
      ? "REFINE THE DETAILS"
      : "CREATE SOMETHING GOOD";
    $("#eventFormHeading").innerHTML = event
      ? "Edit an <em>event.</em>"
      : "Add an <em>event.</em>";
    if (event) {
      $("#eventName").value = event.name;
      $("#eventCategory").value = event.category;
      $("#eventDate").value = event.date;
      $("#eventTime").value = event.time;
      $("#eventVenue").value = event.venue;
      $("#eventDescription").value = event.description;
      $("#eventAccent").value = event.accent;
    }
    $("#eventModal").classList.remove("hidden");
  }

  function initializeEvents() {
    $("#eventSearch").addEventListener("input", renderEvents);
    $("#categoryFilters").addEventListener("click", (event) => {
      if (event.target.tagName !== "BUTTON") return;
      state.currentCategory = event.target.dataset.category;
      $$("#categoryFilters button").forEach((button) =>
        button.classList.toggle("selected", button === event.target),
      );
      renderEvents();
    });
    document.addEventListener("click", (event) => {
      const button = event.target.closest(".register-button");
      if (button) openRegistration(button.dataset.event);
      if (event.target.dataset.close)
        $("#" + event.target.dataset.close).classList.add("hidden");
      if (event.target.dataset.edit) openEventForm(+event.target.dataset.edit);
      if (event.target.dataset.delete) {
        const id = +event.target.dataset.delete;
        const item = state.events.find((eventItem) => eventItem.id === id);
        if (confirm(`Delete “${item.name}”?`)) {
          state.events = state.events.filter((eventItem) => eventItem.id !== id);
          save();
          renderEvents();
          renderAdmin();
          toast("Event deleted.");
        }
      }
    });
    $("#registrationForm").addEventListener("submit", (event) => {
      event.preventDefault();
      state.registrations.push({
        name: $("#regName").value,
        email: $("#regEmail").value,
        college: $("#regCollege").value,
        phone: $("#regPhone").value,
        event: $("#registrationEvent").value,
      });
      save();
      event.target.reset();
      $("#registrationModal").classList.add("hidden");
      renderAdmin();
      toast("You’re registered — see you there!");
    });
    $("#eventForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const id = +$("#eventId").value;
      const item = {
        id: id || Date.now(),
        name: $("#eventName").value,
        date: $("#eventDate").value,
        time: $("#eventTime").value,
        venue: $("#eventVenue").value,
        category: $("#eventCategory").value,
        description: $("#eventDescription").value,
        accent: $("#eventAccent").value,
      };
      state.events = id
        ? state.events.map((eventItem) => (eventItem.id === id ? item : eventItem))
        : [item, ...state.events];
      save();
      $("#eventModal").classList.add("hidden");
      renderEvents();
      renderAdmin();
      toast(id ? "Event updated." : "New event added.");
    });
  }

  Object.assign(window.CampusCollective, { initializeEvents, openEventForm });
})();
