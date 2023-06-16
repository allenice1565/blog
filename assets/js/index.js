let activeTabIndex = 1;
const menuTab = document.querySelectorAll(".menu>a");
const leftMenuItemList = document.querySelectorAll(".bodyContainer-leftItem");
const toggleMenuTab = (e) => {
  const index = e.target.dataset.index;
  if (!(index && [1, 2, 3, 4, 5].includes(Number(index)))) return;
  menuTab.forEach((item) => {
    item.classList.remove("active-tab");
    if (item.dataset.index === index) {
      item.classList.add("active-tab");
    }
  });
  leftMenuItemList.forEach((item) => {
    item.classList.remove("bodyContainer-leftItem__active");
    if (item.dataset.index === index) {
      item.classList.add("bodyContainer-leftItem__active");
    }
  });
  activeTabIndex = Number(index);
};
menuTab.forEach((tab) => {
  tab.addEventListener("click", toggleMenuTab);
});
leftMenuItemList.forEach((tab) => {
  tab.addEventListener("click", toggleMenuTab);
});

let isCollapsed = false;
const leftMenu = $(".bodyContainer-left");
const collapseBtn = $(".bodyContainer-left-collapseBtn");
collapseBtn.click(function () {
  if (!isCollapsed) {
    leftMenu.css({ "max-width": 0 });
    collapseBtn[0].innerText = ">>";
    isCollapsed = !isCollapsed;
  } else {
    leftMenu.css({
      "max-width": "500px",
    });
    collapseBtn[0].innerText = "<<";
    isCollapsed = !isCollapsed;
  }
});

const tableHead = `<tr>
<th>Herb</th>
<th>Relationship</th>
<th>Chemical</th>
</tr>`;
const tableRow = `<tr>
<td>矮地茶</td>
<td>contain</td>
<td>3.4.5-trimethoxybenzaldehyde</td>
</tr>`;
let pageSize = 10;
const generateTable = () => {
  let tableBody = "";
  for (let i = 0; i < pageSize; i++) {
    tableBody += tableRow;
  }
  return `<table border border-collapse="collapse" rules="rows"> ${tableHead}${tableBody}</table>`;
};
$(".relationshipTable-table").append(generateTable);

let totalRows = 402;

$("#totalRow").html(totalRows);

let currentPage = 1;

const setPageSize = (val) => {
  pageSize = Number(val.target.value);
  $(".relationshipTable-table").empty();
  $(".relationshipTable-table").append(generateTable);
};
$(".dropdown-menu").change(setPageSize);

layui.use(function () {
  var laypage = layui.laypage;
  // 普通用法
  laypage.render({
    elem: $(".pagination")[0],
    count: totalRows, // 数据总数
    limit:pageSize,
    jump: function(obj, first){
      // 首次不执行
      if(!first){
        // do something
      }
    }
  });
});

// create an array with nodes
var nodes = new vis.DataSet([
  { id: 0, label: "E JIAO DANG GUI HE JI", group: "level0" },
  { id: 1, label: "CHUAN XIONG" },
  { id: 2, label: "nan" },
  { id: 3, label: "ZHI GAN CAO" },
  { id: 4, label: "FU LING" },
  { id: 5, label: "nan" },
  { id: 6, label: "DANG GUI" },
  { id: 7, label: "DANG SHEN" },
  { id: 8, label: "BAI SHAO" },
]);

// create an array with edges
var edges = new vis.DataSet([
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 0, to: 3 },
  { from: 0, to: 4 },
  { from: 0, to: 5 },
  { from: 0, to: 6 },
  { from: 0, to: 7 },
  { from: 0, to: 8 },
]);

