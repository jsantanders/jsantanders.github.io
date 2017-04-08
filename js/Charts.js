// Load Charts and the corechart package.
google.charts.load('current', {'packages':['corechart']});
// Draw the pie chart  when Charts is loaded.
google.charts.setOnLoadCallback(drawFrameworkChart);

// Draw the pie chart for the Lenguage when Charts is loaded.
google.charts.setOnLoadCallback(drawLenguages);
//
google.charts.setOnLoadCallback(drawTools);

function drawTools() {
    // Create the data table .
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Tools');
    data.addColumn('number', 'Ability');
    data.addRows([
        ['Visual Studio', 50],
        ['WebStorm', 20],
        ['Pycharm', 20],
        ['Sublime Text', 10]
    ]);
    // Set options for framework pie chart.
    var options = {
        title:'Tools that I used most',
        pieHole: 0.4,
        chartArea : { left: "1%" },
        height: 240,
        titleTextStyle: { color: '#4B4650', fontName: 'Fira Sans', fontSize: '16' },
    };
    // Instantiate and draw the chart for framework.
    var chart = new google.visualization.PieChart(document.getElementById('tools'));
    chart.draw(data, options);
}

// Callback that draws the pie chart .
function drawFrameworkChart() {
    // Create the data table .
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Frameworks');
    data.addColumn('number', 'Ability');
    data.addRows([
        ['ASP MVC', 75],
        ['Django', 20],
        ['AngularJS', 5]
    ]);

    // Set options for Sarah's pie chart.
    var options = {
        title:'Web Frameworks that I used most',
        pieHole: 0.4,
        chartArea : { left: "1%" },
        height: 240,
        titleTextStyle: { color: '#4B4650', fontName: 'Fira Sans', fontSize: '16' },
    };

    // Instantiate and draw the chart .
    var chart = new google.visualization.PieChart(document.getElementById('frameworks'));
    chart.draw(data, options);
}

// Callback that draws the pie chart for Lenguage.
function drawLenguages() {

    // Create the data table for Lenguage.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Languages');
    data.addColumn('number', 'Ability');
    data.addRows([
        ['C#', 25],
        ['JavaScript', 25],
        ['HTML/CSS', 25],
        ['Python', 15],
        ['CoffeeScript', 5],
        ['F#', 5]
    ]);
    // Set options for Language pie chart.
    var options = {
        title:'Languages that I used most',
        pieHole: 0.4,
        chartArea : { left: "1%" },
        height: 240,
        width: 350,
        titleTextStyle: { color: '#4B4650', fontName: 'Fira Sans', fontSize: '16' },
    };
    // Instantiate and draw the chart for Lenguage.
    var chart = new google.visualization.PieChart(document.getElementById('languages'));
    chart.draw(data, options);
}
