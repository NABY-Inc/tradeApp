<template>
  <div class="container bg-blue-100 mx-auto px-4 w-full h-screen">
    <hr>
    <div class="p-6 rounded shadow-xl mt-3">
      <h2 class="text-center font-bold text-3xl uppercase">Smart Forex Trading Institute</h2>
      <h3 class="text-center text-xl normal-case">- Trade size app -</h3>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <!-- <a class="rounded shadow-md bg-blue-400 text-white mt-3 p-2"> -->
      <router-link to="/" :class="$route.name == 'Home' ? 'text-white':'hover:text-white'">Home</router-link> |
      <router-link to="/add-asset" :class="$route.name == 'addAsset' ? 'text-white' : 'hover:text-white'">Add Asset</router-link>
    <!-- </a> -->
    </div>
    <router-view/>

    <footer class="mt-5 text-sm text-right">
      <p>Designed with Love by: NABY<sup><small>TM</small></sup></p>
    </footer>
  </div>
</template>

