$(document).ready(() => {
    $('#graphDistrict').on('change', () => {
        var districtId = $('.district:selected').val();

        $.get(`http://localhost:8080/api/wards?district_id=${districtId}`, (resp) => {
            var wardList = [];
            var values = [];
            for (const ward of resp.wards) {
                wardList.push(ward.name);
                values.push(ward.value.toFixed(2));
            }

            myChart.data.labels = wardList;
            myChart.data.datasets[0].data = values;
            myChart.update();
        })
    })

    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: "Giá nhà theo từng khu vực (triệu đồng/m2)",
                data: [],
                borderColor: "#3e95cd",
                backgroundColor: "rgba(118,152,255,0.8)"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'triệu đồng/m2'
                  }
                }]
              }    
        },
    });

});