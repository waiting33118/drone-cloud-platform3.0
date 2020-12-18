<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <router-link
        to="/"
        class="navbar-brand"
      >
        Drone Cloud Platform3.0
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav ms-auto mb-2 mb-sm-0">
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
            >Signup</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              aria-current="page"
              href="#"
            >SignIn</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
            >Flight Record</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
            >Setting</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
            >SignOut</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  setup () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-item{
    transition: border-bottom 1s linear;
    &:hover{
      border-bottom: 0.5px solid rgb(187, 187, 187);
    }
  }
</style>
