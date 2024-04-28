<template>
  <v-carousel hide-delimiters>
    <v-carousel-item v-for="anime in listAnimeRecommendations" :key="anime.id">
      <v-skeleton-loader v-if="isLoading" type="image" />
      <div v-else>
        <v-img :src="anime.entry[0].images.webp.large_image_url" aspect-ratio="1.7"></v-img>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'GradientCarousel',
  props: {
    listAnimeRecommendations: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>