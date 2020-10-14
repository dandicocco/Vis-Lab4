let wealthHealth;

d3.csv('wealth-health-2014.csv', d3.autoType).then(data=>{ 

    wealthHealth = data;
    console.log('data', wealthHealth);

    d3.select('.city-count').text(function() {
        return "Number of Cities: " + wealthHealth.length}); //display Number of Cities

    //construct svg element
    const w = 700;
    const h = 550;
    const svg = d3.select('.population-plot')
                    .append('svg')
                    .attr('width', w)
                    .attr('height', h)
    
    //create datapoints
    svg.selectAll("circle")
        .data(wealthHealth)
        .enter()
        .append("circle")
        .attr('cx', (d, i) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', function(d){
            if (d.population < 1000000){
                return 4;
            } else {
                return 8;
            }
        })
        .attr("fill", "#4695eb");

    //create labels
    svg.selectAll("text")
        .data(wealthHealth)
        .enter()
        .append("text")
        .text(function(d){
            return d.country
        })
        .attr("x", function(d){
            return d.x;
        })
        .attr("y", function(d){
            return d.y-12;
        })
        .attr("text-anchor", "middle")
        .attr("font-size", 11)
        .attr("opacity", function(d){
            if (d.population < 1000000){
                return 0;
            } else {
                return 1;
            }
        })
        

})

let buildingData;

d3.csv('buildings.csv', d3.autoType).then(bData => {
		buildingData = bData;
        buildingData.sort((a, b) => b.height_ft - a.height_ft);  //sort desc

        console.log('Buildings', buildingData);

        //construct second SVG element
        const w = 500;
        const h = 500;
        let barPadding =10;
        const svg = d3.select('.building-plot')
                        .append('svg')
                        .attr('width', w)
                        .attr('height', h)

        //create bars
        svg.selectAll(".bar")
            .data(buildingData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", 200)
            .attr("y", function(d,i){
                return i * (h / buildingData.length)
            })
            .attr("width", function(d){
                return d.height_px;
            })
            .attr("height", h / buildingData.length - barPadding)
            .attr("fill", "#f29c38")
            .on("click", function(e, d){
                //change the image
                document.querySelector(".image").src = "img/"+d.image;
                //change building stats
                Height = d3.select(".height");
                Height.text(d.height_ft);
                City = d3.select(".city");
                City.text(d.city);
                Country = d3.select(".country");
                Country.text(d.country);
                Floors = d3.select(".floors");
                Floors.text(d.floors);
                Completed = d3.select(".completed");
                Completed.text(d.completed);

            });
    
        //add building names
        svg.selectAll("text.labels")
            .data(buildingData)
            .enter()
            .append("text")
            .attr("class", "labels")
            .text(function(d){
                return d.building;
            })
            .attr("x", 0)
            .attr("y", function(d,i){
                // the + 1 at the end is an aesthetic adjustment, alignment baseline though middle is not true middle
                return (i * (h / buildingData.length) + (h / buildingData.length - barPadding) / 2) + 1;
            })
            .attr("alignment-baseline", "middle")
            .attr("font-size", 13)
            .attr("font-weight", "bolder");

        //add building sizes
        svg.selectAll("text.sizes")
            .data(buildingData)
            .enter()
            .append("text")
            .attr("class", "sizes")
            .text(function(d){
                return d.height_ft + " ft";
            })
            .attr("x", function(d){
                return 150 + d.height_px;
            })
            .attr("y", function(d,i){
                // the + 1 at the end is an aesthetic adjustment, alignment baseline though middle is not true middle
                return (i * (h / buildingData.length) + (h / buildingData.length - barPadding) / 2) + 1;
            })
            .attr("alignment-baseline", "middle")
            .attr("font-size", 13)
            .attr("fill", "white");




    })


