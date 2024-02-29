const dom_planTable = document.getElementsByClassName("planTable")[0];
const dom_thead = dom_planTable.children[0];

dom_thead.style.position = "relative";

let $timer = setInterval(function () {
  const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  dom_thead.style.top = `${scrollY}px`;
});

// document.addEventListener("scroll", (e) => {
//   const rootWindow = window;
//   const scrollY = window.scrollY;
//   // console.log(scrollY);
//   const frames = rootWindow.document.querySelector("#iframeMain");
//   // const framesTop = frames.getBoundingClientRect().top
//   // console.log(framesTop)

//   const ifameWindow = window.frames[frames.name];
//   const thead = ifameWindow.document.querySelector("#planInfoTable223191 thead");
//   thead.style.position = "relative";
//   if (scrollY < 300) {
//     thead.style.top = "0";
//   } else {
//     thead.style.top = scrollY - 300 + "px";
//   }
// });

// const rootWindow = window;
// const frames = rootWindow.document.querySelector("#iframeMain");
// const framesTop = frames.getBoundingClientRect().top;
// // console.log(framesTop)
// const ifameWindow = window.frames[frames.name];
// const thead = ifameWindow.document.querySelector("#planInfoTable223191 thead");
// const theadTop = thead.getBoundingClientRect().top;
// console.log(framesTop + theadTop);

function main() {
  const rootWindow = window;
  const frames = rootWindow.document.querySelector("#iframeMain");
  const framesTop = frames.getBoundingClientRect().top;
  const ifameWindow = window.frames[frames.name];
  const thead = ifameWindow.document.querySelector("#planInfoTable223191 thead");
  const theadTop = thead.getBoundingClientRect().top;
  console.log(framesTop + theadTop);
  const offset = framesTop + theadTop;

  thead.style.position = "relative";

  document.addEventListener("scroll", (e) => {
    const scrollY = window.scrollY;
    if (scrollY < offset) {
      thead.style.top = "0";
    } else {
      thead.style.top = scrollY - offset + "px";
    }
  });
}
