<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  components: { ContentLoader },
};
</script>

<template>
  <content-loader
    :width="476"
    :height="250"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="50" y="54" rx="3" ry="3" width="88" height="6" />
    <rect x="50" y="72" rx="3" ry="3" width="52" height="6" />
    <rect x="7" y="102" rx="3" ry="3" width="410" height="6" />
    <rect x="7" y="118" rx="3" ry="3" width="380" height="6" />
    <rect x="7" y="134" rx="3" ry="3" width="178" height="6" />
    <circle cx="26" cy="67" r="16" />
    <rect x="8" y="156" rx="3" ry="3" width="52" height="6" />
    <rect x="4" y="3" rx="3" ry="3" width="392" height="8" />
    <rect x="4" y="33" rx="3" ry="3" width="52" height="6" />
    <rect x="6" y="177" rx="3" ry="3" width="410" height="6" />
    <rect x="6" y="193" rx="3" ry="3" width="380" height="6" />
    <rect x="6" y="209" rx="3" ry="3" width="178" height="6" />
    <rect x="7" y="231" rx="3" ry="3" width="52" height="6" />
  </content-loader>
</template>
