<template>
  <div class="my-component">
    <h2>{{ message }}</h2>
    <button class="my-component-button" @click="clickHandler">Click Me!</button>
    <HelloWorld />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./HelloWorld.vue";
const emit = defineEmits(['componentClick']);

const message = ref("Hello from MyComponent!");
const isShow = ref(false);
const clickHandler = () => {
  isShow.value = !isShow.value;
  emit('componentClick');
  alert("Button Clicked!");
};
</script>

<style>
.my-component {
  text-align: center;
  border: 1px solid #6f83e6;
  padding: 1em;
  border-radius: 8px;
}

.my-component-button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #e9dd54;
  cursor: pointer;
  transition: border-color 0.25s;
  color: #000;
}
button:hover {
  border-color: #646cff;
}
</style>
