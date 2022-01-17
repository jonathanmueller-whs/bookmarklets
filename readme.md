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
`YYYY-MM-DD HH:MM:SS TMZ`


Steps:
1. Click the bookmarklet.
2. Paste the Kibana time stamp into the prompt and hit enter.
3. Paste the Splunk time stamp into the prompt and hit enter.
4. Profit...

### Quirks

- Leading spaces can break the script.
- Pressing `Cancel` instead of `OK` in the prompts can cause the script to fail, or generate an error in the DOM (particularly in Kibana pages.)
- Splunk time stamps are only in Pacific time. Be sure to include the timezone from the Splunk timestamp, PST or PDT (represented above as `TMZ`), otherwise the script may error out.



## Bookmarklet
```
javascript:(function(){var a = document.createElement("script");a.src = "https://jonathanmueller-whs.github.io/time-differ/time_difference.js";document.getElementsByTagName("head")[0].appendChild(a)})();
```