<template>
  <div class="question-new main-layout">
    <div class="text-center mb-16">
      <el-image
        :src="imageURL"
        fil="fill"
        class="img-fluid"
        style="max-width: 150px"
        lazy
      ></el-image>
    </div>
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
        Ask
      </el-button>
    </div>
  </div>
</template>

<script>
import SelectLanguage from '@/components/atoms/SelectLanguage.vue';
import RecordAudio from '@/components/atoms/RecordAudio.vue';
import { mapState } from 'vuex';
import { db, FieldValue } from '@/firebase';
import uploadMixin from '@/mixins/upload';

export default {
  name: 'QuestionNew',
  components: {
    SelectLanguage,
    RecordAudio,
  },
  mixins: [uploadMixin],

  data() {
    return {
      loadingSubmit: false,
      selectedLang: 'en',
      question: '',
      additionalInformation: '',
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    questionType() {
      return this.$route.params.type;
    },

    imageURL() {
      switch (this.questionType) {
        case 'sound-natural':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fconversation.svg?alt=media&token=3bad62ee-816a-4aa6-b8cd-3b1b80c27c96';
        case 'difference':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fcompare.svg?alt=media&token=197f4896-d8da-41b2-84a4-e45216bfc68e';
        case 'example':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fnotes.svg?alt=media&token=a46b3ca0-a2d5-4df4-b625-1d80754ad0f1';
        case 'free-question':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fnative.svg?alt=media&token=24f165f8-0db1-4e73-8381-513952c630a8';
        case 'my-pronounce':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fspeaker.svg?alt=media&token=c5714976-8c54-48e4-bf20-53392b6c7b04';
        case 'your-pronounce':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fmicrophone.svg?alt=media&token=80d1bc6d-0a91-4b0d-a051-b8d001ac587a';
        default:
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fmessage.svg?alt=media&token=b0bb027d-a095-497c-be66-0f2c2c90eea2';
      }
    },
  },

  methods: {
    async submit() {
      this.loadingSubmit = true;
      const input = {
        ownerID: this.user.id,
        ownerInfo: this.user,
        lang: this.selectedLang,
        content: this.question,
        audioURL: this.audioURL,
        photoURL: this.photoURL,
        additionalInformation: this.additionalInformation,
        questionType: this.questionType,
        createdAt: FieldValue.serverTimestamp(),
        comments: [],
        votes: [],
      };
      const res = await db.collection('questions').add(input);
      this.loadingSubmit = false;
      this.$router.push({ name: 'questions-detail', params: { id: res.id } });
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
