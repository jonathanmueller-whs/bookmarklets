var s = prompt("Search for Vuln Id's"),
    findVulnIds = /(?:^|\D)(\d{7,8})(?:\D|$)/g,
    match = findVulnIds.exec(s),
    vulns = [];

while (match) {
    vulns.push(match[1]);
    findVulnIds.lastIndex = match.index + 1;
    match = findVulnIds.exec(s);
};
if (vulns!=null&&vulns.length>0){
    document.location = "https://console.whitehatsec.com/vuln_search.html?vid="+vulns.toString()+"&action=Search+by+ID&vulns_per_page=all";
};