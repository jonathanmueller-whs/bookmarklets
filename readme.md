# Time Differ

...because calculating difference between timestamps in my head is too hard.

## Purpose:
Calculate the difference between two timestamps and return the result in the following format: 

`DD:HH:MM:SS`

Where `DD` is the number of days between timestamps, `HH` is the number of hours, `MM` is minutes, and `SS` is seconds.

If the value is negative, it means that the second time stamp occured after the first.

The script doesn't count miliseconds.

## Usage:
This script is intended to be used as a bookmarklet. Clicking on it will initiate a series of prompts followed by an alert displaying the difference between time stamps entered.

The first prompt will ask you to enter a time stamp from Kibana in the following format:
`Month DDth YYYY, HH:MM:SS.mmm`
The milliseconds aren't part of the calculation, but the regex does match on them, so if you omit them the script will break.

The second prompt will ask you to enter a time stamp from Splunk in the following format:
`YYYY-MM-DD HH:MM:SS`

Steps:
1. Click the bookmarklet.
2. Paste the Kibana time stamp into the prompt and hit enter.
3. Paste the Splunk time stamp into the prompt and hit enter.
4. Profit...

### Quirks

- Leading spaces can break the script.
- Pressing `Cancel` instead of `OK` in the prompts can cause the script to fail, or generate an error in the DOM (Particularly in Kibana pages.)
- Splunk time stamps are only in PST. The script determines the timezone based on time offset used by the browser. This can cause the the results to vary if the time zones represented in Kibana and splunk are not consistent.



