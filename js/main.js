// تحديد العناصر HTML للاستخدام لاحقًا  
let mainCard = document.querySelector("#card1"); // البطاقة الرئيسية لعرض حالة الطقس الحالية  
let secCard = document.querySelector("#card2"); // البطاقة الثانية لعرض حالة الطقس ليوم غد  
let thirdCard = document.querySelector("#card3"); // البطاقة الثالثة لعرض حالة الطقس لليوم الذي يلي غد  
let currentDate = new Date(); // الحصول على التاريخ الحالي  
let day = currentDate.getDate(); // الحصول على رقم اليوم  
let month = currentDate.getMonth(); // الحصول على رقم الشهر  
let year = currentDate.getFullYear(); // الحصول على السنة الحالية  
let dayOfWeek = currentDate.getDay(); // الحصول على رقم يوم الأسبوع  
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // أسماء أيام الأسبوع  
let dayName = daysOfWeek[dayOfWeek]; // اسم اليوم الحالي  
let day2 = daysOfWeek[(dayOfWeek + 1) % 7]; // اسم اليوم التالي  
let day3 = daysOfWeek[(dayOfWeek + 2) % 7]; // اسم اليوم بعد التالي  
let monthNumber = currentDate.getMonth(); // الحصول على رقم الشهر الحالي  
let monthNames = [  
    "January", "February", "March", "April",  
    "May", "June", "July", "August",  
    "September", "October", "November", "December"  
]; // أسماء الأشهر  
let monthName = monthNames[monthNumber]; // اسم الشهر الحالي  

// دالة لجلب وعرض الطقس الحالي  
async function CurrentWeather(res) {  
    let blackBox = ""; // متغير لتخزين المحتوى HTML  
    blackBox += `<div class="header-custom-light card-header d-flex justify-content-between">  
                <div class="day">${dayName}</div>  
                <div class="date">${day} ${monthName}</div>  
              </div>  
              <div class="body-custom-light card-body ">  
                <h5 class="card-title ">${res.location.name}</h5>  
                <div class="card-text">  
                    <!-- قسم عرض درجة الحرارة -->  
                    <div class="degree d-flex justify-content-between ">  
                        <h1>${res.current.temp_c}<sub class="sub-top">o</sub>C</h1>  
                        <img src="${res.current.condition.icon}" alt="weather icon">  
                    </div>  
                    <p class="weatherCondition ">${res.current.condition.text}</p>  
                    <span class="px-2"><img src="images/icon-umberella@2x.png" alt=""> ${res.forecast.forecastday[0].day.daily_chance_of_rain}% </span>  
                    <span class="px-2"><img src="images/icon-wind@2x.png" alt=""> ${res.current.wind_kph}km/h </span>  
                    <span class="px-2"><img src="images/icon-compass@2x.png" alt=""> ${res.current.wind_dir} </span>  
                </div>  
              </div>`;  

    mainCard.innerHTML = blackBox; // إدراج المحتوى في البطاقة الرئيسية  
}  

// دالة لعرض حالة الطقس لليوم التالي  
async function secondWeather(res) {  
    let blackBox = ""; // متغير لتخزين المحتوى HTML  
    blackBox += `<div class="header-custom-dark card-header d-flex justify-content-center">  
            <div class="day">${day2}</div>  
          </div>  
          <div class="body-custom-dark card-body text-center ">  
            <div class="cardImg">  
            <img src="${res.forecast.forecastday[1].day.condition.icon}" alt="">  
          </div>  
          <div class="degreeAfter">  
            <h4>${res.forecast.forecastday[1].day.maxtemp_c}<sub class="sub-top">o</sub>C</h4>  
          </div>  
          <small>${res.forecast.forecastday[1].day.mintemp_c}<sub class="sub-top">o</sub></small>  
          <p class="weatherCondition">${res.forecast.forecastday[1].day.condition.text}</p>  
          </div>`;  
    
    secCard.innerHTML = blackBox; // إدراج المحتوى في البطاقة الثانية  
}  

// دالة لعرض حالة الطقس لليوم الذي يلي غد  
async function thirdWeather(res) {  
    let blackBox = ""; // متغير لتخزين المحتوى HTML  
    blackBox += `<div class="header-custom-light card-header d-flex justify-content-center">  
                <div class="day">${day3}</div>  
              </div>  
              <div class="body-custom-light2 card-body text-center  ">  
                <div class="cardImg">  
                <img src="${res.forecast.forecastday[2].day.condition.icon}" alt="">  
              </div>  
              <div class="degreeAfter">  
                <h4>${res.forecast.forecastday[2].day.maxtemp_c}<sub class="sub-top">o</sub>C</h4>  
              </div>  
              <small>${res.forecast.forecastday[2].day.mintemp_c}<sub class="sub-top">o</sub></small>  
              <p class="weatherCondition">${res.forecast.forecastday[2].day.condition.text}</p>  
              </div>`;  
    
    thirdCard.innerHTML = blackBox; // إدراج المحتوى في البطاقة الثالثة  
}  

// دالة لجلب بيانات الطقس من API  
async function fetchProcess(x) {  
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bdb8207a8b9c41beb24175721232812&q=${x ? x : "egypt"}&days=3&aqi=no&alerts=no`); // جلب بيانات الطقس مع تعيين البلد الافتراضي إلى "مصر"  
    let res = await data.json(); // تحويل البيانات إلى تنسيق JSON  
    console.log(res); // تسجيل النتائج في وحدة التحكم  
    await CurrentWeather(res); // استدعاء دالة عرض الطقس الحالي  
    await secondWeather(res); // استدعاء دالة عرض الطقس لليوم التالي  
    await thirdWeather(res); // استدعاء دالة عرض الطقس لليوم الذي يلي غد  
}  

// إضافة مستمع حدث لزر البحث لجلب بيانات الطقس عند النقر  
let searchBtn = document.getElementById("searchBtn").addEventListener('click', () => {  
    let country = document.getElementById("countrySearch").value; // الحصول على قيمة بحث البلد  
    fetchProcess(country); // استدعاء دالة fetchProcess لإحضار بيانات الطقس  
});  

// إضافة مستمع حدث لمدخل البحث لجلب بيانات الطقس عند إدخال اسم بلد  
let input = document.getElementById("countrySearch").addEventListener('input', () => {  
    let country = document.getElementById("countrySearch").value; // الحصول على قيمة البحث عند الكتابة  
    fetchProcess(country); // استدعاء دالة fetchProcess لإحضار بيانات الطقس  
});