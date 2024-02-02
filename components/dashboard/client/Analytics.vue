<template>
  <ClientOnly>
    <div
      class="relative items-stretch shadow-xs bg-white flex w-full lg:w-fit md:min-w-[476px] xl:min-w-[472px] h-[240px] flex-col rounded-xl overflow-y-scroll md:overflow-y-hidden pr-2">
    <div class="min-w-[476px] md:min-w-fit mt-3 ml-1">
      <apexchart height="215" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const chartOptions = ref({
  chart: {
    type: 'bar',
    toolbar: {
      show: false // Hides the toolbar
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: '45%', // Adjust as needed
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      style: {
        colors: '#777',
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif' // Match your font
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#777',
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif' // Match your font
      }
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " Orders"
      }
    }
  },
  colors: ['#008FFB'], // Use your desired colors
  grid: {
    show: false,
    borderColor: '#e7e7e7',
    strokeDashArray: 0,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5,
    markers: {
      radius: 12
    }
  }
});


const series = ref([{
  name: 'Orders',
  data: [23, 44, 35, 30, 49, 60, 70, 91, 125, 48, 60, 70] // Replace with your actual data
}]);
</script>

<style scoped>
</style>
