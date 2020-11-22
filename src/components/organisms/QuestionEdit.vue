<template>
  <div class="question-new">
    <div class="mb-16 text-center">
      <h2 class="text-bold">{{ questionType | questionTitle }}</h2>
      <select-language :value.sync="selectedLang" style="max-width: 400px;"></select-language>
    </div>
    <div class="mb-16">
      <p class="text-bold">Question</p>
      <el-input
        type="textarea"
        v-model="question"
        :autosize="{ minRows: 4, maxRows: 6 }"
        resize="none"
        class="mb-16"
        placeholder="word, phrase or sentence"
      ></el-input>
    </div>
    <div class="mb-16 text-center">
      <el-upload
        action="#"
        accept="image/*"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChangeUpload"
      >
        <el-button icon="el-icon-camera-solid" plain>Upload Image</el-button>
      </el-upload>
      <div v-if="photoURL" style="position: relative; width: fit-content; margin: 8px auto;">
        <el-image :src="photoURL" class="question-new__image" fit="cover">
          <div slot="placeholder" class="text-center p-16">
            <i class="el-icon-loading"></i>
          </div>
        </el-image>
        <span @click="removePhoto" class="answer-form__image__remove">
          <i class="el-icon-error"></i>
        </span>
      </div>
    </div>
    <div class="text-center mb-16">
      <record-audio @done="handleRecordAudio" :disable-preview="true">
        <button class="question-new__button-mic">
          <i class="iconfont icon-mic"></i>
        </button>
      </record-audio>
      <p class="color-secondary text-small">Click to record a voice answer</p>
    </div>
    <div class="answer-form__audio" v-if="audioURL">
      <audio :src="audioURL" controls>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <span class="answer-form__audio__remove" @click="removeAudio">
        <i class="el-icon-error"></i>
      </span>
    </div>
    <div class="mb-16">
      <p class="text-bold">
        Additional Information <small class="text-small color-secondary">(optional)</small>
      </p>
      <el-input
        type="textarea"
        v-model="additionalInformation"
        :autosize="{ minRows: 4, maxRows: 6 }"
        resize="none"
        placeholder="Write additional information here. You can write in any language."
      ></el-input>
    </div>
    <div class="text-center">
      <el-button type="primary" size="medium" :loading="loadingSubmit" round @click="submit">
        Save
      </el-button>
    </div>
  </div>
</template>

<script>
import uploadMixin from '@/mixins/upload';
import RecordAudio from '@/components/atoms/RecordAudio.vue';
import SelectLanguage from '@/components/atoms/SelectLanguage.vue';
import { db, FieldValue } from '@/firebase';
import { questionsIndex } from '@/algolia';

export default {
  name: 'QuestionEdit',
  components: {
    SelectLanguage,
    RecordAudio,
  },
  mixins: [uploadMixin],

  props: {
    questionData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      loadingSubmit: false,
      selectedLang: 'en',
      question: '',
      additionalInformation: '',
      questionType: '',
      id: '',
    };
  },

  created() {
    const {
      lang,
      content,
      id,
      questionType,
      additionalInformation,
      audioURL,
      photoURL,
    } = this.questionData;
    this.selectedLang = lang;
    this.question = content;
    this.id = id;
    this.questionType = questionType;
    this.additionalInformation = additionalInformation;
    this.audioURL = audioURL;
    this.photoURL = photoURL;
  },

  methods: {
    async submit() {
      this.loadingSubmit = true;
      const input = {
        lang: this.selectedLang,
        content: this.question,
        audioURL: this.audioURL,
        photoURL: this.photoURL,
        additionalInformation: this.additionalInformation,
        updatedAt: FieldValue.serverTimestamp(),
      };

      await db
        .collection('questions')
        .doc(this.id)
        .update(input);

      await questionsIndex.partialUpdateObject({
        objectID: this.id,
        lang: this.selectedLang,
        content: this.question,
        audioURL: this.audioURL,
        photoURL: this.photoURL,
      });
      this.loadingSubmit = false;
      this.$router.go();
    },
  },

  filters: {
    questionTitle(value) {
      switch (value) {
        case 'what-mean':
          return 'What does this mean in ~?';
        case 'sound-natural':
          return 'Does this sound natural in ~?';
        case 'example':
          return 'Please show me example sentences with?';
        case 'difference':
          return "What's the difference between ~ and ~ in ~?";
        case 'your-pronounce':
          return 'Please show me how to pronounce?';
        case 'my-pronounce':
          return "How's my pronunciation?";
        case 'free-question':
          return 'Ask about a country, culture or anything you want.';
        default:
          return 'How do you say this in ~?';
      }
    },
  },
};
</script>
