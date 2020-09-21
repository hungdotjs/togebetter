<template>
  <div class="page page--login">
    <h1 class="title text-center">Sign up</h1>
    <el-divider></el-divider>
    <el-form label-position="top">
      <el-form-item>
        <template #label>
          <i class="el-icon-s-comment"></i>
          Native language
          <el-tag type="danger" effect="dark" size="mini" class="ml-8">
            required
          </el-tag>
        </template>
        <el-select v-model="nativeLanguage" class="w-100">
          <el-option value="en_us" label="English (US)"> </el-option>
        </el-select>
        <el-form-item label="Level" class="ml-8">
          <el-radio-group v-model="nativeLanguageLevel">
            <el-radio-button label="Fluent"></el-radio-button>
            <el-radio-button label="Near fluent"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <template #label>
          <i class="el-icon-edit"></i>
          Language of interest
          <el-tag type="danger" effect="dark" size="mini" class="ml-8">
            required
          </el-tag>
        </template>
        <el-select v-model="interestLanguage" class="w-100 mb-8">
          <el-option value="en_us" label="English (US)"> </el-option>
        </el-select>
        <el-form-item class="ml-8">
          <template #label>
            <p>Level <i @click="openDialog" class="el-icon-question"></i></p>
            <p class="text-small line-height-rs">
              This will help other users when they answer your questions.
            </p>
          </template>
          <el-radio-group v-model="interestLanguageLevel">
            <el-radio-button label="Beginner"></el-radio-button>
            <el-radio-button label="Beginner-Intermediate"></el-radio-button>
            <el-radio-button label="Intermediate"></el-radio-button>
            <el-radio-button label="Advanced"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form-item>
    </el-form>
    <level-icon></level-icon>
    <el-dialog> <level-icon></level-icon> </el-dialog>
  </div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import LevelIcon from '@/components/atoms/LevelIcon.vue';

export default {
  name: 'Login',
  components: {
    LevelIcon,
  },

  data() {
    return {
      nativeLanguage: 'en_us',
      nativeLanguageLevel: 'Fluent',
      interestLanguage: 'en_us',
      interestLanguageLevel: 'Beginner',
    };
  },

  created() {
    // Set layout
    this.$emit('update:layout', LayoutDefault);
  },
};
</script>
