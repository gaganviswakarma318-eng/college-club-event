// event data , shared state, storage and formatting helpers
(() => {
  const defaultEvents = [
    {
      id: 1,
      name: "After Hours: Open Mic",
      date: "2026-10-17",
      time: "18:30",
      venue: "Amphitheatre",
      category: "Arts",
      description:
        "An evening for songs, poems, jokes, stories, and whatever is sitting on the tip of your tongue.",
      accent: "orange",
    },
    {
      id: 2,
      name: "Build It From Scratch",
      date: "2026-10-21",
      time: "15:00",
      venue: "Innovation Lab",
      category: "Tech",
      description:
        "A no-pressure hack session for bright ideas and curious builders.",
      accent: "violet",
    },
    {
      id: 3,
      name: "The Creative Reset",
      date: "2026-10-24",
      time: "11:00",
      venue: "Studio 02",
      category: "Arts",
      description:
        "An unhurried Saturday morning for making things with your hands.",
      accent: "teal",
    },
    {
      id: 4,
      name: "Coffee & Careers",
      date: "2026-10-28",
      time: "16:00",
      venue: "North Block Cafe",
      category: "Career",
      description: "Honest conversations with people a few steps ahead of you.",
      accent: "pink",
    },
    {
      id: 5,
      name: "Sunset Social Run",
      date: "2026-11-01",
      time: "17:30",
      venue: "College Grounds",
      category: "Sports",
      description: "Move, mingle, and finish the week on a high note.",
      accent: "orange",
    },
    {
      id: 6,
      name: "Designing for People",
      date: "2026-11-06",
      time: "14:00",
      venue: "Seminar Hall A",
      category: "Tech",
      description: "A practical workshop on thoughtful, human-centred design.",
      accent: "violet",
    },
  ];

  const state = {
    events:
      JSON.parse(localStorage.getItem("cc-events") || "null") || defaultEvents,
    registrations: JSON.parse(localStorage.getItem("cc-registrations") || "[]"),
    currentCategory: "All",
  };
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);
  const save = () => {
    localStorage.setItem("cc-events", JSON.stringify(state.events));
    localStorage.setItem(
      "cc-registrations",
      JSON.stringify(state.registrations),
    );
  };
  const formatDate = (date) =>
    new Date(`${date}T12:00`)
      .toLocaleDateString("en-US", { month: "short", day: "numeric" })
      .toUpperCase();
  const formatLongDate = (date) =>
    new Date(`${date}T12:00`)
      .toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
      .toUpperCase();
  const formatTime = (time) =>
    new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

  window.CampusCollective = {
    state,
    $,
    $$,
    save,
    formatDate,
    formatLongDate,
    formatTime,
  };
})();
