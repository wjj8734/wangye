(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/zhouWei-navBar/index"],{"7b0e":function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}));var r=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__get_style([t.navBgColor?{backgroundImage:t.navBgColor}:{},{paddingTop:t.statusBarHeight+"px",color:t.navFontColor,opacity:t.transparentValue}]));t.$mp.data=Object.assign({},{$root:{s0:e}})},a=[]},"88fa":function(t,n,e){"use strict";var o=e("a2c8"),r=e.n(o);r.a},"92dc":function(t,n,e){"use strict";e.r(n);var o=e("7b0e"),r=e("f77d");for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);e("88fa");var i,s=e("f0c5"),l=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=l.exports},a2c8:function(t,n,e){},d3fa:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=["pages/home/home","pages/my/my","pages/demo/common","pages/template/common","pages/apiDemo/common"],o="/pages/demo/common",r=["#FFF","#fff","#FFFFFF","#ffffff","white","rgb(255,255,255)","rgba(255,255,255,1)"],a={props:{backState:{type:[String,Number],default:function(){return 1e3}},homeState:{type:[String,Number],default:function(){return 2e3}},bgColor:{type:[String,Array],default:function(){return"#FFFFFF"}},bgColorAngle:{type:[String,Number],default:function(){return 90}},fontColor:{type:String,default:function(){return"#000000"}},titleCenter:{type:Boolean,default:function(){return!0}},title:{type:String,default:function(){return""}},type:{type:String,default:function(){return"fixed"}},transparentFixedFontColor:{type:String,default:function(){return"#000000"}},scrollTop:{type:Number,default:function(){return 0}},shadow:{type:Boolean,default:function(){return!0}}},data:function(){return{firstPage:!1,transparentValue:1,navTitle:"",navFontColor:"#000000",navBgColor:"",navTransparentFixedFontColor:"#000000",statusBarHeight:0,lastFrontColor:"",themeBgColorName:""}},computed:{back:function(){return 1e3==this.backState||3e3==this.backState},home:function(){return 1e3==this.homeState},navFixed:function(){return"transparentFixed"==this.type||"fixed"==this.type},navShadow:function(){return!(!this.bgColor||"string"!=typeof this.bgColor)&&(this.shadow&&"transparent"!==this.type&&r.includes(this.bgColor))},isWhite:function(){return r.includes(this.navFontColor)},isTwoBtn:function(){return(1e3==this.backState||3e3==this.backState)&&1e3==this.homeState&&!this.firstPage}},watch:{title:function(t){this.navTitle=t},fontColor:function(t){this.navFontColor=t,this.settingColor()},bgColor:function(t){this.getNavBgColor(t)},transparentFixedFontColor:function(t){this.navTransparentFixedFontColor=t},scrollTop:function(t){this.pageScroll({scrollTop:t})}},created:function(){this.navTitle=this.title,this.navFontColor=this.fontColor,this.getNavBgColor(this.bgColor),this.navTransparentFixedFontColor=this.transparentFixedFontColor,this.statusBarHeight=t.getSystemInfoSync()["statusBarHeight"];this.pageScroll({scrollTop:this.scrollTop});var n=getCurrentPages(),o=n.length;1!=o||e.includes(n[0].route)||(this.firstPage=!0)},methods:{onBackPage:function(){3e3==this.backState?this.$emit("backClick"):t.navigateBack()},onBackHome:function(){3e3==this.homeState?this.$emit("homeClick"):t.reLaunch({url:o})},pageScroll:function(t){"transparentFixed"==this.type&&(t.scrollTop&&t.scrollTop>0?t.scrollTop>180?this.transparentValue=1:this.transparentValue=t.scrollTop/180:this.transparentValue=0,this.settingColor())},getNavBgColor:function(t){if("string"==typeof t)"transparent"==this.type?this.navBgColor="":-1===t.indexOf("#")?(this.themeBgColorName=t,this.navBgColor=""):this.navBgColor="linear-gradient(90deg,"+t+","+t+")";else if(Array.isArray(t)&&t.length>=2){var n="linear-gradient("+this.bgColorAngle+"deg";t.forEach((function(t){"string"==typeof t?n+=","+t:"object"==typeof t&&(n+=","+t.color+" "+t.scale)})),n+=")",this.navBgColor=n}},settingColor:function(){var n=this,e=this.navFontColor;"transparentFixed"==this.type&&this.transparentValue<=.5&&(e=this.navTransparentFixedFontColor);var o="#000000";r.includes(e)&&(o="#ffffff"),this.lastFrontColor!=o&&setTimeout((function(){n.lastFrontColor=o,t.setNavigationBarColor({frontColor:o,backgroundColor:"#FFFFFF"})}),150)}}};n.default=a}).call(this,e("543d")["default"])},f77d:function(t,n,e){"use strict";e.r(n);var o=e("d3fa"),r=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/zhouWei-navBar/index-create-component',
    {
        'components/zhouWei-navBar/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("92dc"))
        })
    },
    [['components/zhouWei-navBar/index-create-component']]
]);
