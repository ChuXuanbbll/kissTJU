document.body.onload = home;

function home() {
  //设置cookie默认语言
  setCookie("userLanguage", defaultLanguage);
  //设置页面hash
  setCookie("cas_hash", encodeURIComponent(window.location.hash));

  if (window.localStorage) {
    //重新登录的时候清除掉localStorage
    window.localStorage.clear();
  }
  if (window.sessionStorage) {
    //重新登录的时候清除掉sessionStorage
    window.sessionStorage.clear();
  }

  let setting = {
    imageWidth: 1680,
    imageHeight: 1050,
  };
  let windowHeight = $(window).height();
  let windowWidth = $(window).width();

  let init = function () {
    $(".login_conatiner").height(windowHeight).width(windowWidth);
    $("#container_bg").height(windowHeight).width(windowWidth);
    $("#login_right_box").height(windowHeight);
    let imgW = setting.imageWidth;
    let imgH = setting.imageHeight;
    let ratio = imgH / imgW; //图片的高宽比

    imgW = windowWidth; //图片的宽度等于窗口宽度
    imgH = Math.round(windowWidth * ratio); //图片高度等于图片宽度 乘以 高宽比

    if (imgH < windowHeight) {
      //但如果图片高度小于窗口高度的话
      imgH = windowHeight; //让图片高度等于窗口高度
      imgW = Math.round(imgH / ratio); //图片宽度等于图片高度 除以 高宽比
    }
    $(".login_img_01").width(imgW).height(imgH); //设置图片高度和宽度
  };
  init();
  $(window).resize(function () {
    init();
  });

  //密码找回的中英文切换
  $("#pwd_url")
    .unbind("click")
    .bind("click", function () {
      if ($("#change_language").text() === "中文") {
        $("#pwd_url").attr("href", $("#pwd_url").attr("href") + "?locale=en");
      } else {
        $("#pwd_url").attr("href", $("#pwd_url").attr("href") + "?locale=zh_CN");
      }
    });

  //登录页语言切换
  changeLanguage();
  //初始化点击事件
  initPassWordEvent();
}

// 点击中英文切换
function changeLanguage() {
  let la = Boolean(getQueryString("locale"))
    ? getQueryString("locale")
    : Boolean(getCookie("userLanguage"))
    ? getCookie("userLanguage")
    : defaultLanguage;
  if (la === "zh_CN") {
    $("#change_language").text("English");
    setCookie("userLanguage", "zh_CN");
    $(".login-outside-container").removeClass("en").addClass("zh-cn");
  } else if (la === "en") {
    $("#change_language").text("中文");
    setCookie("userLanguage", "en");
    $(".login-outside-container").removeClass("zh-cn").addClass("en");
  }
  $("#change_language")
    .unbind("click")
    .bind("click", function () {
      let re = eval("/(locale=)([^&]*)/gi");
      let url = window.location.href;
      if ($("#change_language").text() === "中文") {
        setCookie("userLanguage", "zh_CN");
        if (url.indexOf("locale") >= 0) {
          url = url.replace(re, "locale=zh_CN");
          location.href = url;
        } else {
          if (url.indexOf("?") >= 0) {
            location.href = url + "&locale=zh_CN";
          } else {
            location.href = url + "?locale=zh_CN";
          }
        }
      } else if ($("#change_language").text() === "English") {
        setCookie("userLanguage", "en");
        if (url.indexOf("locale") >= 0) {
          url = url.replace(re, "locale=en");
          location.href = url;
        } else {
          if (url.indexOf("?") >= 0) {
            location.href = url + "&locale=en";
          } else {
            location.href = url + "?locale=en";
          }
        }
      }
    });
}

