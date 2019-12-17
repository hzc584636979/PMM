module.exports = (function(win, lib) {
    console.warn('将根据已有的meta标签来设置缩放比例2.0');
    var dpr, scale, timer, rem;
    var style = document.createElement('style');

    dpr = window.devicePixelRatio || 1;
    scale = 1 / dpr;

    document.documentElement.setAttribute('data-dpr', dpr);
    var metaEl = document.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'target-densitydpi=device-dpi, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    document.documentElement.firstElementChild.appendChild(metaEl);
    document.documentElement.firstElementChild.appendChild(style);


    function refreshRem () {
      var width = document.documentElement.clientWidth;
      var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
      var isPhone = window.navigator.userAgent.match(/Android|SymbianOS|Windows Phone|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
      if (!isPhone && width > 1024) {
        if(isMac){
          window.rem = rem = width * dpr * 0.8 / 10;
        }else{
          window.rem = rem = 75;
        }
      }else {
        window.rem = rem = width / 10;
      }
      style.innerHTML = 'html{font-size:' + rem + 'px;}';
    }

    refreshRem();

    window.addEventListener('resize', function () {
      clearTimeout(timer);
      timer = setTimeout(refreshRem, 300);
    }, false);

    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        clearTimeout(timer);
        timer = setTimeout(refreshRem, 300);
      }
    }, false);

})(window, window['lib'] || (window['lib'] = {}));