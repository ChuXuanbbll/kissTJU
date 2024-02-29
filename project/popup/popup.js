//写给开发者：添加功能要注意6个部分，链接，链接data，switch,switchdata,init-kissTJUconfig,manifect.json

const title = document.getElementById("hhhh");
const sentence = document.getElementById("sentence");

const link_libSet = document.getElementById("link_libSet");
const link_lib = document.getElementById("link_lib");
const link_classes = document.getElementById("link_classes");
const link_saa = document.getElementById("link_saa");
const link_selectCourse = document.getElementById("link_selectCourse");
const link_scloolMap = document.getElementById("link_scloolMap");
const link_serv = document.getElementById("link_serv");
const link_ee = document.getElementById("link_ee");
const link_twt = document.getElementById("link_twt");
const link_geogeba = document.getElementById("link_geogeba");
const link_cet = document.getElementById("link_cet");
const link_cg = document.getElementById("link_cg");
const link_mooc = document.getElementById("link_mooc");
const link_sso = document.getElementById("link_sso");
const link_pigai = document.getElementById("link_pigai");
const link_net = document.getElementById("link_net");
const link_netVer = document.getElementById("link_netVer");
const link_thesis = document.getElementById("link_thesis");

const footer = document.getElementById("wwww");

const linkData = [
	{
		key: link_libSet,
		src: "https://seatw.lib.tju.edu.cn/index.php/reserve/index.html",
	},
	{ key: link_lib, src: "http://www.lib.tju.edu.cn/" },
	{ key: link_classes, src: "http://classes.tju.edu.cn/eams/homeExt.action" },
	{ key: link_saa, src: "http://saa.tju.edu.cn/eams/homeExt.action" },
	{ key: link_selectCourse, src: "http://classes.tju.edu.cn/eams/stdElectCourse.action" },
	{ key: link_scloolMap, src: "http://map.tju.edu.cn/index.shtml" },
	{ key: link_serv, src: "http://serv.tju.edu.cn" },
	{ key: link_ee, src: "http://ee.tju.edu.cn/" },
	{ key: link_twt, src: "https://theory.twt.edu.cn/" },
	{ key: link_geogeba, src: "https://www.geogebra.org/calculator" },
	{ key: link_cet, src: "https://cet.neea.edu.cn" },
	{ key: link_cg, src: "https://tyapp.chingo.cn/cgapp/" },
	{ key: link_mooc, src: "https://www.icourse163.org/" },
	{ key: link_sso, src: "https://sso.tju.edu.cn/cas/login" },
	{ key: link_pigai, src: "http://www.pigai.org/" },
	{ key: link_net, src: "http://202.113.15.50:8800/?" },
	{ key: link_netVer, src: "http://202.113.5.130/srun_portal_pc?ac_id=11&theme=tju" },
	{ key: link_thesis, src: "http://121.193.132.43/thesis/" },
];

const seat_s1 = document.getElementById("seat-s1");
const seat_s2 = document.getElementById("seat-s2");
const lib_s1 = document.getElementById("lib-s1");
const classes_s1 = document.getElementById("classes-s1");
const classes_s2 = document.getElementById("classes-s2");
const classes_s3 = document.getElementById("classes-s3");
const classes_s4 = document.getElementById("classes-s4");
const classes_s5 = document.getElementById("classes-s5");
const classes_s6 = document.getElementById("classes-s6");
const classes_s7 = document.getElementById("classes-s7");
const classes_s8 = document.getElementById("classes-s8");
const classes_s9 = document.getElementById("classes-s9");
const classes_s10 = document.getElementById("classes-s10");
const twt_s1 = document.getElementById("twt-s1");
const mooc_s1 = document.getElementById("mooc-s1");
const sso_s1 = document.getElementById("sso-s1");
const sso_s2 = document.getElementById("sso-s2");
const sso_s3 = document.getElementById("sso-s3");
const sso_s4 = document.getElementById("sso-s4");
const pigai_s1 = document.getElementById("pigai-s1");
const thesis_s1 = document.getElementById("thesis-s1");
const thesis_s2 = document.getElementById("thesis-s2");

const switchData = [
	{ key: seat_s1, fx: "seat_grab" },
	{ key: seat_s2, fx: "seat_clickHeart" },
	{ key: classes_s1, fx: "autoEvaluate" },
	{ key: classes_s2, fx: "myplan_fixMeterHead" },
	{ key: classes_s3, fx: "removeFooter" },
	{ key: classes_s4, fx: "checkClassInfo" },
	{ key: classes_s5, fx: "showWeightedScore" },
	{ key: classes_s6, fx: "classes_clickHeart" },
	{ key: classes_s7, fx: "classes_expElect" },
	{ key: classes_s8, fx: "classes_ifameToolbar" },
	{ key: classes_s9, fx: "classes_timetablePreview" },

	{ key: mooc_s1, fx: "mook_jumpQuestion" },
	{ key: sso_s1, fx: "sso_genshinStart" },
	{ key: sso_s2, fx: "sso_setRobot" },
	{ key: sso_s3, fx: "sso_fixForm" },
	{ key: sso_s4, fx: "sso_antiWeakPwd" },
	{ key: pigai_s1, fx: "pigai_paste" },
	{ key: thesis_s1, fx: "thesis_iReallyKnow" },
	{ key: thesis_s2, fx: "thesis_autoLogin" },
];

