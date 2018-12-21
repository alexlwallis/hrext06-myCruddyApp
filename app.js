$(document).ready(function(){
  console.log('jQuery loaded');


  // $('.btn-submit-both').on('click', function(e){
  //   var $type = $('.text-entry-type').val()
  //   var $cost = $('.text-entry-cost').val()

  //   //Why the fuck is this a string that needs to be converted????
  //   var num = Number($cost)
  //   if (!localStorage.hasOwnProperty($type)){
  //     if (typeof $type === 'string' && typeof num === 'number'){
  //       localStorage.setItem($type, num);
  //       $('.table').append(`
  //         <tr class="inputted`+$type+`">
  //           <td>`
  //             +$type+
  //             `<button class="btn-delete" type="button">delete</button></button>
  //           </td>
  //           <td>`+$cost+`</td>
  //         </tr>
  //       `)
  //     }
  //   } else {
  //     //If you want to change the value of something already 

  //     localStorage.removeItem($type)
  //     $(".inputted"+$type).remove()
  //     if (typeof $type === 'string' && typeof num === 'number'){
  //       localStorage.setItem($type, num);
  //       $('.table').append(`
  //         <tr class="inputted`+$type+`">
  //           <td>`
  //             +$type+
  //             `<button class="btn-delete" type="button">delete</button></button>
  //           </td>
  //           <td>`+$cost+`</td>
  //         </tr>
  //       `)
  //     }
  //   }
  //   var $type = $('.text-entry-type').val('')
  //   var $cost = $('.text-entry-cost').val('')
  // });

  // //Look into finding the localStorage data and see if you can convert the key pair values
  // //into a pair

  // $('.table').on('click', '.btn-delete' ,function(e){
  //   var deleteText = e.target.previousSibling.data
  //   localStorage.removeItem(deleteText)
  //   var $type = $('.text-entry-type').val()
  //   console.log(".inputted"+deleteText)
  //   $(".inputted"+deleteText).remove()
  // })


  // $('.btn-delete-all').on('click', function(){
  //   Object.keys(localStorage).forEach(function(key){
  //     $('.inputted'+key).remove()
  //   })
  //   localStorage.clear()
  // })

  // var convert = () => {
  //   let entirety = []
  //   Object.keys(localStorage).forEach(function(key){
  //     var smallArr = []
  //     var key = key
  //     var value = (localStorage.getItem(key))
  //     smallArr.push(key, value)
  //     entirety.push(smallArr)
  //     smallArr = []
  //   })
  //   return entirety
  // }

  // $('.btn-generate-chart').on('click', function(){
  //   var chart = c3.generate({
  //   bindto: '.chart',
  //   data: {
  //     columns: convert(),
  //     type: 'pie',
  //       }
  //    })
  // })

  $(".btn-budget").on('click', function(e){
    e.preventDefault()
    var $budget = $('.budget').val()
    localStorage.setItem('budget', $budget)
  })


  $('.btn-add-more').on('click', function(e){
    e.preventDefault()
    $('.exp-list').append(`<input class="exp-types" type="text" placeholder="Expenditure type"></input>
        <input class="exp-percent" type="number" placeholder="Percentage?"></input><br>`)
  })

  $(".btn-submit").on('click', function(e){
    e.preventDefault()
    var types = document.getElementsByClassName("exp-types")
    var typesArr = []

    //TODO: look into using hasOwnProperty to stop submitting same thing over again
    // with an else that if you submit the same key w/ percent it removes old one and 

    for (var i=0; i<types.length; i++){
      if (!typesArr.includes(types[i])){
        if (types[i].value.length > 0){
          typesArr.push(types[i].value)
        }
      }
    }
    var percent = document.getElementsByClassName("exp-percent")
    var percentArr = []
    var total = 0
    for (var i=0; i<percent.length; i++){
      if (percent[i].value.length > 0){
        total+=Number(percent[i].value)
        percentArr.push(percent[i].value)
      }
    }
    if (total !== 100){
      //Mess with the formatting so that localStorage.setItem isn't called.
      console.log('The total percent must equal 100!')
    }
    var pairing = {}
    if (percentArr.length === typesArr.length){
      for (var i=0; i<percentArr.length; i++){
        pairing[typesArr[i]] = percentArr[i]
      }
    } else {
      console.log('Each field must be filled out')
    }
    localStorage.setItem('expenditures', JSON.stringify(pairing))

    //Also need to populate the dropdown menu - Needs to be within btn-submit
    function populate(){
      var str = ''
      var expendituresObj = JSON.parse(localStorage.expenditures)
      for (var key in expendituresObj){
        str+=`<option value="`+key+`">`+key+`</option>`
      }
      return str
    }
    $('.purchase-exp-types').append(populate())



    
    })

    

    //Unlike exp which adds more inputs, this adds the three pieces of 
    //data into a JSON obj and creates a key for it. It has an incrementing key
    //to deal with future keys. Then resets all fields for next us

    let value = 0
    $(".btn-purchase-submit").on('click', function(e){
      e.preventDefault()
      let obj = {}
      let $purchaseType = $(".purchase-exp-types").val()
      obj.purchaseType = $purchaseType
      let $purchaseCost = $(".purchase-cost").val()
      obj.purchaseCost = $purchaseCost
      let $purchaseComment = $(".purchase-comment").val()
      obj.purchaseComment = $purchaseComment
      let JSONobj = JSON.stringify(obj)

      localStorage.setItem('purchase'+$purchaseType+(value++), JSONobj)
      
      $(".purchase-exp-types").val('')
      $(".purchase-cost").val('')
      $(".purchase-comment").val('')
    })

    $(".btn-finish").on('click', function(e){
      e.preventDefault()
      let budget = localStorage.getItem('budget')
      let expenditures = JSON.parse(localStorage.getItem('expenditures'))
      var percents = []
      for (var keys in expenditures){
        percents.push(expenditures[keys])
      }
      var is100 = percents.reduce(function(curr, acc){
        return Number(curr)+Number(acc)
      })
      if (is100 === 100){

        let str = ''
        var expObj = {}
        $(".information").append(`<ul class="can-spend"><b>`+"Amount you can spend"+`</b></ul>`)
        for (var key in expenditures){
          var dollarAmount = budget * (expenditures[key]/100)
          expObj[key] = dollarAmount
          //TODO: Look into how you can limit it, so finished won't repeat the same stuff
          $(".can-spend").append('<li>You can spend $'+dollarAmount+' on '+key+'</li>')
        }
        var ar = []
        Object.keys(localStorage).filter(function(item){
          if (item != 'budget' && item != 'expenditures'){
            ar.push(item)
          }
        })
        let obj = {}
        for (var i=0; i<ar.length; i++){
          var ans = JSON.parse(localStorage.getItem(ar[i]))
          if (!obj.hasOwnProperty(ans["purchaseType"])){
            var old = Number(ans["purchaseCost"])
            obj[ans["purchaseType"]] = old
          } else {
            obj[ans["purchaseType"]] = Number(ans["purchaseCost"]) + (old)
          }
        }

        $(".information").append(`<ul class="have-spent"><b>`+"Amount you have to spend"+`</b></ul>`)
        for (var key in obj){
          $(".have-spent").append('<li>You have spent $'+obj[key]+' on '+key+'</li>')
        }

        $(".information").append(`<ul class="left-to-spend"><b>`+"Amount left to spend"+`</b></ul>`)
        for (var key in obj){
          $(".left-to-spend").append('<li>You have $'+(expObj[key] - obj[key])+' to spend on '+key+'</li>')
        }

       var convertActual = () => {
          let total = []
          for (var key in obj){
            let smallArr = []
            smallArr.push(key, obj[key])
            total.push(smallArr)
            smallArr = []
          }
          return total
       }

       console.log('actual: '+convertActual())

        var convertIdeal = () => {
          let total = []
          for (var key in expenditures){
            let smallArr = []
            smallArr.push(key, expenditures[key])
            total.push(smallArr)
            smallArr = []
          }
          return total
        }

        var chart = c3.generate({
        bindto: '#chartIdeal',
        data: {
          columns: convertIdeal(),
          type: 'pie',
            }
         })

        var chartOther = c3.generate({
        bindto: '#chartActual',
        data: {
          columns: convertActual(),
          type: 'pie',
            }
         })
          

      } else {
        //TODO: create dialog/alert
        console.log('Percentages must add to 100!')
      }

  




    })

    $(".btn-delete-cache").on("click", function(){
      localStorage.clear()
    })


    /*
    Finished button
      Want to calculate if the person has meet their percentage goals.
        Methodology:
          Budget in dollars
          Exp types in percent.
            so for each we do (budget * .exp-type-percent)
              This is a value we need to hold. Maybe put it in an obj?
          Add purchases up
            -???
      Then also create a d3 chart for all of this.
    */

});





/*   
   Part 2?
    More advanced

    User inputs a budget of X
      //Just get another button with type='number'
      //store like localStorage.budget = ____
    User inputs a series of expenditure types: groceries/restaurant/transportation/discretionary
      Can also say how much of budget you want each part to be.

      // So I think I'm gonna need to have the type as the key and then some sort of JSON object as a
      // value, only initially populated by the % of the budget you want it to be


      Once this is set you can input new purchases, add them to a preset tag, maybe have a comment?
        // Create dropdown menu with all the expenditure types?
        // From this we now know what key we want to add to. See if JSON object is within scope and add
        // the key value pair to the object. 

    Will need a clear all for exp-list and purchase-list
    And a clear cache too?

    Button to hit when done;
        // Similiar to the generate chart button
        // will also have a <p> which subtracts the original budget percentage against the current budget percentage
        // Can also do some more math regarding the original budget vs the current status




 Part 1

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
*/