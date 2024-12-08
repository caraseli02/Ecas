<template>
  <div class="circles">
    <div class="circle research" />
    <div class="circle design" />
  </div>
  <div class="overlay" />
</template>

<script setup>
// No specific logic is required for this component.
</script>

<style scoped>
.canvas,
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.canvas {
  background: var(--color-background);
}

.circles {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: rotate 25s infinite alternate;
  backface-visibility: hidden;
  perspective: 1000;
}

.circle {
  position: relative;
  width: 1px;
  height: 1px;
  margin: calc(var(--radius) / 2);
  border-radius: 50%;
  backface-visibility: hidden;
  perspective: 1000;
  opacity: 0.9;
}

.circle.design {
  background: var(--color-design);
  box-shadow: 0 0 var(--radius) var(--radius) var(--color-design);
  animation: float 6s infinite alternate;
}

.circle.research {
  background: var(--color-research);
  box-shadow: 0 0 var(--radius) var(--radius) var(--color-research);
  animation: float 8s infinite alternate-reverse;
}

@keyframes float {
  0% {
    transform: translateX(calc(var(--radius) * 0.0)) translateZ(0);
  }
  20% {
    transform: translateX(calc(var(--radius) * 0.5)) translateZ(0);
  }
  40% {
    transform: translateX(calc(var(--radius) * 1.0)) translateZ(0);
  }
  60% {
    transform: translateX(calc(var(--radius) * 1.5)) translateZ(0);
  }
  80% {
    transform: translateX(calc(var(--radius) * 0.5)) translateZ(0);
  }
  100% {
    transform: translateX(calc(var(--radius) * 0.0)) translateZ(0);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) translateZ(0);
  }
  100% {
    transform: rotate(360deg) translateZ(0);
  }
}

@media (max-width: 640px) {
  :root {
    --radius: 125px;
  }

  .overlay {
    background-size: 50%;
  }
}
</style>
