import defaultSetting from "./config.js";
import { common_extend } from "./utils/util";
import Store from "./store";
import { locales } from "./locale/locale";
import server from "./controllers/server";
import luckysheetConfigsetting from "./controllers/luckysheetConfigsetting";
import sheetmanage from "./controllers/sheetmanage";
import luckysheetsizeauto from "./controllers/resize";
import luckysheetHandler from "./controllers/handler";
import { initialFilterHandler } from "./controllers/filter";
import { initialMatrixOperation } from "./controllers/matrixOperation";
import { initialSheetBar } from "./controllers/sheetBar";
import { formulaBarInitial } from "./controllers/formulaBar";
import { rowColumnOperationInitial } from "./controllers/rowColumnOperation";
import { keyboardInitial } from "./controllers/keyboard";
import { orderByInitial } from "./controllers/orderBy";
import { initPlugins } from "./controllers/expendPlugins";
import { getluckysheetfile, getluckysheet_select_save, getconfig, getConditionFormatCells } from "./methods/get";
import { setluckysheet_select_save } from "./methods/set";
import { luckysheetrefreshgrid, jfrefreshgrid } from "./global/refresh";
import functionlist from "./function/functionlist";
import { luckysheetlodingHTML } from "./controllers/constant";
import { getcellvalue, getdatabyselection } from "./global/getdata";
import { setcellvalue } from "./global/setdata";
import { selectHightlightShow } from "./controllers/select";
import { zoomInitial } from "./controllers/zoom";
// import { printInitial } from "./controllers/print";
import method from "./global/method";

import * as api from "./global/api";

import flatpickr from "flatpickr";
import Mandarin from "flatpickr/dist/l10n/zh.js";
import { initListener } from "./controllers/listener";
import { hideloading, showloading } from "./global/loading.js";
import { luckysheetextendData } from "./global/extend.js";
import { initChat } from './demoData/chat.js'

let luckysheet = {};

// mount api
// luckysheet.api = api;
// Object.assign(luckysheet, api);

luckysheet = common_extend(api, luckysheet);

