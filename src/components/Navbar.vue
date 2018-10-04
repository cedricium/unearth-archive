<template>
  <div class="black-white font-neutral">
    <header class="header">
      <div class="container-lrg">
        <div class="flex col-12 spread">
          <nuxt-link to="/" tag="div">
            <a class="logo">
              <img src="https://cdn.launchaco.com/images/ec28e821-87e4-41ec-af07-bd0fc50f9a2e.png" alt="unearth logo">
              <span>unearth</span>
              <span class="coming-soon"> | coming soon</span>
            </a>
          </nuxt-link>
          <nuxt-link to="/about" tag="div">
            <a href="/about" class="nav-link primary-color mr0">About</a>
          </nuxt-link>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
span.coming-soon {
  font-size: 1rem;
  vertical-align: baseline;
  color: #422db1;
}

a.logo :not(.coming-soon) {
  font-family: 'Nunito';
}

@media screen and (max-width: 400px) {
  span.coming-soon {
    display: none;
  }
}
</style>
