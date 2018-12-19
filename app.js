$(document).ready(function(){
  console.log('jQuery loaded');


  $('.btn-submit-both').on('click', function(e){
    var $type = $('.text-entry-type').val()
    var $cost = $('.text-entry-cost').val()

    //Why the fuck is this a string that needs to be converted????
    var num = Number($cost)
    if (!localStorage.hasOwnProperty($type)){
      if (typeof $type === 'string' && typeof num === 'number'){
        localStorage.setItem($type, num);
        $('.table').append(`
          <tr class="inputted`+$type+`">
            <td>`
              +$type+
              `<button class="btn-delete" type="button">delete</button></button>
            </td>
            <td>`+$cost+`</td>
          </tr>
        `)
      }
    } else {
      //If you want to change the value of something already 

      localStorage.removeItem($type)
      $(".inputted"+$type).remove()
      if (typeof $type === 'string' && typeof num === 'number'){
        localStorage.setItem($type, num);
        $('.table').append(`
          <tr class="inputted`+$type+`">
            <td>`
              +$type+
              `<button class="btn-delete" type="button">delete</button></button>
            </td>
            <td>`+$cost+`</td>
          </tr>
        `)
      }
    }
    var $type = $('.text-entry-type').val('')
    var $cost = $('.text-entry-cost').val('')
  });

  //Look into finding the localStorage data and see if you can convert the key pair values
  //into a pair

  $('.table').on('click', '.btn-delete' ,function(e){
    var deleteText = (e.target.previousSibling.data)
    //var deleteText = (e.target.previousSibling.previousSibling.previousSibling.nodeValue)
    localStorage.removeItem(deleteText)
    var $type = $('.text-entry-type').val()
    console.log(".inputted"+deleteText)
    $(".inputted"+deleteText).remove()
  })


  $('.table').on('click', '.btn-edit-type' ,function(e){
   
  })


  $('.btn-delete-all').on('click', function(){
    Object.keys(localStorage).forEach(function(key){
      $('.inputted'+key).remove()
    })
    localStorage.clear()
  })

  var convert = () => {
    let entirety = []
    Object.keys(localStorage).forEach(function(key){
      var smallArr = []
      var key = key
      var value = (localStorage.getItem(key))
      smallArr.push(key, value)
      entirety.push(smallArr)
      smallArr = []
    })
    return entirety
  }

  $('.btn-generate-chart').on('click', function(){
    var chart = c3.generate({
    bindto: '.chart',
    data: {
      columns: convert(),
      type: 'pie',
        }
     })
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