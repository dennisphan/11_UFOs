// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
};

// 1. Create a variable to keep track of all the filters as an object.
var filters = []; // keep all the values
var elementIDs = []; //track element IDs
// 3. Use this function to update the filters. 
function updateFilters() {

  // 4a. Save the element that was changed as a variable.
  let date = d3.select("#datetime");
  let city = d3.select("#city");
  let country = d3.select("#country");
  let state = d3.select("#state");
  let shape = d3.select("#shape");

  let idArray = [date, city, country, state, shape];
  // 4b. Save ID of the element and the value that was changed as a variable.
  for (let i = 0; i < idArray.length; i++) {
    if (idArray[i].property("value")) {
      filters.push(idArray[i].property("value"));
      elementIDs.push(idArray[i].property("id"));
    };
  };
     
  // 6. Call function to apply all filters and rebuild the table
  filterTable(filters, elementIDs, tableData); 
  // console.log(filters);
}

// 7. Use this function to filter the table when data is entered.
function filterTable(filters, elementIDs, tableData) {

  // 8. Set the filtered data to the tableData.
  let filteredData = tableData;
  

  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  for (var i = 0; i < filters.length; i++) {
    console.log("before");
    console.log(filters[i]);
    console.log(elementIDs[i]);
    
    // Filter data using filters
    filteredData = filteredData.filter(row => row[elementIDs[i]] === filters[i]);
  };
  
  // 10. Finally, rebuild the table using the filtered data
  buildTable(filteredData);
  filters = [];
  elementIDs = [];
};
  
// 2. Attach an event to listen for changes to each filter
d3.selectAll('input').on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);