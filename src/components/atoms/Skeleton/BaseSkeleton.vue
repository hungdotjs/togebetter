<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  components: { ContentLoader },
};
</script>

<template>
  <div class="d-flex">
    <div style="width: 46px; height:46px; margin-right: 8px;">
      <content-loader
        :width="34"
        :height="34"
        :speed="2"
        primaryColor="#ddd"
        secondaryColor="#ecebeb"
        class="mb-16 w-100"
      >
        <circle cx="17" cy="17" r="17" />
      </content-loader>
    </div>
    <div class="p-16 border round bg-white mb-16 bs-border w-100" style="max-width: 544px">
      <content-loader
        :width="424"
        :height="124"
        :speed="2"
        primaryColor="#ddd"
        secondaryColor="#ecebeb"
        class="mb-16 w-100"
      >
        <rect x="0" y="8" rx="3" ry="3" width="88" height="6" />
        <rect x="0" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="45" rx="3" ry="3" width="377" height="6" />
        <rect x="0" y="60" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="76" rx="3" ry="3" width="178" height="6" />
        <rect x="0" y="91" rx="3" ry="3" width="178" height="6" />
        <rect x="337" y="6" rx="3" ry="3" width="88" height="6" />
      </content-loader>
    </div>
  </div>
</template>
