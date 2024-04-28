<template>
  <v-card :style="{cursor: 'pointer'}" @click="handleClick">
    <v-img
        :src="image"
        aspect-ratio="1.7"
    ></v-img>
    <v-card-text>
      {{ text }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ImageCard',
  props: {
    image: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick(){
      this.$emit('on-click');
    }
  }
}
</script>