// create a network
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {
  autoResize: true,
  height: "100%",
  width: "100%",
  locale: "en",
  clickToUse: false,
  // 详细配置请查看'配置'模块，
  configure: {
    enabled: true,
    container: $(".bodyContainer-right")[0],
    showButton: false,
    filter(option, path) {
      let result = false;
      const myPath = [...path, option];
      if (myPath.length === 1) {
        return ["nodes", "edges", "physics"].includes(option);
      }
      if (myPath.length > 1) {
        if (myPath[0] === "nodes") {
          ["font"].forEach((item) => {
            if (myPath.includes(item)) {
              result = true;
            }
          });
        }
        if (myPath[0] === "edges") {
          ["dashes", "smooth"].forEach((item) => {
            if (myPath.includes(item)) {
              result = true;
            }
          });
        }
        if (myPath[0] === "physics") {
          ["enabled"].forEach((item) => {
            if (myPath.includes(item)) {
              result = true;
            }
          });
        }
      }
      return result;
    },
  },
  edges: {
    color: "#FFC0C0",
    smooth: {
      type: "cubicBezier",
    },
    width: 2,
  }, // 详细配置请查看'边'模块，
  // 详细配置请查看'节点'模块，
  nodes: {
    color: {
      background: "#FFA500",
      highlight: {
        border: "#2B7CE9",
        background: "#FFA500",
      },
    },
    shape: "dot",
    size: 10,
  },
  groups: {
    level0: {
      color: {
        background: "#FF0000",
        highlight: {
          border: "#2B7CE9",
          background: "#FF0000",
        },
      },
    },
  },
  interaction: {
    navigationButtons: true,
    keyboard: true,
  },
};

var network = new vis.Network(container, data, options);

$("#mynetwork").append(`
<div id="legend1">
	<ul class="legend">
		<li class="lili" style="width:100%;font-size: 20px;text-align: center;line-height: 30px;"> Legend </li>
		<li class="lili" style="padding-left: 12px;line-height: 26px;font-size:12px;"><div style="display:inline-block;height:14px;width: 14px;border-radius:7px;background: red "></div> Prescription</li>
		<li class="lili" style="padding-left: 12px;line-height: 26px;font-size:12px;"><div style="display:inline-block;height:14px;width: 14px;border-radius:7px;background: orange "></div> Phenotype</li>
		<li class="lili" style="padding-left: 12px;line-height: 26px;font-size:12px;"><div style="display:inline-block;height:14px;width: 14px;border-radius:7px;background: yellow "></div> Ingredients</li>
		<li class="lili" style="padding-left: 12px;line-height: 26px;font-size:12px;"><div style="display:inline-block;height:14px;width: 14px;border-radius:7px;background: green "></div> Pathway</li>
		<li class="lili" style="padding-left: 12px;line-height: 26px;font-size:12px;"><div style="display:inline-block;height:14px;width: 14px;border-radius:7px;background: cyan "></div> Composition</li>
		<li class="lili" style="padding-left: 12px;line-height: 26px;font-size:12px;"><div style="display:inline-block;height:14px;width: 14px;border-radius:7px;background: blue "></div> Chemical</li>
		<li class="lili" style="padding-left: 12px;line-height: 26px;font-size:12px;"><div style="display:inline-block;height:14px;width: 14px;border-radius:7px;background: BurlyWood   "></div> Herb</li>
		<li class="lili" style="padding-left: 12px;line-height: 26px;font-size:12px;"><div style="display:inline-block;height:14px;width: 14px;border-radius:7px;background: Brown  "></div> Plant</li>
		<li class="lili" style="padding-left: 12px;line-height: 26px;font-size:12px;"><div style="display:inline-block;height:14px;width: 14px;border-radius:7px;background: Coral  "></div> miRNA</li>
		<li class="lili" style="padding-left: 12px;line-height: 26px;font-size:12px;"><div style="display:inline-block;height:14px;width: 14px;border-radius:7px;background: Crimson  "></div> Disease</li>
		<li class="lili" style="padding-left: 12px;line-height: 26px;font-size:12px;"><div style="display:inline-block;height:14px;width: 14px;border-radius:7px;background: DarkKhaki  "></div> Gene</li>
	</ul>
</div>
`);

$('#mynetwork').append(`
      <div class="export"><img src="./assets/images/export.png" />Export</div>
`)

$('.relationshipTable-title').append(`
      <div class="export"><img src="./assets/images/export.png" />Export</div>
`)