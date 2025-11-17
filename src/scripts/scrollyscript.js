function initScrollyYears() {
  // Grab all the year groups once
  const y2002 = d3.selectAll(".g-group2002");
  const y2007 = d3.selectAll(".g-group2007");
  const y2016 = d3.selectAll(".g-group2016");
  const y2023 = d3.selectAll(".g-group2023");
  const y2024 = d3.selectAll(".g-group2024");

  // A combined selection makes it easy to hide all
  const allYears = d3.selectAll(
    ".g-group2002, .g-group2007, .g-group2016, .g-group2023, .g-group2024"
  );

  // Helper: hide all years (used for intro and transitions)
  function resetYears() {
    allYears
      .classed("year-visible", false)  // hides (opacity 0)
      .classed("year-fade-out", true); // optional, if you want a distinct class

    d3.selectAll("#spacer")
      .classed("transparent", true)
      .classed("spacer_margin", true);
  }

  // Helper: show only one year, smoothly
  function showYear(selection) {
    // fade others out
    allYears
      .classed("year-visible", false)
      .classed("year-fade-out", true);

    // fade this one in
    selection
      .classed("year-fade-out", false)
      .classed("year-visible", true);
  }

  // Named wrappers (similar to top_three / paint / plumbing, etc.)
  function show2002() {
    showYear(y2002);
  }

  function show2007() {
    showYear(y2007);
  }

  function show2016() {
    showYear(y2016);
  }

  function show2023() {
    showYear(y2023);
  }

  function show2024() {
    showYear(y2024);
  }

  // Initial state: intro = nothing shown
  resetYears();

  /* Scrollytelling code (mirroring your majors pattern) */

  // STEP ZERO: intro state, nothing visible
  d3.select("#step-zero")
    .on("stepin", function (e) {
      resetYears();
    })
    .on("stepout", function (e) {
      resetYears();
    });

  // 2002 should appear at STEP ONE (fixes "one step too soon")
  d3.select("#step-one").on("stepin", function (e) {
    show2002();
  });

  d3.select("#step-two").on("stepin", function (e) {
    show2007();
  });

  d3.select("#step-five").on("stepin", function (e) {
    show2016();
  });

  d3.select("#step-seven").on("stepin", function (e) {
    show2023();
  });

  d3.select("#step-nine").on("stepin", function (e) {
    show2024();
  });

  // scrollama setup (same as your working example)
  const scroller = scrollama();

  scroller
    .setup({
      step: "#scrolly .scrolly-overlay .step",
      offset: 0.5,
      debug: false,
    })
    .onStepEnter(function ({ element, index, direction }) {
      const event = new CustomEvent("stepin", { detail: { direction } });
      element.dispatchEvent(event);
    })
    .onStepExit(function ({ element, index, direction }) {
      const event = new CustomEvent("stepout", { detail: { direction } });
      element.dispatchEvent(event);
    });

  window.addEventListener("resize", () => scroller.resize());
}

// Robust init (good for Arc + local)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollyYears);
} else {
  initScrollyYears();
}
