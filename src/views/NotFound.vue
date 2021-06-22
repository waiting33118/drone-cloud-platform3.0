<template>
  <div class="container">
    <img src="../assets/404.jpg" alt="not-found" />
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  justify-content: center;
  align-items: center;

  img {
    width: 500px;
    height: 500px;
  }
}
</style>
