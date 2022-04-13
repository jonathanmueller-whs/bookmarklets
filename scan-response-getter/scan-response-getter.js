var stats = document.getElementById('statistics');
var tbody = stats.getElementsByTagName('table')[1].tBodies[0];
var rows = tbody.rows;
var response_pages = [];


//console.log(table)
console.log(rows)

function getResponses(response_pages){
    for (var i=0; i< rows.length; i++) {
        var cells = rows[i].cells;
        var domain = document.domain;
    
        if (domain == "splunk.whitehatsec.com") {
            getUsResponsePages(cells, response_pages);      
        } else if (domain == "eu-search.prod.de.whs"){
            getEuResponsePages(cells, response_pages)
        } else {
            alert('Unrecognized domain: ' + domain + '\n')
            return false;
        } 
    }
}

function getUsResponsePages (cells,response_pages) {
  var rid = cells[1].textContent + "_" + cells[2].textContent + "_" + cells[3].textContent + "_" + cells[3].textContent
  console.log(rid)
  var view_response = "https://console.whitehatsec.com/scan_response.html?rid=" + rid
  //console.log(view_response);
  response_pages.push(view_response)
}

function getEuResponsePages (cells,response_pages) {
    var rid = cells[1].textContent + "_" + cells[2].textContent + "_" + cells[3].textContent + "_" + cells[3].textContent
    console.log(rid)
    var view_response = "https://console.whitehatsec.eu/scan_response.html?rid=" + rid
    //console.log(view_response);
    response_pages.push(view_response)
  }

function openTabs(response_pages) {
    if (response_pages.length > 0){
        for (var i=0; i < response_pages.length; i++){
            console.log(response_pages[i]);
            window.open(response_pages[i]);
          }
    } else {
        alert('No responses found.');
        return false;
    }
  
}
getResponses(response_pages)

openTabs(response_pages);