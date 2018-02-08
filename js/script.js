google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var dweetName = '234ca5068fb7bdee';
    $.ajax({
        url: 'https://dweet.io:443/get/latest/dweet/for/' + dweetName,
        dataType: 'json',
        success:function(data){
            if(data.this == 'succeeded'){
                console.log(data.with[0].content);
                var data = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],
                  ['Humidity', data.with[0].content.humidity],
                  ['Temp', data.with[0].content.temp]
                ]);
                var options = {
                    height: 500,
                    min: 0, max: 40,
                    greenFrom: 0, greenTo: 20,
                    yellowFrom:20, yellowTo: 35,
                    redFrom: 35, redTo: 40,
                    minorTicks: 5
                };
                 var chart = new google.visualization.Gauge(document.getElementById('chartLocation'));
                 chart.draw(data, options);

            } else {
                $('#chartLocation').empty().append("<h2>Cannot get data from Dweet</h2>");
            }
        },
        error:function(error){
            console.log(error);
            console.log('something went wrong');
        }
    })
}

setInterval(function() {
    drawChart();
}, 10000);
