const langConfig = {
	en: {
        home: 'Home',
        transactionList: 'TransactionList',
		rule: 'Rule',
		about: 'About',
	},
	cn: {
        home: '返回首页',
        transactionList: '投注记录',
		rule: '平台规则',
		about: '关于我们',
	}
}

function getUrlOptions(url = window.location.href) {

    var 

    add = url.indexOf('?'),

    el = {};

    if (add == -1) return el;

    url = url.substring(add + 1,url.length);

    var urlEle = function(_url){

        var 

        _add = _url.indexOf('=');

        if(_add == -1) return el;

        var 

        _endAdd = (_url.indexOf('&') == -1) ? _url.length : _url.indexOf('&'),

        key = _url.substring(0,_add),

        val = _url.substring(_add + 1,_endAdd),

        _subStr = _url.substring(_endAdd + 1,_url.length);

        el[key] = val;

        if(_subStr.length != 0){

            urlEle(_subStr);

        }
        return el;
    };

    return urlEle(url);
}

function getUserInfo(dvaIndex) {
    return {
        userByContract: {}, 
        address: '', 
        banlance: 0, 
        ...JSON.parse(window.g_getLocalStorage()),
        ...dvaIndex,
    };
};

window.getUserInfo = getUserInfo;

function formatDuring(mss,type = ['天','小时','分钟','秒']) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 10 ? '0' + parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)) < 10 ? '0' + parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)) : parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((mss % (1000 * 60)) / 1000) < 10 ? '0' + parseInt((mss % (1000 * 60)) / 1000) : parseInt((mss % (1000 * 60)) / 1000);
    return days + type[0] + hours + type[1] + minutes + type[2] + seconds + type[3];
}

function lessDate(startTime, day) {
    const dayTime = day*24*60*60*1000;
    const lessTime = startTime + dayTime - new Date().getTime();
    return formatDuring(lessTime, ['天',':',':','']);
}

function changeTime(time, type) {
    if(time.toString().length >= 10 && time.toString().length < 13){
        time = time*1000;
    }
    //type 返回的时间格式  'yyyy-MM-dd h:m:s'
    Date.prototype.format = function(format){
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
//                "h+": this.getHours(),
              "h+": this.getHours()+1 >= 10 ? this.getHours(): '0'+(this.getHours()),
              "m+": this.getMinutes()+1 >= 10 ? this.getMinutes(): '0'+(this.getMinutes()),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
    }
    return new Date(time).format(type);//毫秒
};

export { 
    langConfig, 
    getUrlOptions, 
    formatDuring, 
    lessDate,
    changeTime,
};