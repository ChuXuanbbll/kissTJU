const $host = window.location.host;
const $path = window.location.pathname;

function kissTJU() {
  console.log("func running: kissTJU");
  console.log(`host: ${$host}`);
  console.log(`path: ${$path}`);
  chrome.storage.sync.get(["kissTJUConfig"], function (data) {
    const { kissTJUConfig } = data;

    switch ($host) {
      case "classes.tju.edu.cn":
        handle_classes(kissTJUConfig);
        break;
      case "seatw.lib.tju.edu.cn":
        handle_seat(kissTJUConfig);
        break;
      case "www.icourse163.org":
        handle_mooc(kissTJUConfig);
        break;
      default:
        break;
    }
  });
}

kissTJU();

/***********************方法****************************** */
/**
 * classes.tju.edu.cn
 * @returns
 */
function handle_classes(config) {
  console.log("func running: handle_classes");
  if ($host !== "classes.tju.edu.cn") {
    return;
  }
  const { autoEvaluate, myplan_fixMeterHead, removeFooter, checkClassInfo, showWeightedScore, classes_clickHeart } = config;

  if (autoEvaluate && autoEvaluate.value) {
    fx_autoEvaluate();
  }
  if (myplan_fixMeterHead && myplan_fixMeterHead.value) {
    fx_myplan_fixMeterHead();
  }
  if (removeFooter && removeFooter.value) {
    fx_removeFooter();
  }
  if (myplan_fixMeterHead && myplan_fixMeterHead.value) {
    fx_myplan_fixMeterHead();
  }
  if (checkClassInfo && checkClassInfo.value) {
    fx_checkClassInfo();
  }
  if (showWeightedScore && showWeightedScore.value) {
    fx_showWeightedScore();
  }
  if (classes_clickHeart && classes_clickHeart.value) {
    fx_classes_clickHeart();
  }
}

function handle_seat(config) {
  console.log("func running: handle_seat");
  if ($host !== "seatw.lib.tju.edu.cn") {
    return;
  }
  const { seat_grab, seat_clickHeart } = config;
  if (seat_grab && seat_grab.value) {
    //fx_under_imagination()
  }
  if (seat_clickHeart && seat_clickHeart.value) {
    fx_common_clickHeart();
  }
}

function handle_mooc(config) {
  console.log("fx r: handle_mooc");
  if ($host !== "www.icourse163.org") {
    return;
  }
  const { mook_jumpQuestion } = config;
  if (mook_jumpQuestion && mook_jumpQuestion.value) {
    fx_mook_jumpQuestion();
  }
}
/**
 * 自动评教
 * 由于没有评教界面参考，不知效果
 */
function fx_autoEvaluate() {
  console.log("fx r: autoEvaluate");
  let timer = setInterval(function () {
    if (document.getElementById("current-bar").children[1].textContent === "学生评教") {
      inject();
      // clearInterval(timer);
    }
  }, 500);
  function inject() {
    const options = document.getElementsByClassName("option-item");
    for (let i = 0; i < options.length; i++) {
      let element = options[i];
      let text = element.children[1].textContent;
      if (text === "非常满意" || text === "非常同意") {
        element.children[0].click();
      }
    }
    let completions = document.getElementsByClassName("answer answer-textarea");
    for (let i = 0; i < completions.length; i++) {
      let element = completions[i];
      element.textContent = "承蒙赐教，感激涕零";
    }
    let subBtn = document.getElementById("sub");
    subBtn.click();
  }
}

/**
 * 培养计划表头固定
 */
