<template>
  <div class="notifications">
    <div class="notifications__image">
      <el-image
        src="https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fhugo-page-not-found.png?alt=media&token=531c0b77-2678-4636-b19e-8556d782c6b9"
        lazy
      ></el-image>
    </div>
    <h1 class="text-bold">Page Not Found</h1>
    <router-link :to="{ name: 'home' }">
      <el-button type="primary">Back to Home</el-button>
    </router-link>
  </div>
</template>
