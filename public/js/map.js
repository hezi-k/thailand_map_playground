console.log(d3)

let width = 960,
    height = 500,
    centered;

Promise.all([
    d3.json("thailand.json"),
    d3.csv("coordinates.csv")
]).then( ([mapData ,coordinates]) => {
    createMap(mapData, coordinates)
})

function createMap(mapData, coordinates) {
    console.log(mapData)
    console.log(coordinates)

    let projection = d3.geoMercator()
        .translate([250, 250])
        .scale(1700)

    let path = d3.geoPath()
        .projection(projection)

    // Set svg width & height
    let svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);

    let g = svg.append('g');

    let mapLayer = g.append('g')
        .classed('map-layer', true);

    console.log(path.area(mapData.features[0]))

    mapLayer.selectAll('path')
        .data(mapData.features)
        .enter().append('path')
        .attr('d', path)
        .attr('vector-effect', 'non-scaling-stroke')

    /*
    mapLayer.selectAll("path").data(mapData.features)
        .enter().append("path")
        .attr("d", path)


    d3.select("svg")
        .selectAll("path")
        .data(mapData.features)
        .enter()
        .append("path")
            .attr("d", function(d) { return path(d) })
            .attr("stroke-width", 1)
            .attr("stroke", "252525")
     */
}