function fx_myplan_fixMeterHead() {
  console.log("fx r :myplan_fixMeterHead");
  //检测到对应界面打开才会注入
  let timer = setInterval(function () {
    if (document.getElementById("current-bar").children[1].textContent === "培养计划") {
      inject();
      // clearInterval(timer);
    }
  }, 500);

  function inject() {
    const rootWindow = window;
    const frames = rootWindow.document.querySelector("#iframeMain");
    const framesTop = frames.getBoundingClientRect().top; //iframe相对window的高度offset
    const ifameWindow = window.frames[frames.name];
    // const thead = ifameWindow.document.querySelector("#planInfoTable223191 thead");
    const thead = ifameWindow.document.querySelector(".planTable thead");

    const theadTop = thead.getBoundingClientRect().top; //thead表头相对于iframe内window的高度offset
    let offset = framesTop + theadTop; //总高度offset
    offset = 299; //存在一些麻烦，当处于‘培养计划’栏但没有选择‘培养方案’表格时计算的offset只有190，暂时先设置成固定300看，因为目前没发现特例
    // console.log("offset: ", offset);
    thead.style.position = "relative";
    //用户下拉列表到一定高度后，表头固定在网页顶部
    document.addEventListener("scroll", (e) => {
      const scrollY = window.scrollY;
      // console.log("ccrollY: ", scrollY);
      if (scrollY < offset) {
        thead.style.top = "0";
      } else {
        thead.style.top = scrollY - offset + "px";
      }
    });
  }
}

/**
 * 移除底部栏
 */
function fx_removeFooter() {
  console.log("fx r: removeFooter");
  let element_footer = document.getElementById("footer");
  element_footer.parentNode.removeChild(element_footer);
}

/**
 * 便捷查看课程信息课程大纲
 */
function fx_checkClassInfo() {
  console.log("fx r: checkClassInfo");
  let timer = setInterval(function () {
    if (document.getElementById("current-bar").children[1].textContent === "我的课表") {
      inject();
      // clearInterval(timer);
    }
  }, 500);

  function inject() {
    const rootWindow = window;
    const frames = rootWindow.document.querySelector("#iframeMain");
    const ifameWindow = window.frames[frames.name];

    const tbody = ifameWindow.document.querySelector("#tasklesson .grid .gridtable tbody");
    if (!tbody) {
      return;
    }
    for (let i = 0; i < tbody.children.length; i++) {
      const tr = tbody.children[i];
      const uselessUrl = tr.querySelector("td a").href; //e.g. http://classes.tju.edu.cn/eams/courseTableForStd!taskTable.action?lesson.id=114514
      const lessonId = uselessUrl.match(/[\d]{1,}/); //这个id是系统隐藏id，不是课程序号也不是课程代码
      const lessonCode = tr.children[2].innerHTML; //课程代码
      const lessonName = tr.children[3].innerHTML; //课程名称
      tr.children[2].innerHTML = ""; //删除原有的文字
      tr.children[3].innerHTML = ""; //删除原有的文字
      //课程详情
      const lessonInfoBtn = document.createElement("a");
      lessonInfoBtn.target = "_blank"; //必须新窗口打开不然出bug
      lessonInfoBtn.href = `/eams/stdSyllabus!info.action?lesson.id=${lessonId}`; //查看课程详情
      lessonInfoBtn.innerHTML = lessonCode;
      tr.children[2].appendChild(lessonInfoBtn); //添加的标签
      //课程大纲
      const lessonProgBtn = document.createElement("a");
      lessonProgBtn.target = "_blank"; //必须新窗口打开不然出bug
      lessonProgBtn.href = `http://classes.tju.edu.cn/eams/stdSyllabus!syllabusInfo.action?lesson.id=${lessonId}`;
      lessonProgBtn.innerHTML = lessonName;
      tr.children[3].appendChild(lessonProgBtn); //添加的标签
    }
  }
}

/**
 * 成绩界面计算加权分数几点
 */