//创建luckysheet表格
// 20250108 增加一个isUpload 表示是上传文件后重构的数据不需要从服务器拉取数据,因为上传的数据还在本地
luckysheet.create = function (setting, isUpload = false) {
    method.destroy();
    // Store original parameters for api: toJson
    Store.toJsonOptions = {};
    for (let c in setting) {
        if (c !== "data") {
            Store.toJsonOptions[c] = setting[c];
        }
    }

    // 保存初始化设置
    Store.init_setting = setting;
    let extendsetting = common_extend(defaultSetting, setting);

    let loadurl = extendsetting.loadUrl,
        menu = extendsetting.menu,
        title = extendsetting.title;

    let container = extendsetting.container;
    Store.container = container;
    Store.luckysheetfile = extendsetting.data;
    Store.defaultcolumnNum = extendsetting.column;
    Store.defaultrowNum = extendsetting.row;
    Store.defaultFontSize = extendsetting.defaultFontSize;
    Store.fullscreenmode = extendsetting.fullscreenmode;
    Store.lang = extendsetting.lang; //language
    Store.allowEdit = extendsetting.allowEdit;
    Store.limitSheetNameLength = extendsetting.limitSheetNameLength;
    Store.defaultSheetNameMaxLength = extendsetting.defaultSheetNameMaxLength;
    Store.fontList = extendsetting.fontList;
    server.gridKey = extendsetting.gridKey;
    server.loadUrl = extendsetting.loadUrl;
    server.updateUrl = extendsetting.updateUrl;
    server.updateImageUrl = extendsetting.updateImageUrl;
    server.title = extendsetting.title;
    server.loadSheetUrl = extendsetting.loadSheetUrl;
    server.allowUpdate = extendsetting.allowUpdate;

    luckysheetConfigsetting.autoFormatw = extendsetting.autoFormatw;
    luckysheetConfigsetting.accuracy = extendsetting.accuracy;
    luckysheetConfigsetting.total = extendsetting.data[0].total;

    luckysheetConfigsetting.loading = extendsetting.loading;
    luckysheetConfigsetting.allowCopy = extendsetting.allowCopy;
    luckysheetConfigsetting.showtoolbar = extendsetting.showtoolbar;
    luckysheetConfigsetting.showtoolbarConfig = extendsetting.showtoolbarConfig;
    luckysheetConfigsetting.showinfobar = extendsetting.showinfobar;
    luckysheetConfigsetting.showsheetbar = extendsetting.showsheetbar;
    luckysheetConfigsetting.showsheetbarConfig = extendsetting.showsheetbarConfig;
    luckysheetConfigsetting.showstatisticBar = extendsetting.showstatisticBar;
    luckysheetConfigsetting.showstatisticBarConfig = extendsetting.showstatisticBarConfig;
    luckysheetConfigsetting.sheetFormulaBar = extendsetting.sheetFormulaBar;
    luckysheetConfigsetting.cellRightClickConfig = extendsetting.cellRightClickConfig;
    luckysheetConfigsetting.sheetRightClickConfig = extendsetting.sheetRightClickConfig;
    luckysheetConfigsetting.pointEdit = extendsetting.pointEdit;
    luckysheetConfigsetting.pointEditUpdate = extendsetting.pointEditUpdate;
    luckysheetConfigsetting.pointEditZoom = extendsetting.pointEditZoom;

    luckysheetConfigsetting.userInfo = extendsetting.userInfo;
    luckysheetConfigsetting.userMenuItem = extendsetting.userMenuItem;
    luckysheetConfigsetting.myFolderUrl = extendsetting.myFolderUrl;
    luckysheetConfigsetting.functionButton = extendsetting.functionButton;

    luckysheetConfigsetting.showConfigWindowResize = extendsetting.showConfigWindowResize;
    luckysheetConfigsetting.enableAddRow = extendsetting.enableAddRow;
    luckysheetConfigsetting.enableAddBackTop = extendsetting.enableAddBackTop;
    luckysheetConfigsetting.addRowCount = extendsetting.addRowCount;
    luckysheetConfigsetting.enablePage = extendsetting.enablePage;
    luckysheetConfigsetting.pageInfo = extendsetting.pageInfo;

    luckysheetConfigsetting.editMode = extendsetting.editMode;
    luckysheetConfigsetting.beforeCreateDom = extendsetting.beforeCreateDom;
    luckysheetConfigsetting.workbookCreateBefore = extendsetting.workbookCreateBefore;
    luckysheetConfigsetting.workbookCreateAfter = extendsetting.workbookCreateAfter;
    luckysheetConfigsetting.remoteFunction = extendsetting.remoteFunction;
    luckysheetConfigsetting.customFunctions = extendsetting.customFunctions;

    luckysheetConfigsetting.fireMousedown = extendsetting.fireMousedown;
    luckysheetConfigsetting.forceCalculation = extendsetting.forceCalculation;
    luckysheetConfigsetting.plugins = extendsetting.plugins;

    luckysheetConfigsetting.rowHeaderWidth = extendsetting.rowHeaderWidth;
    luckysheetConfigsetting.columnHeaderHeight = extendsetting.columnHeaderHeight;

    luckysheetConfigsetting.defaultColWidth = extendsetting.defaultColWidth;
    luckysheetConfigsetting.defaultRowHeight = extendsetting.defaultRowHeight;

    luckysheetConfigsetting.title = extendsetting.title;
    luckysheetConfigsetting.container = extendsetting.container;
    luckysheetConfigsetting.hook = extendsetting.hook;

    luckysheetConfigsetting.pager = extendsetting.pager;

    luckysheetConfigsetting.initShowsheetbarConfig = false;

    luckysheetConfigsetting.imageUpdateMethodConfig = extendsetting.imageUpdateMethodConfig;

    if (Store.lang === "zh") flatpickr.localize(Mandarin.zh);

    // Store the currently used plugins for monitoring asynchronous loading
    Store.asyncLoad.push(...luckysheetConfigsetting.plugins.map(plugin => plugin.name));

    // Register plugins
    initPlugins(extendsetting.plugins, extendsetting);
    Store.plugins = extendsetting.plugins;

    // Store formula information, including internationalization
    functionlist(extendsetting.customFunctions);

    let devicePixelRatio = extendsetting.devicePixelRatio;
    if (devicePixelRatio == null) {
        devicePixelRatio = 1;
    }
    Store.devicePixelRatio = Math.ceil(devicePixelRatio);

    //loading
    const loadingObj = luckysheetlodingHTML("#" + container);
    Store.loadingObj = loadingObj;

    if (loadurl == "" || isUpload) {
        sheetmanage.initialjfFile(menu, title);
        // luckysheetsizeauto();
        initialWorkBook();
    } else {
        $.ajax({
            url: loadurl,
            type: 'POST',
            data: {
                "gridKey": server.gridKey
            },
            // dataType: 'json', // 或者其他数据类型
            headers: setting.api_headers || {}, // 支持自定义身份信息
            success: function(d) {
                // 调试数据
                // let data = [{"calcChain":[],"celldata":[],"config":{},"defaultColWidth":70,"defaultRowHeight":18,"gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"3","name":"Sheet3","order":2,"sheetId":"60454fef084b4a8dbd9d2b8bede703dd","showGridLines":1,"status":0,"zoomRatio":1,"disabled":true},{"calcChain":[],"celldata":[],"config":{},"defaultColWidth":70,"defaultRowHeight":18,"gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"2","name":"Sheet2","order":1,"sheetId":"49f71f711b844aa4a74f8d59926b30da","showGridLines":1,"status":0,"zoomRatio":1},{"calcChain":[],"celldata":[{"c":0,"cellId":"35a2f32eb5164aa6bdf54294edc645a0","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":0,"v":{"ct":{"t":"s","fa":"@"},"v":"code","m":"code","tb":1,"qp":1}},{"c":1,"cellId":"ff0151946ce94b398b9d60487c853607","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":0,"v":{"ct":{"t":"s","fa":"@"},"v":"name","m":"name","tb":1,"qp":1}},{"c":0,"cellId":"0d0db52f4b594462958057e727a196fe","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":1,"v":{"ct":{"t":"n","fa":"General"},"v":1,"m":"1","tb":1}},{"c":1,"cellId":"c39d076a8c3d43d48aa0e1572e209635","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":1,"v":{"ct":{"t":"n","fa":"General"},"v":2,"m":"2","tb":1}},{"c":6,"cellId":"7f23cbf7cba5419faf3eb227d0cd14d8","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":4,"v":{"ct":{"t":"n","fa":"General"},"v":444,"m":"444"}},{"c":7,"cellId":"9222a95595174414966c48210d9ba5d3","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":4,"v":{"ct":{"t":"n","fa":"General"},"v":445,"m":"445"}},{"c":8,"cellId":"48fe2ec0a7e24b3f949583445c78bf21","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":4,"v":{"ct":{"t":"n","fa":"General"},"v":446,"m":"446"}},{"c":9,"cellId":"b35f4e9d75ce48a9818d9b8e08815f3d","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":4,"v":{"ct":{"t":"n","fa":"General"},"v":447,"m":"447"}},{"c":10,"cellId":"71ca58be440148cebfd5cd72a83f35ff","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":4,"v":{"ct":{"t":"n","fa":"General"},"v":448,"m":"448"}},{"c":11,"cellId":"8d30a494af044ceaacad42806ce72655","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":4,"v":{"ct":{"t":"n","fa":"General"},"v":449,"m":"449"}},{"c":12,"cellId":"787459b6fd18457eab215d45283bde1e","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":4,"v":{"ct":{"t":"n","fa":"General"},"v":450,"m":"450"}},{"c":13,"cellId":"f937adfa9d1d4ae6bb04151bda0bc0fd","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":4,"v":{"ct":{"t":"n","fa":"General"},"v":451,"m":"451"}},{"c":14,"cellId":"a82eecdd65c6426f88a4128fb65d5bd3","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":4,"v":{"ct":{"t":"n","fa":"General"},"v":452,"m":"452"}},{"c":1,"cellId":"2a371f4929304404b9de8c347bd7f089","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":6,"v":{"ct":{"t":"n","fa":"General"},"v":3333,"m":"3333"}},{"c":4,"cellId":"3d6d2e8fa87e48fda5e72cec332aa903","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":6,"v":{"ct":{"t":"n","fa":"General"},"v":555,"m":"555"}},{"c":2,"cellId":"381185965e1f4cae94c16f29dc1e0424","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":9,"v":{"ct":{"t":"n","fa":"General"},"v":4444,"m":"4444"}},{"c":6,"cellId":"97d31b5cae314e0b8ea42d64281ba876","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":9,"v":{"ct":{"t":"n","fa":"General"},"v":3333,"m":"3333"}},{"c":8,"cellId":"952ce3a14b414c4a88765812ee6d7371","gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","initData":false,"r":9,"v":{"ct":{"t":"n","fa":"General"},"v":44444,"m":"44444"}}],"config":{},"defaultColWidth":70,"defaultRowHeight":18,"gridKey":"9a9ea85d052b49e8852348847a188ce5","index":"1","name":"Sheet1","order":0,"sheetId":"88301b676325497a8d9ead847b51f484","showGridLines":1,"status":1,"zoomRatio":1,"disabled":true}];
                let data = new Function("return " + d)();
                Store.luckysheetfile = data;

                sheetmanage.initialjfFile(menu, title);
                initialWorkBook();

                //需要更新数据给后台时，建立WebSocket连接
                // 先注释Socket连接
                // if (server.allowUpdate) {
                //     server.openWebSocket();
                // }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // 处理错误情况
                console.error(textStatus + ": " + errorThrown);
            }
        });

        // $.post(loadurl, {"gridKey" : server.gridKey}, function (d) {
        //     let data = new Function("return " + d)();
        //     Store.luckysheetfile = data;
        //
        //     sheetmanage.initialjfFile(menu, title);
        //     // luckysheetsizeauto();
        //     initialWorkBook();
        //
        //     //需要更新数据给后台时，建立WebSocket连接
        //     if(server.allowUpdate){
        //         server.openWebSocket();
        //     }
        // });
    }

    initChat()
};

