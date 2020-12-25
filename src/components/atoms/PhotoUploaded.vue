<template>
  <div v-if="photoURL" style="position: relative; width: fit-content;">
    <el-image :src="photoURL" class="answer-form__image" fit="cover">
      <div slot="placeholder" class="text-center p-16">
        <i class="el-icon-loading"></i>
      </div>
    </el-image>
    <span @click="removePhoto" class="answer-form__image__remove">
      <i class="el-icon-circle-close"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'PhotoUploaded',

  props: {
    photoURL: {
      type: String,
      required: true,
    },
  },

  methods: {
    removePhoto() {
      this.$emit('remove');
    },
  },
};
</script>
