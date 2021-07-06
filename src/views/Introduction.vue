<template>
  <section class="banner">
    <div
      class="banner__title"
      data-aos="fade-down"
      data-aos-duration="1000"
      data-aos-once="true"
    >
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
  <section class="abstract">
    <iframe
      class="video__demo"
      data-aos="fade-left"
      data-aos-duration="1000"
      data-aos-once="true"
      src="https://www.youtube.com/embed/HSsqzzuGTPo"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
    <div
      class="content"
      data-aos="fade-right"
      data-aos-duration="1000"
      data-aos-once="true"
    >
      content
    </div>
  </section>
  <section class="step">
    <div class="step__items">
      <div
        class="step__items--content"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-offset="300"
        data-aos-once="true"
      >
        install app
      </div>
      <div
        class="step__items--content"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-offset="300"
        data-aos-once="true"
      >
        signup account
      </div>
      <div
        class="step__items--content"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-offset="300"
        data-aos-once="true"
      >
        Go discovory
      </div>
    </div>
  </section>
  <footer>
    <small>
      &copy; 2021 NTUT AiotLab 208 - Drone Cloud Platform. All Rights Reserved
    </small>
    <small>
      Designed by Tony Chung
      <a
        class="link__github"
        target="_blank"
        rel="noopener"
        href="https://github.com/waiting33118"
        ><GithubFilled
      /></a>
    </small>
  </footer>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { GithubFilled } from '@ant-design/icons-vue'
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'Introduction',
  components: {
    GithubFilled
  },
  setup() {
    onMounted(() => {
      AOS.init()
    })
  }
}
</script>

<style lang="scss" scoped>
.banner {
  padding: 150px 0;
  background-image: url('../assets/intro.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
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

.abstract {
  width: 100%;
  padding: 150px 1rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;

  .video__demo {
    width: 500px;
    aspect-ratio: 16 / 9;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  }
}

.step {
  padding: 100px 1rem;
  width: 100%;
  background-image: url('../assets/intro2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .step__items {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
    .step__items--content {
      width: 250px;
      height: 450px;
      border-radius: 10px;
      padding: 1rem;
      margin-bottom: 2rem;
      box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 15);
      background-color: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(1.5px);

      &:hover {
        transform: translate(0, -5%);
      }
    }
  }
}

footer {
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fab187;

  .link__github {
    text-decoration: none;
    color: #000000;
  }
}
</style>
