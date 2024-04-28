<template>
  <v-container>
    <GradientCarousel :list-anime-recommendations="listAnimeRecommendations" :is-loading="isLoading"/>
    <div class="my-5 d-flex align-center justify-space-between">
      <h2>Recommendations</h2>
      <p style="cursor: pointer" @click="goToRecommendation">View More ...</p>
    </div>
    <v-row>
      <v-col
        v-for="anime in listAnimeRecommendations"
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

    <div class="my-5 d-flex align-center justify-space-between">
      <h2 class="my-5">Season Now</h2>
      <p style="cursor: pointer" @click="goToSeasonNow">View More ...</p>
    </div>
    <v-row>
      <v-col
          v-for="now in listAnimeNow"
          :key="now.id"
          cols="12"
          sm="6"
          md="4"
      >
        <v-skeleton-loader v-if="isLoading" type="list-item-avatar, text" />
        <ImageCard
            v-else
            @on-click="goToDetailPage(now.mal_id)"
            :image="now.images.webp.large_image_url"
            :text="now.title"
        />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import ImageCard from "@/components/ImageCard.vue";
  import GradientCarousel from "@/components/GradientCarousel.vue";

  export default {
    name: 'HomeView',
    components: {
      GradientCarousel,
      ImageCard
    },
    data() {
      return {
        isLoading: true
      }
    },
    computed: {
      listAnimeRecommendations(){
        return this.$store.state.animeRecommendations.slice(0, 6)
      },
      listAnimeNow(){
        return this.$store.state.animeNow.slice(0, 6)
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
      async fetchAnimeNow(){
        try{
          await this.$store.dispatch('fetchAnimeNow')
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
      goToRecommendation(){
        this.$router.push({name: 'recommendation'})
      },
      goToSeasonNow(){
        this.$router.push({name: 'season-now'})
      },
    },
    mounted() {
      this.fetchAnimeRecommendations()
      this.fetchAnimeNow()
    }
  }
</script>

