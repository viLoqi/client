// @ts-nocheck
import { Bar } from 'react-chartjs-2'
import React, { useEffect, useState } from 'react'

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
} from 'chart.js'

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
)

interface GradusResponse {
    section: string
    term: string
    courseTitle: string
    instructor: string
    grades: { [key: string]: number }
}

const tally = (arr: GradeData[]): { [key: string]: number } => {
    const total: { [key: string]: number } = {}
    arr.forEach((r) => {
        Object.keys(r.grades).forEach((e) => {
            if (e in total) {
                total[e] = total[e] + r.grades[e]
            } else {
                total[e] = r.grades[e]
            }
        })
    })
    return total
}


const makeSharedOptions = (course) => {
    return {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
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
                        let label = context.dataset.label || ''

                        if (label) {
                            label += ': '
                        }
                        if (context.parsed.y !== null) {
                            label += `${(Math.round(context.parsed.y * 100) / 100).toFixed(
                                2
                            )}%`
                        }
                        return label
                    },
                },
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Percentage of Students',
                    font: {
                        size: 16,
                    },
                },
                max: 100
            },
            x: {
                title: {
                    display: true,
                    text: 'Grades',
                    font: {
                        size: 16,
                    },
                },
            },
        },
    }
}


export default function DistrChart({ courseName, instructor }): React.JSX.Element {
    const [data, setData] = useState<{ [key: string]: number }>(null)
    const [meta, setMeta] = useState<string[]>([])

    useEffect(() => {
        fetch(`https://gradus.jiechen.dev/api/instructor/class?instructor=${instructor}`).then(r => r.json().then((d: GradusResponse) => setMeta([...new Set(d.map(el => el.term))])))

        fetch(encodeURI(`https://gradus.jiechen.dev/api/class/?query=${courseName}&instructor=${instructor}`)).then(r => r.json().then(result => {
            const res = tally(result)
            // the DON't CARES
            delete res['I']
            delete res['W']
            setData(res)
        }))
    }, [courseName, instructor])

    // console.log(data)

    if (data) {
        const values = Object.values(data)
        const sum = values.reduce((a, b) => {
            return a + b
        }, 0)

        // converting the values to percentages
        const chartValues = values.map((e) => {
            return (e / sum) * 100
        })

        const chartData = {
            labels: Object.keys(data),
            datasets: [{
                label: courseName,
                data: chartValues,
                borderWidth: 1
            }]
        }

        const options = makeSharedOptions(courseName)



        return (
            <div style={{ 'position': 'relative', height: '40vh', width: '80vw', wordWrap: 'normal' }}>
                <Bar key={courseName} options={options} data={chartData} />
                Teaching @ Stony Brook University Since: {meta[0]}
            </div >
        )
    }
}