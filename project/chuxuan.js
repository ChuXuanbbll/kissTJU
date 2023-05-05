const $host = window.location.host;
const $path = window.location.pathname;

function kissTJU() {
  console.log("func running: kissTJU");
  console.log(`host: ${$host}`);
  console.log(`path: ${$path}`);
  chrome.storage.sync.get(["kissTJUConfig"], function (data) {
    const { kissTJUConfig } = data;
    // console.log("config: ", kissTJUConfig);

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
      case "sso.tju.edu.cn":
        handle_sso(kissTJUConfig);
        break;
      case "":
        break;
      case "":
        break;
      case "":
        break;
      default:
        break;
    }
  });
}

kissTJU();

/***********************界面****************************** */
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

function handle_sso(config) {
  console.log("fx r: handle_sso");
  if ($host !== "sso.tju.edu.cn") {
    return;
  }
  //如果有成功界面就停止
  if (document.querySelector(".alert-success")) {
    return;
  }
  //获取配置里的账号密码并填入
  chrome.storage.sync.get(["kissTJUConfig"], function (data) {
    const { kissTJUConfig } = data;
    if (kissTJUConfig && kissTJUConfig.sso_username && kissTJUConfig.sso_pswd) {
      document.getElementById("username").value = atob(kissTJUConfig.sso_username);
      document.getElementById("password").value = atob(kissTJUConfig.sso_pswd);
    }
  });
  //在输入框下面添加保存密码和遗忘密码的按钮
  const temp1 = document.querySelector(".sidebar-content");
  const storageInfo = temp1.children[0]?.cloneNode(true);

  storageInfo.children[0].href = "";
  storageInfo.children[0].textContent = "让kissTJU存储您的账号和密码";

  const forgetInfo = temp1.children[0].cloneNode(true);
  forgetInfo.children[0].href = "";
  forgetInfo.children[0].textContent = "让kissTJU忘记您的账号和密码";

  storageInfo.onclick = function () {
    chrome.storage.sync.get(["kissTJUConfig"], function (data) {
      const { kissTJUConfig } = data;
      if (kissTJUConfig) {
        kissTJUConfig.sso_username = btoa(document.getElementById("username")?.value);
        kissTJUConfig.sso_pswd = btoa(document.getElementById("password")?.value);
        chrome.storage.sync.set({ kissTJUConfig }, function () {});
        alert("(kissTJU不会发送您的账号和密码，但是会将其转换编码后以密文存储在本地，其他浏览器插件或网页可以读取，有泄密风险)");
      }
    });
  };

  forgetInfo.onclick = function () {
    chrome.storage.sync.get(["kissTJUConfig"], function (data) {
      const { kissTJUConfig } = data;
      if (kissTJUConfig) {
        kissTJUConfig.sso_username = void 0;
        kissTJUConfig.sso_pswd = void 0;
        chrome.storage.sync.set({ kissTJUConfig }, function () {});
        alert("(已从本地删除您的账号和密码记录)");
      }
    });
  };

  temp1.appendChild(storageInfo);
  temp1.appendChild(forgetInfo);

  const { sso_fixForm } = config;
  if (sso_fixForm && sso_fixForm.value) {
    fx_sso_fixForm();
  }
}

/********************工具函数**************************/
/**
 * 自动评教
 * 由于没有评教界面参考，不知效果
 */
