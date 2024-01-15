// script.js
$(document).ready(function () {
    var ctx = document.getElementById('myChart').getContext('2d');

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Temperature (°C)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    data: [],
                    fill: false,
                },
                {
                    label: 'Humidity (%)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    data: [],
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    max: 100,
                    min: 0,
                },
            },
        },
    });

    // Fetch data every 10 seconds
    setInterval(function () {
        fetchData();
    }, 10000);

    function fetchData() {
        $.ajax({
            url: 'https://api.thingspeak.com/channels/2403348/feeds.json?results=10&api_key=QZFVQ0AW4SZ4BK9Y',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.feeds.length > 0) {
                    var labels = data.feeds.map(function (feed) {
                        return feed.entry_id;
                    });
                    var temperatureData = data.feeds.map(function (feed) {
                        return parseFloat(feed.field1);
                    });
                    var humidityData = data.feeds.map(function (feed) {
                        return parseFloat(feed.field2);
                    });

                    chart.data.labels = labels;
                    chart.data.datasets[0].data = temperatureData;
                    chart.data.datasets[1].data = humidityData;
                    chart.update();
                }
            },
            error: function (error) {
                console.log('Error fetching data:', error);
            }
        });
    }
});
