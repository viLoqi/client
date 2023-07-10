// @ts-nocheck
import { Bar } from "react-chartjs-2";
import { use } from "react";

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

interface Response {
    section: string;
    term: string;
    courseTitle: string;
    instructor: string;
    grades: { [key: string]: number };
}


const makeAverageLine = (datasets) => {
    let total: number[] = [];

    datasets.forEach((element) => {
        const { data } = element;
        for (let i = 0; i < data.length; ++i) {
            if (Number.isNaN(total[i])) {
                total[i] = data[i];
            } else {
                total[i] += data[i];
            }
        }
    });

    total = total.map((e) => {
        return e / datasets.length;
    });

    datasets.push({
        type: "line",
        label: "Average",
        data: total,
        fill: false,
    });
};

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


export default function DistrChart({ course, data }): JSX.Element {
    if (!data) return;

    let datasets: any[] = [];
    let labels: string[] = [];

    Object.keys(data).forEach((k) => {

        const total = data
        if (Object.keys(total).length === 0) {
            return;
        }

        // I and W are dropped
        delete total["I"];
        delete total["W"];

        if (labels.length == 0) labels = Object.keys(total);

        const values = Object.values(total);

        const sum = Object.values(total).reduce((a, b) => {
            return a + b;
        }, 0);

        // converting the values to percentages
        const chartValues = values.map((e) => {
            return (e / sum) * 100;
        });

        datasets.push({
            label: k,
            data: chartValues,
            borderWidth: 1,
        });

    });

    makeAverageLine(datasets);
    const options = makeSharedOptions(course);

    const chartData = {
        labels: labels,
        datasets: datasets,
    };

    return (
        <div style={{ width: 1600, height: 900 }}>
            <Bar key={course} options={options} data={chartData} />
        </div>
    );

}