function fx_autoEvaluate() {
  console.log("fx r: autoEvaluate");
  let timer = setInterval(function () {
    if (document.getElementById("current-bar")?.children[1]?.textContent.match("学生评教")) {
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
    if (document.getElementById("current-bar")?.children[1]?.textContent.match("培养计划")) {
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
 * 课表功能增强：便捷查看课程信息课程大纲
 */
function fx_checkClassInfo() {
  console.log("fx r: checkClassInfo");
  let timer = setInterval(function () {
    if (document.getElementById("current-bar")?.children[1]?.textContent.match("我的课表")) {
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
    if (document.getElementById("current-bar")?.children[1]?.textContent.match("我的成绩")) {
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
          return;
        }
        //重修成绩不计入
        let isRemake = tr.children[2].textContent.match(/(重修)/);
        if (isRemake) {
          continue;
        }
        let credit = tr.children[5].textContent - 0;
        let score = tr.children[6].textContent - 0;
        let GPA = tr.children[7].textContent - 0;
        if (isNaN(credit + score + GPA)) {
          continue; //成绩可能是P
        }
        totalCredit += credit;
        totalScore += credit * score;
        totalGPA += credit * GPA;
      }
      avgScore = totalScore / totalCredit;
      avgGPA = totalGPA / totalCredit;
      newTr = tbody.children[len - 2 > 0 ? len - 2 : 0].cloneNode(true);
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
    if (document.getElementById("current-bar")?.children[1]?.textContent) {
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

/**
 * 登录界面自动填验证码或信息
 */
function fx_sso_fixForm() {
  console.log("fx r: fx_sso_fixForm");

  // let timer = setInterval(function () {
  if (document.getElementById("captcha") && document.getElementById("captcha").value === "") {
    inject();
    // clearInterval(timer);
  }
  // }, 1000);

  function inject() {
    const canvas = document.createElement("canvas");
    document.body.append(canvas);
    const img = document.querySelector("#captcha_img");
    // img.style.scale = 1.44;
    img.setAttribute("crossOrigin", "Anonymous");
    img.setAttribute("referrerpolicy", "no-referrer");
    img.onload = () => {
      let { width, height } = img;
      let scale = 1.44;
      width *= scale; //乘1.44使其与开发环境宽高相同
      height *= scale;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
      let imageData = ctx.getImageData(0, 0, width, height).data;

      //擦边界
      //这个点黑不黑
      function isBlack(i, j) {
        if (i < 0 || j < 0) {
          return null;
        }
        const r = imageData[4 * (i * width + j) + 0];
        const g = imageData[4 * (i * width + j) + 1];
        const b = imageData[4 * (i * width + j) + 2];
        const a = imageData[4 * (i * width + j) + 3];
        //阈值
        if (r + g + b < 500) {
          return true;
        } else {
          return false;
        }
      }
      //让这个点变成白色
      function setWhite(i, j) {
        if (i < 0 || j < 0) {
          return null;
        }
        imageData[4 * (i * width + j) + 0] = 255;
        imageData[4 * (i * width + j) + 1] = 255;
        imageData[4 * (i * width + j) + 2] = 255;
        imageData[4 * (i * width + j) + 3] = 255;
      }
      //让这个点变成黑色
      function setBlack(i, j) {
        imageData[4 * (i * width + j) + 0] = 0;
        imageData[4 * (i * width + j) + 1] = 0;
        imageData[4 * (i * width + j) + 2] = 0;
        imageData[4 * (i * width + j) + 3] = 255;
      }
      // 二值化
      for (let i = 0; i < height; i += 1) {
        for (let j = 0; j < width; j += 1) {
          if (!isBlack(i, j)) {
            imageData[4 * (i * width + j) + 0] = 255;
            imageData[4 * (i * width + j) + 1] = 255;
            imageData[4 * (i * width + j) + 2] = 255;
            imageData[4 * (i * width + j) + 3] = 255;
          } else {
            imageData[4 * (i * width + j) + 0] = 0;
            imageData[4 * (i * width + j) + 1] = 0;
            imageData[4 * (i * width + j) + 2] = 0;
            imageData[4 * (i * width + j) + 3] = 255;
          }
        }
      }
      //左边28宽必是干扰
      for (let i = 0; i < height; i += 1) {
        for (let j = 0; j < 28; j += 1) {
          setWhite(i, j);
        }
      }
      //粗略填充
      for (let k = 0; k < 1; k++) {
        let edgeArr = [];
        for (let i = 0; i < height; i += 1) {
          for (let j = 0; j < width; j += 1) {
            const p = isBlack(i, j);
            const nabor = [
              [-1, 0],
              [-1, 1],
              [0, 1],
              [1, 1],
              [1, 0],
              [1, -1],
              [0, -1],
              [-1, -1],
            ];
            let naborNum = 0;
            nabor.forEach((direction, index) => {
              const [i_p, j_p] = [i + direction[0], j + direction[1]];
              const p_p = isBlack(i_p, j_p);
              if (p_p) {
                naborNum += 1;
              }
            });
            if (naborNum > 6) {
              edgeArr.push([i, j]);
            }
          }
        }
        edgeArr.forEach((point, index) => {
          setBlack(point[0], point[1]);
        });
      }

      //去掉孤零零点 并平滑边界
      for (let k = 0; k < 2; k++) {
        let edgeArr = [];
        for (let i = 0; i < height; i += 1) {
          for (let j = 0; j < width; j += 1) {
            const p = isBlack(i, j);
            const nabor = [
              [-1, 0],
              [-1, 1],
              [0, 1],
              [1, 1],
              [1, 0],
              [1, -1],
              [0, -1],
              [-1, -1],
            ];
            let naborNum = 0;
            nabor.forEach((direction, index) => {
              const [i_p, j_p] = [i + direction[0], j + direction[1]];
              const p_p = isBlack(i_p, j_p);
              if (p_p) {
                naborNum += 1;
              }
            });
            if (naborNum < 4) {
              edgeArr.push([i, j]);
            }
          }
        }
        edgeArr.forEach((point, index) => {
          setWhite(point[0], point[1]);
        });
      }

      //根据周围点判断这个点所在的图形是否为干扰线，干扰线比较细
      for (let k = 0; k < 4; k++) {
        let edgeArr = [];
        for (let i = 0; i < height; i += 1) {
          for (let j = 0; j < width; j += 1) {
            //对黑点操作
            const nabors = [
              [
                [-1, 0],
                [1, 0],
              ],
              [
                [-1, 0],
                [2, 0],
              ],
              [
                [-1, 0],
                [3, 0],
              ],
              [
                [-1, 0],
                [4, 0],
              ], //-
              [
                [0, -1],
                [0, 1],
              ],
              [
                [0, -1],
                [0, 2],
              ],
              [
                [0, -1],
                [0, 3],
              ],
              [
                [0, -1],
                [0, 4],
              ], //|
            ];
            if (isBlack(i, j)) {
              nabors.forEach((nabor, index) => {
                const [[i_p, j_p], [i_q, j_q]] = nabor;

                if (!isBlack(i + i_p, j + j_p) && !isBlack(i + i_q, j + j_q)) {
                  edgeArr.push([i, j]);
                }
              });
            }
          }
        }
        edgeArr.forEach((point, index) => {
          setWhite(point[0], point[1]);
        });
      }
      for (let k = 0; k < 2; k++) {
        let edgeArr = [];
        for (let i = 0; i < height; i += 1) {
          for (let j = 0; j < width / 4; j += 1) {
            //对黑点操作
            const nabors = [
              [
                [-1, -1],
                [1, 1],
              ],
              [
                [-1, -1],
                [2, 2],
              ],
              [
                [-1, -1],
                [3, 3],
              ], ///
              [
                [-1, 1],
                [1, -1],
              ],
              [
                [-1, 1],
                [2, -2],
              ],
              [
                [-1, 1],
                [3, -3],
              ], //\
            ];
            if (isBlack(i, j)) {
              nabors.forEach((nabor, index) => {
                const [[i_p, j_p], [i_q, j_q]] = nabor;

                if (!isBlack(i + i_p, j + j_p) && !isBlack(i + i_q, j + j_q)) {
                  edgeArr.push([i, j]);
                }
              });
            }
          }
        }
        edgeArr.forEach((point, index) => {
          setWhite(point[0], point[1]);
        });
      }

      //修补缝隙
      for (let k = 0; k < 1; k++) {
        let edgeArr = [];
        for (let i = 0; i < height; i += 1) {
          for (let j = 0; j < width; j += 1) {
            //对黑点操作
            const nabors = [
              [
                [-1, 0],
                [1, 0],
              ],
              [
                [0, -1],
                [0, 1],
              ],
            ];
            if (!isBlack(i, j)) {
              nabors.forEach((nabor, index) => {
                const [[i_p, j_p], [i_q, j_q]] = nabor;

                if (isBlack(i + i_p, j + j_p) && isBlack(i + i_q, j + j_q)) {
                  edgeArr.push([i, j]);
                }
              });
            }
          }
        }
        edgeArr.forEach((point, index) => {
          setBlack(point[0], point[1]);
        });
      }

      const myimg = new ImageData(imageData, width, height);
      ctx.putImageData(myimg, 0, 0, 0, 0, width, height);

      const dataURL = canvas.toDataURL("image/jpeg");
      Tesseract.recognize(dataURL, "eng", { logger: (m) => {} }).then(({ data: { text } }) => {
        let code = text;
        code = code.replace(/(<c)|(¢c)/g, "c");
        code = code.replace(/(<)|(¢)/g, "c");
        code = code.replace(/(£)|(€)/g, "f");

        code = code.replace(/[^a-zA-Z0-9]/, "");

        code = code.match(/[a-zA-Z0-9]{1,}/)[0];
        code = code.replace(/(s5)|(5s)|(S5)|(5S)/g, "5");
        code = code.replace(/(s)|(S)/g, "5");
        code = code.replace(/(fF)|(Ff)/g, "f");
        code = code.replace(/(t)|(1)/g, "f");
        code = code.replace(/(b6)|(6b)/g, "6");
        code = code.replace(/G|B/g, "6");
        code = code.replace(/(Qq)|(qQ)|(9q)|(q9)/g, "g");
        code = code.replace(/(Q)|(q)|(9)/g, "g");
        code = code.replace(/(A)/g, "4");
        code = code.replace(/(bh)/g, "b");
        code = code.replace(/h|H/g, "b");
        code = code.replace(/(l|I)/g, "");
        code = code.replace(/T/g, "7");

        code = code.substr(-4);
        console.log(text, code);
        // alert(`${text}--${code}`);
        document.getElementById("captcha").value = code;
        const hasUsername = document.getElementById("username").value.length;
        const hasPswd = document.getElementById("password").value.length;
        if (hasUsername && hasPswd) {
          document.getElementsByName("submit")[0].removeAttribute("disabled");
          document.getElementsByName("submit")[0].click();
        }
      });
    };
  }
}
