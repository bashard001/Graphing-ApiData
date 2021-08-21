
async function graphData() {
    const gData = await getData()
    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: gData.xLables,
            datasets: [{
                label: 'Global Average Temp in C',
                data: gData.yData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function getData() {
    let xLables = [];
    let yData = [];
    const response = await fetch("ZonAnn.Ts+dSST.csv")
    const data = await response.text()
    console.log(data)

    const table = data.split("\n").slice(1)

    table.forEach(r => {
        const cols = r.split(',')
        const year = cols[0]
        xLables.push(year)
        const temp = cols[1]
        yData.push(parseFloat(temp) + 14)
        console.log(year, temp)
    })
    return { xLables, yData }
}


graphData()
