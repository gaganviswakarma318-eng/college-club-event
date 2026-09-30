// event, admin and registration rendering

(() => {
  const { state, $, formatDate, formatLongDate, formatTime } =
    window.CampusCollective;

  function renderEvents() {
    const q = $("#eventSearch").value.toLowerCase();
    const list = state.events.filter(
      (event) =>
        (state.currentCategory === "All" ||
          event.category === state.currentCategory) &&
        event.name.toLowerCase().includes(q),
    );
    $("#eventGrid").innerHTML = list.length
      ? list
          .map(
            (event) =>
              `<article class="event-card ${event.accent}"><span class="event-tag">${formatLongDate(event.date)} · ${formatTime(event.time)}<br>${event.category.toUpperCase()}</span><div><h3>${event.name}</h3><p>${event.description}</p></div><div class="event-details"><span>📍 ${event.venue}</span><button class="register-button" data-event="${event.name}" aria-label="Register for ${event.name}">→</button></div></article>`,
          )
          .join("")
      : "<p>No events match that search. Try another idea.</p>";
  }

  function renderRegistrations() {
    const q = $("#registrationSearch").value.toLowerCase();
    const filter = $("#registrationFilter").value;
    const rows = state.registrations.filter(
      (registration) =>
        (filter === "All" || registration.event === filter) &&
        `${registration.name} ${registration.email} ${registration.event}`
          .toLowerCase()
          .includes(q),
    );
    $("#registrationTable").innerHTML = rows.length
      ? rows
          .map(
            (registration) =>
              `<tr><td><strong>${registration.name}</strong><small>${registration.email}</small></td><td>${registration.event}</td><td>${registration.college}</td><td>${registration.phone}</td></tr>`,
          )
          .join("")
      : '<tr><td colspan="4" style="text-align:center;color:#777;padding:35px">No registrations found yet.</td></tr>';
  }

  function renderAdmin() {
    $("#eventCount").textContent = state.events.length;
    $("#registrationCount").textContent = state.registrations.length;
    const mini = (event) =>
      `<div class="mini-event"><span class="date-box">${formatDate(event.date)}</span><div><strong>${event.name}</strong><small>${formatTime(event.time)} · ${event.venue}</small></div><span class="pill">${event.category.toUpperCase()}</span><span>${state.registrations.filter((registration) => registration.event === event.name).length} sign-ups</span></div>`;
    $("#adminEventList").innerHTML = state.events
      .slice(0, 4)
      .map(mini)
      .join("");
    $("#manageEventList").innerHTML = state.events
      .map(
        (event) =>
          `<div class="manage-row"><span class="date-box">${formatDate(event.date)}</span><div><strong>${event.name}</strong><small>${formatTime(event.time)} · ${event.venue} · ${event.category}</small></div><small>${state.registrations.filter((registration) => registration.event === event.name).length} registrations</small><div class="row-actions"><button data-edit="${event.id}">Edit</button><button class="delete" data-delete="${event.id}">Delete</button></div></div>`,
      )
      .join("");
    const options = ["All", ...state.events.map((event) => event.name)];
    $("#registrationFilter").innerHTML = options
      .map((option) => `<option>${option}</option>`)
      .join("");
    renderRegistrations();
  }

  function toast(message) {
    $("#toast").textContent = message;
    $("#toast").classList.remove("hidden");
    setTimeout(() => $("#toast").classList.add("hidden"), 2800);
  }

  Object.assign(window.CampusCollective, {
    renderEvents,
    renderRegistrations,
    renderAdmin,
    toast,
  });
})();
