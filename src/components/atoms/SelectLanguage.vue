<template>
  <el-select :value="value" class="w-100 mb-8" @change="onChange" filterable>
    <el-option v-for="item in languages" :key="item.code" :value="item.code" :label="item.name">
    </el-option>
  </el-select>
</template>

<script>
import languages from '@/data/languages';

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      languages: [],
    };
  },

  created() {
    this.languages = languages;
  },

  methods: {
    onChange(value) {
      this.$emit('update:value', value);
      this.$emit('change', value);
    },
  },
};
</script>
