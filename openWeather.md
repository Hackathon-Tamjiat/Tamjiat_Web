# Example of API response

### API 호출 예시
```
https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
```

```
{
"lat": 33.44,
"lon": -94.04,
"timezone": "America/Chicago",
"timezone_offset": -21600,
"current": {
"dt": 1618317040,
"sunrise": 1618282134,
"sunset": 1618333901,
"temp": 284.07,
"feels_like": 282.84,
"pressure": 1019,
"humidity": 62,
"dew_point": 277.08,
"uvi": 0.89,
"clouds": 0,
"visibility": 10000,
"wind_speed": 6,
"wind_deg": 300,
"weather": [
{
"id": 500,
"main": "Rain",
"description": "light rain",
"icon": "10d"
}
],
"rain": {
"1h": 0.21
}
},
"minutely": [
{
"dt": 1618317060,
"precipitation": 0.205
},
...
},
"hourly": [
{
"dt": 1618315200,
"temp": 282.58,
"feels_like": 280.4,
"pressure": 1019,
"humidity": 68,
"dew_point": 276.98,
"uvi": 1.4,
"clouds": 19,
"visibility": 306,
"wind_speed": 4.12,
"wind_deg": 296,
"wind_gust": 7.33,
"weather": [
{
"id": 801,
"main": "Clouds",
"description": "few clouds",
"icon": "02d"
}
],
"pop": 0
},
...
}
"daily": [
{
"dt": 1618308000,
"sunrise": 1618282134,
"sunset": 1618333901,
"moonrise": 1618284960,
"moonset": 1618339740,
"moon_phase": 0.04,
"temp": {
"day": 279.79,
"min": 275.09,
"max": 284.07,
"night": 275.09,
"eve": 279.21,
"morn": 278.49
},
"feels_like": {
"day": 277.59,
"night": 276.27,
"eve": 276.49,
"morn": 276.27
},
"pressure": 1020,
"humidity": 81,
"dew_point": 276.77,
"wind_speed": 3.06,
"wind_deg": 294,
"weather": [
{
"id": 500,
"main": "Rain",
"description": "light rain",
"icon": "10d"
}
],
"clouds": 56,
"pop": 0.2,
"rain": 0.62,
"uvi": 1.93
},
...
},
"alerts": [
{
"sender_name": "NWS Tulsa",
"event": "Heat Advisory",
"start": 1597341600,
"end": 1597366800,
"description": "...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible.",
"tags": [
"Extreme temperature value"
]
},
...
]
```
------------
##openWeather 사이트 API 링크 입니다.

