const url = 'https://gentle-ridge-36425.herokuapp.com/'
$(document).ready(function () {

$.get(url)
  .then(displayNick)
  .then(updateNick)
  .then(deleteNick)
  .then(searchNick)
  .then(newNick)
})

function newNick(){
  $('.saveLog-btn').click(function() {
    event.preventDefault();
    let logObject = {
      date: $('.day').val(),
      time: $('.time').val(),
      situation: $('.situation').val(),
      scale: $('.scale').val(),
    }
    $.post(url, logObject)
    window.location.reload();
  });
}

function searchNick(){
  $('.findLog-btn').click(function() {
    event.preventDefault();
    let id = '1'
    $('.log').empty();
    id = $('.findLog').val()
    $.get(url + id)
      .then(displayAttitude);
  });
}

function deleteNick(data){
  $('.delete-btn').click(function(event) {

    let id = event.target.id
    $.ajax({
      url: url + id,
      method: 'DELETE',
      success: function(){
        console.log('success');
      }
    })
    $.get(url)
    .then(displayNick)
    .then(function() {
        window.location.reload();
    })
  })

}

function updateNick(data) {
  $('.edit-btn').click(function(event) {
      const id = event.target.id

    $.get(url)
    .then(function(data) {
      const editButtons = document.querySelector('.edit-btn')
      const id = event.target.id

      for (var i = 0; i < data.length; i++) {
        if (id == data[i].id) {
          return $('.edit-situation').text(data[i].situation) &&
          $('.edit-day').val(data[i].date.slice(0,10)) &&
          $('.edit-time').val(data[i].time) &&
          $('.edit-scale').val(data[i].scale)
        }
      }

    })

    $('.editLog-btn').click(function() {
      $('.log').empty();
      let editObject = {
        date: $('.edit-day').val(),
        time: $('.edit-time').val(),
        situation: $('.edit-situation').val(),
        scale: $('.edit-scale').val(),
      }
      $.ajax({
        url: url + id,
        method: 'PUT',
        data: editObject
      })
      $.get(url)
      .then(displayNick)
      .then(function() {
          window.location.reload();
      })
    })
  })
}

function displayAttitude(attitudeData){
    let badDate = attitudeData.date;
    let newDate = badDate.slice(0,10);
    let date = newDate.split('-');
    let scale = '';
    let badTime = attitudeData.time;
    let timeSlice = badTime.slice(0,2);
    let time = '';
    let day = attitudeData.date.slice(8,10);
    let dayClass = ''
    let currentDate = attitudeData.date.slice(0,10)


    if(attitudeData.scale > 7) {
      scale = '😃'
    } else if(attitudeData.scale >= 5 && attitudeData.scale <= 7) {
      scale = '😑'
    } else if(attitudeData.scale >= 2 && attitudeData.scale <= 4) {
      scale ='😡'
    } else {
      scale = '🦇💩'
    }

    if(parseInt(timeSlice) < 12 && parseInt(timeSlice) !== 0) {
      time = attitudeData.time.slice(0,5) + " am"
    } else if(parseInt(timeSlice) === 0){
      time = '12' + attitudeData.time.slice(2,5) + ' am'
    } else if (parseInt(timeSlice - 12) < 10) {
      time = '0' + parseInt(timeSlice - 12) + attitudeData.time.slice(2,5) + " pm"
    } else {
      time = parseInt(timeSlice - 12) + attitudeData.time.slice(2,5) + " pm"
    }


      return  $('.log').append(
          `<div class="show date"> <h4>${date[1]}-${date[2]}-${date[0]}</h4></div>
          <div class="show">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#nick">
              ${time}
            </button>

            <div class="modal fade" id="nick" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">${date[1]}-${date[2]}-${date[0]} ${attitudeData.time} </h5>
                  </div>
                  <div class="modal-body summary">
                    Summary
                  </div>
                  <div class="modal-body">
                    ${attitudeData.situation}
                  </div>
                  <div class="modal-body attitude">
                    Attitude
                  </div>
                  <div class="modal-body emoji">
                    ${scale}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>`
        )
    }


function displayNick(logData){
  let firstDate = ''
  for (var i = 0; i < logData.length; i++) {
    let badDate = logData[i].date;
    let newDate = badDate.slice(0,10);
    let date = newDate.split('-');
    let scale = '';
    let badTime = logData[i].time;
    let timeSlice = badTime.slice(0,2);
    let time = '';
    let day = logData[i].date.slice(8,10);
    let dayClass = ''
    let currentDate = logData[i].date.slice(0,10)


    if(logData[i].scale > 7) {
      scale = '😃'
    } else if(logData[i].scale >= 5 && logData[i].scale <= 7) {
      scale = '😑'
    } else if(logData[i].scale >= 2 && logData[i].scale <= 4) {
      scale ='😡'
    } else {
      scale = '🔪😐'
    }

    if(parseInt(timeSlice) < 12 && parseInt(timeSlice) !== 0) {
      time = logData[i].time.slice(0,5) + " am"
    } else if(parseInt(timeSlice) === 0){
      time = '12' + logData[i].time.slice(2,5) + ' am'
    } else if (parseInt(timeSlice - 12) < 10) {
      time = '0' + parseInt(timeSlice - 12) + logData[i].time.slice(2,5) + " pm"
    } else {
      time = parseInt(timeSlice - 12) + logData[i].time.slice(2,5) + " pm"
    }



    if(firstDate != currentDate) {
      firstDate = currentDate
      $('.log').append(
        `<div class="show date"> <h4>${date[1]}-${date[2]}-${date[0]}</h4></div>`
      )
    }
        $('.log').append(
          `<div class="show">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#nick${[i]}">
               ${time}
            </button>

            <div class="modal fade" id="nick${[i]}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">${date[1]}-${date[2]}-${date[0]} ${logData[i].time} </h5>

                    <button id=${logData[i].id} type="button" class="edit-btn btn btn-primary edit" data-toggle="modal" data-target="#edit">
                      edit
                    </button>

                  </div>
                  <div class="modal-body summary">
                    Summary
                  </div>
                  <div class="modal-body">
                    ${logData[i].situation}
                  </div>
                  <div class="modal-body attitude">
                    Attitude
                  </div>
                  <div class="modal-body emoji">
                    ${scale}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button id="${logData[i].id}" type="button" class=" delete-btn btn btn-primary">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>`
        )
    }
  }
