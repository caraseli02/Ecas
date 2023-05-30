<template>
  <div id="mapid" />
</template>

<script setup lang="ts">
import Leaflet from "leaflet";
import { LeafletMapData } from "@/data/geojson.ts";

const zoom = ref(2);

onMounted(() => {
  if (window) {
    const map = Leaflet.map("mapid", {
      scrollWheelZoom: true,
      doubleClickZoom: true,
      maxZoom: 5,
      minZoom: 3,
      zoomControl: false,
      attributionControl: false,
    }).setView([51, 0], 1);

    map.setMaxBounds([
      [100.673, -200.023],
      [-60.995, 250.2421],
    ]);

    Leaflet.control
      .zoom({
        position: "topright",
      })
      .addTo(map);

    const geojson = Leaflet.geoJson(LeafletMapData).addTo(map);
  }
});
</script>

<style lang="scss">
#mapid {
  @apply bg-white;
}
</style>
