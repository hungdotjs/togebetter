<template>
  <el-select :value="value" class="w-100 mb-8" @change="onChange" filterable>
    <el-option v-for="item in countries" :key="item.code" :value="item.code" :label="item.name">
    </el-option>
  </el-select>
</template>

<script>
import countries from '@/data/countries';

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      countries: [],
    };
  },

  created() {
    this.countries = countries;
  },

  methods: {
    onChange(value) {
      this.$emit('update:value', value);
    },
  },
};
</script>
