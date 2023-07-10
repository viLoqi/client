// @ts-nocheck
import { Bar } from "react-chartjs-2";
import React, { useEffect, useRef, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors,
    PointElement,
    LineElement,
    LineController,
} from "chart.js";
import { TypedChartComponent } from "react-chartjs-2/dist/types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors,
    PointElement,
    LineElement,
    LineController
);

const makeSharedOptions = (course) => {
    return {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: course,
            },
            colors: {
                forceOverride: true,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || "";

                        if (label) {
                            label += ": ";
                        }
                        if (context.parsed.y !== null) {
                            label += `${(Math.round(context.parsed.y * 100) / 100).toFixed(
                                2
                            )}%`;
                        }
                        return label;
                    },
                },
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Percentage of Students",
                    font: {
                        size: 16,
                    },
                },
                max: 100
            },
            x: {
                title: {
                    display: true,
                    text: "Grades",
                    font: {
                        size: 16,
                    },
                },
            },
        },
    };
};


export default function DistrChart({ course, data }): React.JSX.Element {
    if (!data || data === undefined) return;

    // the DON't CARES
    delete data["I"]
    delete data["W"]

    const [meta, setMeta] = useState<string[]>([])

    const values = Object.values(data)

    useEffect(() => {
        fetch("https://gradus.jiechen.dev/api/meta/").then(r => r.json().then(d => setMeta(d)))
    }, [])

    const sum = values.reduce((a, b) => {
        return a + b;
    }, 0);

    // converting the values to percentages
    const chartValues = values.map((e) => {
        return (e / sum) * 100;
    });

    const chartData = {
        labels: Object.keys(data),
        datasets: [{
            label: "All",
            data: chartValues,
            borderWidth: 1
        }]
    }

    const options = makeSharedOptions(course);



    return (
        <div style={{ 'position': 'relative', height: '40vh', width: '80vw' }}>
            <Bar key={course} options={options} data={chartData} />
            All | {meta.join(" | ")}
        </div >
    );

}