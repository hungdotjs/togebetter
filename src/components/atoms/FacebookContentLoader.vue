<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  components: { ContentLoader },
};
</script>

<template>
  <div class="p-16 border round mb-16">
    <content-loader
      :width="476"
      :height="124"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="43" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="43" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="16" />
      <rect x="1" y="110" rx="3" ry="3" width="52" height="6" />
    </content-loader>
  </div>
</template>
