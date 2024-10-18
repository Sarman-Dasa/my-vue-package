<template>
    <div class="my-component">
      <h2>{{ message }}</h2>
      <button @click="clickHandler">Click Me!</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const message = ref('Hello from MyComponent!');
  const clickHandler = () => {
    alert('Button Clicked!');
  };
  </script>
  
  <style>
  .my-component {
    text-align: center;
    border: 1px solid #6f83e6;
    padding: 1em;
    border-radius: 8px;
  }
  </style>
  