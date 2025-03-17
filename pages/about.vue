<template>
  <section class="about-container">
    <h1>Integrating Shopify with NUXT 3</h1>
    <p>
      For those of you reading, welcome to this dummy project featuring
      <strong>Shopify's GraphQL API hooked up to NUXT 3.</strong>
    </p>

    <p>
      I built this project to learn more about how to create custom
      <strong>Shopify stores</strong> with the help of my favourite framework as
      of yet, <strong>NUXT 3</strong>.
    </p>

    <p>
      I've tried to make it as <i>efficient as possible</i> & as of
      <strong>March 2025</strong>
      I'm still implementing <i>new features and updates</i>. The ultimate goal
      is for me or anyone who's interested to pick up this repo, hook up their
      own stores, and customize it to their own whim.
    </p>

    <p>
      Most of my inspiration comes from <i>small-scale businesses</i> & some
      <i>large-scale ones</i>, finding out
      <i>what are the most sought-after features & design concepts</i>
      while keeping it <i>simplistic enough</i> to customize without having to
      remove much of the code.
    </p>

    <p>
      If you're interested in using this as a
      <strong>template</strong> yourself, you can find my repo
      <a href="https://github.com/Muridae-dev/shopify-nuxt-integration">here</a
      >, feel free to use it <i>to your whim</i> & if you'd be so inclined send
      me some
      <strong>PRs with your own thoughts!</strong>
    </p>

    <p>
      Made by
      <a href="https://www.muridae.dev/"><strong>Noah Lundberg</strong></a>
    </p>
  </section>
</template>

<style lang="scss" scoped>
.about-container {
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 50px var(--side-spacing);

  h1 {
    font-weight: bold;
  }

  a {
    text-decoration: underline;
    color: inherit;
  }

  strong {
    font-weight: bold;
  }
}
</style>
