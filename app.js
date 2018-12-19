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

  $('.btn-submit-both').on('click', function(e){
    //values from the text entry boxes
    var $type = $('.text-entry-type').val()
    var $cost = $('.text-entry-cost').val()
    for (var keys in localStorage){
      //now you cannot overwrite the key's value 
      if (!localStorage.hasOwnProperty($type)){
        localStorage.setItem($type, $cost);
        $('.table').append(`
          <tr class="inputted`+$type+`">
            <td>`
            +$type+
            `<button class="btn-edit-type" type="button">edit</button>
            <button class="btn-delete" type="button">delete</button></button>
             </td>
            <td>`
            +$cost+
            `<button class="btn-edit-cost" type="button">edit</button>
             </td>
          </tr>
        `)
      }
    }
  });


  $('.table').on('click', '.btn-delete' ,function(e){
    //var edittext = (e.target.previousSibling.nodeValue)
    //console.log(e.target.previousSibling.previousElementSibling.previousSibling.data)
    var deleteText = (e.target.previousSibling.previousSibling.previousSibling.nodeValue)
    localStorage.removeItem(deleteText)
    var $type = $('.text-entry-type').val()
    console.log(".inputted"+$type)
    $(".inputted"+$type).remove()
  })


  // delete from local storage when delete button clicked
  // using the length property of localStorage I find out how many pairs there are
  // and using the 
  // $('.btn-delete').on('click', function(){
  //   var len = localStorage.length
  //   var key = localStorage.key(len-1)
  //   console.log('Key: '+key)
  //   localStorage.removeItem(len);
  // });

  // delete all from local storage when clicked
  $('.btn-delete-all').on('click', function(){
    localStorage.clear()
    $('.table').remove('.inputted')
  })

});

/*
  Want to create simple budgetting app
    The layout is that there are tables;
     *done
    w/in table you have item and price
     *done 
    in each cell you have save value/delete buttons
    *done
      -Under the hood;

        Before it saves check if there already is a expenditure by that name PropertyHasValue()?
        


          If it does then change the old price to the new one
        Will only save if both entry boxes are filled out
          Make sure expenditures is only string and cost is only number
        After you click save, clear the entry box?
        Need one delete button
          Have delete in expenditure side: use text field as the key for deletion and whole thing is deleted
    
    TODO:
    there is a large pie chart at the bottom color coded, (look into d3 or w/e) on how to do it 

    Step 1:
      Look into how to create tables
*/