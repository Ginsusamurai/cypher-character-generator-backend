function descriptorFetchHandler(e) {
  let descriptorName = e.target.value;
  console.log(descriptorName);
}

function typeFetchHandler(e){
  let typeName = e.target.value;
  console.log(typeName);
}

function focusFetchHandler(e){
  let focusName = e.target.value;
  console.log(focusName);
}

// fetch descriptor data
$('#descriptorSelector').change(descriptorFetchHandler);

// fetch type data
$("#typeSelector").change(typeFetchHandler);

//fetch focus data
$("#focusSelector").change(focusFetchHandler);




