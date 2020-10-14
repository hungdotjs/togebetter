<template>
  <div class="question-new container">
    <div class="mb-16">
      <p>How do you say this in</p>
      <el-select v-model="selectedLang" placeholder="Select">
        <el-option label="English (US)" value="en_us"></el-option>
        <el-option label="Vietnamese" value="vi_vn"></el-option>
      </el-select>
    </div>
    <div class="mb-16">
      <p>Question</p>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6 }"
        resize="none"
        class="mb-16"
        placeholder="word, phrase or sentence"
      ></el-input>
      <div class="mb-16">
        <el-button icon="el-icon-camera-solid" plain>Upload Image</el-button>
      </div>
      <div>
        <button class="question-new__button-mic">
          <i class="iconfont icon-mic"></i>
        </button>
        <p class="color-secondary">Click to record a voice answer</p>
      </div>
    </div>
    <div class="mb-16">
      <p>Additional Information</p>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6 }"
        resize="none"
        placeholder="Write additional information here. You can write in any language."
      ></el-input>
    </div>
    <div class="text-center">
      <!-- <p><i class="el-icon-question"></i> Display your question at the top of the page</p>
      <div><el-checkbox>Number of tickets left 0</el-checkbox></div> -->
      <el-button type="primary" size="medium" round>Ask</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'QuestionNew',
  components: {
    // QuestionBubble,
  },

  data() {
    return {
      selectedLang: 'en_us',
    };
  },

};
</script>