function initialWorkBook() {
    luckysheetHandler(); //Overall dom initialization
    initialFilterHandler(); //Filter initialization
    initialMatrixOperation(); //Right click matrix initialization
    initialSheetBar(); //bottom sheet bar initialization
    formulaBarInitial(); //top formula bar initialization
    rowColumnOperationInitial(); //row and coloumn operate initialization
    keyboardInitial(); //Keyboard operate initialization
    orderByInitial(); //menu bar orderby function initialization
    zoomInitial(); //zoom method initialization
    // printInitial(); //print initialization
    initListener();
}

//获取所有表格数据
luckysheet.getluckysheetfile = getluckysheetfile;

//获取当前表格 选区
luckysheet.getluckysheet_select_save = getluckysheet_select_save;

//设置当前表格 选区
luckysheet.setluckysheet_select_save = setluckysheet_select_save;

//获取当前表格 config配置
luckysheet.getconfig = getconfig;

//二维数组数据 转化成 {r, c, v}格式 一维数组 (传入参数为二维数据data)
luckysheet.getGridData = sheetmanage.getGridData;

//生成表格所需二维数组 （传入参数为表格数据对象file）
luckysheet.buildGridData = sheetmanage.buildGridData;

// Refresh the canvas display data according to scrollHeight and scrollWidth
luckysheet.luckysheetrefreshgrid = luckysheetrefreshgrid;

// Refresh canvas
luckysheet.jfrefreshgrid = jfrefreshgrid;

// Get the value of the cell
luckysheet.getcellvalue = getcellvalue;

// Set cell value
luckysheet.setcellvalue = setcellvalue;

// Get selection range value
luckysheet.getdatabyselection = getdatabyselection;

luckysheet.sheetmanage = sheetmanage;

// Data of the current table
luckysheet.flowdata = function () {
    return Store.flowdata;
};

// Set selection highlight
luckysheet.selectHightlightShow = selectHightlightShow;

// Reset parameters after destroying the table
luckysheet.destroy = method.destroy;

luckysheet.showLoadingProgress = showloading;
luckysheet.hideLoadingProgress = hideloading;
luckysheet.luckysheetextendData = luckysheetextendData;

luckysheet.locales = locales;

// 获取条件格式渲染的单元格数量
luckysheet.getConditionFormatCells = getConditionFormatCells;

export { luckysheet };
