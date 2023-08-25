// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import {style} from "d3";


interface BubbleData {
    name: string;
    value: number;
}

//colors for the bubbles, need to do this dynamically later
const colors = ["#89CFF0", "#A1CAF1", "#91A3B0", "#6A5ACD", "#778899", "#708090"];

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

        const getTextSize = (text) => {
            const temporaryText = svg.append("text").text(text).style("opacity", 0);
            const size = temporaryText.node().getBBox();
            temporaryText.remove();
            return size;
        };

        const getColor = (index: number) => {
            return colors[index % colors.length];
        }


        const getText = (value:number) => {
            if (value === 0) {
                return '0px'
            } else {
                return '25px'
            }
        }

        // Create bubbles and assign data
        // Create bubbles and assign data
        const node = svg.selectAll(".node")
            .data(pack(root).leaves())
            .enter().append("g")
            .attr("transform", d => `translate(${d.x},${d.y})`)

        // Add circle for each node
        node.append("circle")
            .attr("r", 0)  // start at 0
            .style("fill", (d, i) => getColor(i))
            .on("click", d => {
                alert(`You clicked on ${d.data.name}`);
            })
            .transition()  // start a transition
            .duration(1000)  // for 1 second
            .attr("r", d => d.r);  // grow the radius to its final size

        node.each(function (d) {
            const g = d3.select(this);
            const r = d.r; // Get the radius from the current data
            const text = d.data.name;
            const textSize = getTextSize(text); // Function to determine text size

            if (r > textSize.width / 2) {
                // Text fits inside the bubble
                g.append("text")
                    .attr("x", 0)
                    .attr("y", 0)
                    .text(text)
                    .style("text-anchor", "middle")
                    .style("fill", "black");
            } else {
                // Text doesn't fit, so draw outside with line
                const angle = -Math.PI / 4;
                const lineLength = r + textSize.width; // you can adjust this
                const x1 = r * Math.cos(angle);
                const y1 = r * Math.sin(angle);
                const x2 = lineLength * Math.cos(angle);
                const y2 = lineLength * Math.sin(angle);

                g.append("line")
                    .attr("x1", x1)
                    .attr("y1", y1)
                    .attr("x2", x2)
                    .attr("y2", y2)
                    .style("stroke", "black");

                g.append("text")
                    .attr("x", x2)
                    .attr("y", y2)
                    .text(text)
                    .style("text-anchor", "middle")
                    .style("fill", "black");
            }
        });
    }, [data]);

    return <svg ref={ref as React.Ref<SVGSVGElement>} style={{ height: "500px", width: "100%" }} />;
};

export default BubbleChart;
