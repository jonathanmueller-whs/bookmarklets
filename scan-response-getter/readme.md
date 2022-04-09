# Scan Resposne Getter

A little script to make navigating to scan_response.html pages from Splunk a little easier.

## Purpose:
Grab the slot, scan_instance, and WH_SCAN_REQUEST_ID from Splunk results, and open a new tab for the scan_response page so you can spend less time doing copy/pasta, and verifying vulns.

## Usage:
This script is intended to be used as a bookmarklet, but is dependant on using a specific Splunk query so the results in the results table meet the expected output for the script to work. 

### Sample Query
```
index=transcripts sourcetype=service_transcript source="/var/log/wh/transcripts/service_transcript/*" WH_UUID="the_uuid_you_grabbed_from_kibana"
| rex field=_raw "(?<time>^\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}:\d{2}\s[A-Z]{3})"
| table time slot instance WH_SCAN_REQUEST_ID
```


### Quirks

You will need add an exception in your pop-up blocker settings in Firefox if want this bookmarklet to work. Firefox doesn't consider calls to `window.open()` as user generated actions and will block calls to this function. If you haven't added `https://splunk.whitehatsec.com/` as exception to your pop-up blocker and the script doesn't appear to be working, this is most likely why.


## Bookmarklet
```
javascript:(function(){var a = document.createElement("script");a.src = "https://jonathanmueller-whs.github.io/time-differ/scan-response_getter.js";document.getElementsByTagName("head")[0].appendChild(a)})();
```