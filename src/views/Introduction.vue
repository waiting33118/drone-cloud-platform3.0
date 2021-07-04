<template>
  <section class="banner">
    <div class="banner__title" data-aos="fade-down" data-aos-duration="1000">
      Drone Cloud Platform
    </div>
    <router-link
      to="/drone"
      class="banner__button"
      data-aos="zoom-out-down"
      data-aos-delay="500"
      data-aos-easing="ease-in-back"
    >
      Enter Control Panel
    </router-link>
  </section>
  <section class="step">
    <div class="step__items">
      <div
        class="step__items--content"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-offset="300"
      >
        install app
      </div>
      <div
        class="step__items--content"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-offset="300"
      >
        signup account
      </div>
      <div
        class="step__items--content"
        data-aos="fade-up"
        data-aos-duration="3000"
        data-aos-offset="300"
      >
        Go discovory
      </div>
    </div>
  </section>
  <footer>FOOTER</footer>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'Introduction',
  setup() {
    onMounted(() => {
      AOS.init()
    })
  }
}
</script>

<style lang="scss" scoped>
.banner {
  background-image: url('../assets/intro.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .banner__title {
    position: relative;
    text-align: center;
    font-weight: 600;
    font-size: 2rem;
    color: #fff;
    margin-bottom: 15rem;
    @media (min-width: 768px) {
      font-size: 4rem;
    }
  }

  .banner__title::before {
    content: '';
    position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.15);
    filter: blur(5px);
  }

  .banner__button {
    z-index: 100;
    border-radius: 30px;
    padding: 15px 25px;
    cursor: pointer;
    background-color: #fff;
    color: black;
    transition: box-shadow 0.2s;
    &:hover {
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.5);
    }
  }
}

.step {
  padding-top: 7rem;
  padding-bottom: 7rem;
  width: 100%;
  background-image: url('../assets/intro2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .step__items {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    width: 85%;
    margin: 0 auto;
    .step__items--content {
      min-width: 250px;
      width: 25%;
      height: 450px;
      border-radius: 10px;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 6px 12px 0 rgba(89, 98, 115, 15%);
      background-color: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(1.5px);
    }
  }
}

footer {
}
</style>
