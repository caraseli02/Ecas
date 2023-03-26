<template>
  <div>
    <HomeHero />
    <HomeFeaturedProducts />
    <Banner />
    <div class="container mb-[30px] lg:mb-10 xl:mb-[60px]">
      <div
        class="grid grid-cols-1 gap-[15px] md:grid-cols-[40%,calc(60%-20px)] md:gap-5 xl:grid-cols-[41%,calc(59%-20px)]"
      >
        <QuickBuy />
        <EcxlusiveOffer />
      </div>
    </div>
    <NewProducts />
    <News />
    <Manufacturers />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (route.query.signin === "true") {
    router.replace({
      query: {},
    });
  }
});

useHead({
  title: "Home",
});
</script>
