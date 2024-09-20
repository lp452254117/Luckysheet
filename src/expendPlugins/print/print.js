import luckysheetConfigsetting from "../../controllers/luckysheetConfigsetting";
import Store from "../../store";
import Locale from "../../locale/locale";
import { replaceHtml } from "../../utils/util";
import { modelHTML, luckysheetdefaultstyle } from "../../controllers/constant";
import { luckysheetDrawMain } from "../../global/draw";
export function printInitial() {
  let container = luckysheetConfigsetting.container;
  $("#" + container).find(".luckysheet-print-viewBtn").click(function () {
    switchViewBtn($(this));
  });
}
export const luckysheetPrint = {
  selectArea: "0",
  direction: "0",
  size: "1",
  sizeList: [[29.7, 42], [21, 29.7], [14.8, 21], [25, 35.3], [17.6, 25], [21.6, 27.9], [27.9, 43.2], [21.6, 35.6], [18.4, 26.7]],
  padding: [20, 20, 20, 20],
  saveRange: null,
  canvasList: [],
  createDialog: function () {
    $("#luckysheet-modal-dialog-mask").hide();
    $("#luckysheet-print").remove();
    const LocaleText = Locale();
    const locale_print = LocaleText.print;
    const locale_button = LocaleText.button;
    let content = "<div class=\"luckysheet-print-content\">\n                <p class=\"luckysheet-print-suggest\">" + locale_print.suggest + "</p>\n                <p class=\"luckysheet-print-title\">" + locale_print.range + "</p>\n                <select class=\"luckysheet-print-select-area\">\n                    <option value=\"0\" selected=\"selected\">" + locale_print.current + "</option>\n                    <option value=\"1\">" + locale_print.area + "</option>\n                </select>\n                <p class=\"luckysheet-print-title\">" + locale_print.size + "</p>\n                <select class=\"luckysheet-print-size\">\n                    <option value=\"0\">A3(29.7cm×42.0cm)</option>\n                    <option value=\"1\" selected=\"selected\">A4(21.0cm×29.7cm)</option>\n                    <option value=\"2\">A5(14.8cm×21.0cm)</option>\n                    <option value=\"3\">B4(25.0cm×35.3cm)</option>\n                    <option value=\"4\">B5(17.6cm×25.0cm)</option>\n                    <option value=\"5\">" + locale_print.letter + "(21.6cm×27.9cm)</option>\n                    <option value=\"6\">" + locale_print.paper + "(27.9cm×43.2cm)</option>\n                    <option value=\"7\">" + locale_print.law + "(21.6cm×35.6cm)</option>\n                    <option value=\"8\">" + locale_print.admin + "(18.4cm×26.7cm)</option>\n                </select>\n                <p class=\"luckysheet-print-title\">" + locale_print.direction + "</p>\n                <div class=\"luckysheet-print-radio\">\n                    <div><input value=\"0\" name=\"print\" type=\"radio\" id=\"horizontal\" checked/><label for=\"horizontal\">" + locale_print.horizontal + "</label></div>\n                    <div><input value=\"1\" name=\"print\" type=\"radio\" id=\"vertical\"/><label for=\"vertical\">" + locale_print.vertical + "</label></div>\n                </div>\n        </div>";
    $("body").append(replaceHtml(modelHTML, {
      id: "luckysheet-print",
      addclass: "luckysheet-print",
      title: locale_print.title,
      content: content,
      botton: "<button class=\"btn btn-default luckysheet-model-confirm-btn\">" + locale_button.confirm + "</button><button class=\"btn btn-default luckysheet-model-close-btn\">" + locale_button.close + "</button>",
      style: "z-index:100003",
      close: locale_button.close
    }));
    let _0x3b46cc = $("#luckysheet-print").find(".luckysheet-modal-dialog-content").css("min-width", 350).end();
    let _0x5a897f = _0x3b46cc.outerHeight();
    let _1715b8 = _0x3b46cc.outerWidth();
    let _0x30aad1 = $(window).width();
    let _0x4e9eb2 = $(window).height();
    let _0x313b7f = $(document).scrollLeft();
    let _0xee6fb = $(document).scrollTop();
    $("#luckysheet-print").css({
      left: (_0x30aad1 + _0x313b7f - _1715b8) / 0x2,
      top: (_0x4e9eb2 + _0xee6fb - _0x5a897f) / 0x3
    }).show();
  },
  // 直接打印
  directPrint: function (printRang) {
    var _this = this;
    this.direction = "1";
    this.size = "1";
    switch (printRang) {
      case "sheet":
        this.selectArea = "0";
        break;
      case "areas":
        this.selectArea = "1";
        break;
      default:
        this.selectArea = "0";
    }
    window.onbeforeprint = item => {
      let _0x456a9b = this.saveRange.row[0];
      let _18ae03 = this.saveRange.row[1];
      let _15f971 = this.saveRange.column[0];
      let _0x21dd84 = this.saveRange.column[1];
      let _0x2f662c;
      let _0x49082c;
      if (_0x456a9b - 1 < 0) {
        _0x2f662c = 0;
        _0x49082c = Store.visibledatarow[_18ae03];
      } else {
        _0x2f662c = Store.visibledatarow[_0x456a9b - 1];
        _0x49082c = Store.visibledatarow[_18ae03] - Store.visibledatarow[_0x456a9b - 1];
      }
      let _145e3b;
      let _11119e;
      if (_15f971 - 1 < 0) {
        _145e3b = 0;
        _11119e = Store.visibledatacolumn[_0x21dd84];
      } else {
        _145e3b = Store.visibledatacolumn[_15f971 - 1];
        _11119e = Store.visibledatacolumn[_0x21dd84] - Store.visibledatacolumn[_15f971 - 1];
      }
      this.drawCanvas(_11119e, _0x49082c, _145e3b, _0x2f662c);
    };
    window.onafterprint = item => {
      const printPreviewDom = document.querySelector(".luckysheet-print-preview");
      printPreviewDom.remove();
    };
    Promise.all(_this.printBefore()).then(list => {
      _this.canvasList = list;
      window.print();
    });
  },
  init: function () {
    let _this = this;
    this.selectArea = '0'; // 0是打印当前

    this.direction = "0";
    this.size = "1";
    $(document).off("change.printArea").on("change.printArea", ".luckysheet-print-select-area", function (_0x48a17f) {
      _this.selectArea = _0x48a17f.currentTarget.value;
    });
    $(document).off("change.printSize").on("change.printSize", ".luckysheet-print-size", function (_1d567) {
      _this.size = _1d567.currentTarget.value;
    });
    $(document).off("change.printInput").on("change.printInput", ".luckysheet-print-radio input", function (_0x3b9301) {
      _this.direction = _0x3b9301.currentTarget.value;
    });
    $(document).off("click.printConfirm").on("click.printConfirm", ".luckysheet-print .luckysheet-model-confirm-btn", function () {
      $("#luckysheet-print").hide();
      Promise.all(_this.printBefore()).then(_0x3ad7f0 => {
        _this.canvasList = _0x3ad7f0;
        window.print();
      });
    });
    window.onbeforeprint = item => {
      let _0x456a9b = this.saveRange.row[0];
      let _18ae03 = this.saveRange.row[1];
      let _15f971 = this.saveRange.column[0];
      let _0x21dd84 = this.saveRange.column[1];
      let _0x2f662c;
      let _0x49082c;
      if (_0x456a9b - 1 < 0) {
        _0x2f662c = 0;
        _0x49082c = Store.visibledatarow[_18ae03];
      } else {
        _0x2f662c = Store.visibledatarow[_0x456a9b - 1];
        _0x49082c = Store.visibledatarow[_18ae03] - Store.visibledatarow[_0x456a9b - 1];
      }
      let _145e3b;
      let _11119e;
      if (_15f971 - 1 < 0) {
        _145e3b = 0;
        _11119e = Store.visibledatacolumn[_0x21dd84];
      } else {
        _145e3b = Store.visibledatacolumn[_15f971 - 1];
        _11119e = Store.visibledatacolumn[_0x21dd84] - Store.visibledatacolumn[_15f971 - 1];
      }
      this.drawCanvas(_11119e, _0x49082c, _145e3b, _0x2f662c);
    };
    window.onafterprint = item => {
      const printPreviewDom = document.querySelector(".luckysheet-print-preview");
      printPreviewDom.remove();
    };
  },
  printBefore() {
    const new_array = [];
    const currentSheetFile = Store.luckysheetfile.find(obj => obj.index == Store.currentSheetIndex);
    const currentSheetFileImages = currentSheetFile.images;
    let rangeInfo;
    if (Store.luckysheet_select_save.length === 0 || this.selectArea === "0") {
      const rowLength = Store.flowdata[0].length - 1;
      const columnLength = Store.flowdata.length - 1;
      rangeInfo = {
        row: [0, columnLength],
        column: [0, rowLength],
        left_move: 0,
        top_move: 0,
        width_move: currentSheetFile.ch_width,
        height_move: currentSheetFile.rh_height
      };
    } else if (Store.luckysheet_select_save.length === 1) {
      rangeInfo = Store.luckysheet_select_save[0];
    } else {
      rangeInfo = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
    }
    this.saveRange = rangeInfo;
    for (let key in currentSheetFileImages) {
      const imageItem = currentSheetFileImages[key];
      const ImageObj = new Image();
      ImageObj.src = imageItem.src;
      ImageObj.width = imageItem.originWidth;
      ImageObj.height = imageItem.originHeight;
      const canvasDom = document.createElement("canvas");
      canvasDom.width = imageItem["default"].width;
      canvasDom.height = imageItem["default"].height;
      const canvas2D = canvasDom.getContext("2d");
      new_array.push(new Promise((_0xee1af8, _0x538c4c) => {
        ImageObj.onload = () => {
          canvas2D.drawImage(ImageObj, 0, 0, ImageObj.width, ImageObj.height, 0, 0, canvasDom.width, canvasDom.height);
          _0xee1af8({
            key: key,
            canvas: canvasDom
          });
        };
      }));
    }
    return new_array;
  },
  handleImage(_0x526944, _15431e) {
    const _15e986 = Store.luckysheetfile.find(_0x28303b => _0x28303b.index === Store.currentSheetIndex);
    const _0x456b80 = _15e986.images[_15431e.key];
    const _0xad342b = {
      top: _0x456b80["default"].top,
      bottom: _0x456b80["default"].top + _0x456b80["default"].height,
      left: _0x456b80["default"].left,
      right: _0x456b80["default"].left + _0x456b80["default"].width
    };
    const _171709 = {
      top: this.saveRange.top_move,
      bottom: this.saveRange.top_move + this.saveRange.height_move,
      left: this.saveRange.left_move,
      right: this.saveRange.left_move + this.saveRange.width_move
    };
    if (_0xad342b.bottom < _171709.top || _0xad342b.right < _171709.left || _0xad342b.left > _171709.right || _0xad342b.top > _171709.bottom) {
      return;
    }
    let _0x3356fb;
    let _1533d0;
    let _195d00;
    let _0x393559;
    _0x3356fb = Math.max(_0xad342b.left, _171709.left);
    _195d00 = Math.max(_0xad342b.top, _171709.top);
    _1533d0 = Math.min(_0xad342b.right, _171709.right);
    _0x393559 = Math.min(_0xad342b.bottom, _171709.bottom);
    _0x526944.drawImage(_15431e.canvas, _0x3356fb - _0xad342b.left, _195d00 - _0xad342b.top, _15431e.canvas.width - _0x3356fb + _0xad342b.left, _15431e.canvas.height - _195d00 + _0xad342b.top, _0x3356fb - _171709.left, _195d00 - _171709.top, _15431e.canvas.width - _0x3356fb + _0xad342b.left, _15431e.canvas.height - _195d00 + _0xad342b.top);
  },
  handleChart(_0x5963b1) {
    const _0x5a5b1c = Store.luckysheetfile.find(e => e.index === Store.currentSheetIndex);
    const _0x4abffc = _0x5a5b1c?.chart ?? [];
    if (!_0x4abffc.length) {
      return;
    }
    const _0x5f05a2 = {
      top: this.saveRange.top_move,
      bottom: this.saveRange.top_move + this.saveRange.height_move,
      left: this.saveRange.left_move,
      right: this.saveRange.left_move + this.saveRange.width_move
    };
    for (let _0x733250 = 0; _0x733250 < _0x4abffc.length; _0x733250++) {
      const _0x358a50 = _0x4abffc[_0x733250];
      const _0xdd8f23 = {
        top: _0x358a50.top,
        bottom: _0x358a50.top + _0x358a50.height,
        left: _0x358a50.left,
        right: _0x358a50.left + _0x358a50.width
      };
      if (_0xdd8f23.bottom < _0x5f05a2.top || _0xdd8f23.right < _0x5f05a2.left || _0xdd8f23.left > _0x5f05a2.right || _0xdd8f23.top > _0x5f05a2.bottom) {
        continue;
      }
      const _1f8c64 = document.getElementById(_0x358a50.chart_id).querySelector("canvas");
      if (!_1f8c64) {
        continue;
      }
      let _0x27f76a;
      let _0x2eeda2;
      let _0x46cd33;
      let _0x2da45a;
      _0x27f76a = Math.max(_0xdd8f23.left, _0x5f05a2.left);
      _0x46cd33 = Math.max(_0xdd8f23.top, _0x5f05a2.top);
      _0x2eeda2 = Math.min(_0xdd8f23.right, _0x5f05a2.right);
      _0x2da45a = Math.min(_0xdd8f23.bottom, _0x5f05a2.bottom);
      _0x5963b1.drawImage(_1f8c64, _0x27f76a - _0xdd8f23.left, _0x46cd33 - _0xdd8f23.top, _1f8c64.width - _0x27f76a + _0xdd8f23.left, _1f8c64.height - _0x46cd33 + _0xdd8f23.top, _0x27f76a - _0x5f05a2.left, _0x46cd33 - _0x5f05a2.top, _1f8c64.width - _0x27f76a + _0xdd8f23.left, _1f8c64.height - _0x46cd33 + _0xdd8f23.top);
    }
  },
  drawCanvas(_1b034d, _16eec7, _0x2132a2, _1c8026) {
    let _0x36553a = this;
    let _0x4ddae5 = $("<canvas>").attr({
      width: Math.ceil(_1b034d * Store.devicePixelRatio),
      height: Math.ceil(_16eec7 * Store.devicePixelRatio)
    }).css({
      width: _1b034d,
      height: _16eec7
    });
    luckysheetDrawMain(_0x2132a2, _1c8026, _1b034d, _16eec7, 1, 1, null, null, _0x4ddae5);
    const _0x429b3c = _0x4ddae5.get(0);
    _0x429b3c.id = "luckysheet-print-canvas";
    let _0x40ca9a = _0x4ddae5.get(0).getContext("2d");
    _0x40ca9a.beginPath();
    _0x40ca9a.moveTo(0, 0);
    _0x40ca9a.lineTo(0, Store.devicePixelRatio * _16eec7);
    _0x40ca9a.lineWidth = Store.devicePixelRatio * 0x2;
    _0x40ca9a.strokeStyle = luckysheetdefaultstyle.strokeStyle;
    _0x40ca9a.stroke();
    _0x40ca9a.closePath();
    _0x40ca9a.beginPath();
    _0x40ca9a.moveTo(0, 0);
    _0x40ca9a.lineTo(Store.devicePixelRatio * _1b034d, 0);
    _0x40ca9a.lineWidth = Store.devicePixelRatio * 0x2;
    _0x40ca9a.strokeStyle = luckysheetdefaultstyle.strokeStyle;
    _0x40ca9a.stroke();
    _0x40ca9a.closePath();
    _0x36553a.canvasList.forEach(_0x38484a => {
      _0x36553a.handleImage(_0x40ca9a, _0x38484a);
    });
    _0x36553a.handleChart(_0x40ca9a);
    _0x36553a.breakPage(_0x429b3c);
  },
  breakPage(_0x374fc6) {
    let _this = this;
    const _0xc83171 = Store.devicePixelRatio * 0x60;
    console.log(this.direction);
    const _0x46af00 = _this.sizeList[_this.size][_this.direction === "0" ? 1 : 0] * _0xc83171 / 2.54 - 0x64;
    const _0x4fff65 = _this.sizeList[_this.size][_this.direction === "0" ? 0 : 1] * _0xc83171 / 2.54 - 0x96;
    const _0x33985b = _0x46af00 - _this.padding[1] - _this.padding[0x3];
    const _1e3774 = _0x4fff65 - _this.padding[0] - _this.padding[0x2];
    let _0x3662af;
    let _0x25c011;
    if (_this.selectArea == "0") {
      _0x3662af = [0, ...Store.visibledatacolumn];
      _0x25c011 = [0, ...Store.visibledatarow];
    } else {
      const _0x2ee561 = _this.saveRange.column[0];
      const _0x3caeb8 = _this.saveRange.column[1] + 1;
      _0x3662af = [0];
      let _0x45ebcc = _0x2ee561 > 0 ? Store.visibledatacolumn[_0x2ee561 - 1] : 0;
      for (let _118ce6 = _0x2ee561; _118ce6 < _0x3caeb8; _118ce6++) {
        _0x3662af.push(Store.visibledatacolumn[_118ce6] - _0x45ebcc);
      }
      const _16dbf9 = _this.saveRange.row[0];
      const _0x230e94 = _this.saveRange.row[1] + 1;
      _0x25c011 = [0];
      let _0x4c4b1f = _16dbf9 > 0 ? Store.visibledatarow[_16dbf9 - 1] : 0;
      for (let _0x3f16f3 = _16dbf9; _0x3f16f3 < _0x230e94; _0x3f16f3++) {
        _0x25c011.push(Store.visibledatarow[_0x3f16f3] - _0x4c4b1f);
      }
    }
    const _0xc92ce8 = this.findValue(0, _0x3662af.length - 1, _0x33985b, _0x3662af);
    _0xc92ce8.unshift(0);
    const _0x259b6d = _0x3662af.findIndex(_0x51a4a6 => _0x51a4a6 === _0xc92ce8[_0xc92ce8.length - 1]);
    if (_0x259b6d !== _0x3662af.length - 1) {
      _0xc92ce8.push(_0x3662af[_0x3662af.length - 1]);
    }
    const _16e768 = this.findValue(0, _0x25c011.length - 1, _1e3774, _0x25c011);
    _16e768.unshift(0);
    const _0x3b0906 = _0x25c011.findIndex(_0x31c942 => _0x31c942 === _16e768[_16e768.length - 1]);
    if (_0x3b0906 !== _0x25c011.length - 1) {
      _16e768.push(_0x25c011[_0x25c011.length - 1]);
    }
    const _0x4f6bde = document.createElement("div");
    _0x4f6bde.className = "luckysheet-print-preview";
    document.body.appendChild(_0x4f6bde);
    for (let _0x5c2eeb = 0; _0x5c2eeb < _16e768.length; _0x5c2eeb++) {
      if (_0x5c2eeb == 0) {
        continue;
      }
      let _0x31ff68 = _16e768[_0x5c2eeb] - _16e768[_0x5c2eeb - 1];
      for (let _0x3c957c = 0; _0x3c957c < _0xc92ce8.length; _0x3c957c++) {
        if (_0x3c957c == 0) {
          continue;
        }
        width = _0xc92ce8[_0x3c957c] - _0xc92ce8[_0x3c957c - 1];
        const _0x20ae65 = document.createElement("div");
        _0x20ae65.className = "luckysheet-print-break";
        const _0x3942d8 = document.createElement("div");
        _0x3942d8.className = "luckysheet-print-box";
        const canvasObj = document.createElement("canvas");
        canvasObj.width = width;
        canvasObj.height = _0x31ff68;
        canvasObj.style.margin = _this.padding[0] + "px auto";
        const _0x98b6c9 = canvasObj.getContext("2d");
        _0x98b6c9.drawImage(_0x374fc6, _0xc92ce8[_0x3c957c - 1], _16e768[_0x5c2eeb - 1], width, _0x31ff68, 0, 0, width, _0x31ff68);
        this.drawLine(_0x98b6c9, 0, 0, Store.devicePixelRatio * width, 0);
        this.drawLine(_0x98b6c9, width, 0, width, Store.devicePixelRatio * _0x31ff68);
        this.drawLine(_0x98b6c9, 0, _0x31ff68, width, Store.devicePixelRatio * _0x31ff68);
        this.drawLine(_0x98b6c9, 0, 0, 0, Store.devicePixelRatio * _0x31ff68);
        _0x3942d8.appendChild(canvasObj);
        _0x4f6bde.appendChild(_0x3942d8);
        _0x4f6bde.appendChild(_0x20ae65);
      }
      if (_0x5c2eeb === _16e768.length - 1) {
        const _0x6082b4 = document.querySelectorAll(".luckysheet-print-break");
        _0x6082b4[_0x6082b4.length - 1].remove();
      }
    }
  },
  findValue(_0x2c004c, _0x460239, _0xfd92da, _1a10d5) {
    let _0x30b2da = [];
    const _1bff17 = _1a10d5[_0x2c004c];
    for (let _0x4b89bd = _0x2c004c; _0x4b89bd < _0x460239; _0x4b89bd++) {
      if (_1a10d5[_0x4b89bd] - _1bff17 > _0xfd92da) {
        _0x30b2da = this.findValue(_0x4b89bd, _0x460239, _0xfd92da, _1a10d5);
        _0x30b2da.unshift(_1a10d5[_0x4b89bd - 1]);
        break;
      }
    }
    return _0x30b2da;
  },
  drawLine(obj, _1c5e7a, _0x3a99da, _0x3bfb49, _0xe6f80b) {
    obj.beginPath();
    obj.moveTo(_1c5e7a, _0x3a99da);
    obj.lineTo(_0x3bfb49, _0xe6f80b);
    obj.lineWidth = Store.devicePixelRatio * 0x2;
    obj.strokeStyle = luckysheetdefaultstyle.strokeStyle;
    obj.stroke();
    obj.closePath();
  }
};