function fx_showWeightedScore() {
  console.log("fx r: showWeightedScore");
  let timer = setInterval(function () {
    if (document.getElementById("current-bar").children[1].textContent === "我的成绩") {
      inject();
      // clearInterval(timer);
    }
  }, 500);
  function inject() {
    const rootWindow = window;
    const frames = rootWindow.document.querySelector("#iframeMain");
    const ifameWindow = window.frames[frames.name];

    const tbody = ifameWindow.document.querySelector("#semesterGrade .gridtable tbody");
    if (!tbody) {
      return;
    }
    const len = tbody.children.length;
    if (len) {
      let totalCredit = 0;
      let totalScore = 0;
      let totalGPA = 0;
      let avgScore = 0;
      let avgGPA = 0;
      for (let i = 0; i < len; i++) {
        let tr = tbody.children[i];
        //如果已经计算过了，就不再加新行了
        let isinjected = tr.children[2].textContent === "kissTJU";
        if (isinjected) {
          // console.log("injected");
          return;
        }
        //重修成绩不计入
        let isRemake = tr.children[2].textContent.match(/(重修)/);
        if (isRemake) {
          // console.log("remake", isRemake);
          continue;
        }
        let credit = tr.children[5].textContent - 0;
        let score = tr.children[6].textContent - 0;
        let GPA = tr.children[7].textContent - 0;
        if (isNaN(credit + score + GPA)) {
          continue; //成绩可能是P
        }
        // console.log(credit, score, GPA, typeof credit, typeof score, typeof GPA);
        totalCredit += credit;
        totalScore += credit * score;
        totalGPA += credit * GPA;
        // console.log(totalCredit, totalScore, totalGPA);
      }
      avgScore = totalScore / totalCredit;
      avgGPA = totalGPA / totalCredit;
      newTr = tbody.children[0].cloneNode(true);
      newTr.children[1].textContent = "1919810";
      newTr.children[2].textContent = "kissTJU";
      newTr.children[3].textContent = "实用工具";
      newTr.children[4].textContent = "不修";
      newTr.children[5].textContent = `共${totalCredit}`;
      newTr.children[6].textContent = avgScore.toFixed(3);
      newTr.children[7].textContent = avgGPA.toFixed(3);
      tbody.append(newTr);
    }
  }
}

/**
 * 鼠标点击显示小心心 class用iframe比较特殊所以单独写
 */
function fx_classes_clickHeart() {
  console.log("fx r: clickHeart");
  let timer = setInterval(function () {
    if (document.getElementById("current-bar").children[1].textContent) {
      inject();
      // clearInterval(timer);
    }
  }, 1000);

  function inject() {
    const rootWindow = window;
    const frames = rootWindow.document.querySelector("#iframeMain");
    const ifameWindow = window.frames[frames.name];
    const framesTop = frames.getBoundingClientRect().top; //iframe相对window的高度offset

    showHeart(ifameWindow, rootWindow.document);

    function showHeart(myWindow, document) {
      let hearts = [];

      myWindow.requestAnimationFrame = (function () {
        return (
          myWindow.requestAnimationFrame ||
          myWindow.webkitRequestAnimationFrame ||
          myWindow.mozRequestAnimationFrame ||
          myWindow.oRequestAnimationFrame ||
          myWindow.msRequestAnimationFrame ||
          function (callback) {
            setTimeout(callback, 1000 / 60);
          }
        );
      })();

      init();

      function init() {
        css(
          ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
        );
        attachEvent();
        gameloop();
      }

      function gameloop() {
        for (let i = 0; i < hearts.length; i++) {
          if (hearts[i].alpha <= 0) {
            document.body.removeChild(hearts[i].el);
            hearts.splice(i, 1);
            continue;
          }

          hearts[i].y--;
          hearts[i].x += (Math.random() - 0.5) * 8;
          hearts[i].scale += 0.004;
          hearts[i].alpha -= 0.013;
          hearts[i].el.style.cssText =
            "left:" +
            hearts[i].x +
            "px;top:" +
            hearts[i].y +
            "px;opacity:" +
            hearts[i].alpha +
            ";transform:scale(" +
            hearts[i].scale +
            "," +
            hearts[i].scale +
            ") rotate(45deg);background:" +
            hearts[i].color;
        }

        requestAnimationFrame(gameloop);
      }

      function attachEvent() {
        let old = typeof myWindow.onclick === "function" && myWindow.onclick;
        myWindow.onclick = function (event) {
          old && old();
          if (event) {
            let i = 0;
            let timer = setInterval(function () {
              createHeart(event);
              i++;
              if (i > 5) {
                clearInterval(timer);
              }
            }, 100);
          }
        };
      }

      function createHeart(event) {
        let d = document.createElement("div");
        d.className = "heart";
        hearts.push({
          el: d,
          x: event.clientX - 5,
          y: event.clientY - 5 + framesTop,
          scale: 1,
          alpha: 1,
          color: randomColor(),
        });

        document.body.appendChild(d);
      }

      function css(css) {
        let style = document.createElement("style");
        style.type = "text/css";
        try {
          style.appendChild(document.createTextNode(css));
        } catch (ex) {
          style.styleSheet.cssText = css;
        }

        document.getElementsByTagName("head")[0].appendChild(style);
      }

      function randomColor() {
        return "rgb(" + ~~(Math.random() * 255) + "," + ~~(Math.random() * 255) + "," + ~~(Math.random() * 255) + ")";
      }
    }
  }
}