const sso_robotselect = document.getElementById("sso-robotselect");

//有可能要在不同中操作定时器 搞成全局变量
var timer;

//每次点开都有一个精品句子 外部API
if (sentence) {
	sendGetRequest("https://api.xygeng.cn/one", function (resp) {
		const { content, origin } = JSON.parse(resp).data;
		sentence.innerHTML = `${content}   --${origin}`;
	});
}

//三连击彩蛋显示我的邮箱
if (footer) {
	let i = 0;
	footer.onclick = function () {
		i++;
		setTimeout(function () {
			i = 0;
		}, 800);
		if (i > 2) {
			const myEmail = document.createElement("a");
			myEmail.textContent = "(drizzle_cx@foxmail.com)";
			footer.appendChild(myEmail);
		}
	};
}

//根据linkData设置点击每个链接打开的页面
linkData.forEach(function (item, index) {
	if (item.key) {
		item.key.onclick = function () {
			window.open(item.src);
		};
	}
});

//设置switchData中每个功能开关的勾选/取消事件回调
switchData.forEach(function (item, index) {
	if (item.key) {
		item.key.onchange = function (event) {
			const value = item.key.checked;
			chrome.storage.sync.get(["kissTJUConfig"], function (data) {
				const { kissTJUConfig } = data;
				if (kissTJUConfig && kissTJUConfig[item.fx]) {
					kissTJUConfig[item.fx].value = value;
					chrome.storage.sync.set({ kissTJUConfig }, function () {});
				}
			});
		};
	}
});

//单独设置switch
sso_robotselect.onchange = function (event) {
	console.log(sso_robotselect.value);
	chrome.storage.sync.get(["kissTJUConfig"], function (data) {
		const { kissTJUConfig } = data;
		if (kissTJUConfig && kissTJUConfig["sso_setRobot"]) {
			kissTJUConfig["sso_setRobot"].value = sso_robotselect.value;
			chrome.storage.sync.set({ kissTJUConfig }, function () {});
		}
	});
};

//初始化配置
function init() {
	// chrome.storage.sync.remove(["kissTJUConfig"], function () {});
	// chrome.storage.sync.get(["kissTJUConfig"], function (data) {console.log(data)});
	chrome.storage.sync.get(["kissTJUConfig"], function (data) {
		try {
			console.log("get config");
			const { kissTJUConfig } = data;
			console.log("config: ", kissTJUConfig);
			if (!kissTJUConfig) {
				throw new Error("no config");
			}

			switchData.forEach(function (item, index) {
				if (kissTJUConfig[item.fx].value) {
					item.key.checked = true;
				}
			});

			sso_robotselect.value = kissTJUConfig["sso_setRobot"].value | 0;
		} catch (e) {
			console.log(e);
			console.log("config error -> init");
			//默认配置
			let kissTJUConfig = {
				seat_grab: {
					switch: "seat_s1",
					value: 0,
				},
				seat_clickHeart: {
					switch: "seat_s2",
					value: 0,
				},
				autoEvaluate: {
					switch: "classes-s1",
					value: 0,
				},
				myplan_fixMeterHead: {
					switch: "classes-s2",
					value: 1,
				},
				removeFooter: {
					switch: "classes-s3",
					value: 0,
				},
				checkClassInfo: {
					switch: "classes-s4",
					value: 0,
				},
				showWeightedScore: {
					switch: "classes-s5",
					value: 0,
				},
				classes_clickHeart: {
					switch: "classes-s6",
					value: 1,
				},
				classes_expElect: {
					switch: "classes-s7",
					value: 1,
				},
				classes_ifameToolbar: {
					switch: "classes-s8",
					value: 0,
				},
				classes_timetablePreview: {
					switch: "classes-s9",
					value: 0,
				},

				mook_jumpQuestion: {
					switch: "mook-s1",
					value: 0,
				},
				sso_genshinStart: {
					switch: "sso-s1",
					value: 0,
				},
				sso_setRobot: {
					switch: "sso-s2",
					value: 0,
				},
				sso_fixForm: {
					switch: "sso-s3",
					value: 0,
				},
				sso_antiWeakPwd: {
					switch: "sso-s4",
					value: 0,
				},
				pigai_paste: {
					switch: "pigai-s1",
					value: 0,
				},
				thesis_iReallyKnow: {
					switch: "thesis-s1",
					value: 0,
				},
				thesis_autoLogin: {
					switch: "thesis-s2",
					value: 0,
				},
			};
			console.log("setConfig: ", kissTJUConfig);
			chrome.storage.sync.set({ kissTJUConfig }, function () {});
		}
	});
}
init();

//元素显示关系在初始化之后
// if (!sso_s2.value) {
//   sso_robotselect.style.display = "none";
// }

/********************以下是工具函数**************************/

/**
 * js原生的发送请求
 * @param {*} url
 * @param {*} callback
 */
function sendGetRequest(url, callback) {
	try {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				callback(xhr.responseText);
			}
		};
		xhr.send();
	} catch (e) {
		console.log("每日一句API错误");
	}
}
