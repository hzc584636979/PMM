webpackJsonp([10],{"3Gf9":function(e,t,a){e.exports=a.p+"static/progress_bg.320dcf53.png"},"4lgU":function(e,t){e.exports={wrap:"wrap___1dL4z",title:"title___3ZckD",context:"context___2xLlX",t:"t___2Qdab",txt:"txt___38w9x",toPage:"toPage___1tPRM",desc:"desc___2fnZN",bottom:"bottom___N432l",number:"number___32sY3",progress:"progress___Hnxqj",inner:"inner___200-m"}},OIvs:function(e,t,a){e.exports=a.p+"static/progress_logo.ed9ba3f7.png"},Tctv:function(e,t,a){"use strict";var l=a("ouCL");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a("Q9dM")),s=l(a("wm7F")),o=l(a("F6AD")),r=l(a("fghW")),c=l(a("QwVp")),u=l(a("GiK3")),d=a("7xWd"),f=a("8ri3"),i=l(a("4lgU")),m=l(a("OIvs")),p=l(a("3Gf9")),g=a("oAV5"),_=function(e){function t(e){var a;return(0,n.default)(this,t),a=(0,o.default)(this,(0,r.default)(t).call(this,e)),a.getRandom=function(e,t){return Math.floor(Math.random()*(e-t+1)+t)},a.progressFunc=function(e){clearTimeout(a.pg);var t=a.state.progressPCT,l=a.getRandom(15,5);l=80-l>0?l:80-l,a.pg=setTimeout(function(){if(t<80){var e=t+l;a.setState({progressPCT:e}),a.progressFunc(a.getRandom(500,50))}else clearTimeout(a.pg),a.setState({progressPCT:100,toPageState:!0,txt:"\u52a0\u8f7d\u5b8c\u6210"})},e)},a.state={progressPCT:0,toPageState:!1,txt:"\u52a0\u8f7d\u4e2d..."},a}return(0,c.default)(t,e),(0,s.default)(t,[{key:"componentDidMount",value:function(){this.progressFunc(this.getRandom(500,50)),document.body.style.background="url(".concat(p.default,") center center no-repeat"),document.body.style.backgroundSize="100% 100%"}},{key:"componentWillUnmount",value:function(){document.body.style.background=""}},{key:"render",value:function(){var e=(0,g.getUrlOptions)().beInvitedCode;return console.log(e),u.default.createElement("div",{className:i.default.wrap},u.default.createElement("div",{className:i.default.title},u.default.createElement("img",{src:m.default})),u.default.createElement("div",{className:i.default.context},u.default.createElement("div",{className:i.default.t},u.default.createElement("span",{className:i.default.txt},"\u4e8b\u4ef6"),this.state.toPageState&&u.default.createElement(d.Link,{className:i.default.toPage,to:"/indexPage".concat(e?"?beInvitedCode=".concat(e):"")},"\u8df3\u8fc7")),u.default.createElement("div",{className:i.default.desc},u.default.createElement(f.Scrollbars,null,u.default.createElement("p",null,"\u661f\u5386536\u5e74\uff0c\u96b6\u5c5e\u4e8e\u5730\u7403\u56fd\u9645\u7684\u65e0\u9650\u6df1\u7a7a\u53f7\u6052\u661f\u7ea7\u6218\u8230\u524d\u5f80\u5916\u592a\u7a7a\u6267\u884c\u4efb\u52a1\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6218\u8230\u7684\u5f15\u64ce\u53d1\u751f\u6545\u969c\uff0c\u6218\u8230\u65e0\u6cd5\u51cf\u901f\u8f6c\u5f2f\u5e76\u8fd4\u56de\u5730\u7403\uff0c\u5728\u6f2b\u957f\u7684\u65f6\u95f4\u91cc\uff0c\u65e0\u9650\u6df1\u7a7a\u53f7\u5c06\u4f1a\u4e00\u76f4\u4ee5\u5149\u901f\u76841/100\u671d\u6f06\u9ed1\u7684\u5b87\u5b99\u6df1\u5904\u822a\u884c\u3002"),u.default.createElement("p",null,"\u4e3a\u4e86\u91cd\u8fd4\u592a\u9633\u7cfb\uff0c\u8239\u5458\u4eec\u5fc5\u987b\u4fee\u597d\u53d1\u52a8\u673a\uff0c\u4f46\u53d1\u52a8\u673a\u635f\u574f\u4e25\u91cd\uff0c\u6839\u636e\u63a8\u7b97\uff0c\u4ee5\u5f53\u524d\u7684\u901f\u5ea6\uff0c\u5728\u4fee\u597d\u53d1\u52a8\u673a\u540e\uff0c\u98de\u8239\u5185\u5269\u4f59\u7684\u71c3\u6599\u5df2\u7ecf\u4e0d\u8db3\u4ee5\u652f\u6491\u98de\u8239\u51cf\u901f\u3001\u8f6c\u5f2f\u3001\u52a0\u901f\u518d\u51cf\u901f\u7684\u8fc7\u7a0b\u3002"),u.default.createElement("p",null,"\u5373\u4f7f\u5c06\u71c3\u6599\u4e3b\u8981\u7528\u4e8e\u4e24\u6b21\u51cf\u901f\u9636\u6bb5\uff0c\u53ea\u4ee5\u6700\u4f4e\u71c3\u6599\u4f9b\u7ed9\u4e8e\u52a0\u901f\u9636\u6bb5\u4e5f\u662f\u4e0d\u53ef\u884c\u7684\uff0c\u6839\u636e\u63a8\u7b97\uff0c\u53bb\u9664\u4e24\u6b21\u51cf\u901f\u7684\u71c3\u6599\uff0c\u5269\u4f59\u7684\u71c3\u6599\u53ea\u80fd\u591f\u5c06\u98de\u8239\u52a0\u901f\u81f3\u5149\u901f\u76841/10000\uff0c\u4ee5\u8fd9\u6837\u7684\u901f\u5ea6\u8fd4\u56de\u592a\u9633\u7cfb\uff0c\u51e0\u4e4e\u662f\u4e0d\u53ef\u80fd\u7684\uff0c\u56e0\u4e3a\u6218\u8230\u7684\u51ac\u7720\u548c\u751f\u6001\u7ef4\u6301\u7cfb\u7edf\u65e0\u6cd5\u575a\u6301\u90a3\u4e48\u4e45\u7684\u65f6\u95f4\u3002"),u.default.createElement("p",null,"\u6700\u7ec8\uff0c\u7ecf\u8fc7\u5168\u4f53\u8230\u5458\u7684\u6295\u7968\uff0c\u51b3\u5b9a\u653e\u5f03\u4fee\u590d\u73b0\u6709\u53d1\u52a8\u673a\u7684\u51b3\u5b9a\uff0c\u5e76\u5c06\u8d44\u6e90\u6295\u5165\u5230\u7814\u53d1\u65b0\u578b\u661f\u8230\u53d1\u52a8\u673a\u7684\u7814\u53d1\u4e0a\u3002"),u.default.createElement("p",null,"\u4f46\u662f\uff0c\u5728\u65b0\u578b\u53d1\u52a8\u673a\u7684\u7814\u7a76\u65b9\u5411\u4e0a\uff0c\u6218\u8230\u4e0a\u5374\u4ea7\u751f\u4e86\u76f8\u5f53\u5927\u7684\u5206\u6b67\uff0c\u6709\u7684\u8230\u5458\u503e\u5411\u4e8e\u5c06\u7814\u7a76\u65b9\u5411\u671d\u6709\u4e00\u5b9a\u7406\u8bba\u57fa\u7840\u7684\u7535\u78c1\u9a71\u52a8\u5f15\u64ce\u6216\u4e2d\u5fae\u5b50\u5f15\u64ce\u53d1\u5c55\uff0c\u4e5f\u6709\u4e9b\u6781\u7aef\u7684\u8230\u5458\u5efa\u8bae\u5c06\u7814\u7a76\u65b9\u5411\u671d\u8fde\u53ef\u884c\u6027\u90fd\u6ca1\u6709\u786e\u5b9a\u7684\u66f2\u7387\u9a71\u52a8\u5f15\u64ce\u6216\u65e0\u9650\u975e\u6982\u7387\u5f15\u64ce\u53d1\u5c55\u3002"),u.default.createElement("p",null,"\u8fd9\u6837\u7684\u5206\u6b67\u6700\u7ec8\u5bfc\u81f4\u6218\u8230\u4e0d\u5f97\u4e0d\u540c\u65f6\u5c06\u7814\u7a76\u65b9\u5411\u671d\u51e0\u4e2a\u65b9\u5411\u53d1\u5c55\uff0c\u4f46\u662f\u6218\u8230\u7684\u8d44\u6e90\u6709\u9650\uff0c\u8fd9\u6837\u6bcf\u4e2a\u65b9\u5411\u5f97\u7814\u7a76\u90fd\u53d8\u7684\u5f88\u4e0d\u987a\u5229\u3002")))),u.default.createElement("div",{className:i.default.bottom},u.default.createElement("div",{className:i.default.desc},this.state.txt),u.default.createElement("div",{className:i.default.number},this.state.progressPCT,"%"),u.default.createElement("div",{className:i.default.progress},u.default.createElement("div",{className:i.default.inner,style:{WebkitClipPath:"polygon(0% 0%, ".concat(this.state.progressPCT,"% 0%, ").concat(this.state.progressPCT,"% 100%, 0% 100%)"),clipPath:"polygon(0% 0%, ".concat(this.state.progressPCT,"% 0%, ").concat(this.state.progressPCT,"% 100%, 0% 100%)")}}))))}}]),t}(u.default.Component),v=_;t.default=v}});