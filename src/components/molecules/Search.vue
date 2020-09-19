<template>
  <el-input placeholder="Search questions" v-model="searchKey" class="tb-search">
    <el-select v-model="selectedLang" slot="prepend" placeholder="Select">
      <el-option label="English (US)" value="en_us"></el-option>
    </el-select>
    <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
  </el-input>
</template>

<script>
export default {
  data() {
    return {
      searchKey: '',
      selectedLang: 'en_us',
    };
  },
};
</script>

<style lang="scss">
.tb-search {
  .el-input-group__prepend {
    background-color: #fff;
  }
  .el-select .el-input {
    width: 120px;
  }
  .el-input__inner {
    padding-left: 8px;
  }
}
</style>
