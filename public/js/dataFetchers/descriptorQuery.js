'use strict';

function descriptorQuery(descriptorName){

  let queryUrl = `${window.location.href}descriptor/${descriptorName}`;


  $.ajax({
    url: queryUrl, 
    type: 'GET',
    dataType:'json',
    success: function(result){
      result.forEach(object => {
        for (let key in object) {
          if (object.hasOwnProperty(key)) {
            document.getElementById('addHere').append(`<p>${key}:${object[key]}`);
          }
        }
      });
    },
    error: function(request,error)
    {
      alert('oops', request, error);
    }
  });

}

module.exports = descriptorQuery;

