$(document).ready(function(){
  console.log('jQuery loaded');

  // write to local storage from input when button save clicked
  var value = 0

  $('.btn-submit').on('click', function(){
    value++
    localStorage.setItem(value, $('.text-entry').val());
    var myItemInStorage = localStorage.getItem(value);

    // display the value here, displays what we put in the box
    //TODO: Need to have display change when 
    $('.list-display-field').text($('.text-entry').val()); // ??

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