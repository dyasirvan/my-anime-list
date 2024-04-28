<template>
  <v-container>
    <v-btn color="primary" @click="back" class="my-3">Kembali</v-btn>
    <v-text-field
        v-model="searchQuery"
        label="Search"
        class="my-3"
    ></v-text-field>
    <h2 class="my-5">Season Now</h2>
    <v-row>
      <v-col
          v-for="now in filteredSeasonNow"
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

  export default {
    name: 'SeasonNowView',
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
      listAnimeNow(){
        return this.$store.state.animeNow
      },
      filteredSeasonNow() {
        if (!this.searchQuery) {
          return this.listAnimeNow;
        }
        return this.listAnimeNow.filter(anime =>
            anime.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
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
      back(){
        this.$router.go(-1)
      }
    },
    mounted() {
      this.fetchAnimeNow()
    }
  }
</script>

