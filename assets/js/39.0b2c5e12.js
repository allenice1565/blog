(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{355:function(e,l,i){"use strict";i.r(l);var r=i(7),t=Object(r.a)({},(function(){var e=this,l=e._self._c;return l("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[l("h2",{attrs:{id:"遇到的问题-解决方案"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#遇到的问题-解决方案"}},[e._v("#")]),e._v(" 遇到的问题 && 解决方案")]),e._v(" "),l("ol",[l("li",[e._v("相同页面下，切换标签后，不同标签的 Viewer 实例的 update 方法没有起作用\n"),l("ul",[l("li",[e._v("这个可能是和 Viewer.js 内部实现有关，同一个页面不同地方使用 Viewer 会互相产生影响")]),e._v(" "),l("li",[e._v("由于不能改变页面设计，只能改变实现方式，于是尝试将 Viewer 抽离出来，两个标签共用一个 viewer，然而又会有其他问题。（忘了什么问题了）")]),e._v(" "),l("li",[e._v("最后采用的"),l("strong",[e._v("方案")]),e._v("是，抽离 Viewer，两个标签共用一个 viewer，同时，不采用循环渲染 img 标签，而是只采用一个 img 标签，然后动态替换 img 标签的 url 实现。")])])]),e._v(" "),l("li",[e._v("Viewer 有图片放大缩小的需求，采用 zoom 方法，在滚轮放大缩小的时候会导致图片中心偏移\n禁用 zoom 功能，在配置项里面有 zoomable，置为 false 就好了。然后放大缩小采用 scale 来进行，用一个变量控制 scale 的值，同时监听 wheel 事件，在发生滚动时，控制 scale 的值，并更新图片的 scale")]),e._v(" "),l("li",[e._v("采用自定义的 toolBar 会部分遮挡住图片上方，需要往下偏移 toolBar 的高度一半\n"),l("ul",[l("li",[e._v("在 Viewer 配置项里面定义 viewed 事件，在这里操作图片元素，margin 值增加 toolBar 高度的一半")]),e._v(" "),l("li",[e._v("在旋转后，也要处理，将图片往下偏移")]),e._v(" "),l("li",[e._v("这样处理的缺陷就是图片打开时的动画从小到大，等动画结束后，再向下偏移，整体不连贯，不能做到先偏移，再有放大动画")]),e._v(" "),l("li",[e._v("最后是将打开的过渡动画关闭掉")])])])])])}),[],!1,null,null,null);l.default=t.exports}}]);