webpackJsonp([8],{"+maM":function(t,e,r){"use strict";var n=r("ouCL");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(r("+TWC")),a=n(r("rAzg")),i=r("MhCX"),s={namespace:"develop",state:{},effects:{inviteCode:a.default.mark(function t(e,r){var n,o,s;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.payload,o=r.call,t.next=4,o(i.getIC,n);case 4:return s=t.sent,t.abrupt("return",s.data.invitationCode);case 6:case"end":return t.stop()}},t)}),receipt:a.default.mark(function t(e,r){var n,o;return a.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.payload,o=r.call,t.next=4,o(i.payReceipt,n);case 4:case"end":return t.stop()}},t)})},reducers:{save:function(t,e){return(0,o.default)({},t,e.payload)}}};e.default=s},"2sBs":function(t,e){t.exports=function t(e,r){var n=[];for(var o in e)if(e.hasOwnProperty(o)){var a,i=e[o],s=encodeURIComponent(o);a="object"==typeof i?t(i,r?r+"["+s+"]":s):(r?r+"["+s+"]":s)+"="+encodeURIComponent(i),n.push(a)}return n.join("&")}},"95Qu":function(t,e){!function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&r.rotl(t,8)|4278255360&r.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=r.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],r=0,n=0;r<t.length;r++,n+=8)e[n>>>5]|=t[r]<<24-n%32;return e},wordsToBytes:function(t){for(var e=[],r=0;r<32*t.length;r+=8)e.push(t[r>>>5]>>>24-r%32&255);return e},bytesToHex:function(t){for(var e=[],r=0;r<t.length;r++)e.push((t[r]>>>4).toString(16)),e.push((15&t[r]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],r=0;r<t.length;r+=2)e.push(parseInt(t.substr(r,2),16));return e},bytesToBase64:function(t){for(var r=[],n=0;n<t.length;n+=3)for(var o=t[n]<<16|t[n+1]<<8|t[n+2],a=0;a<4;a++)8*n+6*a<=8*t.length?r.push(e.charAt(o>>>6*(3-a)&63)):r.push("=");return r.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var r=[],n=0,o=0;n<t.length;o=++n%4)0!=o&&r.push((e.indexOf(t.charAt(n-1))&Math.pow(2,-2*o+8)-1)<<2*o|e.indexOf(t.charAt(n))>>>6-2*o);return r}};t.exports=r}()},Gj0I:function(t,e,r){"use strict";function n(){return n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},n.apply(this,arguments)}function o(t){var e=t.duration,r=t.placement,n=t.bottom,o=t.top,a=t.getContainer;void 0!==e&&(d=e),void 0!==r&&(m=r),void 0!==n&&(y=n),void 0!==o&&(h=o),void 0!==a&&(c=a)}function a(t){var e,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:h,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:y;switch(t){case"topLeft":e={left:0,top:r,bottom:"auto"};break;case"topRight":e={right:0,top:r,bottom:"auto"};break;case"bottomLeft":e={left:0,top:"auto",bottom:n};break;default:e={right:0,top:"auto",bottom:n}}return e}function i(t,e){var r=t.prefixCls,n=t.placement,o=void 0===n?m:n,i=t.getContainer,s=void 0===i?c:i,d=t.top,h=t.bottom,y="".concat(r,"-").concat(o);if(p[y])return void e(p[y]);f.a.newInstance({prefixCls:r,className:"".concat(r,"-").concat(o),style:a(o,d,h),getContainer:s,closeIcon:u.createElement(l.default,{className:"".concat(r,"-close-icon"),type:"close"})},function(t){p[y]=t,e(t)})}function s(t){var e=t.prefixCls||"ant-notification",r="".concat(e,"-notice"),n=void 0===t.duration?d:t.duration,o=null;if(t.icon)o=u.createElement("span",{className:"".concat(r,"-icon")},t.icon);else if(t.type){var a=b[t.type];o=u.createElement(l.default,{className:"".concat(r,"-icon ").concat(r,"-icon-").concat(t.type),type:a})}var s=!t.description&&o?u.createElement("span",{className:"".concat(r,"-message-single-line-auto-margin")}):null;i({prefixCls:e,placement:t.placement,top:t.top,bottom:t.bottom,getContainer:t.getContainer},function(e){e.notice({content:u.createElement("div",{className:o?"".concat(r,"-with-icon"):""},o,u.createElement("div",{className:"".concat(r,"-message")},s,t.message),u.createElement("div",{className:"".concat(r,"-description")},t.description),t.btn?u.createElement("span",{className:"".concat(r,"-btn")},t.btn):null),duration:n,closable:!0,onClose:t.onClose,onClick:t.onClick,key:t.key,style:t.style||{},className:t.className})})}Object.defineProperty(e,"__esModule",{value:!0});var c,u=r("GiK3"),f=(r.n(u),r("Hx0i")),l=r("FC3+"),p={},d=4.5,h=24,y=24,m="topRight",b={success:"check-circle-o",info:"info-circle-o",error:"close-circle-o",warning:"exclamation-circle-o"},v={open:s,close:function(t){Object.keys(p).forEach(function(e){return p[e].removeNotice(t)})},config:o,destroy:function(){Object.keys(p).forEach(function(t){p[t].destroy(),delete p[t]})}};["success","info","warning","error"].forEach(function(t){v[t]=function(e){return v.open(n(n({},e),{type:t}))}}),v.warn=v.warning,e.default=v},Hx0i:function(t,e,r){"use strict";function n(){return"rcNotification_"+k+"_"+j++}var o=r("+6Bu"),a=r.n(o),i=r("bOdI"),s=r.n(i),c=r("Dd8w"),u=r.n(c),f=r("Zrlr"),l=r.n(f),p=r("wxAW"),d=r.n(p),h=r("zwoO"),y=r.n(h),m=r("Pf15"),b=r.n(m),v=r("GiK3"),g=r.n(v),w=r("KSGD"),T=r.n(w),C=r("O27J"),x=r.n(C),_=r("8aSS"),E=r("Erof"),O=r("HW6M"),A=r.n(O),P=function(t){function e(){var t,r,n,o;l()(this,e);for(var a=arguments.length,i=Array(a),s=0;s<a;s++)i[s]=arguments[s];return r=n=y()(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(i))),n.close=function(t){t&&t.stopPropagation(),n.clearCloseTimer(),n.props.onClose()},n.startCloseTimer=function(){n.props.duration&&(n.closeTimer=setTimeout(function(){n.close()},1e3*n.props.duration))},n.clearCloseTimer=function(){n.closeTimer&&(clearTimeout(n.closeTimer),n.closeTimer=null)},o=r,y()(n,o)}return b()(e,t),d()(e,[{key:"componentDidMount",value:function(){this.startCloseTimer()}},{key:"componentDidUpdate",value:function(t){(this.props.duration!==t.duration||this.props.update)&&this.restartCloseTimer()}},{key:"componentWillUnmount",value:function(){this.clearCloseTimer()}},{key:"restartCloseTimer",value:function(){this.clearCloseTimer(),this.startCloseTimer()}},{key:"render",value:function(){var t,e=this.props,r=e.prefixCls+"-notice",n=(t={},s()(t,""+r,1),s()(t,r+"-closable",e.closable),s()(t,e.className,!!e.className),t);return g.a.createElement("div",{className:A()(n),style:e.style,onMouseEnter:this.clearCloseTimer,onMouseLeave:this.startCloseTimer,onClick:e.onClick},g.a.createElement("div",{className:r+"-content"},e.children),e.closable?g.a.createElement("a",{tabIndex:"0",onClick:this.close,className:r+"-close"},e.closeIcon||g.a.createElement("span",{className:r+"-close-x"})):null)}}]),e}(v.Component);P.propTypes={duration:T.a.number,onClose:T.a.func,children:T.a.any,update:T.a.bool,closeIcon:T.a.node},P.defaultProps={onEnd:function(){},onClose:function(){},duration:1.5,style:{right:"50%"}};var B=P,j=0,k=Date.now(),S=function(t){function e(){var t,r,o,a;l()(this,e);for(var i=arguments.length,s=Array(i),c=0;c<i;c++)s[c]=arguments[c];return r=o=y()(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(s))),o.state={notices:[]},o.add=function(t){var e=t.key=t.key||n(),r=o.props.maxCount;o.setState(function(n){var o=n.notices,a=o.map(function(t){return t.key}).indexOf(e),i=o.concat();return-1!==a?i.splice(a,1,t):(r&&o.length>=r&&(t.updateKey=i[0].updateKey||i[0].key,i.shift()),i.push(t)),{notices:i}})},o.remove=function(t){o.setState(function(e){return{notices:e.notices.filter(function(e){return e.key!==t})}})},a=r,y()(o,a)}return b()(e,t),d()(e,[{key:"getTransitionName",value:function(){var t=this.props,e=t.transitionName;return!e&&t.animation&&(e=t.prefixCls+"-"+t.animation),e}},{key:"render",value:function(){var t,e=this,r=this.props,n=this.state.notices,o=n.map(function(t,o){var a=Boolean(o===n.length-1&&t.updateKey),i=t.updateKey?t.updateKey:t.key,s=Object(E.a)(e.remove.bind(e,t.key),t.onClose);return g.a.createElement(B,u()({prefixCls:r.prefixCls},t,{key:i,update:a,onClose:s,onClick:t.onClick,closeIcon:r.closeIcon}),t.content)}),a=(t={},s()(t,r.prefixCls,1),s()(t,r.className,!!r.className),t);return g.a.createElement("div",{className:A()(a),style:r.style},g.a.createElement(_.a,{transitionName:this.getTransitionName()},o))}}]),e}(v.Component);S.propTypes={prefixCls:T.a.string,transitionName:T.a.string,animation:T.a.oneOfType([T.a.string,T.a.object]),style:T.a.object,maxCount:T.a.number,closeIcon:T.a.node},S.defaultProps={prefixCls:"rc-notification",animation:"fade",style:{top:65,left:"50%"}},S.newInstance=function(t,e){function r(t){c||(c=!0,e({notice:function(e){t.add(e)},removeNotice:function(e){t.remove(e)},component:t,destroy:function(){x.a.unmountComponentAtNode(s),s.parentNode.removeChild(s)}}))}var n=t||{},o=n.getContainer,i=a()(n,["getContainer"]),s=document.createElement("div");if(o){o().appendChild(s)}else document.body.appendChild(s);var c=!1;x.a.render(g.a.createElement(S,u()({},i,{ref:r})),s)};var I=S;e.a=I},L6bb:function(t,e,r){!function(){var e=r("95Qu"),n=r("iFDI").utf8,o=r("Re3r"),a=r("iFDI").bin,i=function(t,r){t.constructor==String?t=r&&"binary"===r.encoding?a.stringToBytes(t):n.stringToBytes(t):o(t)?t=Array.prototype.slice.call(t,0):Array.isArray(t)||(t=t.toString());for(var s=e.bytesToWords(t),c=8*t.length,u=1732584193,f=-271733879,l=-1732584194,p=271733878,d=0;d<s.length;d++)s[d]=16711935&(s[d]<<8|s[d]>>>24)|4278255360&(s[d]<<24|s[d]>>>8);s[c>>>5]|=128<<c%32,s[14+(c+64>>>9<<4)]=c;for(var h=i._ff,y=i._gg,m=i._hh,b=i._ii,d=0;d<s.length;d+=16){var v=u,g=f,w=l,T=p;u=h(u,f,l,p,s[d+0],7,-680876936),p=h(p,u,f,l,s[d+1],12,-389564586),l=h(l,p,u,f,s[d+2],17,606105819),f=h(f,l,p,u,s[d+3],22,-1044525330),u=h(u,f,l,p,s[d+4],7,-176418897),p=h(p,u,f,l,s[d+5],12,1200080426),l=h(l,p,u,f,s[d+6],17,-1473231341),f=h(f,l,p,u,s[d+7],22,-45705983),u=h(u,f,l,p,s[d+8],7,1770035416),p=h(p,u,f,l,s[d+9],12,-1958414417),l=h(l,p,u,f,s[d+10],17,-42063),f=h(f,l,p,u,s[d+11],22,-1990404162),u=h(u,f,l,p,s[d+12],7,1804603682),p=h(p,u,f,l,s[d+13],12,-40341101),l=h(l,p,u,f,s[d+14],17,-1502002290),f=h(f,l,p,u,s[d+15],22,1236535329),u=y(u,f,l,p,s[d+1],5,-165796510),p=y(p,u,f,l,s[d+6],9,-1069501632),l=y(l,p,u,f,s[d+11],14,643717713),f=y(f,l,p,u,s[d+0],20,-373897302),u=y(u,f,l,p,s[d+5],5,-701558691),p=y(p,u,f,l,s[d+10],9,38016083),l=y(l,p,u,f,s[d+15],14,-660478335),f=y(f,l,p,u,s[d+4],20,-405537848),u=y(u,f,l,p,s[d+9],5,568446438),p=y(p,u,f,l,s[d+14],9,-1019803690),l=y(l,p,u,f,s[d+3],14,-187363961),f=y(f,l,p,u,s[d+8],20,1163531501),u=y(u,f,l,p,s[d+13],5,-1444681467),p=y(p,u,f,l,s[d+2],9,-51403784),l=y(l,p,u,f,s[d+7],14,1735328473),f=y(f,l,p,u,s[d+12],20,-1926607734),u=m(u,f,l,p,s[d+5],4,-378558),p=m(p,u,f,l,s[d+8],11,-2022574463),l=m(l,p,u,f,s[d+11],16,1839030562),f=m(f,l,p,u,s[d+14],23,-35309556),u=m(u,f,l,p,s[d+1],4,-1530992060),p=m(p,u,f,l,s[d+4],11,1272893353),l=m(l,p,u,f,s[d+7],16,-155497632),f=m(f,l,p,u,s[d+10],23,-1094730640),u=m(u,f,l,p,s[d+13],4,681279174),p=m(p,u,f,l,s[d+0],11,-358537222),l=m(l,p,u,f,s[d+3],16,-722521979),f=m(f,l,p,u,s[d+6],23,76029189),u=m(u,f,l,p,s[d+9],4,-640364487),p=m(p,u,f,l,s[d+12],11,-421815835),l=m(l,p,u,f,s[d+15],16,530742520),f=m(f,l,p,u,s[d+2],23,-995338651),u=b(u,f,l,p,s[d+0],6,-198630844),p=b(p,u,f,l,s[d+7],10,1126891415),l=b(l,p,u,f,s[d+14],15,-1416354905),f=b(f,l,p,u,s[d+5],21,-57434055),u=b(u,f,l,p,s[d+12],6,1700485571),p=b(p,u,f,l,s[d+3],10,-1894986606),l=b(l,p,u,f,s[d+10],15,-1051523),f=b(f,l,p,u,s[d+1],21,-2054922799),u=b(u,f,l,p,s[d+8],6,1873313359),p=b(p,u,f,l,s[d+15],10,-30611744),l=b(l,p,u,f,s[d+6],15,-1560198380),f=b(f,l,p,u,s[d+13],21,1309151649),u=b(u,f,l,p,s[d+4],6,-145523070),p=b(p,u,f,l,s[d+11],10,-1120210379),l=b(l,p,u,f,s[d+2],15,718787259),f=b(f,l,p,u,s[d+9],21,-343485551),u=u+v>>>0,f=f+g>>>0,l=l+w>>>0,p=p+T>>>0}return e.endian([u,f,l,p])};i._ff=function(t,e,r,n,o,a,i){var s=t+(e&r|~e&n)+(o>>>0)+i;return(s<<a|s>>>32-a)+e},i._gg=function(t,e,r,n,o,a,i){var s=t+(e&n|r&~n)+(o>>>0)+i;return(s<<a|s>>>32-a)+e},i._hh=function(t,e,r,n,o,a,i){var s=t+(e^r^n)+(o>>>0)+i;return(s<<a|s>>>32-a)+e},i._ii=function(t,e,r,n,o,a,i){var s=t+(r^(e|~n))+(o>>>0)+i;return(s<<a|s>>>32-a)+e},i._blocksize=16,i._digestsize=16,t.exports=function(t,r){if(void 0===t||null===t)throw new Error("Illegal argument "+t);var n=e.wordsToBytes(i(t,r));return r&&r.asBytes?n:r&&r.asString?a.bytesToString(n):e.bytesToHex(n)}}()},MhCX:function(t,e,r){"use strict";function n(){return o.apply(this,arguments)}function o(){return o=(0,v.default)(b.default.mark(function t(){var e;return b.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=[{hash:"dva",eth:1},{hash:"antd",eth:2}],t.abrupt("return",e);case 2:case"end":return t.stop()}},t)})),o.apply(this,arguments)}function a(t){return i.apply(this,arguments)}function i(){return i=(0,v.default)(b.default.mark(function t(e){return b.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,g.default)("".concat(w,"/game/pmm/betRecord"),{method:"POST",body:e}));case 1:case"end":return t.stop()}},t)})),i.apply(this,arguments)}function s(t){return c.apply(this,arguments)}function c(){return c=(0,v.default)(b.default.mark(function t(e){return b.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,g.default)("".concat(w,"/game/pmm/dataStatistics"),{method:"POST",body:e}));case 1:case"end":return t.stop()}},t)})),c.apply(this,arguments)}function u(t){return f.apply(this,arguments)}function f(){return f=(0,v.default)(b.default.mark(function t(e){return b.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,g.default)("".concat(w,"/game/pmm/teamDetail"),{method:"POST",body:e}));case 1:case"end":return t.stop()}},t)})),f.apply(this,arguments)}function l(t){return p.apply(this,arguments)}function p(){return p=(0,v.default)(b.default.mark(function t(e){return b.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,g.default)("".concat(w,"/game/pmm/invitationCode"),{method:"POST",body:e}));case 1:case"end":return t.stop()}},t)})),p.apply(this,arguments)}function d(t){return h.apply(this,arguments)}function h(){return h=(0,v.default)(b.default.mark(function t(e){return b.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,g.default)("".concat(w,"/game/pmm/betSuccess"),{method:"POST",body:e}));case 1:case"end":return t.stop()}},t)})),h.apply(this,arguments)}var y=r("mhuh"),m=r("ouCL");Object.defineProperty(e,"__esModule",{value:!0}),e.getAllTransactionList=n,e.getMyTransactionList=a,e.getStaticticsList=s,e.getAdminList=u,e.getIC=l,e.payReceipt=d;var b=m(r("rAzg")),v=m(r("jlIA")),g=(m(r("2sBs")),m(r("vLgD"))),w=(y(r("PJh5")),"");w="http://47.75.161.29:7001/api/v1"},QX4N:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("vtiu"),o=(r.n(n),r("Sydc"));r.n(o)},Re3r:function(t,e){function r(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function n(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&r(t.slice(0,0))}t.exports=function(t){return null!=t&&(r(t)||n(t)||!!t._isBuffer)}},Sydc:function(t,e){},WLft:function(t,e,r){t.exports=r("j9g7")},iFDI:function(t,e){var r={utf8:{stringToBytes:function(t){return r.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(r.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],r=0;r<t.length;r++)e.push(255&t.charCodeAt(r));return e},bytesToString:function(t){for(var e=[],r=0;r<t.length;r++)e.push(String.fromCharCode(t[r]));return e.join("")}}};t.exports=r},j9g7:function(t,e,r){r("rplX"),t.exports=self.fetch.bind(self)},jlIA:function(t,e){function r(t,e,r,n,o,a,i){try{var s=t[a](i),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}function n(t){return function(){var e=this,n=arguments;return new Promise(function(o,a){function i(t){r(c,o,a,i,s,"next",t)}function s(t){r(c,o,a,i,s,"throw",t)}var c=t.apply(e,n);i(void 0)})}}t.exports=n},mhuh:function(t,e){function r(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(t,r):{};n.get||n.set?Object.defineProperty(e,r,n):e[r]=t[r]}return e.default=t,e}t.exports=r},rplX:function(t,e,r){"use strict";function n(t){return t&&DataView.prototype.isPrototypeOf(t)}function o(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function a(t){return"string"!=typeof t&&(t=String(t)),t}function i(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return T.iterable&&(e[Symbol.iterator]=function(){return e}),e}function s(t){this.map={},t instanceof s?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function c(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function u(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function f(t){var e=new FileReader,r=u(e);return e.readAsArrayBuffer(t),r}function l(t){var e=new FileReader,r=u(e);return e.readAsText(t),r}function p(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}function d(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function h(){return this.bodyUsed=!1,this._initBody=function(t){this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:T.blob&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:T.formData&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:T.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():T.arrayBuffer&&T.blob&&n(t)?(this._bodyArrayBuffer=d(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):T.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(t)||x(t))?this._bodyArrayBuffer=d(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):T.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},T.blob&&(this.blob=function(){var t=c(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?c(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(f)}),this.text=function(){var t=c(this);if(t)return t;if(this._bodyBlob)return l(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(p(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},T.formData&&(this.formData=function(){return this.text().then(b)}),this.json=function(){return this.text().then(JSON.parse)},this}function y(t){var e=t.toUpperCase();return _.indexOf(e)>-1?e:t}function m(t,e){e=e||{};var r=e.body;if(t instanceof m){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new s(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,r||null==t._bodyInit||(r=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new s(e.headers)),this.method=y(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function b(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(n),decodeURIComponent(o))}}),e}function v(t){var e=new s;return t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(t){var r=t.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();e.append(n,o)}}),e}function g(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new s(e.headers),this.url=e.url||"",this._initBody(t)}function w(t,e){return new Promise(function(r,n){function o(){i.abort()}var a=new m(t,e);if(a.signal&&a.signal.aborted)return n(new O("Aborted","AbortError"));var i=new XMLHttpRequest;i.onload=function(){var t={status:i.status,statusText:i.statusText,headers:v(i.getAllResponseHeaders()||"")};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var e="response"in i?i.response:i.responseText;r(new g(e,t))},i.onerror=function(){n(new TypeError("Network request failed"))},i.ontimeout=function(){n(new TypeError("Network request failed"))},i.onabort=function(){n(new O("Aborted","AbortError"))},i.open(a.method,a.url,!0),"include"===a.credentials?i.withCredentials=!0:"omit"===a.credentials&&(i.withCredentials=!1),"responseType"in i&&T.blob&&(i.responseType="blob"),a.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),a.signal&&(a.signal.addEventListener("abort",o),i.onreadystatechange=function(){4===i.readyState&&a.signal.removeEventListener("abort",o)}),i.send(void 0===a._bodyInit?null:a._bodyInit)})}Object.defineProperty(e,"__esModule",{value:!0}),e.Headers=s,e.Request=m,e.Response=g,r.d(e,"DOMException",function(){return O}),e.fetch=w;var T={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};if(T.arrayBuffer)var C=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],x=ArrayBuffer.isView||function(t){return t&&C.indexOf(Object.prototype.toString.call(t))>-1};s.prototype.append=function(t,e){t=o(t),e=a(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},s.prototype.delete=function(t){delete this.map[o(t)]},s.prototype.get=function(t){return t=o(t),this.has(t)?this.map[t]:null},s.prototype.has=function(t){return this.map.hasOwnProperty(o(t))},s.prototype.set=function(t,e){this.map[o(t)]=a(e)},s.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},s.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),i(t)},s.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),i(t)},s.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),i(t)},T.iterable&&(s.prototype[Symbol.iterator]=s.prototype.entries);var _=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];m.prototype.clone=function(){return new m(this,{body:this._bodyInit})},h.call(m.prototype),h.call(g.prototype),g.prototype.clone=function(){return new g(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new s(this.headers),url:this.url})},g.error=function(){var t=new g(null,{status:0,statusText:""});return t.type="error",t};var E=[301,302,303,307,308];g.redirect=function(t,e){if(-1===E.indexOf(e))throw new RangeError("Invalid status code");return new g(null,{status:e,headers:{location:t}})};var O=self.DOMException;try{new O}catch(t){O=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack},O.prototype=Object.create(Error.prototype),O.prototype.constructor=O}w.polyfill=!0,self.fetch||(self.fetch=w,self.Headers=s,self.Request=m,self.Response=g)},vLgD:function(t,e,r){"use strict";function n(t){if(console.log(t),t.status>=200&&t.status<300)return t;var e=f[t.status]||t.statusText;s.default.error({message:"\u8bf7\u6c42\u9519\u8bef ".concat(t.status,": ").concat(t.url),description:e});var r=new Error(e);throw r.name=t.status,r.response=t,r}function o(t,e){var r={},o=(0,i.default)({},r,e);return"POST"!==o.method&&"PUT"!==o.method&&"DELETE"!==o.method||(o.body instanceof FormData?o.headers=(0,i.default)({Accept:"application/json"},o.headers):(o.headers=(0,i.default)({Accept:"application/json","Content-Type":"application/json; charset=utf-8"},o.headers),o.body=JSON.stringify(o.body)),o.headers.signed=(0,u.default)(JSON.stringify(e.body)+e.method+t)),(0,c.default)(t,o).then(n).then(function(t){return"DELETE"===o.method||t.status,t.json()}).then(function(t){return(0,i.default)({result:{}},t)}).catch(function(t){var e=(window.g_app._store.dispatch,t.name);return{errcode:e,result:{}}})}var a=r("ouCL");Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var i=a(r("+TWC"));r("QX4N");var s=a(r("Gj0I")),c=a(r("WLft")),u=(r("7xWd"),a(r("L6bb"))),f={200:"\u670d\u52a1\u5668\u6210\u529f\u8fd4\u56de\u8bf7\u6c42\u7684\u6570\u636e\u3002",201:"\u65b0\u5efa\u6216\u4fee\u6539\u6570\u636e\u6210\u529f\u3002",202:"\u4e00\u4e2a\u8bf7\u6c42\u5df2\u7ecf\u8fdb\u5165\u540e\u53f0\u6392\u961f\uff08\u5f02\u6b65\u4efb\u52a1\uff09\u3002",204:"\u5220\u9664\u6570\u636e\u6210\u529f\u3002",400:"\u53d1\u51fa\u7684\u8bf7\u6c42\u6709\u9519\u8bef\uff0c\u670d\u52a1\u5668\u6ca1\u6709\u8fdb\u884c\u65b0\u5efa\u6216\u4fee\u6539\u6570\u636e\u7684\u64cd\u4f5c\u3002",401:"\u7528\u6237\u6ca1\u6709\u6743\u9650\uff08\u4ee4\u724c\u3001\u7528\u6237\u540d\u3001\u5bc6\u7801\u9519\u8bef\uff09\u3002",403:"\u7528\u6237\u5f97\u5230\u6388\u6743\uff0c\u4f46\u662f\u8bbf\u95ee\u662f\u88ab\u7981\u6b62\u7684\u3002",404:"\u53d1\u51fa\u7684\u8bf7\u6c42\u9488\u5bf9\u7684\u662f\u4e0d\u5b58\u5728\u7684\u8bb0\u5f55\uff0c\u670d\u52a1\u5668\u6ca1\u6709\u8fdb\u884c\u64cd\u4f5c\u3002",406:"\u8bf7\u6c42\u7684\u683c\u5f0f\u4e0d\u53ef\u5f97\u3002",410:"\u8bf7\u6c42\u7684\u8d44\u6e90\u88ab\u6c38\u4e45\u5220\u9664\uff0c\u4e14\u4e0d\u4f1a\u518d\u5f97\u5230\u7684\u3002",422:"\u5f53\u521b\u5efa\u4e00\u4e2a\u5bf9\u8c61\u65f6\uff0c\u53d1\u751f\u4e00\u4e2a\u9a8c\u8bc1\u9519\u8bef\u3002",500:"\u670d\u52a1\u5668\u53d1\u751f\u9519\u8bef\uff0c\u8bf7\u68c0\u67e5\u670d\u52a1\u5668\u3002",502:"\u7f51\u5173\u9519\u8bef\u3002",503:"\u670d\u52a1\u4e0d\u53ef\u7528\uff0c\u670d\u52a1\u5668\u6682\u65f6\u8fc7\u8f7d\u6216\u7ef4\u62a4\u3002",504:"\u7f51\u5173\u8d85\u65f6\u3002"}}});