function login() {
  let $u = $("#un"),
    $p = $("#pd");
  let u = $u.val().trim();
  if (u === "") {
    $("#robot-msg").text("账号或密码不能为空").show();
    $(".robot-mag-win").addClass("error");
    $(".robot-mag-win").addClass("small-big-small");
    setTimeout(function () {
      $(".robot-mag-win").removeClass("small-big-small");
      $(".robot-mag-win").addClass("big-small");
      setTimeout(function () {
        $(".robot-mag-win").removeClass("big-small");
      }, 450);
    }, 3000);
    return;
  }

  let p = $p.val().trim();
  if (p === "") {
    $("#robot-msg").text("账号或密码不能为空").show();
    $(".robot-mag-win").addClass("error");
    $(".robot-mag-win").addClass("small-big-small");
    setTimeout(function () {
      $(".robot-mag-win").removeClass("small-big-small");
      $(".robot-mag-win").addClass("big-small");
      setTimeout(function () {
        $(".robot-mag-win").removeClass("big-small");
      }, 450);
    }, 3000);
    return;
  }

  $u.attr("disabled", "disabled");
  $p.attr("disabled", "disabled");

  //防止记录错误密码，每次要刷新记住的密码
  if ($("#rememberName").is(":checked")) {
    //不等于空，写cookie
    setCookie("neusoft_cas_un", u, 7);
    setCookie("neusoft_cas_pd", strEnc(p, "neusoft", "cas", "pd"), 7);
  }

  let lt = $("#lt").val();

  $("#un").val(u);
  $("#pd").val(p);
  $("#ul").val(u.length);
  $("#pl").val(p.length);
  $("#rsa").val(strEnc(u + p + lt, "1", "2", "3"));
  $("#loginForm")[0].submit();
}

//初始化登录页事件
function initPassWordEvent() {
  $("#index_login_btn")
    .unbind("click")
    .bind("click", function () {
      login();
    });

  //点击记住账号密码
  $("#rememberName").change(function () {
    if ($(this).is(":checked")) {
      let $u = $("#un").val();
      let $p = $("#pd").val();
      if ($.trim($u) === "" || $.trim($p) === "") {
        $("#robot-msg").text("账号或密码不能为空").show();
        $(".robot-mag-win").addClass("error");
        $(".robot-mag-win").addClass("small-big-small");
        setTimeout(function () {
          $(".robot-mag-win").removeClass("small-big-small");
          $(".robot-mag-win").addClass("big-small");
          setTimeout(function () {
            $(".robot-mag-win").removeClass("big-small");
          }, 450);
        }, 3000);
        $(this).prop("checked", false);
      } else {
        //不等于空，写cookie
        setCookie("neusoft_cas_un", $u, 7);
        setCookie("neusoft_cas_pd", strEnc($p, "neusoft", "cas", "pd"), 7);
      }
    } else {
      //反选之后清空cookie
      clearCookie("neusoft_cas_un");
      clearCookie("neusoft_cas_pd");
    }
  });

  //获取记住用户密码cookie值
  let cookie_u = getCookie("neusoft_cas_un");
  let cookie_p = getCookie("neusoft_cas_pd");
  if (cookie_u && cookie_p) {
    $("#un").val(cookie_u);
    $("#pd").val(strDec(cookie_p, "neusoft", "cas", "pd"));
    $("#rememberName").attr("checked", "checked");
  }

  $("#un").focus(function () {
    $("#robot-msg").text(document.getElementById("unwords").innerHTML);
    $(".robot-mag-win").removeClass("error");
    $(".robot-mag-win").addClass("small-big-small");
    setTimeout(function () {
      $(".robot-mag-win").removeClass("small-big-small");
      $(".robot-mag-win").addClass("big-small");
      setTimeout(function () {
        $(".robot-mag-win").removeClass("big-small");
      }, 450);
    }, 3000);
  });

  $("#pd").focus(function () {
    $("#robot-msg").text(document.getElementById("pdwords").innerHTML);
    $(".robot-mag-win").removeClass("error");
    $(".robot-mag-win").addClass("small-big-small");
    setTimeout(function () {
      $(".robot-mag-win").removeClass("small-big-small");
      $(".robot-mag-win").addClass("big-small");
      setTimeout(function () {
        $(".robot-mag-win").removeClass("big-small");
      }, 450);
    }, 3000);
  });

  $("#code").focus(function () {
    $("#robot-msg").text(document.getElementById("codewords").innerHTML);
    $(".robot-mag-win").removeClass("error");
    $(".robot-mag-win").addClass("small-big-small");
    setTimeout(function () {
      $(".robot-mag-win").removeClass("small-big-small");
      $(".robot-mag-win").addClass("big-small");
      setTimeout(function () {
        $(".robot-mag-win").removeClass("big-small");
      }, 450);
    }, 3000);
  });

  //用户名文本域keyup事件
  $("#un")
    .keyup(function (e) {
      if (e.which == 13) {
        login();
      }
    })
    .keydown(function (e) {
      $("#errormsg").hide();
    })
    .focus();

  //密码文本域keyup事件
  $("#pd")
    .keyup(function (e) {
      if (e.which == 13) {
        login();
      }
    })
    .keydown(function (e) {
      $("#errormsg").hide();
    });

  //密码文本域keyup事件
  $("#code")
    .keyup(function (e) {
      if (e.which == 13) {
        login();
      }
    })
    .keydown(function (e) {
      $("#errormsg").hide();
    });

  //如果有错误信息，则显示
  if ($("#errormsghide").text()) {
    $("#errormsg").text($("#errormsghide").text());
    $("#robot-msg").text($("#errormsghide").text());
    if ($("#errormsghide").text() === "用户名不存在") {
      $("#errormsg").text("账号或密码错误");
      $("#robot-msg").text("账号或密码错误");
    }
    $("#errormsg").show();
    $(".robot-mag-win").addClass("error");
  } else {
    $(".robot-mag-win").addClass("small-big-small");
    setTimeout(function () {
      $(".robot-mag-win").removeClass("small-big-small");
      $(".robot-mag-win").addClass("big-small");
      setTimeout(function () {
        $(".robot-mag-win").removeClass("big-small");
      }, 450);
    }, 3000);
  }

  //重新获取验证码（图片）
  $("#codeImage").click(function () {
    $("#codeImage").attr("src", "code?" + Math.random());
  });
  //重新获取验证码（文字）
  $("#a_changeCode").click(function () {
    $("#codeImage").attr("src", "code?" + Math.random());
  });

  //点击扫码登陆
  $("#qrcode_login")
    .unbind()
    .click(function () {
      $("#scanLoginDiv").html(document.getElementById("scanLogin").innerHTML);
      $("#errormsg").hide();
      $("#loginFormShow").hide();
      $("#scanLoginDiv").show();
      $("#qrcode_login").addClass("active");
      $("#password_login").removeClass("active");

      //微信企业号扫码登录 add by TJL
      let lqrcode = new loginQRCode("qrcode", 140, 140);

      lqrcode.generateLoginQRCode(function (result) {
        window.location.href = result.redirect_url;
      });

      //点击账号登陆
      $("#password_login")
        .unbind()
        .click(function () {
          $("#loginFormShow").show();
          $("#scanLoginDiv").hide();
          $("#password_login").addClass("active");
          $("#qrcode_login").removeClass("active");
        });
    });
}

