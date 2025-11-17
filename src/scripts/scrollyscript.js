const y2002 = d3.selectAll(".g-group2002");
const y2007 = d3.selectAll(".g-group2007");
const y2016 = d3.selectAll(".g-group2016");
const y2023 = d3.selectAll(".g-group2023");
const y2024 = d3.selectAll(".g-group2024");

const groups = {
    y2002,
    y2007,
    y2016,
    y2023,
    y2024
  };
  
function setYearVisibility(visibleKeys = []) {
    Object.entries(groups).forEach(([key, selection]) => {
      const isVisible = visibleKeys.includes(key);
  
      if (isVisible) {
        selection
          .style("display", null)
          .transition()
          .duration(600)
          .style("opacity", 1);
      } else {
        selection
          .transition()
          .duration(600)
          .style("opacity", 0)
          .on("end", function () {
            d3.select(this).style("display", "none");
          });
      }
    });
    d3.selectAll("#spacer").classed('transparent', true).classed('spacer_margin', true)
  }  

setYearVisibility([]); // hide all groups at start

d3.select("#step-zero").on("stepin", () => {
    setYearVisibility(["y2002"]);
  });
  
  d3.select("#step-two").on("stepin", () => {
    setYearVisibility(["y2007"]);
  });
  
  d3.select("#step-five").on("stepin", () => {
    setYearVisibility(["y2016"]);
  });
  
  d3.select("#step-seven").on("stepin", () => {
    setYearVisibility(["y2023"]);
  });
  
  d3.select("#step-nine").on("stepin", () => {
    setYearVisibility(["y2024"]);
  });  

// scrolly stuff 
const scroller = scrollama();

scroller
    .setup({
        step: "#scrolly .scrolly-overlay .step",
        offset: 0.5,
        debug: false
    })
    .onStepEnter(function ({ element, index, direction }) {
        const event = new CustomEvent('stepin', { detail: { direction: direction } })
        element.dispatchEvent(event);
    })
    .onStepExit(function ({ element, index, direction }) {
        const event = new CustomEvent('stepout', { detail: { direction: direction } })
        element.dispatchEvent(event);
    });

window.addEventListener("resize", scroller.resize);