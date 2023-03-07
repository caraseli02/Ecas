<template>
  <div>
    <div class="container">
      <ClientOnly>
        <Vue3Lottie
          :animationData="ConfirmationAnimation"
          :width="200"
          :height="200"
        />
      </ClientOnly>
      <ClientOnly>
        <Vue3Lottie
          :animationData="DeleteAnimation"
          :width="200"
          :height="200"
        />
      </ClientOnly>
      <ClientOnly>
        <Vue3Lottie
          :animationData="WarningAnimation"
          :width="200"
          :height="200"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConfirmationAnimation from "@/assets/lottie/confirmation_animation.json";
import DeleteAnimation from "@/assets/lottie/delete_animation.json";
import WarningAnimation from "@/assets/lottie/warning_animation.json";
</script>
