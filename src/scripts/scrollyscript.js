(function () {
  let initialized = false;

  // Helper: hide all year groups
  function resetYears() {
    const allYears = d3.selectAll(
      ".g-group2002, .g-group2007, .g-group2016, .g-group2023, .g-group2024"
    );

    allYears
      .classed("year-visible", false)
      .classed("year-fade-out", true);

    d3.selectAll("#spacer")
      .classed("transparent", true)
      .classed("spacer_margin", true);
  }

  // Helper: show only the given selector, hide others
  function showYear(selector) {
    const allYears = d3.selectAll(
      ".g-group2002, .g-group2007, .g-group2016, .g-group2023, .g-group2024"
    );

    allYears
      .classed("year-visible", false)
      .classed("year-fade-out", true);

    d3.selectAll(selector)
      .classed("year-fade-out", false)
      .classed("year-visible", true);
  }

  // Named wrappers – same vibe as reset/top_three/paint/etc.
  function show2002() {
    showYear(".g-group2002");
  }

  function show2007() {
    showYear(".g-group2007");
  }

  function show2016() {
    showYear(".g-group2016");
  }

  function show2023() {
    showYear(".g-group2023");
  }

  function show2024() {
    showYear(".g-group2024");
  }

  // Main init – only called once, and only after SVG + steps exist
  function initScrollyYears() {
    if (initialized) return;
    initialized = true;

    // initial state: intro = no years
    resetYears();

    // STEP ZERO: intro (nothing visible)
    d3.select("#step-zero")
      .on("stepin", function () {
        resetYears();
      })
      .on("stepout", function () {
        resetYears();
      });

    // 2002 starts at STEP ONE
    d3.select("#step-one").on("stepin", function () {
      show2002();
    });

    d3.select("#step-two").on("stepin", function () {
      show2007();
    });

    d3.select("#step-five").on("stepin", function () {
      show2016();
    });

    d3.select("#step-seven").on("stepin", function () {
      show2023();
    });

    d3.select("#step-nine").on("stepin", function () {
      show2024();
    });

    // scrollama setup (same pattern as your majors example)
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

  // Poll until Arc has actually injected SVG + steps
  function tryInit() {
    if (initialized) return;

    const hasYearGroup = document.querySelector(
      ".g-group2002, .g-group2007, .g-group2016, .g-group2023, .g-group2024"
    );
    const hasStep = document.querySelector("#scrolly .scrolly-overlay .step");

    // also make sure d3 + scrollama are available
    const hasLibs = window.d3 && window.scrollama;

    if (hasYearGroup && hasStep && hasLibs) {
      initScrollyYears();
    }
  }

  // Start checking after DOM is at least loaded
  function bootstrap() {
    // try once immediately
    tryInit();

    // then keep checking until initialized
    const interval = setInterval(function () {
      if (initialized) {
        clearInterval(interval);
      } else {
        tryInit();
      }
    }, 250); // 4x per second is plenty
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
