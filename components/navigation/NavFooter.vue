<template>
  <footer class="footer-container" aria-label="Contact Information">
    <div class="footer-company-name">
      <strong>Company Name</strong><br /><span class="hidden-line"
        >TODO: FIX THIS</span
      >
    </div>

    <address class="footer-section-container">
      <span>Näthandelsgatan 51</span>
      <span>134 40, Stockholm</span>
    </address>

    <div class="footer-section-container">
      <time datetime="12:00:00">Wed-Fri 12:00 - 18:00</time>
      <time datetime="11:00:00">Sat 11:00 - 16:00</time>
    </div>

    <div class="footer-section-container">
      <span>Reach out to us at</span>
      <a href="mailto:hello@companyname.com">hello@companyname.com</a>
    </div>
  </footer>
</template>

<style lang="scss">
.footer-container {
  position: relative;
  width: 100%;
  min-height: 100px;
  border-top: 1px solid;
  border-color: black;
  color: black;
  font-family: $base-level-font;

  padding: 0px var(--side-spacing);

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;

  @include respond-to(sm) {
    align-items: unset;
    padding: 20px var(--side-spacing) 150px;
    row-gap: 20px;
  }
}

.footer-section-container {
  display: flex;
  flex-direction: column;

  a {
    text-decoration: underline;
    color: black;
  }

  @include respond-to(sm) {
    width: 50%;
  }
}

.footer-company-name {
  @include respond-to(sm) {
    width: 100%;
  }
}

.hidden-line {
  color: transparent;

  @include respond-to(sm) {
    display: none;
  }
}

.footer-logo-container {
  height: 100px;
  display: flex;
  pointer-events: none;

  @include respond-to(sm) {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 50%);

    height: unset;
    width: unset;
  }

  img {
    height: 100%;
    margin: auto;
  }
}

address {
  all: unset;
}
</style>
