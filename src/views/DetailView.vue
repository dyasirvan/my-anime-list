<template>
  <v-container v-if="isLoading" class="d-flex justify-center align-center">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-container>
  <v-container v-else>
    <v-btn color="primary" @click="back" class="my-3">Kembali</v-btn>
    <v-card>
      <v-card-title>
        <h1>{{ animeDetail.title }}</h1>
      </v-card-title>
      <v-card-text>
        <iframe width="560" height="315"
                :src="animeDetail.trailer.embed_url"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
        <p>
          Score: <v-icon small class="mr-1" color="yellow">mdi-star</v-icon> {{ animeDetail.score }}
        </p>
        <p>Status: {{ animeDetail.status }}</p>
        <p>{{ animeDetail.synopsis }}</p>
        <p>Genres:
          <a v-for="(genre, index) in animeDetail.genres" :key="genre.mal_id" :href="genre.url" class="genre-link">
            {{ genre.name }}<span v-if="index < animeDetail.genres.length - 1">, </span>
          </a>
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'DetailView',
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    animeDetail(){
      return this.$store.state.selectedAnime
    }
  },
  methods: {
    async fetchAnimeDetail(){
      try{
        await this.$store.dispatch('fetchSelectedAnime', this.$route.params.id)
      }catch (error) {
        console.error(error)
      } finally {
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.isLoading = false
      }
    },
    back(){
      this.$router.go(-1)
    }
  },
  mounted() {
    this.fetchAnimeDetail()
  }
}
</script>
