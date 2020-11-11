<template>
  <el-input
    placeholder="Search questions"
    v-model="searchKey"
    class="tb-search"
    prefix-icon="iconfont icon-search"
  >
  </el-input>
</template>

<script>
export default {
  data() {
    return {
      searchKey: '',
    };
  },
};
</script>
