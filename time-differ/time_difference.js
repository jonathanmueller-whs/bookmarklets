// Kibana date
// December 22nd 2021, 14:50:26.562

// Splunk date
// 2021-12-21 18:05:05

// Date Response Header
// Fri, 29 Apr 2022 13:15:04 GMT

var getPingDate = prompt('\t\tEnter the Ping Date, i.e. the Kibana timestamp.\n\t\t\t\tThe format should look like this:\n\t\t\t   Month DDth YYYY, HH:MM:SS.mmm');
var getSendDate = prompt('\t\t\t\tEnter the Send Date.\n\nYou can enter the splunk timestamp or the value of the Date header from the response in Console. Either will work.\n\n\t\t   The Splunk format will look like this:\n\t\t\tYYYY-MM-DD HH:MM:SS TMZ\n\n\t\t The Date from Console should look like this:\n\t\t\tDay, DD Mon YYYY HH:MM:SS TMZ');
var month_map = {
  "01":"Jan",
  "02":"Feb",
  "03":"Mar",
  "04":"Apr",
  "05":"May",
  "06":"Jun",
  "07":"Jul",
  "08":"Aug",
  "09":"Sep",
  "10":"Oct",
  "11":"Nov",
  "12":"Dec"
};
var splunk_tz_map = {
  "PST":"-800",
  "PDT":"-700",
  "GMT":"-000",
  "UTC":"-000"
}
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
  var processedDate = mon + " " + day + " " + year + " " + hour + ":" + min + ":" + sec + " GMT" + offset;
  console.log(processedDate);
  return processedDate;
};

function processOffset(offset){
  var HH = Math.floor(offset/60);
  var MM = Math.floor(offset - (HH*60));
  if (MM == 0){
    MM = "00";
  };
  var timezone = (HH * -1) + MM;
  return timezone;
};

function processSendDate(date_string) {
  var splunkDate = /^\s*(\d{4})\-(\d{1,2})\-(\d{1,2})\s(\d+):(\d+):(\d+)\s([A-Z]{3})/g;
  var resDate = /^\s*[MTWFS][adehinorstu]{2,3},\s(\d+)\s([A-Za-z]+)\s(\d+)\s(\d+):(\d+):(\d+)\s([A-Z]{3})/g;
  if (splunkDate.exec(date_string)) {
    return processSplunkSendDate(date_string);
  } else if (resDate.exec(date_string)) {
    return date_string;
  } else {
    var date = new Date();
    alert("\t\t\t\tWARNING!!!\nUnrecognized timestamp. Defaulted to current date/time.\nThe time difference is inaccurate because of this.\n\t\t\t\tTimestamp Value: " + date)
    return date
  }
}

function processSplunkSendDate(date_string) {
  if (date_string === ''){
    return '';
  };
  var findDate=/^\s*(\d{4})\-(\d{1,2})\-(\d{1,2})\s(\d+):(\d+):(\d+)\s([A-Z]{3})/g;
  var dateTime=findDate.exec(date_string);
  var year=dateTime[1];
  var mon=month_map[dateTime[2]];
  var day=dateTime[3];
  var hour=dateTime[4];
  var min=dateTime[5];
  var sec=dateTime[6];
  var TZ=dateTime[7]
  var offset;
  if (TZ in splunk_tz_map) {
    offset = splunk_tz_map[TZ];
  }else{
    offset=-800
    alert("\t\t\t\tWARNING!!!\nUnrecognized Splunk timezone. Defaulted to PST.\nThe time difference may be inaccurate because of this.\n\t\t\t\tTimezone Value: " + TZ);
  }

  var processedDate = mon + " " + day + " " + year + " " + hour + ":" + min + ":" + sec + " GMT" + offset;
  console.log(processedDate);
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