/**
 * MOOC看视频跳题
 */
function fx_mook_jumpQuestion() {
  console.log("fx r: fx_mook_jumpQuestion");
  function jnject() {
    (function () {
      setInterval(function () {
        let question = document.querySelector(".u-btn.u-btn-default.cont.j-continue");
        if (question) {
          question.parentNode.remove();
        }
        let video = document.querySelector("video");
        console.log(video.paused);
        if (video.paused) {
          video.play();
        }
      }, 5000);
    })();
  }
}
/********************工具函数**************************/

/**
 * 通用点击小心心
 */
function fx_common_clickHeart() {
  (function (window, document, undefined) {
    var hearts = [];

    window.requestAnimationFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          setTimeout(callback, 1000 / 60);
        }
      );
    })();

    init();

    function init() {
      css(
        ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
      );
      attachEvent();
      gameloop();
    }

    function gameloop() {
      for (var i = 0; i < hearts.length; i++) {
        if (hearts[i].alpha <= 0) {
          document.body.removeChild(hearts[i].el);
          hearts.splice(i, 1);
          continue;
        }

        hearts[i].y--;
        hearts[i].scale += 0.004;
        hearts[i].alpha -= 0.013;
        hearts[i].el.style.cssText =
          "left:" +
          hearts[i].x +
          "px;top:" +
          hearts[i].y +
          "px;opacity:" +
          hearts[i].alpha +
          ";transform:scale(" +
          hearts[i].scale +
          "," +
          hearts[i].scale +
          ") rotate(45deg);background:" +
          hearts[i].color;
      }

      requestAnimationFrame(gameloop);
    }

    function attachEvent() {
      var old = typeof window.onclick === "function" && window.onclick;
      window.onclick = function (event) {
        old && old();
        createHeart(event);
      };
    }

    function createHeart(event) {
      var d = document.createElement("div");
      d.className = "heart";
      hearts.push({
        el: d,
        x: event.clientX - 5,
        y: event.clientY - 5,
        scale: 1,
        alpha: 1,
        color: randomColor(),
      });

      document.body.appendChild(d);
    }

    function css(css) {
      var style = document.createElement("style");
      style.type = "text/css";
      try {
        style.appendChild(document.createTextNode(css));
      } catch (ex) {
        style.styleSheet.cssText = css;
      }

      document.getElementsByTagName("head")[0].appendChild(style);
    }

    function randomColor() {
      return "rgb(" + ~~(Math.random() * 255) + "," + ~~(Math.random() * 255) + "," + ~~(Math.random() * 255) + ")";
    }
  })(window, document);
}
