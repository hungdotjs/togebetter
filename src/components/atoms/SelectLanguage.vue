<template>
  <el-select v-model="language" class="w-100 mb-8">
    <el-option v-for="item in languages" :key="item.code" :value="item.code" :label="item.name">
    </el-option>
  </el-select>
</template>

<script>
import languages from '@/data/languages';

export default {
  data() {
    return {
      language: '',
      languages: [],
    };
  },

  created() {
    this.languages = languages;
  },
};
</script>
