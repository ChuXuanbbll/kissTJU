const isLite = false; //是否为精简版分支 main分支会有花里胡哨的功能 精简版会砍掉大体积的图片视频音频资源等

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
			case "www.pigai.org":
				handle_pigai(kissTJUConfig);
				break;
			case "121.193.132.43":
				handle_thesis(kissTJUConfig);
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
	const {
		autoEvaluate,
		myplan_fixMeterHead,
		removeFooter,
		checkClassInfo,
		showWeightedScore,
		classes_clickHeart,
		classes_expElect,
		classes_ifameToolbar,
		classes_timetablePreview,
	} = config;

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
	if (classes_expElect && classes_expElect.value) {
		fx_classes_expElect();
	}
	if (classes_ifameToolbar && classes_ifameToolbar.value) {
		fx_classes_ifameToolbar();
	}
	if (classes_timetablePreview && classes_timetablePreview.value) {
		fx_classes_timetablePreview();
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

function handle_sso_old_abandon(config) {
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

function handle_sso(config) {
	console.log("fx r: handle_sso");
	if ($host !== "sso.tju.edu.cn") {
		return;
	}
	const { sso_genshinStart, sso_setRobot, sso_fixForm, sso_antiWeakPwd } = config;
	if (sso_genshinStart && sso_genshinStart.value) {
		fx_sso_genshinStart();
	}
	if (sso_setRobot && sso_setRobot.value) {
		fx_sso_setRobot(sso_setRobot.value);
	}
	console.log("@@", sso_fixForm);
	if ((sso_fixForm, sso_fixForm.value)) {
		fx_sso_fixForm();
	}
	if (sso_antiWeakPwd && sso_antiWeakPwd.value) {
		fx_sso_antiWeakPwd();
	}
}

function handle_pigai(config) {
	console.log("fx r: handle_pigai");
	if ($host !== "www.pigai.org") {
		return;
	}
	const { pigai_paste } = config;
	if (pigai_paste && pigai_paste.value) {
		fx_pigai_paste();
	}
}

function handle_thesis(config) {
	console.log("fx r: handle_thesis");
	if ($host !== "121.193.132.43") {
		return;
	}
	const { thesis_iReallyKnow, thesis_autoLogin } = config;
	if (thesis_iReallyKnow && thesis_iReallyKnow.value) {
		fx_thesis_iReallyKnow();
	}
	if (thesis_autoLogin && thesis_autoLogin.value) {
		fx_thesis_autoLogin();
	}
}

/********************工具函数**************************/
/**
 * 自动评教
 */
function fx_autoEvaluate() {
	console.log("fx r: autoEvaluate");
	let timer = setInterval(function () {
		if (
			//有两个入口进入评教界面 其中从成绩界面打开的评教会新建标签页
			window.location.pathname === "/eams/quality/stdEvaluate!answer.action"
		) {
			inject(window);
		} else if (document.getElementById("current-bar")?.children[1]?.textContent.match("学生评教")) {
			const rootWindow = window;
			const frames = rootWindow.document.querySelector("#iframeMain");
			const ifameWindow = window.frames[frames.name];

			inject(ifameWindow);
		}
	}, 500);

	function inject(mWindow) {
		if (mWindow.is_inj_autoEvaluate) return;

		let head = mWindow.document?.querySelector("#head");
		if (!head) return;
		let autoEvalBtn = document.createElement("button");
		autoEvalBtn.textContent = "自动评教";

		autoEvalBtn.onclick = () => {
			//选择题
			const options = mWindow.document?.getElementsByClassName("option-item");
			for (let i = 0; i < options.length; i++) {
				let element = options[i];
				let text = element.children[1].textContent;
				if (text === "非常满意" || text === "非常同意") {
					element.children[0].click();
				}
			}
			//填空题
			let completions = mWindow.document?.getElementsByClassName("answer answer-textarea");
			for (let i = 0; i < completions.length; i++) {
				let element = completions[i];
				element.textContent = "承蒙赐教，感激涕零";
			}
			//提交
			let subBtn = mWindow.document?.getElementById("sub");
			subBtn && subBtn.click();
		};
		head.append(autoEvalBtn);

		mWindow.is_inj_autoEvaluate = true;
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
		if (!thead) return;
		if (ifameWindow.is_inj_fx_myplan_fixMeterHead) return;

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
		ifameWindow.is_inj_fx_myplan_fixMeterHead = true;
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
			const teacherName = tr.children[5].innerHTML; //教师名称
			//课程详情
			const lessonInfoBtn = document.createElement("a");
			lessonInfoBtn.target = "_blank"; //必须新窗口打开不然出bug
			lessonInfoBtn.href = `/eams/stdSyllabus!info.action?lesson.id=${lessonId}`; //查看课程详情
			lessonInfoBtn.innerHTML = lessonCode;
			tr.children[2].innerHTML = ""; //删除原有的文字
			tr.children[2].appendChild(lessonInfoBtn); //添加的标签
			//课程大纲
			const lessonProgBtn = document.createElement("a");
			lessonProgBtn.target = "_blank"; //必须新窗口打开不然出bug
			lessonProgBtn.href = `http://classes.tju.edu.cn/eams/stdSyllabus!syllabusInfo.action?lesson.id=${lessonId}`;
			lessonProgBtn.innerHTML = lessonName;
			tr.children[3].innerHTML = ""; //删除原有的文字
			tr.children[3].appendChild(lessonProgBtn); //添加的标签
			//课程评教 id原理未知
			// const lessonEvalBtn = document.createElement("a");
			// lessonEvalBtn.target = "_blank"; //必须新窗口打开不然出bug
			// lessonEvalBtn.href = `http://classes.tju.edu.cn/eams/quality/stdEvaluate!answer.action?evaluationLesson.id=${lessonId}`;
			// lessonEvalBtn.innerHTML = teacherName;
			// tr.children[5].innerHTML = ""; //删除原有的文字
			// tr.children[5].appendChild(lessonEvalBtn); //添加的标签
		}
	}
}

/**
 * 成绩界面计算加权分数绩点
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

		//按下切换学期按钮顺带将is_inj_fx_showWeightedScore标记设置为false 解决切换学期计算加权失效
		ifameWindow.document.querySelectorAll("#semesterForm input").forEach((item, i) => {
			if (item.type === "submit") {
				item.onclick = () => {
					ifameWindow.is_inj_fx_showWeightedScore = false;
				};
			}
		});

		if (ifameWindow.is_inj_fx_showWeightedScore) return;

		const thead = ifameWindow.document.querySelector("#semesterGrade .gridtable thead tr"); //只有一个子元素直接定位到tr更方便
		const tbody = ifameWindow.document.querySelector("#semesterGrade .gridtable tbody");
		if (!(thead && tbody)) {
			return;
		}
		let colScore = 6;
		let colGPA = 7;
		for (let i = 0; i < thead.children.length; i++) {
			if (thead.children[i].textContent === "总评成绩") {
				colScore = i;
			}
			if (thead.children[i].textContent === "绩点") {
				colGPA = i;
			}
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
				//未评教的情况会没有5、6、7列 考虑只计算显示了成绩的科目
				let credit = tr.children[5]?.textContent - 0;
				let score = tr.children[colScore]?.textContent - 0;
				let GPA = tr.children[colGPA]?.textContent - 0;
				if (isNaN(credit + score + GPA)) {
					continue; //成绩可能是P
				}
				totalCredit += credit;
				totalScore += credit * score;
				totalGPA += credit * GPA;
			}
			avgScore = totalScore / totalCredit;
			avgGPA = totalGPA / totalCredit;
			//实现一定程度上的色彩风格统一 并清除克隆内容
			newTr = tbody.children[len - 2 > 0 ? len - 2 : 0].cloneNode(true);
			for (let i = 1; i < newTr.children.length; i++) {
				newTr.children[i].textContent = "";
			}
			newTr.children[1].textContent = "1919810";
			newTr.children[2].textContent = "kissTJU";
			newTr.children[3].textContent = "实用工具";
			newTr.children[4].textContent = "不修";
			newTr.children[5].textContent = `共${totalCredit}`;
			newTr.children[colScore].textContent = avgScore.toFixed(3);
			newTr.children[colGPA].textContent = avgGPA.toFixed(3);
			tbody.append(newTr);
		}

		ifameWindow.is_inj_fx_showWeightedScore = true;
	}
}

/**
 * 鼠标点击显示小心心 class用iframe比较特殊所以单独写
 */
function fx_classes_clickHeart() {
	if (isLite) return;
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
 * 实验课选课功能增强 一键过滤 一键排序等
 */
function fx_classes_expElect() {
	console.log("fx r: fx_classes_expElect");
	let timer = setInterval(function () {
		if (document.getElementById("current-bar")?.children[1]?.textContent.match("实验课选课")) {
			inject();
			// clearInterval(timer);
		}
	}, 500);
	function inject() {
		const rootWindow = window;
		const frames = rootWindow.document.querySelector("#iframeMain");
		const ifameWindow = window.frames[frames.name];

		const tbody = ifameWindow.document.querySelector("tbody #lessonItemList_data");
		const tbar = ifameWindow.document.querySelector("#lessonItemList_bar1");

		if (!(tbody && tbar)) {
			return;
		}
		const len = tbody.children.length;

		//外面套timer 不重复注入
		let isinjected = tbar.children[0].textContent == "kissTJU";
		if (isinjected) {
			return;
		} else {
			tbar.children[0].textContent = "kissTJU";
		}

		//过滤器 只看未满
		const btn_select = document.createElement("button");
		btn_select.textContent = "只看未满";
		btn_select.onclick = () => {
			for (let i = 0; i < len; i++) {
				const tr = tbody.children[i];
				let a = tr.children[11].textContent - 0; //选课人数
				let b = tr.children[12].textContent - 0; //计划人数
				if (a >= b) {
					tr.style.display = "none";
				}
			}
		};
		tbar.append(btn_select);

		//要素过滤
		const btn_filter = document.createElement("button");
		btn_filter.textContent = "要素过滤";
		btn_filter.onclick = () => {
			btn_filter.textContent = "要素过滤已开启";
			for (let i = 0; i < len; i++) {
				const tr = tbody.children[i];
				const len1 = tr.children.length;
				//tr的第一个是一个勾选框 最后一个是选课按钮 不动
				for (let j = 1; j < len1 - 1; j++) {
					const td = tr.children[j];
					const text = td.textContent;

					td.onclick = () => {
						tr.children[0].children[0].checked = "false"; //设置勾选框避免选中消失的tr
						const filterKey = document.createElement("button"); //顶部展示过滤的关键词
						filterKey.textContent = text;
						filterKey.onclick = () => {
							for (let k = 0; k < len; k++) {
								const trk = tbody.children[k];
								const tdkj = trk.children[j];
								if (tdkj.textContent === text) {
									trk.style.display = ""; //复现匹配的tr
								}
							}
							filterKey.style.display = "none"; //隐藏该按钮
						};
						tbar.append(filterKey);
						for (let k = 0; k < len; k++) {
							const trk = tbody.children[k];
							const tdkj = trk.children[j];
							if (tdkj.textContent === text) {
								trk.style.display = "none"; //消去匹配的tr
							}
						}
					};
				}
			}
		};
		tbar.append(btn_filter);
	}
}

/**
 * 添加按钮实现只对ifame套娃网页的操作 如刷新、前进、后退等
 * 但是由于原网站开发逻辑混乱 此插件跳起来也不丝滑 除非每次切换都储存一下(暂未实现) 而且难以实现返回不重载
 */
function fx_classes_ifameToolbar() {
	console.log("fx r: fx_classes_ifameToolbar");
	let timer = setInterval(function () {
		if (~window.location.pathname.indexOf("/eams/homeExt.action")) {
			//pathname可能是/eams/homeExt.action;jsessionid=1919810ZWXWCNM1114514.std4#不能===
			inject();
		}
	}, 500);
	function inject() {
		const currentBar = document.querySelector("#current-bar");
		if (currentBar?.children[0].textContent === "kisstju") {
			return; //防止注入多次
		} else if (currentBar) {
			currentBar.children[0].textContent = "kisstju";
		}

		const rootWindow = window;
		const frames = rootWindow.document.querySelector("#iframeMain");
		const ifameWindow = window.frames[frames.name];

		const ifameReloadBtn = document.createElement("button");
		ifameReloadBtn.style.marginLeft = "100px";
		ifameReloadBtn.textContent = "↻刷新子网页";
		ifameReloadBtn.onclick = () => {
			ifameWindow.location.reload();
		};
		currentBar.append(ifameReloadBtn);

		const ifameBackBtn = document.createElement("button");
		ifameBackBtn.textContent = "←子网页后退";
		ifameBackBtn.onclick = () => {
			ifameWindow.history.back();
		};
		currentBar.append(ifameBackBtn);

		const ifameForwardBtn = document.createElement("button");
		ifameForwardBtn.textContent = "→子网页前进";
		ifameForwardBtn.onclick = () => {
			ifameWindow.history.forward();
		};
		currentBar.append(ifameForwardBtn);
	}
}

/**
 * 从全校开课查询跳到课程排表
 * 可查看预排课表，但未必是最终课表
 */
function fx_classes_timetablePreview() {
	console.log("fx r: fx_classes_timetablePreview");
	let timer = setInterval(function () {
		if (document.getElementById("current-bar")?.children[1]?.textContent.match("全校开课查询")) {
			inject();
			// clearInterval(timer);
		}
	}, 500);

	function inject() {
		const rootWindow = window;
		const frames = rootWindow.document.querySelector("#iframeMain");
		const ifameWindow = window.frames[frames.name];

		const tbody = ifameWindow.document.querySelector("#taskListForm .gridtable tbody");
		if (!tbody) {
			return;
		}
		for (let i = 0; i < tbody.children.length; i++) {
			const tr = tbody.children[i];
			const lessonNum = tr.children[1].innerHTML; //课程序号
			const uselessUrl = tr.querySelector("td a").href; //e.g. "/eams/stdSyllabus!info.action?lesson.id=433941"
			const lessonId = uselessUrl.match(/[\d]{1,}/); //这个id是系统隐藏id，不是课程序号也不是课程代码
			//查看课程排班
			const lessonTimetableBtn = document.createElement("a");
			lessonTimetableBtn.target = "_blank"; //必须新窗口打开不然出bug
			lessonTimetableBtn.href = `http://classes.tju.edu.cn/eams/courseTableForStd!taskTable.action?lesson.id=${lessonId}`; //查看课程详情
			lessonTimetableBtn.innerHTML = lessonNum;
			tr.children[1].innerHTML = ""; //删除原有的文字
			tr.children[1].appendChild(lessonTimetableBtn); //添加的标签
		}
	}
}

/**
 * MOOC看视频跳题
 */
function fx_mook_jumpQuestion() {
	console.log("fx r: fx_mook_jumpQuestion");
	inject();
	function inject() {
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
	if (isLite) return;
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
 * 登录界面自动填验证码
 * 新版
 */
function fx_sso_fixForm() {
	console.log("fx r: fx_sso_fixForm");
	//如果是弱密码而且没开跳过弱密码选项 验证成功之后会重新跳转并额外弹窗弱密码 导致死循环
	if (document.querySelector("#layui-layer1")) {
		return;
	}

	if (document.getElementById("codeImage") && document.getElementById("code").value === "") {
		inject();
	}

	function inject() {
		const canvas = document.createElement("canvas");
		canvas.style.backgroundColor = "#ff0000";
		document.body.append(canvas);
		const img = document.querySelector("#codeImage");

		img.setAttribute("crossOrigin", "Anonymous");
		img.setAttribute("referrerpolicy", "no-referrer");
		img.onload = () => {
			let [width, height] = [70, 36]; //图片本身实际的宽高 打开https://sso.tju.edu.cn/cas/code 看到

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
				if (r + g + b < 80) {
					return true;
				} else {
					return false;
				}
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

			const myimg = new ImageData(imageData, width, height);
			ctx.putImageData(myimg, 0, 0, 0, 0, width, height);

			const dataURL = canvas.toDataURL("image/jpeg");
			Tesseract.recognize(dataURL, "eng", { logger: (m) => {} }).then(({ data: { text } }) => {
				let code = text;

				console.log(text, code);
				// alert(`${text}--${code}`);
				document.getElementById("code").value = code;
				const hasUsername = document.getElementById("un").value.length;
				const hasPswd = document.getElementById("pd").value.length;
				if (hasUsername && hasPswd) {
					// document.getElementsByName("submit")[0].removeAttribute("disabled");
					document.getElementById("index_login_btn").click();
				}
			});
		};
	}
}

/**
 * 登录验证界面原神启动特效 精简版无效
 */
function fx_sso_genshinStart() {
	if (isLite) return;
	console.log("fx r: fx_sso_genshinStart");
	inject();
	function inject() {
		//原神启动！
		if (!(genshinBGImg && genshinBGVideo && genshinBGMusic)) {
			console.log("genshin资源损坏");
			return;
		}
		const bg = document.createElement("div");
		bg.style.width = "100%";
		bg.style.height = "100%";
		bg.style.background = "#ffffff";
		bg.style.left = 0;
		bg.style.top = 0;
		bg.style.right = 0;
		bg.style.bottom = 0;
		bg.style.position = "absolute";
		bg.style.zIndex = 999;

		const img = document.createElement("img");
		img.style.left = 0;
		img.style.top = 0;
		img.style.right = 0;
		img.style.bottom = 0;
		img.style.margin = "auto";
		img.style.position = "absolute";
		img.style.zIndex = 999;
		img.style.scale = 0.7;

		img.src = genshinBGImg;
		bg.appendChild(img);

		document.body.appendChild(bg);

		setTimeout(() => {
			let bgalpha = 1;
			let interval = setInterval(() => {
				bgalpha -= 0.01;
				bg.style.opacity = bgalpha;
				if (bgalpha <= 0) {
					bg.style.display = "none";
					clearInterval(interval);
				}
			}, 10);
		}, 500);

		const loginMainPart = document.querySelector(".login-main-part");
		loginMainPart.style.opacity = 0;
		setTimeout(() => {
			let bgalpha = 0.0;
			let interval = setInterval(() => {
				bgalpha += 0.015;
				loginMainPart.style.opacity = bgalpha;
				if (bgalpha >= 1) {
					clearInterval(interval);
				}
			}, 10);
		}, 1500);

		//对原UI预处理 去除原来背景 设置透明
		document.querySelector("#login-background-1").style.backgroundImage = "";
		const loginBG = document.querySelector("#login-background");
		loginBG.style.backgroundImage = "";
		loginBG.style.background = "#00000000";

		//原神背景视频
		const video = document.createElement("video");
		video.style.position = "fixed";
		video.style.top = "50%";
		video.style.left = "50%";
		video.style.minWidth = "100%";
		video.style.minHeight = "100%";
		video.style.width = "auto";
		video.style.height = "auto";
		video.style.zIndex = -100;
		video.style.transform = "translateX(-50%) translateY(-50%)";
		video.style.transition = "1s opacity";

		video.src = genshinBGVideo;
		video.autoplay = true;
		video.loop = true;
		video.muted = true; //必须静音才能自动播放
		video.playbackRate = 0.75;
		document.querySelector("#login-background").appendChild(video);
		video.play();

		//音乐按钮
		const music = document.createElement("audio");
		music.style.position = "fixed";
		music.style.top = 0;
		music.controls = true;
		music.src = genshinBGMusic;

		let alpha = 1.0; //音乐按钮的透明度 由于存在多个定时器 放在这做共有变量
		music.addEventListener("play", function () {
			(() => {
				let interval = setInterval(() => {
					alpha -= 0.051; //给个零头确保不会死循环
					music.style.opacity = alpha;
					if (alpha <= 0) {
						clearInterval(interval);
					}
				}, 10);
			})();

			music.addEventListener("mouseenter", function () {
				(() => {
					let interval = setInterval(() => {
						alpha += 0.053;
						music.style.opacity = alpha;
						if (alpha >= 1) {
							clearInterval(interval);
						}
					}, 10);
				})();
			});
			music.addEventListener("mouseleave", function () {
				(() => {
					let interval = setInterval(() => {
						alpha -= 0.059;
						music.style.opacity = alpha;
						if (alpha <= 0) {
							clearInterval(interval);
						}
					}, 10);
				})();
			});
		});

		document.body.appendChild(music);
	}
}

/**
 * 把海小棠换成别的机器人 精简版无效
 */
function fx_sso_setRobot(id) {
	if (isLite) return;
	console.log("fx r: fx_sso_setRobot");
	inject(id);
	function inject(id) {
		if (!(robotList && robotList[id - 1])) {
			console.log("robot data err: ", id);
			return;
		}
		//预处理原先布局 海小棠下班
		const robotContent = document.querySelector(".robot-content");
		robotContent.style.padding = "0 0";
		const haixiaotang = document.querySelector(".robot-anm-container");
		robotContent.removeChild(haixiaotang);
		const toast = document.querySelector(".robot-mag-win");
		toast.style.bottom = "500px";
		//取图片和台词
		const { imgs, tips } = robotList[id - 1];
		const imgdata = imgs[((Math.random() * 100) >> 0) % imgs.length];
		const tipStr = tips[((Math.random() * 100) >> 0) % tips.length];
		//创建图片元素
		const robotimg = document.createElement("img");
		robotimg.src = imgdata;
		robotimg.onclick = function () {
			const tipStr = tips[((Math.random() * 100) >> 0) % tips.length];
			showInfoOn(tipStr);
		};
		robotContent.appendChild(robotimg);
		//提示词
		showInfoOn(tipStr);
	}

	function showInfoOn(info) {
		document.querySelector("#robot-msg").textContent = info;
		document.querySelector(".robot-mag-win").setAttribute("class", "robot-mag-win big-small");
		document.querySelector(".robot-mag-win").setAttribute("class", "robot-mag-win small-big-small");
	}
}

/**
 * 我不是弱密码 跳过弱密码弹窗
 */
function fx_sso_antiWeakPwd() {
	console.log("fx r: fx_classes_antiWeakPwd");
	let timer = setInterval(function () {
		if (document.querySelector("#layui-layer1")) {
			document.querySelector("#layui-layer1 .layui-layer-btn1").click();
			clearInterval(timer);
		}
	}, 100);
}

/**
 * 批改网解除粘贴限制
 */
function fx_pigai_paste() {
	console.log("fx r: fx_pigai_paste");
	if (document.getElementById("contents")) {
		inject();
	}
	function inject() {
		const inputArea = document.getElementById("contents");
		inputArea.addEventListener("paste", function (e) {
			const str = inputArea.value;
			const clipdata = e.clipboardData || window.clipboardData;
			const clipStr = clipdata.getData("text/plain");
			console.log("主动粘贴", clipStr);
			inputArea.value = str + clipStr;
		});
	}
}

/**
 * 毕设网自动关闭弹窗
 */
function fx_thesis_iReallyKnow() {
	console.log("fx r: fx_thesis_iReallyKnow");

	let timer = setInterval(function () {
		let dialog = document.querySelector("#layui-layer1");
		let shade = document.querySelector("#layui-layer-shade1");

		if (dialog && shade) {
			//删除dialog和shade元素
			dialog.remove();
			shade.remove();
			clearInterval(timer);
		}

		// if (document.querySelector(".layui-layer-btn0")) {
		// 	document.querySelector(".layui-layer-btn0").click();
		// 	clearInterval(timer);
		// }
	}, 100);
}

/**
 * 毕设网自动点击登录
 */

function fx_thesis_autoLogin() {
	console.log("fx r: fx_thesis_autoLogin");

	let timer = setInterval(function () {
		let loginBtn = document.querySelector("button, #submit");

		if (loginBtn) {
			loginBtn.click();
			clearInterval(timer);
		}
	}, 100);
}
