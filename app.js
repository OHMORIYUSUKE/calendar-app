const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

// APIで天気情報を取得している。
const callApi = async () => {
  let element = document.getElementById('myselect');
  console.log(element.value);
  const response = await fetch(
    "https://weather.tsukumijima.net/api/forecast/city/"+element.value
  );
  const data = await response.json();
  return data;
};

// 初期表示
window.onload = function () {
  // APIからデータを取得したら19-20行目が実行される。
  callApi().then((result) => {
    const weathersList = result.forecasts[0].telop;
    showProcess(today, weathersList);
  });
};

// 前の月表示
function prev() {
  // APIからデータを取得したら27-29行目が実行される。
  callApi().then((result) => {
    showDate.setMonth(showDate.getMonth() - 1);
    const weathersList = result.forecasts[0].telop;
    showProcess(showDate, weathersList);
  });
}

// 次の月表示
function next() {
  // APIからデータを取得したら37-39行目が実行される。
  callApi().then((result) => {
    showDate.setMonth(showDate.getMonth() + 1);
    const weathersList = result.forecasts[0].telop;
    showProcess(showDate, weathersList);
  });
}

// カレンダー表示
function showProcess(date, weathersList) {
  var year = date.getFullYear();
  var month = date.getMonth();
  document.querySelector("#header").innerHTML =
    year + "年 " + (month + 1) + "月";
  var calendar = createProcess(year, month, weathersList);
  document.querySelector("#calendar").innerHTML = calendar;
}

// カレンダー作成
function createProcess(year, month, weathersList) {
  console.log(weathersList);
  let weatherImage = "";
  switch(weathersList){
    case "曇り":
      weatherImage = "images/cloud.png";
      break;
    case "晴れ":
      weatherImage = "images/sun.png";
      break;
      default:
        weatherImage = "画像がありません";
  }
  // 曜日
  var calendar = "<table><tr class='dayOfWeek'>";
  for (var i = 0; i < week.length; i++) {
    if (i == 0) {
      calendar += "<th class='sun'>" + week[i] + "</th>";
    } else if (i == 6) {
      calendar += "<th class='sat'>" + week[i] + "</th>";
    } else {
      calendar += "<th>" + week[i] + "</th>";
    }
  }
  calendar += "</tr>";

  var count = 0;
  var startDayOfWeek = new Date(year, month, 1).getDay();
  var endDate = new Date(year, month + 1, 0).getDate();
  var lastMonthEndDate = new Date(year, month, 0).getDate();
  var row = Math.ceil((startDayOfWeek + endDate) / week.length);

  // 1行ずつ設定
  for (var i = 0; i < row; i++) {
    calendar += "<tr>";
    // 1colum単位で設定
    for (var j = 0; j < week.length; j++) {
      if (i == 0 && j < startDayOfWeek) {
        // 1行目で1日まで先月の日付を設定
        calendar +=
          "<td class='disabled'>" +
          (lastMonthEndDate - startDayOfWeek + j + 1) +
          "</td>";
      } else if (count >= endDate) {
        // 最終行で最終日以降、翌月の日付を設定
        count++;
        calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
      } else {
        // 当月の日付を曜日に照らし合わせて設定
        count++;
        if (
          year == today.getFullYear() &&
          month == today.getMonth() &&
          count == today.getDate()
        ) {
          calendar +=
            "<td class='today'>" + count + "</br>" +`<img alt="${weatherImage}" class="weatherImage" src=${weatherImage}>` + "</td>";
        } else {
          calendar += "<td>" + count + "</td>";
        }
      }
    }
    calendar += "</tr>";
  }
  return calendar;
}
// 道北　"稚内" id="011000" "旭川" id="012010" "留萌" id="012020"
// 道東　"網走" id="013010" "北見" id="013020" "紋別" id="013030" "根室" id="014010" "釧路" id="014020" "帯広" id="014030"
// 道南　"室蘭" id="015010" "浦河" id="015020"
// 道央　"札幌" id="016010" "岩見沢" id="016020" "倶知安" id="016030"
// 道南　"函館" id="017010" "江差" id="017020"