## Bookmarklet
```
javascript:(function()%7Bvar%20getPingDate%20%3D%20prompt('%5Ct%5CtEnter%20the%20Ping%20Date%2C%20i.e.%20the%20Kibana%20timestamp.%5Cn%5Ct%5Ct%5Ct%5CtThe%20format%20should%20look%20like%20this%3A%5Cn%5Ct%5Ct%5Ct%20%20%20Month%20DDth%20YYYY%2C%20HH%3AMM%3ASS.mmm')%3Bvar%20getSendDate%20%3D%20prompt('%5Ct%5CtEnter%20the%20Send%20Date%2C%20i.e.%20the%20Splunk%20timestamp.%5Cn%5Ct%5Ct%5Ct%5CtThe%20format%20should%20look%20like%20this%3A%5Cn%5Ct%5Ct%5Ct%5Ct%5CtYYYY-MM-DD%20HH%3AMM%3ASS')%3Bvar%20month_map%20%3D%20%7B1%3A%22Jan%22%2C2%3A%22Feb%22%2C3%3A%22Mar%22%2C4%3A%22Apr%22%2C5%3A%22May%22%2C6%3A%22Jun%22%2C7%3A%22Jul%22%2C8%3A%22Aug%22%2C9%3A%22Sep%22%2C10%3A%22Oct%22%2C11%3A%22Nov%22%2C12%3A%22Dec%22%7D%3Bvar%20processedPingDate%20%3D%20processPingDate(getPingDate)%3Bvar%20processedSendDate%20%3D%20processSendDate(getSendDate)%3Bvar%20pingdate%20%3D%20newDate(processedPingDate)%3Bvar%20senddate%20%3D%20newDate(processedSendDate)%3Bvar%20difftime%20%3D%20diffTime(pingdate%2C%20senddate)%3Bfunction%20readTime%20(seconds)%20%7Bif%20(seconds%20%3D%3D%3D%200)%7Breturn%20%2200%3A00%3A00%3A00%22%3B%7Delse%20if%20(seconds%20%3D%3D%3D%20'')%7Breturn%20%22undefined%22%3B%7Delse%7Bvar%20isNeg%20%3D%20nullif%20(seconds%20%3C%200)%7BisNeg%20%3D%20true%3Bseconds%20%3D%20seconds%20*%20-1%3B%7Delse%7BisNeg%20%3D%20false%3B%7D%3Bvar%20sec_num%20%3D%20parseInt(seconds%2C10)%20%2F%201000%3Bvar%20DD%20%3D%20Math.floor(sec_num%20%2F%2086400)%3Bvar%20HH%20%3D%20Math.floor((sec_num%20-%20(DD%20*%2086400))%20%2F%203600)%3Bvar%20MM%20%3D%20Math.floor((sec_num%20-%20((DD%20*%2086400)%20%2B%20(HH%20*%203600)))%20%2F%2060)var%20SS%20%3D%20sec_num%20-%20((DD%20*%2086400)%20%2B%20(HH%20*%203600)%20%2B%20(MM%20*%2060))%3Bif%20(DD%20%3C%2010)%20%7BDD%20%3D%20%220%22%2BDD%3B%7Dif%20(HH%20%3C%2010)%20%7BHH%20%3D%20%220%22%2BHH%3B%7Dif%20(MM%20%3C%2010)%20%7BMM%20%3D%20%220%22%2BMM%3B%7Dif%20(SS%20%3C%2010)%20%7BSS%20%3D%20%220%22%2BSS%3B%7Dif%20(isNeg)%7Breturn%20%22-%22%2BDD%2B%22%3A%22%2BHH%2B%22%3A%22%2BMM%2B%22%3A%22%2BSS%3B%7Delse%7Breturn%20DD%2B%22%3A%22%2BHH%2B%22%3A%22%2BMM%2B%22%3A%22%2BSS%3B%7D%3B%7D%3B%7D%3Bfunction%20processPingDate(date_string)%20%7Bif%20(date_string%20%3D%3D%3D%20'')%7Breturn%20''%3B%7D%3Bvar%20findDate%3D%2F%5E%5Cs*(Jan%7CFeb%7CMar%7CApr%7CMay%7CJun%7CJul%7CAug%7CSep%7COct%7CNov%7CDec)(%3F%3Auary%7Cruary%7Cch%7Cil%7Ce%7Cy%7Cust%7Ctember%7Cober%7Cember)%5Cs(%5Cd%2B)%5Ba-z%5D%7B2%7D%5Cs(%5Cd%7B4%7D)%2C%5Cs(%5Cd%7B2%7D)%3A(%5Cd%7B2%7D)%3A(%5Cd%7B2%7D)%5C.%5Cd%2B%2Fg%3Bvar%20dateTime%20%3D%20findDate.exec(date_string)%3Bvar%20mon%3DdateTime%5B1%5D%3Bvar%20day%3DdateTime%5B2%5D%3Bvar%20year%3DdateTime%5B3%5D%3Bvar%20hour%3DdateTime%5B4%5D%3Bvar%20min%3DdateTime%5B5%5D%3Bvar%20sec%3DdateTime%5B6%5D%3Bvar%20offset%20%3D%20processOffset(new%20Date().getTimezoneOffset())%3Bvar%20processedDate%20%3D%20mon%20%2B%20%22%20%22%20%2B%20day%20%2B%20%22%20%22%20%2B%20year%20%2B%20%22%20%22%20%2B%20hour%20%2B%20%22%3A%22%20%2B%20min%20%2B%20%22%3A%22%20%2B%20sec%20%2B%20%22%20GMT-%22%20%2B%20offset%3Breturn%20processedDate%3B%7D%3Bfunction%20processOffset(offset)%7Bvar%20HH%20%3D%20Math.floor(offset%2F60)%3Bvar%20MM%20%3D%20Math.floor(offset%20-%20(HH*60))%3Bif%20(MM%20%3D%3D%200)%7BMM%20%3D%20%2200%22%3B%7D%3Bvar%20timezone%20%3D%20HH%20%2B%20MM%3Breturn%20timezone%7D%3Bfunction%20processSendDate(date_string)%20%7Bif%20(date_string%20%3D%3D%3D%20'')%7Breturn%20''%3B%7D%3Bvar%20findDate%3D%2F%5E%5Cs*(%5Cd%7B4%7D)%5C-(%5Cd%7B1%2C2%7D)%5C-(%5Cd%7B1%2C2%7D)%5Cs(%5Cd%2B)%3A(%5Cd%2B)%3A(%5Cd%2B)%2Fg%3Bvar%20dateTime%3DfindDate.exec(date_string)%3Bvar%20year%3DdateTime%5B1%5D%3Bvar%20mon%3Dmonth_map%5BdateTime%5B2%5D%5D%3Bvar%20day%3DdateTime%5B3%5D%3Bvar%20hour%3DdateTime%5B4%5D%3Bvar%20min%3DdateTime%5B5%5D%3Bvar%20sec%3DdateTime%5B6%5D%3Bvar%20offset%20%3D%20processOffset(new%20Date().getTimezoneOffset())%3Bvar%20processedDate%20%3D%20mon%20%2B%20%22%20%22%20%2B%20day%20%2B%20%22%20%22%20%2B%20year%20%2B%20%22%20%22%20%2B%20hour%20%2B%20%22%3A%22%20%2B%20min%20%2B%20%22%3A%22%20%2B%20sec%20%2B%20%22%20GMT-%22%20%2B%20offset%3Breturn%20processedDate%3B%7D%3Bfunction%20diffTime(ping%2C%20send)%7Bif%20(ping%20%3D%3D%3D%20''%20%7C%7C%20send%20%3D%3D%3D%20'')%7Breturn%20''%3B%7Delse%7Breturn%20ping.getTime()%20-%20send.getTime()%3B%7D%3B%7D%3Bfunction%20newDate(date_string)%7Bif%20(date_string%20%3D%3D%20'')%7Breturn%20''%3B%7Delse%7Breturn%20new%20Date(date_string)%3B%7D%3B%7D%3Balert(%22The%20time%20difference%20is%20displayed%20in%20the%20following%20format%3A%5Cn%5Ct%5Ct%5Ct%5Ct%20%20%20DD%3AHH%3AMM%3ASS%5Cn%5Ct%5Ct%5Ct%5Ct%20%20%20%22%20%2B%20readTime(difftime))%7D)()*/
```