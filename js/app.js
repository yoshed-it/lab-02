

function startApp(){
  $('.page-2').hide();
  loadData();
  togglePage();
  attachListeners();
}

function loadData(){

  const success = hornObj => displayPage(hornObj);
  const failure = error => console.error(error);

  $.get('data/page-1.json', 'json')
    .then(success)
    .catch(failure);
}

function togglePage(){
  $('ul li').on('click', event => {
    const pageNum = $(event.target).data('page');
    console.log('hello', pageNum);
    showPage(pageNum);
  })
}

function showPage(pageNum){
  $('.page').hide();

  if(pageNum === 1){

    $('.page-1').show(1000);

  }else{
    $('.page-2').show(1000);

  }
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
    $newHorn.attr('data-type', horn.keyword);

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


  // $('#drop-down-menu').on('change', attachListeners);
}

function attachListeners(){

  $('select').on('change', event =>{
    const $choice = $(event.target);
    const value = $choice.val();

    console.log('value', value);
    $('section').hide();

    $(`section[data-type="${value}"]`).show();

    // console.log('select sections', $('section').attr('data-type', value));

  })
}

$(startApp);
