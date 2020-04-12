
// const descriptorQuery = require('./dataFetchers/descriptorQuery');
// const typeQuery = require('./dataFetchers/typQuery');
// const focusQuery = require('./dataFetchers/focusQuery');

function descriptorFetchHandler(e) {
  let descriptorName = e.target.value;
  descriptorQuery(descriptorName)
    .then(data => {
      console.log('desc!', data);
    });
}

function typeFetchHandler(e){
  let typeName = e.target.value;
  console.log(typeName);
  typeQuery(typeName)
    .then(data => {
      console.log('type', data);
    });
}

function focusFetchHandler(e){
  let focusName = e.target.value;
  console.log(focusName);
  focusQuery(focusName)
    .then(data => {
      console.log('focus', data);
    });
}

// fetch descriptor data
$('#descriptorSelector').change(descriptorFetchHandler);

// fetch type data
$("#typeSelector").change(typeFetchHandler);

//fetch focus data
$("#focusSelector").change(focusFetchHandler);




