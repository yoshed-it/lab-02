

function startApp(){
  loadData();

  // attachListeners();
}

function loadData(){

  const success = hornObj => displayPage(hornObj);
  const failure = error => console.error(error);

  $.get('data/page-1.json', 'json')
    .then(success)
    .catch(failure);
}

function displayPage(hornObj) {
  dropMenu(hornObj);
  hornObj.forEach(horn => {
    const $newHorn = $('.photo-template').clone();
    $newHorn.find('img').attr('src', horn.image_url);
    $newHorn.find('h2').text(horn.title);
    $newHorn.find('p').text(horn.description);
    $newHorn.find('.horns').text(horn.horns);
    $newHorn.removeClass('photo-template');
    $newHorn.find('select').text(horn.keyword);

    $('.hornObj').append($newHorn);

  });
}

function dropMenu(keywordList) {
  const keywordArray = [];

  keywordList.forEach((horn) => {
    if(!keywordArray.includes(horn.keyword)){
      keywordArray.push(horn.keyword);
    }
  });


  keywordArray.forEach((keywordInfo)=> {
    const $markup = `<option value="${keywordInfo}">${keywordInfo}</option>`;
    $('#drop-down-menu').append($markup);

  });


  $('#drop-down-menu').on('change', dropDownChanged);
}
function dropDownChanged(event){
  const value = $(event.target).val();
  alert(value);

}


// function attachListeners(){

//   $('option').on('change', event =>{
//     const $choice = $(event.target);
//     const value = $choice.val();

//     if(value === 'default'){
//       $('h2').not('.photo-template').show();

//     }else{
//       (value === 'keyword');
//       $('h2').hide();
//       $('h2[data-type="keyword"]').show();
//     }
//   });

// }

$(startApp);