[openWeather](https://openweathermap.org/api/one-call-api#how)

------------
lat 위치의 지리 좌표(위도)

lon 위치의 지리 좌표(경도)

timezone 요청한 위치의 시간대 이름

timezone_offset UTC에서 초 단위로 이동

current 현재 날씨 데이터 API 응답

current.dt 현재 시간, 유닉스, UTC

current.sunrise 일출 시간, 유닉스, UTC

current.sunset 일몰 시간, Unix, UTC

current.temp온도. 단위 - 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨.

current.feels_like온도. 이 온도 매개변수는 날씨에 대한 인간의 인식을 설명합니다. 단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨.

current.pressure 해수면의 대기압, hPa

current.humidity 습도, %

current.dew_point물방울이 응축되기 시작하고 이슬이 형성될 수 있는 대기 온도(압력 및 습도에 따라 다름). 단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨.

current.clouds 흐림, %

current.uvi 현재 자외선 지수

current.visibility 평균 가시성, 미터

current.wind_speed바람 속도. 바람 속도. 단위 – 기본값: 미터/초, 미터법: 미터/초, 영국식: 마일/시간. 

current.wind_gust (가능한 경우) 돌풍. 단위 – 기본값: 미터/초, 미터법: 미터/초, 영국식: 마일/시간.

current.wind_deg 풍향, 도(기상)

current.rain

current.rain.1h (가능한 경우) 지난 시간 동안의 강우량, mm

current.snow

current.snow.1h (사용 가능한 경우) 지난 시간 동안의 적설량, mm

current.weather

current.weather.id 기상 조건 ID

current.weather.main 날씨 매개변수 그룹(비, 눈, 극한 등)

current.weather.description그룹 내의 기상 조건( 기상 조건의 전체 목록 ).

current.weather.icon날씨 아이콘 아이디입니다. 

minutely 분예보 날씨 데이터 API 응답

minutely.dt 예측 데이터의 시간, 유닉스, UTC

minutely.precipitation 강수량, mm

hourly 시간별 기상 데이터 API 응답

hourly.dt 예측 데이터의 시간, Unix, UTC

hourly.temp온도. 단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨. 

hourly.feels_like온도. 이것은 날씨에 대한 인간의 인식을 설명합니다. 단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨.

hourly.pressure 해수면의 대기압, hPa

hourly.humidity 습도, %

hourly.dew_point물방울이 응축되기 시작하고 이슬이 형성될 수 있는 대기 온도(압력 및 습도에 따라 다름). 단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨.

hourly.uvi 자외선 지수

hourly.clouds 흐림, %

hourly.visibility 평균 가시성, 미터

hourly.wind_speed바람 속도. 단위 – 기본값: 미터/초, 미터법: 미터/초, 영국식: 마일/시간.

hourly.wind_gust (가능한 경우) 돌풍. 단위 – 기본값: 미터/초, 미터법: 미터/초, 영국식: 마일/시간.

chourly.wind_deg 풍향, 도(기상)

hourly.pop 강수 확률

hourly.rain

hourly.rain.1h (가능한 경우) 지난 시간 동안의 강우량, mm

hourly.snow

hourly.snow.1h (사용 가능한 경우) 지난 시간 동안의 적설량, mm

hourly.weather

hourly.weather.id 기상 조건 ID

hourly.weather.main 날씨 매개변수 그룹(비, 눈, 극한 등)

hourly.weather.description그룹 내의 기상 조건( 기상 조건의 전체 목록 ). 

hourly.weather.icon날씨 아이콘 아이디입니다.

daily 일별 일기예보 데이터 API 응답

daily.dt 예측 데이터의 시간, Unix, UTC

daily.sunrise 일출 시간, 유닉스, UTC

daily.sunset 일몰 시간, Unix, UTC

daily.moonrise 이 날의 달이 뜨는 시간, Unix, UTC

daily.moonset 이 날의 달이 지는 시간, Unix, UTC

daily.moon_phase달의 위상. 0그리고 1'new moon', 0.25'first quarter moon', 0.5'full moon', 0.75'last Quarter moon'입니다. 그 사이의 기간을 각각 '왁싱 초승달', '왁싱 gibus', 'waning gibous' 및 'waning 초승달'이라고 합니다.

daily.temp단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨. 

daily.temp.morn 아침 온도.

daily.temp.day 낮 온도.

daily.temp.eve 저녁 온도입니다.

daily.temp.night 밤 온도입니다.

daily.temp.min 최소 일일 온도.

daily.temp.max 최대 일일 온도.

daily.feels_like이것은 날씨에 대한 인간의 인식을 설명합니다. 단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨.

daily.feels_like.morn 아침 온도.

daily.feels_like.day 낮 온도.

daily.feels_like.eve 저녁 온도입니다.

daily.feels_like.night 밤 온도입니다.

daily.pressure 해수면의 대기압, hPa

daily.humidity 습도, %

daily.dew_point물방울이 응축되기 시작하고 이슬이 형성될 수 있는 대기 온도(압력 및 습도에 따라 다름). 단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨.

daily.wind_speed바람 속도. 단위 – 기본값: 미터/초, 미터법: 미터/초, 영국식: 마일/시간. 

daily.wind_gust (가능한 경우) 돌풍. 단위 – 기본값: 미터/초, 미터법: 미터/초, 영국식: 마일/시간. 

daily.wind_deg 풍향, 도(기상)

daily.clouds 흐림, %

daily.uvi 당일 자외선 지수의 최대값

daily.pop 강수 확률

daily.rain (가능한 경우) 강수량, mm

daily.snow (가능한 경우) 적설량, mm

daily.weather

daily.weather.id 기상 조건 ID

daily.weather.main 날씨 매개변수 그룹(비, 눈, 극한 등)

daily.weather.description그룹 내의 기상 조건( 기상 조건의 전체 목록 ).

daily.weather.icon날씨 아이콘 아이디입니다. 

alerts 주요 국가 기상 경보 시스템의 국가 기상 경보 데이터

alerts.sender_name경고 소스의 이름입니다. 여기에서 경고 소스 의 전체 목록을 읽으십시오.

alerts.event 경고 이벤트 이름

alerts.start 경고 시작 날짜 및 시간(Unix, UTC)

alerts.end 경고 종료 날짜 및 시간(Unix, UTC)

alerts.description 경고에 대한 설명

alerts.tags 악천후의 종류

#자세한 내용은 공식 홈페이지에 가서 확인하기 바랍니다.
[openWeather 공식 One Call API](https://openweathermap.org/api/one-call-api)