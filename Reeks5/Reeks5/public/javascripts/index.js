let x,y,svg, valueline, xAxis, yAxis;
let data;



let generate_random_data = () => {
    return Array(30).fill().map((e,i)=>{return {"date": new Date(2019, 10, i), "temp": 15 + (Math.random() * 10)}});
};

let init_graph = (data) => {
    const margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    data.forEach((d) => {
        d.formatted_date = Date.parse(d.date);
    });

    x = d3.time.scale().range([0, width]);
    y = d3.scale.linear().range([height, 0]);

    x.domain(d3.extent(data, function(d) { return d.formatted_date; }));
    y.domain([0, d3.max(data, function(d) { return d.temp; })]);

    xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);

    yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

    valueline = d3.svg.line()
        .x(function (d) {
            return x(d.formatted_date);
        })
        .y(function (d) {
            return y(d.temp);
        });

    svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Temperature (°C)");
};

let updateData = (data) => {

    data.forEach(function (d) {
        d.formatted_date = Date.parse(d.date);
    });

    x.domain(d3.extent(data, function (d) {
        return d.formatted_date;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.temp;
    })]);

    let svg = d3.select("body").transition();

    svg.select(".line")
        .duration(750)
        .attr("d", valueline(data));
    svg.select(".x.axis")
        .duration(750)
        .call(xAxis);
    svg.select(".y.axis")
        .duration(750)
        .call(yAxis);
};

window.addEventListener("load", () => {
    data = [];
    init_graph(data);
    let ws = new WebSocket('ws://localhost:8080?room=bathroom');
    ws.onopen = (event) => {
        console.log("Connection opened");
        console.log(event);
    };
    ws.onmessage = (newData) => {
        console.log("Recieved Data:");
        console.log(JSON.parse(newData.data));
        for(let point of JSON.parse(newData.data)) {
            data.push(point);
        }
        updateData(data);
    };


    document.addEventListener("click", () => {
        let newPoint = {"date": new Date(2019, 10, data.length), "temp": 15 + (Math.random() * 10)};
        data.push(newPoint);
        fetch(url = 'http://localhost:3000/temperatures/bathroom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPoint)
        });
        updateData(data);
    });
});
