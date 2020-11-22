<template>
  <div>
    <select-language :value.sync="interestLanguage"></select-language>
    <el-form-item class="ml-16">
      <template #label>
        <p>Level</p>
        <p class="text-small line-height-rs">
          This will help other users when they answer your questions.
        </p>
      </template>
      <el-radio-group v-model="interestLanguageLevel" class="custom-radio-group">
        <el-radio-button label="beginner">
          <p class="text-bold">Beginner</p>
          <small>Has difficulty understanding even short answers in this language.</small>
        </el-radio-button>
        <el-radio-button label="beginner-intermediate">
          <p class="text-bold">Beginner-Intermediate</p>
          <small>Can ask simple questions and can understand simple answers.</small>
        </el-radio-button>
        <el-radio-button label="intermediate">
          <p class="text-bold">Intermediate</p>
          <small>
            Can ask all types of general questions and can understand longer answers.
          </small>
        </el-radio-button>
        <el-radio-button label="advanced">
          <p class="text-bold">Advanced</p>
          <small> Can understand long, complex answers. </small>
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => ({
        interestLanguage: 'en',
        interestLanguageLevel: 'beginner',
      }),
    },
  },
};
</script>
