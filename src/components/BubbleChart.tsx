// @ts-nocheck
// Gezeik met Typescript en d3, dus ts-nocheck
// Komt omdat d3 niet goed is gemaakt voor Typescript
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface BubbleData {
    name: string;
    value: number;
}

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
        const pack = d3.pack().size([width, height]).padding(0.5);  // Decrease padding

        // Create a root node
        const root = d3.hierarchy({ children: data })
            .sum((d: any) => d.value)
            .sort((a, b) => b.value! - a.value!);

        // Create bubbles and assign data
        const node = svg.selectAll(".node")
            .data(pack(root).leaves())
            .enter().append("g")
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .call(d3.drag()  // Call D3 drag function
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        // Add circle for each node
        node.append("circle")
            .attr("r", d => d.r)
            .style("fill", "darkblue")  // Change color to dark blue
            .on("click", d => {  // Add click event handler
                alert(`You clicked on ${d.data.name}`);
            });

        // Add text for each node
        node.append("text")
            .text(d => d.data.name)
            .attr("text-anchor", "middle")
            .style("fill", "#fff")
            .style("font-size", d => `${d.r * 0.2}px`);  // Adjust font size based on radius

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
