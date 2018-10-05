<template>
  <div>
    <div class="template-container">
      <div class="black-white font-neutral">
        <section class="section">
          <div class="container mb40">
            <div class="col-12 text-center">
              <h1 class="heading-lrg primary-color launchaco-builder-hoverable">Uh-oh!</h1>
              <h2 class="subheading secondary-color mt20 launchaco-builder-hoverable">Looks like you're lost...</h2>
              <div class="mt40">
                <nuxt-link to="/">
                  <a href="https://www.tryunearth.com" target="_blank" class="button mobile-text-center mt10 launchaco-builder-hoverable mobile-text-center accent-bg primary-color"> <span> Back to homepage </span></a>
                </nuxt-link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  head: {
    title: 'Oops! · unearth',
  }
};
</script>

<style scoped>
</style>
