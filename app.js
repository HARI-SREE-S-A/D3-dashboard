// Load the GeoJSON data for the US states
const url = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson';



// Define color scale
const colorScale = d3.scaleQuantize()
  .range(['#2c3e50', '#34495e', '#7f8c8d', '#95a5a6', '#bdc3c7', '#ecf0f1']);
// Create the map container for Choropleth Map
const choroplethSvg = d3.select('#choropleth-map')
  .append('svg')
  .attr('width', '100%')
  .attr('height', '100%');

// Define the map projection for Choropleth Map
const choroplethProjection = d3.geoAlbersUsa()
  .translate([500, 300])
  .scale(500);

// Create the path generator for Choropleth Map
const choroplethPathGenerator = d3.geoPath().projection(choroplethProjection);

// Function to create the choropleth map
function createChoroplethMap() {
  d3.json(url).then(data => {
    const countries = data.features; // Accessing features directly

    // Sample data for choropleth map
    const sampleData = {
      'China': 10,
      'United States': 80,
      'India': 7,
      'Brazil': 6,
      'Russia': 50,
      // Add more sample data as needed
    };

    // Create the initial choropleth map
    const map = choroplethSvg.selectAll('path')
      .data(countries)
      .enter()
      .append('path')
      .attr('d', choroplethPathGenerator)
      .attr('fill', d => colorScale(sampleData[d.properties.name] || 0))
      .attr('stroke', '#ffff')
      .attr('stroke-width', 0.8);
  });
}


// Call the function to render the choropleth map visualization
createChoroplethMap();
