// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BUBBLE_RADIUS_MULTIPLIER = 5;
const BUBBLE_THRESHOLD = 300;
const BUBBLE_SHADOW_COLOR = "rgba(255, 0, 0, 0.3)";
const EXCLAMATION_FONT_SIZE = 14;
const EXCLAMATION_ANIMATION_OFFSET = -5;

interface BubbleData {
    name: string;
    value: number;
}

const BubbleChart = ({ data }: { data: BubbleData[] }) => {
    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const svg = d3.select(ref.current);
        const svgDom = ref.current;

        if (!svgDom) return;

        svg.selectAll("*").remove();
        const { width, height } = svgDom.getBoundingClientRect();

        const bubbleDiameter = Math.sqrt(250) * BUBBLE_RADIUS_MULTIPLIER * 2;

        const verticalGridData = d3.range(0, width, bubbleDiameter);
        svg.selectAll(".vertical-grid-line")
            .data(verticalGridData)
            .enter().append("line")
            .attr("class", "vertical-grid-line")
            .attr("x1", x => x)
            .attr("y1", 0)
            .attr("x2", x => x)
            .attr("y2", height)
            .style("stroke", "lightgray")
            .style("stroke-dasharray", "3,3");

        svg.selectAll(".horizontal-grid-line")
            .data(d3.range(0, height, height / 10))
            .enter().append("line")
            .attr("class", "horizontal-grid-line")
            .attr("x1", 0)
            .attr("y1", y => y)
            .attr("x2", width)
            .attr("y2", y => y)
            .style("stroke", "lightgray")
            .style("stroke-dasharray", "3,3");

        const getTextSize = (text) => {
            const temporaryText = svg.append("text").text(text).style("opacity", 0);
            const size = temporaryText.node().getBBox();
            temporaryText.remove();
            return size;
        };

        const root = d3.hierarchy({ children: data })
            .sum((d: any) => d.value)
            .sort((a, b) => b.value! - a.value!);

        root.each(d => d.r = Math.sqrt(d.value) * BUBBLE_RADIUS_MULTIPLIER);

        const leaves = root.leaves().sort((a, b) => b.r - a.r);
        const totalWidth = leaves.reduce((acc, d) => acc + 2 * d.r, 0);
        let currentX = width / 2 - totalWidth / 2;

        leaves.forEach((d, i) => {
            d.x = currentX + d.r;
            d.y = height / 2;
            currentX += 2 * d.r;
        });

        const node = svg.selectAll(".node")
            .data(leaves)
            .enter().append("g")
            .attr("transform", d => `translate(${d.x},${d.y})`);

        const circle = node.append("circle")
            .attr("r", 0)
            .style("fill", (d) => {
                if (d.data.value > BUBBLE_THRESHOLD) return "#FF7F7F";
                return `rgb(200, 200, ${Math.floor(Math.random() * 100) + 200})`;
            })
            .style("filter", (d) => {
                if (d.data.value > BUBBLE_THRESHOLD) return `drop-shadow(0 0 4px ${BUBBLE_SHADOW_COLOR})`;
            });

        circle.transition()
            .duration(1000)
            .attr("r", d => d.r)
            .ease(d3.easeElastic.period(0.6));

        node.each(function (d) {
            const g = d3.select(this);
            const r = d.r;
            const text = d.data.name;
            const textSize = getTextSize(text);

            if (r > textSize.width / 2) {
                g.append("text")
                    .attr("x", 0)
                    .attr("y", 0)
                    .text(text)
                    .style("text-anchor", "middle")
                    .style("fill", "black");
            } else {
                const angle = -Math.PI / 4;
                const lineLength = r + textSize.width;
                const x1 = r * Math.cos(angle);
                const y1 = r * Math.sin(angle);
                const x2 = lineLength * Math.cos(angle);
                const y2 = lineLength * Math.sin(angle);

                g.append("line")
                    .attr("x1", x1)
                    .attr("y1", y1)
                    .attr("x2", x2)
                    .attr("y2", y2)
                    .style("stroke", "gray");

                g.append("text")
                    .attr("x", x2 + 3)
                    .attr("y", y2 - 3)
                    .text(text)
                    .style("text-anchor", "middle")
                    .style("fill", "black");
            }

            if (d.data.value > BUBBLE_THRESHOLD) {
                const mark = g.append("text")
                    .attr("x", r - 15)
                    .attr("y", -r + 15)
                    .text("!")
                    .style("text-anchor", "middle")
                    .style("font-size", "14px")
                    .style("font-weight", "bold")
                    .style("fill", "red");

                // Add animation to the red bubble
                mark.transition()
                    .duration(1000)
                    .attr("y", -r - EXCLAMATION_ANIMATION_OFFSET)
                    .ease(d3.easeSinInOut)
                    .transition()
                    .duration(1000)
                    .attr("y", -r + 15)
                    .ease(d3.easeSinInOut)
                    .on("end", function repeat() {
                        d3.select(this)
                            .transition()
                            .duration(1000)
                            .attr("y", -r - EXCLAMATION_ANIMATION_OFFSET)
                            .ease(d3.easeSinInOut)
                            .transition()
                            .duration(1000)
                            .attr("y", -r + 15)
                            .ease(d3.easeSinInOut)
                            .on("end", repeat);
                    });
            }
        });

        const labelFontSize = EXCLAMATION_FONT_SIZE;
        const legendYOffset = 12;

        svg.append("text")
            .attr("x", 25)
            .attr("y", labelFontSize)
            .text("1 unit = 250 watts")
            .style("font-size", `${labelFontSize}px`)
            .style("fill", "gray")
            .style("fill-opacity", 0.6);

        svg.append("text")
            .attr("x", 25)
            .attr("y", legendYOffset + 20)
            .text("! = High Consumer")
            .style("font-size", `${labelFontSize}px`)
            .style("fill", "red")
            .style("fill-opacity", 0.6);
    }, [data]);

    return (
        <div>
            <svg ref={ref as React.Ref<SVGSVGElement>} style={{ height: "500px", width: "100%" }} />
        </div>
    );
};

export default BubbleChart;
