<template>
  <v-container>
    <v-btn color="primary" @click="back" class="my-3">Kembali</v-btn>
    <v-text-field
        v-model="searchQuery"
        label="Search"
        class="my-3"
    ></v-text-field>
    <h2 class="my-5">Recommendations</h2>
    <v-row>
      <v-col
          v-for="anime in filteredRecommendations"
          :key="anime.id"
          cols="12"
          sm="6"
          md="4"
      >
        <v-skeleton-loader v-if="isLoading" type="list-item-avatar, text" />
        <ImageCard
            v-else
            @on-click="goToDetailPage(anime.entry[0].mal_id)"
            :image="anime.entry[0].images.webp.large_image_url"
            :text="anime.entry[0].title"
        />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import ImageCard from "@/components/ImageCard.vue";

export default {
  name: 'RecommendationView',
  components: {
    ImageCard
  },
  data() {
    return {
      isLoading: true,
      searchQuery: '',
    }
  },
  computed: {
    listAnimeRecommendations(){
      return this.$store.state.animeRecommendations
    },
    filteredRecommendations() {
      if (!this.searchQuery) {
        return this.listAnimeRecommendations;
      }
      return this.listAnimeRecommendations.filter(anime =>
          anime.entry[0].title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchAnimeRecommendations(){
      try{
        await this.$store.dispatch('fetchAnimeRecommendations')
      }catch (error) {
        console.error(error)
      } finally {
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.isLoading = false
      }
    },
    goToDetailPage(id){
      this.$router.push({name: 'detail', params: {id}})
    },
    back(){
      this.$router.go(-1)
    }
  },
  mounted() {
    this.fetchAnimeRecommendations()
  }
}
</script>

