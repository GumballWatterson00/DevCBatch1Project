$(document).ready(() => {
  $('#districtSelect').on('change', () => {
    var districtId = $('.district:selected').val();

    var wardElement = $('#wardSelect');
    $.get(`http://localhost:8080/api/wards?district_id=${districtId}`, (resp) => {
        wardElement.empty();
        wardElement.append('<option value="0">-- Chọn Phường --</option>');
        for (const ward of resp.wards) {
            wardElement.append(`<option class="ward" value="${ward._id}">${ward.name}</option>`)
        }
    })
  })

  $('#submit-btn').on('click', () => {
      var districtId = $('.district:selected').text();  
      var wardId = $('.ward:selected').text();  
      var type = $('.property:selected').text();
      var bedroom = +$('#bedroom').val();
      var area = +$('#area').val();
      const data = {bedroom, area, districtId, wardId, type}
      // $.post('http://localhost:5000/predict', data, (resp) => {
      //     $('#result').empty();
      //     $('#result').append(resp.result);
      // })

      $.ajax({
        url: 'http://localhost:5000/predict',
        type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
              $('#result').empty();
              $('#result').append(Math.round(data.result * 100)/100);
            },
        data: JSON.stringify(data)
      })
  })
})