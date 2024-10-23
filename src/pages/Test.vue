<template>
  <MyComponent @componentClick="MyComponentClickEvent" :is-show="isShow" />
</template>

<script setup>
import { ref } from "vue";
import MyComponent from "../components/MyComponent.vue"
const isShow = ref(false)
function MyComponentClickEvent() {
  console.log("custom component function click event");
  isShow.value=!isShow.value
}

</script>

<style lang="scss" scoped></style>
