<template>
    <nav class="navbar">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/test">Test</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #2c3e50;
    padding: 1rem;
  }
  
  .nav-list {
    list-style-type: none;
    display: flex;
    gap: 1rem;
  }
  
  .nav-item {
    color: white;
  }
  
  .nav-item a {
    color: white;
    text-decoration: none;
  }
  
  .nav-item a:hover {
    text-decoration: underline;
  }
  </style>
  