function getParameter(hash, name, nvl) {
  if (!nvl) {
    nvl = "";
  }
  let svalue = hash.match(new RegExp("[?&]?" + name + "=([^&#]*)(&?)", "i"));
  if (svalue == null) {
    return nvl;
  } else {
    svalue = svalue ? svalue[1] : svalue;
    svalue = svalue
      .replace(/<script>/gi, "")
      .replace(/<\/script>/gi, "")
      .replace(/<html>/gi, "")
      .replace(/<\/html>/gi, "")
      .replace(/alert/gi, "")
      .replace(/<span>/gi, "")
      .replace(/<\/span>/gi, "")
      .replace(/<div>/gi, "")
      .replace(/<\/div>/gi, "");
    return svalue;
  }
}

//设置cookie
function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

//获取cookie
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

//清除cookie
function clearCookie(name) {
  setCookie(name, "", -1);
}

// 测试：无机器人互动的消息提示显示
function showInfoOn(info) {
  $("#robot-msg").text(info);
  $(".robot-mag-win").removeClass("big-small");
  $(".robot-mag-win").addClass("small-big-small");
}

// 测试：无机器人互动的消息提示显示
function showInfoOff() {
  $(".robot-mag-win").removeClass("small-big-small");
  $(".robot-mag-win").addClass("big-small");
}

home();
