<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ this.$route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: 'DetailView',

}
</script>
