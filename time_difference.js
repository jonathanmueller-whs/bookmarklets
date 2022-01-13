/* 
Because calculating the relative difference between timestamps in my head is too hard.

Usage:
Copy paste into the javascript console and hit run. (Yeah I know. It's ugly.)

Purpose:
Calculate the difference between two timestamps and return the result in the following format: DD:HH:MM:SS
Doesn't count miliseconds.
Dates must be entered in the following format

Mon DD YYYY HH:MM:SS GMT-OFF

Mon is the three letter abbreviation of the month.
OFF is the offset from GMT (e.g. -800 for PST).

Originally created to calculate the difference in timestamps from when a payload for Log4Shell was sent, and when the pingback was received.
*/

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
A bookmarklet for bookmarklet's sake.
javascript:(function()%7Bvar%20getPingDate%20%3D%20prompt('%5Ct%5CtEnter%20the%20Ping%20Date%2C%20i.e.%20the%20Kibana%20timestamp.%5Cn%5Ct%5Ct%5Ct%5CtThe%20format%20should%20look%20like%20this%3A%5Cn%5Ct%5Ct%5Ct%20%20%20Month%20DDth%20YYYY%2C%20HH%3AMM%3ASS.mmm')%3Bvar%20getSendDate%20%3D%20prompt('%5Ct%5CtEnter%20the%20Send%20Date%2C%20i.e.%20the%20Splunk%20timestamp.%5Cn%5Ct%5Ct%5Ct%5CtThe%20format%20should%20look%20like%20this%3A%5Cn%5Ct%5Ct%5Ct%5Ct%5CtYYYY-MM-DD%20HH%3AMM%3ASS')%3Bvar%20month_map%20%3D%20%7B1%3A%22Jan%22%2C2%3A%22Feb%22%2C3%3A%22Mar%22%2C4%3A%22Apr%22%2C5%3A%22May%22%2C6%3A%22Jun%22%2C7%3A%22Jul%22%2C8%3A%22Aug%22%2C9%3A%22Sep%22%2C10%3A%22Oct%22%2C11%3A%22Nov%22%2C12%3A%22Dec%22%7D%3Bvar%20processedPingDate%20%3D%20processPingDate(getPingDate)%3Bvar%20processedSendDate%20%3D%20processSendDate(getSendDate)%3Bvar%20pingdate%20%3D%20newDate(processedPingDate)%3Bvar%20senddate%20%3D%20newDate(processedSendDate)%3Bvar%20difftime%20%3D%20diffTime(pingdate%2C%20senddate)%3Bfunction%20readTime%20(seconds)%20%7Bif%20(seconds%20%3D%3D%3D%200)%7Breturn%20%2200%3A00%3A00%3A00%22%3B%7Delse%20if%20(seconds%20%3D%3D%3D%20'')%7Breturn%20%22undefined%22%3B%7Delse%7Bvar%20isNeg%20%3D%20nullif%20(seconds%20%3C%200)%7BisNeg%20%3D%20true%3Bseconds%20%3D%20seconds%20*%20-1%3B%7Delse%7BisNeg%20%3D%20false%3B%7D%3Bvar%20sec_num%20%3D%20parseInt(seconds%2C10)%20%2F%201000%3Bvar%20DD%20%3D%20Math.floor(sec_num%20%2F%2086400)%3Bvar%20HH%20%3D%20Math.floor((sec_num%20-%20(DD%20*%2086400))%20%2F%203600)%3Bvar%20MM%20%3D%20Math.floor((sec_num%20-%20((DD%20*%2086400)%20%2B%20(HH%20*%203600)))%20%2F%2060)var%20SS%20%3D%20sec_num%20-%20((DD%20*%2086400)%20%2B%20(HH%20*%203600)%20%2B%20(MM%20*%2060))%3Bif%20(DD%20%3C%2010)%20%7BDD%20%3D%20%220%22%2BDD%3B%7Dif%20(HH%20%3C%2010)%20%7BHH%20%3D%20%220%22%2BHH%3B%7Dif%20(MM%20%3C%2010)%20%7BMM%20%3D%20%220%22%2BMM%3B%7Dif%20(SS%20%3C%2010)%20%7BSS%20%3D%20%220%22%2BSS%3B%7Dif%20(isNeg)%7Breturn%20%22-%22%2BDD%2B%22%3A%22%2BHH%2B%22%3A%22%2BMM%2B%22%3A%22%2BSS%3B%7Delse%7Breturn%20DD%2B%22%3A%22%2BHH%2B%22%3A%22%2BMM%2B%22%3A%22%2BSS%3B%7D%3B%7D%3B%7D%3Bfunction%20processPingDate(date_string)%20%7Bif%20(date_string%20%3D%3D%3D%20'')%7Breturn%20''%3B%7D%3Bvar%20findDate%3D%2F%5E%5Cs*(Jan%7CFeb%7CMar%7CApr%7CMay%7CJun%7CJul%7CAug%7CSep%7COct%7CNov%7CDec)(%3F%3Auary%7Cruary%7Cch%7Cil%7Ce%7Cy%7Cust%7Ctember%7Cober%7Cember)%5Cs(%5Cd%2B)%5Ba-z%5D%7B2%7D%5Cs(%5Cd%7B4%7D)%2C%5Cs(%5Cd%7B2%7D)%3A(%5Cd%7B2%7D)%3A(%5Cd%7B2%7D)%5C.%5Cd%2B%2Fg%3Bvar%20dateTime%20%3D%20findDate.exec(date_string)%3Bvar%20mon%3DdateTime%5B1%5D%3Bvar%20day%3DdateTime%5B2%5D%3Bvar%20year%3DdateTime%5B3%5D%3Bvar%20hour%3DdateTime%5B4%5D%3Bvar%20min%3DdateTime%5B5%5D%3Bvar%20sec%3DdateTime%5B6%5D%3Bvar%20offset%20%3D%20processOffset(new%20Date().getTimezoneOffset())%3Bvar%20processedDate%20%3D%20mon%20%2B%20%22%20%22%20%2B%20day%20%2B%20%22%20%22%20%2B%20year%20%2B%20%22%20%22%20%2B%20hour%20%2B%20%22%3A%22%20%2B%20min%20%2B%20%22%3A%22%20%2B%20sec%20%2B%20%22%20GMT-%22%20%2B%20offset%3Breturn%20processedDate%3B%7D%3Bfunction%20processOffset(offset)%7Bvar%20HH%20%3D%20Math.floor(offset%2F60)%3Bvar%20MM%20%3D%20Math.floor(offset%20-%20(HH*60))%3Bif%20(MM%20%3D%3D%200)%7BMM%20%3D%20%2200%22%3B%7D%3Bvar%20timezone%20%3D%20HH%20%2B%20MM%3Breturn%20timezone%7D%3Bfunction%20processSendDate(date_string)%20%7Bif%20(date_string%20%3D%3D%3D%20'')%7Breturn%20''%3B%7D%3Bvar%20findDate%3D%2F%5E%5Cs*(%5Cd%7B4%7D)%5C-(%5Cd%7B1%2C2%7D)%5C-(%5Cd%7B1%2C2%7D)%5Cs(%5Cd%2B)%3A(%5Cd%2B)%3A(%5Cd%2B)%2Fg%3Bvar%20dateTime%3DfindDate.exec(date_string)%3Bvar%20year%3DdateTime%5B1%5D%3Bvar%20mon%3Dmonth_map%5BdateTime%5B2%5D%5D%3Bvar%20day%3DdateTime%5B3%5D%3Bvar%20hour%3DdateTime%5B4%5D%3Bvar%20min%3DdateTime%5B5%5D%3Bvar%20sec%3DdateTime%5B6%5D%3Bvar%20offset%20%3D%20processOffset(new%20Date().getTimezoneOffset())%3Bvar%20processedDate%20%3D%20mon%20%2B%20%22%20%22%20%2B%20day%20%2B%20%22%20%22%20%2B%20year%20%2B%20%22%20%22%20%2B%20hour%20%2B%20%22%3A%22%20%2B%20min%20%2B%20%22%3A%22%20%2B%20sec%20%2B%20%22%20GMT-%22%20%2B%20offset%3Breturn%20processedDate%3B%7D%3Bfunction%20diffTime(ping%2C%20send)%7Bif%20(ping%20%3D%3D%3D%20''%20%7C%7C%20send%20%3D%3D%3D%20'')%7Breturn%20''%3B%7Delse%7Breturn%20ping.getTime()%20-%20send.getTime()%3B%7D%3B%7D%3Bfunction%20newDate(date_string)%7Bif%20(date_string%20%3D%3D%20'')%7Breturn%20''%3B%7Delse%7Breturn%20new%20Date(date_string)%3B%7D%3B%7D%3Balert(%22The%20time%20difference%20is%20displayed%20in%20the%20following%20format%3A%5Cn%5Ct%5Ct%5Ct%5Ct%20%20%20DD%3AHH%3AMM%3ASS%5Cn%5Ct%5Ct%5Ct%5Ct%20%20%20%22%20%2B%20readTime(difftime))%7D)()*/