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
/******/ 	return __webpack_require__(__webpack_require__.s = "./addItems.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./addItems.js":
/*!*********************!*\
  !*** ./addItems.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var showImage = document.getElementById('showImage');\nvar uploadImage = document.getElementById('uploadImage');\nvar previewContent = document.getElementById('previewContent');\nvar submitItem = document.getElementById('submitItem');\nvar itemTag = document.getElementById('itemTag');\nvar itemName = document.getElementById('itemName');\nvar ItemPrice = document.getElementById('itemPrice');\nvar preview = document.getElementById('preview');\nvar addToCartBtn = document.getElementById('addToCartBtn');\nvar nameArr = [];\nvar tagArr = [];\nvar priceArr = [];\nvar imageArr = [];\nvar itemAdded = [];\nvar length = 0;\nvar lengthI = 0; //Eventlistener to listen for when a new file is uploaded\n\nuploadImage.addEventListener('change', uploadPicture);\n\nfunction uploadPicture(input) {\n  var file = input.target.files[0];\n  var readFile = new FileReader();\n\n  readFile.onload = function (imageFile) {\n    var data = imageFile.target.result;\n    console.log(data);\n    showImage.src = data;\n    imageArr[lengthI] = data;\n    lengthI++;\n  };\n\n  readFile.readAsDataURL(file);\n}\n\nsubmitItem.addEventListener('click', function () {\n  if (length === lengthI) {\n    imageArr[lengthI] = showImage.src;\n    lengthI++;\n  }\n\n  preview.style.display = \"block\";\n  tagArr[length] = itemTag.value;\n  nameArr[length] = itemName.value;\n  priceArr[length] = itemPrice.value;\n\n  if (itemPrice.value > 19999999) {\n    alert(\" Items above 10 Million Naira will not be added\");\n    return;\n  }\n\n  itemAdded[length] = \"<div id=\\\"item\\\">\\n    <label id=\\\"description\\\" >\".concat(nameArr[length], \"</label>\\n    <label id=\\\"description\\\" >price : \").concat(priceArr[length], \"</label>\\n    <img src=\\\"\").concat(showImage.src, \"\\\" id=\\\"itemLogo\\\" />\\n    <button type=\\\"button\\\" id=\\\"addToCartBtn\\\">Add to Cart</button>\\n    <div id=\\\"editDelete\\\">\\n    <button type=\\\"button\\\"  onclick=\\\" editElement(\").concat(length, \")\\\"  id=\\\"editBtn\\\" >Edit</button>\\n    <button type=\\\"button\\\" onclick=\\\" removeElement(\").concat(length, \")\\\"  id=\\\"deleteBtn\\\" >Delete</button>\\n    </div></div>\");\n  refereshList();\n  length++;\n  showImage.src = '';\n}); //Function removes an element from the document\n\nfunction removeElement(len) {\n  itemAdded[len] = \"\";\n  refereshList();\n} //Function Presents the element for Edit\n\n\nfunction editElement(len) {\n  var currrentName = nameArr[len];\n  var currentTag = tagArr[len];\n  var currentPrice = priceArr[len];\n  var currentImage = imageArr[len];\n  itemTag.value = currentTag;\n  itemName.value = currrentName;\n  ItemPrice.value = currentPrice;\n  showImage.src = currentImage;\n  removeElement(len);\n}\n\nfunction refereshList() {\n  previewContent.innerHTML = \"\";\n\n  for (var i = 0; i < itemAdded.length; i++) {\n    previewContent.innerHTML += itemAdded[i];\n  }\n}\n\n//# sourceURL=webpack:///./addItems.js?");

/***/ })

/******/ });