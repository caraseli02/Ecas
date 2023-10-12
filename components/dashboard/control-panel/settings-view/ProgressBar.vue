<template>
    <div>
        <div class="relative translate-y-6 grid grid-cols-2 gap-1 z-0">
            <div class="relative h-2 bg-[#F2F2F2] rounded-lg"></div>
            <div class="grid grid-cols-3 gap-1">
                <div class="relative h-2 bg-[#F2F2F2] rounded-lg"></div>
                <div class="relative h-2 bg-[#F2F2F2] rounded-lg"></div>
                <div class="relative h-2 bg-[#F2F2F2] rounded-lg"></div>
            </div>
        </div>
        <div class="relative h-8 grid grid-cols-2 gap-1">
            <div ref="chart1"></div>
            <div class="grid grid-cols-3 gap-1">
                <div ref="chart2"></div>
                <div ref="chart3"></div>
                <div ref="chart4"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import chartDesigns from '@/chart-designs/progressBar.json';

export default defineComponent({
    name: 'ProgressBar',
    props: ['value'],
    data() {
        return {
            chartSeriesOne: [
                {
                    data: [
                        {
                            x: '',
                            y: 1,
                        },
                    ],
                },
            ],
            chartSeriesTwo: [
                {
                    data: [
                        {
                            x: '',
                            y: 1,
                        },
                    ],
                },
            ],
            chartSeriesThree: [
                {
                    data: [
                        {
                            x: '',
                            y: 1,
                        },
                    ],
                },
            ],
            chartSeriesFour: [
                {
                    data: [
                        {
                            x: '',
                            y: 0.5,
                        },
                    ],
                },
            ],
        };
    },
    computed: {
        chartOptions() {
            return chartDesigns;
        },
    },
    methods: {
        renderChart(refName: string, options: object, series: object, delay: number) {
            options = Object.assign(options, {
                series: series,
            });
            setTimeout(() => {
                const chart = new ApexCharts(this.$refs[refName], options);
                chart.render();
            }, delay);
        },
        setChartData() {
            const { limit, spent } = this.value;
            let barValues = [0, 0, 0, 0];
            const progress = spent / limit;
            if (progress < 0.5) {
                barValues = [progress * 2, 0, 0, 0];
            } else if (progress >= 0.5 && progress <= 1 / 2 + 1 / 6) {
                barValues = [1, (progress - 0.5) * 6, 0, 0];
            } else if (progress > 1 / 2 + 1 / 6 && progress <= 1 / 2 + 1 / 6 + 1 / 6) {
                barValues = [1, 1, (progress - (1 / 2 + 1 / 6)) * 6, 0];
            } else if (progress > 1 / 2 + 1 / 6 + 1 / 6 && progress <= 1) {
                barValues = [1, 1, 1, (progress - (1 / 2 + 1 / 6 + 1 / 6)) * 6];
            } else if (progress > 1) {
                barValues = [1, 1, 1, 1];
            }
            this.chartSeriesOne = [
                {
                    data: [
                        {
                            x: '',
                            y: barValues[0],
                        },
                    ],
                },
            ];
            this.chartSeriesTwo = [
                {
                    data: [
                        {
                            x: '',
                            y: barValues[1],
                        },
                    ],
                },
            ];
            this.chartSeriesThree = [
                {
                    data: [
                        {
                            x: '',
                            y: barValues[2],
                        },
                    ],
                },
            ];
            this.chartSeriesFour = [
                {
                    data: [
                        {
                            x: '',
                            y: barValues[3],
                        },
                    ],
                },
            ];
        },
    },
    mounted() {
        this.setChartData();
        this.renderChart('chart1', this.chartOptions.progressBarOne, this.chartSeriesOne, 0);
        this.renderChart('chart2', this.chartOptions.progressBarTwo, this.chartSeriesTwo, 800);
        this.renderChart('chart3', this.chartOptions.progressBarThree, this.chartSeriesThree, 1600);
        this.renderChart('chart4', this.chartOptions.progressBarFour, this.chartSeriesFour, 2400);
    },
});
</script>
