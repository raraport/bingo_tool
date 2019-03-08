/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/config.js":
/*!**************************!*\
  !*** ./src/js/config.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports.selector = {\n  viewTime: '#time',\n  viewScramble: '#scramble',\n  btnStart: '#btn-start',\n  btnStop: '#btn-stop',\n  btnReset: '#btn-reset',\n  cells: '.cell'\n}\n\nmodule.exports.scramble = [\n  `U`,\n  `R`,\n  `L`,\n  `F`,\n  `B`,\n  `D`,\n  `U'`,\n  `R'`,\n  `L'`,\n  `F'`,\n  `B'`,\n  `D'`,\n  `U2`,\n  `R2`,\n  `L2`,\n  `F2`,\n  `B2`,\n  `D2`\n]\n\nmodule.exports.pll = [\n  `Ua`,\n  `Ub`,\n  `Aa`,\n  `Ab`,\n  `Z`,\n  `H`,\n  `E`,\n  `T`,\n  `V`,\n  `F`,\n  `Ra`,\n  `Rb`,\n  `Ja`,\n  `Jb`,\n  `Y`,\n  `Ga`,\n  `Gb`,\n  `Gc`,\n  `Gd`,\n  `Na`,\n  `Nb`\n]\n\n\n//# sourceURL=webpack:///./src/js/config.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval(";(function () {\n  // 定数\n  const MOUSEDOWN = 'mousedown'\n  const SELECTED = 'selected'\n  const SPACE = 'Space'\n\n  // 設定の取得\n  const { scramble, pll, selector } = __webpack_require__(/*! ./config.js */ \"./src/js/config.js\")\n\n  // 要素の取得\n  const viewTime = document.querySelector(selector.viewTime)\n  const viewScramble = document.querySelector(selector.viewScramble)\n  const btnStart = document.querySelector(selector.btnStart)\n  const btnStop = document.querySelector(selector.btnStop)\n  const btnReset = document.querySelector(selector.btnReset)\n  const cellElem = document.querySelectorAll(selector.cells)\n\n  // oo(数値(0〜99))で2桁「00」にフォーマット\n  const oo = num => ('00' + Math.floor(num)).slice(-2)\n\n  // formatTime(ミリ秒)で「00'00\"00」にフォーマット\n  const formatTime = time => {\n    const centisec = (time % 1000) / 10\n    const sec = time / 1000\n    const min = sec / 60\n    return `${oo(min)}'${oo(sec)}\"${oo(centisec)}`\n  }\n\n  // redrawTime(ミリ秒)でTIMEを「00'00\"00」で再描画\n  const redrawTime = time => (viewTime.textContent = formatTime(time))\n\n  // cells[x][y]に要素を格納\n  let cells = new Array(5)\n  cellElem.forEach((elem, i) => {\n    if (!cells[i % 5]) cells[i % 5] = []\n    cells[i % 5].push(elem)\n  })\n\n  // 表示をリセット\n  const reset = () => {\n    redrawTime(0)\n    for (let x = 0; x < 5; x++) {\n      for (let y = 0; y < 5; y++) {\n        cells[x][y].textContent =\n          x === 2 && y === 2\n            ? 'FREE'\n            : x === 0 || x === 4 || y === 0 || y === 4\n              ? `OLL${oo(Math.random() * 57 + 1)}`\n              : pll[Math.floor(Math.random() * pll.length)]\n      }\n    }\n  }\n  reset()\n\n  // カウンタとフラグを初期化\n  let timer = null\n  let isTimer = false\n  let startTime = 0\n  let countToAdd = 0\n\n  // STARTがクリックされたとき\n  const onStart = event => {\n    if (!isTimer) {\n      isTimer = true\n      startTime = Date.now() - countToAdd\n      timer = setInterval(() => {\n        const elapsedTime = Date.now() - startTime\n        redrawTime(elapsedTime)\n      }, 10)\n    }\n  }\n\n  // STOPがクリックされたとき\n  const onStop = event => {\n    if (isTimer) {\n      isTimer = false\n      countToAdd = Date.now() - startTime\n      clearInterval(timer)\n    }\n  }\n\n  // RESETがクリックされたとき\n  const onReset = event => {\n    if (!isTimer) {\n      reset()\n    }\n  }\n\n  // セルがクリックされたとき\n  const onCells = event => {\n    if (!isTimer) {\n      const target = event.target\n      const isSelected = target.classList.contains(SELECTED)\n      if (isSelected) {\n        target.classList.remove(SELECTED)\n      } else {\n        target.classList.add(SELECTED)\n      }\n    }\n  }\n\n  // キーが押されたとき\n  const onKeydown = event => {\n    if (event.code === SPACE) {\n      if (isTimer) {\n        onStop()\n      } else {\n        onStart()\n      }\n    }\n  }\n\n  // イベントを設定\n  btnStart.addEventListener(MOUSEDOWN, onStart)\n  btnStop.addEventListener(MOUSEDOWN, onStop)\n  btnReset.addEventListener(MOUSEDOWN, onReset)\n  document.onkeydown = onKeydown\n  cellElem.forEach(elem => elem.addEventListener(MOUSEDOWN, onCells))\n})()\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });