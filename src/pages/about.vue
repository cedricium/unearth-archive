<template>
  <div>
    <div class="template-container">
      <div class="black-white font-neutral">
        <section class="section">
          <div class="container-lrg flex">
            <div class="flex flex-column col-6">
              <h1 class="heading primary-color">Hello 👋 <br /> I'm Cedric Amaya</h1>
              <span class="company-title">Founder & sole developer, unearth</span>
              <h2 class="paragraph secondary-color mt20">
                I’m Cedric, a 20-something indie maker, coffee consumer, and coder. I was born and
                raised in Washington state and currently reside in sunny California where I go to
                college to study Computer Science. I love working day-to-day on projects that
                require multidisciplinary skill sets solving complex issues that make the lives of
                others easier.
              </h2>
              <h2 class="paragraph primary-color mt30">
                <span class="why-unearth">
                  Why unearth?
                </span>
              </h2>
              <h2 class="paragraph secondary-color mt15">
                Unearth aims to solve the issue of discoverability and recollection with services
                offering saving functionality. When users save content then fail to find or seek it
                out afterwards, that's a sign the service may be broken. With unearth, I hope to
                build a tool that will make discovering and managing saved content from various
                services easier than it is natively.
              </h2>
            </div>
            <div class="col-6 flex center-horizontal center-vertical">
              <div class="">
                <div class=""><img src="https://cdn.launchaco.com/images/36651ba7-634e-478c-b6b4-878496a8965f.png" alt="Screenshot of small App" class="custom-img"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="template-container">
      <section id="cta" class="section black-white font-neutral">
        <div class="container text-center">
          <div class="col-12">
            <h4 class="heading primary-color">Excited for unearth?</h4>
            <p class="paragraph mt20 secondary-color">Join the waiting list to get early access when unearth goes into beta!</p>
            <div class="mt40">
              <form action="https://tech.us19.list-manage.com/subscribe/post?u=339a6a86e5e989d8d4632bca5&amp;amp;id=36bc4cb5eb" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" novalidate="novalidate" class="container-sml mailchimp flex mb20">
                <input value="" name="EMAIL" id="mce-EMAIL" placeholder="Your Email Address" required="required" class="mailchimp-input mobile-text-center" type="email"> 
                <div aria-hidden="true" style="position: absolute; left: -5000px;"><input name="b_3198ee66c8baf4d60aa2fee6b_d60e1830e8" tabindex="-1" value="" type="text"></div>
                <input name="subscribe" id="mc-embedded-subscribe" class="white-color button no-max-width accent-bg primary-color" value="Get Early Access" type="submit">
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'About · unearth',
    desciption: 'Meet the team behind unearth and learn why you should give the product a try.',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'About · unearth'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Meet the team behind unearth and learn why you should give the product a try.'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://www.tryunearth.com/images/social-graphic_about.png'
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Contains the "unearth" branding and the description on a dark background.'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'About · unearth'
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: 'Meet the team behind unearth and learn why you should give the product a try.'
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: 'https://www.tryunearth.com/images/social-graphic_about.png'
      },
      {
        hid: 'twitter:image:alt',
        property: 'twitter:image:alt',
        content: 'Contains the "unearth" branding and the description on a dark background.'
      },
    ]
  }
};
</script>

<style scoped>
span.company-title {
  text-transform: uppercase;
  font-size: 0.85rem;
  font-weight: bold;
}

span.why-unearth {
  font-size: 1.5rem;
  font-weight: bold;
}

</style>
