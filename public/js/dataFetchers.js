'use strict';

function descriptorQuery(descriptorName){
  return new Promise((resolve,reject) => {
    let queryUrl = `${window.location.href}descriptor/${descriptorName}`;
    $.ajax({
      url: queryUrl,
      type: 'GET',
      dataType:'json',
      success: function(result){
        console.log('herm', result);
        resolve(result);
      },
      error: function(request,error)
      {
        alert('desc', error);
        reject(error);
      }
    });
  });
}

function focusQuery(focusName){
  return new Promise((resolve,reject) => {
    let queryUrl = `${window.location.href}focus/${focusName}`;
    $.ajax({
      url: queryUrl,
      type: 'GET',
      dataType:'json',
      success: function(result){
        resolve(result);
      },
      error: function(request,error)
      {
        alert('focus', error);
        reject(error);
      }
    });
  });
}


function typeQuery(typeName){
  return new Promise((resolve,reject) => {
    let queryUrl = `${window.location.href}type/${typeName}`;
    $.ajax({
      url: queryUrl,
      type: 'GET',
      dataType:'json',
      success: function(result){
        resolve(result);
      },
      error: function(request,error)
      {
        alert('type',error);
        reject(error);
      }
    });
  });
}

