// Some timestamps to test with.
// Dec 26 2021 00:07:19 GMT-800
// Dec 18 2021 12:05:17 GMT-800

// Kibana date
// December 22nd 2021, 14:50:26.562
// Splunk date
// 2021-12-21 18:05:05

// December 22nd 2021, 14:50:26.562
// 2021-12-21 18:05:05
var getPingDate = prompt('\t\tEnter the Ping Date, i.e. the Kibana timestamp.\n\t\t\t\tThe format should look like this:\n\t\t\t   Month DDth YYYY, HH:MM:SS.mmm');
var getSendDate = prompt('\t\tEnter the Send Date, i.e. the Splunk timestamp.\n\t\t\t\tThe format should look like this:\n\t\t\t\t\tYYYY-MM-DD HH:MM:SS');
var month_map = {
  1:"Jan",
  2:"Feb",
  3:"Mar",
  4:"Apr",
  5:"May",
  6:"Jun",
  7:"Jul",
  8:"Aug",
  9:"Sep",
  10:"Oct",
  11:"Nov",
  12:"Dec"
};
var processedPingDate = processPingDate(getPingDate);
var processedSendDate = processSendDate(getSendDate);
var pingdate = newDate(processedPingDate);
var senddate = newDate(processedSendDate);
var difftime = diffTime(pingdate, senddate);

function readTime (seconds) {
  if (seconds === 0){
    return "00:00:00:00";
  }else if (seconds === ''){
    return "undefined";
  }else{
    var isNeg = null;
  	if (seconds < 0){
    	isNeg = true;
    	seconds = seconds * -1;
  	}else{
    	isNeg = false;
  	};
  	var sec_num = parseInt(seconds,10) / 1000;
  	var DD = Math.floor(sec_num / 86400);
  	var HH = Math.floor((sec_num - (DD * 86400)) / 3600);
  	var MM = Math.floor((sec_num - ((DD * 86400) + (HH * 3600))) / 60);
  	var SS = sec_num - ((DD * 86400) + (HH * 3600) + (MM * 60));
		
  	if (DD < 10) {DD = "0"+DD;};
  	if (HH < 10) {HH = "0"+HH;};
  	if (MM < 10) {MM = "0"+MM;};
  	if (SS < 10) {SS = "0"+SS;};
  	
  	if (isNeg){
  		return "-"+DD+":"+HH+":"+MM+":"+SS;
  	}else{
    	return DD+":"+HH+":"+MM+":"+SS;  
  	};
  };
};

function processPingDate(date_string) {
  if (date_string === ''){
    return '';
  };
  var findDate=/^\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(?:uary|ruary|ch|il|e|y|ust|tember|ober|ember)\s(\d+)[a-z]{2}\s(\d{4}),\s(\d{2}):(\d{2}):(\d{2})\.\d+/g;
  var dateTime = findDate.exec(date_string);
  var mon=dateTime[1];
  var day=dateTime[2];
  var year=dateTime[3];
  var hour=dateTime[4];
  var min=dateTime[5];
  var sec=dateTime[6];
  var offset = processOffset(new Date().getTimezoneOffset());
  var processedDate = mon + " " + day + " " + year + " " + hour + ":" + min + ":" + sec + " GMT-" + offset;
  return processedDate;
};

function processOffset(offset){
  var HH = Math.floor(offset/60);
  var MM = Math.floor(offset - (HH*60));
  if (MM == 0){
    MM = "00";
  };
  var timezone = HH + MM;
  return timezone;
};

function processSendDate(date_string) {
  if (date_string === ''){
    return '';
  };
  var findDate=/^\s*(\d{4})\-(\d{1,2})\-(\d{1,2})\s(\d+):(\d+):(\d+)/g;
  var dateTime=findDate.exec(date_string);
  var year=dateTime[1];
  var mon=month_map[dateTime[2]];
  var day=dateTime[3];
  var hour=dateTime[4];
  var min=dateTime[5];
  var sec=dateTime[6];
  var offset = processOffset(new Date().getTimezoneOffset());
  var processedDate = mon + " " + day + " " + year + " " + hour + ":" + min + ":" + sec + " GMT-" + offset;
  return processedDate;
};

function diffTime(ping, send){
  if (ping === '' || send === ''){
    return '';
  }else{
    return ping.getTime() - send.getTime();
  };
};

function newDate(date_string){
  if (date_string == ''){
    return '';
  }else{
    return new Date(date_string);
  };
};

alert("The time difference is displayed in the following format:\n\t\t\t\t   DD:HH:MM:SS\n\t\t\t\t   " + readTime(difftime));

/*
How to adjust the bookmarklet to source in code hosted remotely.
javascript:(function(){var a = document.createElement("script");a.src = "https://source.trc.whs/jonathan.mueller/Time-Differ/raw/master/time_difference.js";document.getElementsByTagName("head")[0].appendChild(a)})();
*/