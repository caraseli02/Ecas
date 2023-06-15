<template>
  <div id="mapid" class="rounded-xl" />
</template>

<script setup lang="ts">
import Leaflet, { Layer } from "leaflet";
import { LeafletMapData } from "@/data/geojson.ts";
import { PropType } from "nuxt/dist/app/compat/capi";

const props = defineProps({
  countries: {
    type: Array as PropType<
      {
        label: string;
        count: number;
        theme: string;
      }[]
    >,
    required: true,
  },
});

onMounted(() => {
  if (window) {
    const map = Leaflet.map("mapid", {
      scrollWheelZoom: true,
      doubleClickZoom: true,
      maxZoom: 5,
      minZoom: 1,
      zoomControl: false,
      attributionControl: false,
    }).setView([51, 0], 1);
    map.setMaxBounds([
      [100.673, -200.023],
      [-60.995, 210.2421],
    ]);
    Leaflet.control
      .zoom({
        position: "topright",
      })
      .addTo(map);
    Leaflet.tileLayer("", {
      noWrap: true,
    }).addTo(map);
    const getColor = (countryName: string) => {
      const country = props.countries.find(
        (country) => country.label === countryName
      );
      if (country) {
        return country.theme;
      } else {
        return "#D9D9D9";
      }
    };
    const style = (feature: any) => {
      return {
        fillColor: getColor(feature.properties.name),
        fillOpacity: 1,
      };
    };
    const highlightFeatureClick = (e: any) => {
      const clickedCountryName = e.target.feature.properties.name;
      const country = props.countries.find(
        (c) => c.label === clickedCountryName
      );
      if (country) {
        Leaflet.tooltip({
          direction: "top",
          permanent: false,
          sticky: true,
          offset: [0, -10],
          className: "dashboard--map-tooltip",
        })
          .setLatLng([e.latlng.lat, e.latlng.lng])
          .setContent(
            `${clickedCountryName} <span class="font-semibold">${country.count}</span>`
          )
          .addTo(map);
      }
    };
    const onEachFeature = (_: any, layer: any) => {
      layer.on({
        click: highlightFeatureClick,
      });
    };
    const geojson = Leaflet.geoJson(LeafletMapData, {
      style,
      onEachFeature,
    }).addTo(map);
  }
});
</script>

<style lang="scss">
#mapid {
  @apply bg-white aspect-[2.3];
  .leaflet-pane {
    z-index: 1;
  }
  .leaflet-top {
    z-index: 1;
  }
  .leaflet-interactive {
    @apply stroke-white;
    stroke-width: 1px;
  }
  .leaflet-control {
    @apply mt-2 mr-2 flex flex-col gap-2 border-hidden;
    a {
      @apply flex items-center justify-center w-[26px] h-[26px] border-none bg-[#F2F2F2] rounded text-gray-300 transition-colors duration-300 font-medium hover:text-blue;
      @media (pointer: coarse) {
        display: block !important;
      }
      &.leaflet-disabled {
        @apply text-gray-100;
      }
      span {
        @apply leading-[0];
      }
    }
  }
  .dashboard--map-tooltip {
    @apply bg-[#1B1B28] text-white border-none shadow-none rounded px-3 py-1 text-sm leading-[1.43] tracking-[-0.02em] font-Poppins before:hidden after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-full after:bg-no-repeat after:w-2 after:h-2;
    &::after {
      background-image: url("data:image/svg+xml,%3Csvg width='9' height='5' viewBox='0 0 9 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.5 3.49691e-07L0.5 0L2.8359 3.50385C3.62754 4.69132 5.37246 4.69132 6.1641 3.50385L8.5 3.49691e-07Z' fill='%231B1B28'/%3E%3C/svg%3E");
    }
  }
}
</style>
