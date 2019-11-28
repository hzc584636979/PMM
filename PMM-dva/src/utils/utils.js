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

export { langConfig, getUrlOptions };