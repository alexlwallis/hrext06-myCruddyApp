$(document).ready(function(){
  console.log('jQuery loaded');

  // write to local storage from input when button save clicked
  // var value = 0

  // $('.btn-submit').on('click', function(){
  //   value++
  //   localStorage.setItem(value, $('.text-entry').val());
  //   var myItemInStorage = localStorage.getItem(value);
  //   $('.list-display-field').text($('.text-entry').val()); // ??
  // });

  $('.btn-submit-both').on('click', function(){
    //value++
    var $type = $('.text-entry-type').val()
    var $cost = $('.text-entry-cost').val()
    localStorage.setItem($type, $cost);
    $('.table').append(`
      <tr>
        <td>`+$type+`</td>
        <td>`+$cost+`</td>
      </tr>
    `)
    //localStorage.setItem(value, $('.text-entry').val());
    //$('.list-display-field').text($('.text-entry').val()); // ??
  });

  // delete from local storage when delete button clicked
  // using the length property of localStorage I find out how many pairs there are
  // and using the 
  $('.btn-delete').on('click', function(){
    var len = localStorage.length
    var key = localStorage.key(len-1)
    localStorage.removeItem(len);


    // Now when item is deleted from localStorage the list-display-field updates
    // to show the prior item

    if (len > 0){
      $('.list-display-field').text(key);
    } else {
      $('.list-display-field').text('')
    }

  });

  // delete all from local storage when clicked
  $('.btn-delete-all').on('click', function(){
    localStorage.clear()
  })

});

/*
  Want to create simple budgetting app
    The layout is that there are tables; w/in table you have item and price and
    there are buttons to add more tables, delete item/price etc, and there is a
    large pie chart at the bottom color coded, (look into d3 or w/e) on how to
    do it 

    Step 1:
      Look into how to create tables
*/