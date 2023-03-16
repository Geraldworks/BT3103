<template>
  <div class="chart">
    <h1>{{ chartName }} - {{ mostRecentData }}</h1>
    <line-chart class="lineChart" :data="chartData" />
  </div>
</template>

<script>
let fat = [32, 29, 28, 30, 26]
let time = [1, 2, 3, 4, 5]
</script>