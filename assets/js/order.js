const monthMap = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
let currentDate = dayjs();
let activeDate = currentDate;

// API請求后更新
let dateSelectorData = [
  {
    date: "2023-07-01",
    status: "available",
  },
  {
    date: "2023-07-02",
    status: "half",
  },
  {
    date: "2023-07-03",
    status: "half",
  },
  {
    date: "2023-07-04",
    status: "half",
  },
  {
    date: "2023-07-05",
    status: "half",
  },
  {
    date: "2023-07-06",
    status: "available",
  },
];
// API請求后更新
let availableTime = {
  morning: ["11:00"],
  afternoon: ["12:00", "13:00", "14:00", "15:00", "16:00"],
  night: ["17:00", "18:00", "19:00", "20:00", "21:00", "21:00"],
};

// 日期选择器顶部的月和年的元素
const monthElement = $(".month-year-text");
// 上个月份箭头元素
const lastMonthElement = $(".month-year-prev");
// 下个月份箭头元素
const nextMonthElement = $(".month-year-next");
// 日期元素
const dateElement = $(".date-selector-dateItem");

const updateDate = () => {
  const firstDay = dayjs(currentDate).date(1).day();
  for (let index = 0; index < dateElement.length; index++) {
    let date;
    if (index < firstDay) {
      date = currentDate.date(1).subtract(firstDay - index, "day");
      dateElement.get(index).innerText = date.date();
      $(dateElement.get(index)).attr({
        "v-date": date.format("YYYY-MM-DD"),
      });
    } else if (index === firstDay) {
      date = currentDate;
      dateElement.get(index).innerText = "1";
      $(dateElement.get(index)).attr({
        "v-date": currentDate.date(1).format("YYYY-MM-DD"),
      });
    } else {
      date = currentDate.date(1).add(index - firstDay, "day");
      dateElement.get(index).innerText = date.date();
      $(dateElement.get(index)).attr({
        "v-date": date.format("YYYY-MM-DD"),
      });
    }
    if (date.isSame(activeDate, "day")) {
      $(dateElement.get(index)).addClass("activeDate");
    } else {
      $(dateElement.get(index)).removeClass("activeDate");
    }
    const matchDate = dateSelectorData.find(
      (item) => item.date === $(dateElement.get(index)).attr("v-date")
    );
    if (matchDate) {
      if (matchDate.status === "half") {
        $(dateElement.get(index)).addClass("halfDateStatus");
        $(dateElement.get(index)).attr({
          title: "所選日期已部分預定 - 仍可有預定時段",
        });
      } else {
        $(dateElement.get(index)).removeClass("halfDateStatus");
        $(dateElement.get(index)).attr({
          title: "選定的日期可用",
        });
      }
      $(dateElement.get(index)).removeClass("disabledDateStatus");
    } else {
      $(dateElement.get(index)).addClass("disabledDateStatus");
      $(dateElement.get(index)).removeClass("halfDateStatus");
      $(dateElement.get(index)).attr({
        title: "所選無效",
      });
    }
  }
};

// 渲染月年元素
const renderMonthYear = () => {
  monthElement.text(`${monthMap[currentDate.month()]} ${currentDate.year()}`);
  updateDate();
};
renderMonthYear();

const hanleLastMonthClick = () => {
  currentDate = currentDate.subtract(1, "month");
  renderMonthYear();
};
const hanleNextMonthClick = () => {
  currentDate = currentDate.add(1, "month");
  renderMonthYear();
};

// 给月份切换绑定事件
lastMonthElement.click(hanleLastMonthClick);
nextMonthElement.click(hanleNextMonthClick);
dateElement.click(function () {
  if ($(this).hasClass("disabledDateStatus")) return;
  activeDate = dayjs($(this).attr("v-date"));
  updateDate();
});

if (
  availableTime &&
  availableTime.morning &&
  availableTime.morning.length > 0
) {
  $(".time-selector-morning ul").html(() => {
    let result = "";
    availableTime.morning.forEach((time, index) => {
      result += `<li v-time-span="morning" v-index="${index}">${time}</li>`;
    });
    return result;
  });
}
if (
  availableTime &&
  availableTime.afternoon &&
  availableTime.afternoon.length > 0
) {
  $(".time-selector-afternoon ul").html(() => {
    let result = "";
    availableTime.afternoon.forEach((time, index) => {
      result += `<li v-time-span="afternoon" v-index="${index}">${time}</li>`;
    });
    return result;
  });
}
if (availableTime && availableTime.night && availableTime.night.length > 0) {
  $(".time-selector-night ul").html(() => {
    let result = "";
    availableTime.night.forEach((time, index) => {
      result += `<li v-time-span="night" v-index="${index}">${time}</li>`;
    });
    return result;
  });
}

let activeTimeElement;
$(".time-selectorItem ul li").click(function () {
  if (activeTimeElement) {
    activeTimeElement.removeClass("time-selectorItem__active");
  }
  activeTimeElement = $(this);
  activeTimeElement.addClass("time-selectorItem__active");
});

$(".order-submit").click(function () {
  const formData = {
    serviceDuration: $("#timeSpan option:selected").text(),
    teacher: $("#teacher option:selected").text(),
    date: activeDate.format("YYYY-MM-DD"),
    time: activeTimeElement?.text(),
    note: $("#order-note").val(),
  };
  console.log(formData);
});


// 图片查看器
const imageViewer = $(".order-time-gallery");
imageViewer.viewer({
  title: false,
});