<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/Homepage.vue'
</script>

<template>
  <div id="app">
    <header>
      <div class="header-inner">
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="220" height="150" />

        <div class="wrapper">
          <HelloWorld msg="Welcome to Basszeit" />

          <nav>
            <RouterLink to="/songs">Homepage</RouterLink>
            <RouterLink to="/about">About US</RouterLink>
            <RouterLink to="/get">Music List</RouterLink>
            <RouterLink to="/post">Save Music</RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
/* Outer header is a grid item */
header {
  grid-area: header;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
}

/* Inner header content wrapper */
.header-inner {
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.logo {
  display: block;
  margin: 0;
}

.wrapper {
  flex: 1;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
}



nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
