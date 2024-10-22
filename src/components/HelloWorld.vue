<script setup>
import {  nextTick, ref } from "vue";

defineProps({
  msg: String,
});

const isShowChild = ref(false);
const count = ref(0);


async function increaseValue() {
  count.value +=1
  await nextTick();
  isShowChild.value = !isShowChild.value;
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="increaseValue">
      count is {{ count }}
    </button>
  </div>

  <p v-if="isShowChild" class="read-the-docs">
    Toggle component
  </p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
  padding: 5px;
  border: 2px solid #888;
  border-radius: 10px;
}
</style>
