/* eslint-disable no-undef */

function startApp(){
  loadData();

  attachListeners();
}

function loadData(){

  const success = hornPic => displayPage(hornPic);
  const failure = error => console.error(error);

  $.get('data/page-1.json', 'json')
    .then(success)
    .catch(failure);
}

function displayPage(hornPic) {
  hornPic.forEach(horn => {
    const $newHorn = $('.photo-template').clone();
    $newHorn.find('img').attr('src', horn.image_url);
    $newHorn.find('h2').text(horn.title);
    $newHorn.find('p').text(horn.description);
    $newHorn.find('.horns').text(horn.horns);
    $newHorn.removeClass('photo-template');
    $newHorn.find('select').text(horn.keyword);
   
    
    $('.hornPic').append($newHorn);
    
    
  });
}
let dropdown = $('#drop-down-menu');
dropdown.empty();

dropdown.append('<option selected="true" disabled> Choose Something');
dropdown.prop('selectedIndex', 0);

const url = 'data/page-1.json';
$.getJSON(url, function (data){
    $.each(data, function (key, entry) {
        dropdown.append($('<option></option>').attr('value', entry.default).text(entry.keyword));
    });
});
    








function attachListeners(){

  $('option').on('change', event =>{
    const $choice = $(event.target);
    const value = $choice.val();
    
    if(value === 'default'){
      $('h2').not('.photo-template').show();
    
    }else{
        (value === 'keyword');
        $('h2').hide();
        $('h2[data-type="keyword"]').show();
    }
  });

}
    
$(startApp);
