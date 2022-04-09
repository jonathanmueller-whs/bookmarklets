var stats = document.getElementById('statistics');
var tbody = stats.getElementsByTagName('table')[1].tBodies[0];
var rows = tbody.rows;
var response_pages = [];


//console.log(table)
console.log(rows)

for (var i=0; i< rows.length; i++) {
	var cells = rows[i].cells
  getResponsePages(cells, response_pages)
  
}

function getResponsePages (cells,response_pages) {
  var rid = cells[1].textContent + "_" + cells[2].textContent + "_" + cells[3].textContent + "_" + cells[3].textContent
  console.log(rid)
  var view_response = "https://console.whitehatsec.com/scan_response.html?rid=" + rid
  //console.log(view_response);
  response_pages.push(view_response)
}

function openTabs(response_pages) {
  for (var i=0; i < response_pages.length; i++){
    console.log(response_pages[i]);
    window.open(response_pages[i]);
  }
}

openTabs(response_pages);