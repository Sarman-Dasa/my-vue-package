<script setup>
import { onMounted, onUpdated, ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
const isShowChild = ref(false);

function increaseValue() {
  console.log('increaseValue: ');
  isShowChild.value = !isShowChild.value
  count.value += 1;
}


onMounted(() => {
  console.log("onMounted");
})

onUpdated(() => {
  console.log("onUpdated");
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="increaseValue">count is {{ count }}</button>
  </div>

  <p v-if="isShowChild">
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
