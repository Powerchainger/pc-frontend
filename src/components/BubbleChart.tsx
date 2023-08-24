// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import {style} from "d3";


interface BubbleData {
    name: string;
    value: number;
}

//colors for the bubbles, need to do this dynamically later
const colors = ["#cc3300", "#ff8c66", "#999900", "#ffff80", "#1a651a", "#5dd55d"]
const colors2 = ["#5dd55d", "#1a651a", "#ffff80", "#999900", "#ff8c66", "#cc3300",]

const BubbleChart = ({ data }: { data: BubbleData[] }) => {

    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const svg = d3.select(ref.current);
        const svgDom = ref.current;

        if (!svgDom) {
            return;
        }

        // Clear svg children
        svg.selectAll("*").remove();

        const { width, height } = svgDom.getBoundingClientRect();

        // Create a layout first
        const pack = d3.pack().size([width, height]).padding(0.5);

        // Create a root node
        const root = d3.hierarchy({ children: data })
            .sum((d: any) => d.value)
            .sort((a, b) => b.value! - a.value!);

        // Adjust scale for radius to match data values
        const maxValue = Math.max(...data.map(d => d.value));
        const radiusScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([0, Math.min(width, height) / 2]);

        // Adjust radius values
        root.each(d => d.r = radiusScale(d.value));

        const sortData = (data: BubbleData[]) => {
            //create dictionary object to store data in
            let dict: {} = {}

            //fill dict with device data
            data.forEach((element) => {if(element.value !== 0) {dict[element.name] = element.value}})

            // sort and return dict
            let entries: {} = Object.entries(dict)
            return entries.sort((x,y) => x[1] - y[1]);
        }
        const createColorDict = (data: {}) => {
            let colorDict: {} = {}

            //set colors for each device
            for (let i: number =0; i< data.length; i++) {
                let name: string = data[i][0]
                colorDict[name] = colors2[i]
            }

            //hardcode largest user to red
            colorDict[Object.keys(colorDict)[Object.keys(colorDict).length -1]] = "red"

            return colorDict
        }
        const getColor = (name: String) => {
            //create device color dict
            let colorDict = createColorDict(sortData(data))
            //return color corresponding with device name
            return colorDict[name]
        }

        const getText = (value:number) => {
            if (value === 0) {
                return '0px'
            } else {
                return '25px'
            }
        }

        // Create bubbles and assign data
        const node = svg.selectAll(".node")
            .data(pack(root).leaves())
            .enter().append("g")
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        // Add circle for each node
        node.append("circle")
            .attr("r", 0)  // start at 0
            .style("fill", d => getColor(d.data.name))
            .on("click", d => {
                alert(`You clicked on ${d.data.name}`);
            })
            .on("mouseenter", d => d3.selectAll("text").style("font-size",d => getText(d.data.value)))
            .on("mouseleave", d=> d3.selectAll("text").style("font-size", d => `${d.r * 0.2}px`))
            .transition()  // start a transition
            .duration(1000)  // for 1 second
            .attr("r", d => d.r);  // grow the radius to its final size

        // Add text for each node
        node.append("text")
            .text(d => d.data.name)
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .style("font-size", d => `${d.r * 0.2}px`)
            .on("mouseenter", d => d3.selectAll("text").style("font-size",d => getText(d.data.value)))
            .on("mouseleave", d=> d3.selectAll("text").style("font-size", d => `${d.r * 0.2}px`));




        // Add background circles for watt values and labels
        // const wattValues = [250, 500, 1000];
        // const maxBubbleRadius = Math.max(...node.data().map(d => d.r));
        // wattValues.forEach(watt => {
        //     const r = (watt / Math.max(...wattValues)) * maxBubbleRadius;
        //     svg.append("circle")
        //         .attr("cx", width / 2)
        //         .attr("cy", height / 2)
        //         .attr("r", r)
        //         .style("fill", "none")
        //         .style("stroke", "gray")
        //         .style("stroke-dasharray", "2,2");
        //     svg.append("text")
        //         .attr("x", width / 2)
        //         .attr("y", height / 2 - r - 5)
        //         .text(`${watt} watts`)
        //         .style("fill", "gray")
        //         .style("opacity", 0.7)
        //         .style("font-size", "12px");
        // });

        function dragstarted(event, d) {
            d3.select(this).raise();
            d.x = event.x;
            d.y = event.y;
        }

        function dragged(event, d) {
            d.x = event.x;
            d.y = event.y;
            d3.select(this)
                .attr("transform", `translate(${d.x},${d.y})`);
        }

        function dragended(event, d) {
            d.x = event.x;
            d.y = event.y;
        }
    }, [data]);

    return <svg ref={ref as React.Ref<SVGSVGElement>} style={{ height: "500px", width: "100%" }} />;
};

export default BubbleChart;
