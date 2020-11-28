<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  components: { ContentLoader },
};
</script>

<template>
  <content-loader
    :width="424"
    :height="124"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    class="mb-16"
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
    <rect x="49" y="45" rx="3" ry="3" width="377" height="6" />
    <rect x="49" y="60" rx="3" ry="3" width="380" height="6" />
    <rect x="49" y="76" rx="3" ry="3" width="178" height="6" />
    <circle cx="20" cy="20" r="20" />
    <rect x="49" y="91" rx="3" ry="3" width="178" height="6" />
    <rect x="337" y="6" rx="3" ry="3" width="88" height="6" />
  </content-loader>
</template>
