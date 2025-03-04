<template>
  <div>
    <div class="loader" />
    <span class="loader-spacing-text">LOADING</span>
    <!-- TODO: THIS NEEDS TO BE FIXED ;_; -->
  </div>
</template>

<style lang="scss">
.loader {
  position: absolute;
  top: 50%;
  left: 50%;

  border: 5px solid #ffffff9b;
  border-radius: 50%;
  border-top: 5px solid black;
  width: 28px;
  height: 28px;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.loader-spacing-text {
  color: transparent;
}
</style>
