<template>
  <div class="question-new box-content" v-if="user">
    <div class="text-center mb-16">
      <el-image :src="imageURL" fil="fill" class="img-fluid" style="max-width: 150px" lazy>
        <div slot="placeholder" class="image-slot"><i class="el-icon-loading"></i></div>
      </el-image>
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
  <div v-else class="p-32 text-center">
    <el-dialog :visible="true" width="300px" :show-close="false">
      <p>Login or Sign up to continue</p>
      <div slot="footer" class="text-center">
        <router-link to="/login">
          <el-button class="mr-16">Log in</el-button>
        </router-link>
        <router-link to="/signup">
          <el-button type="primary">Sign up</el-button>
        </router-link>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SelectLanguage from '@/components/atoms/SelectLanguage.vue';
import RecordAudio from '@/components/atoms/RecordAudio.vue';
import { mapState } from 'vuex';
import { db, FieldValue } from '@/firebase';
import { questionsIndex } from '@/algolia';
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
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fchat.svg?alt=media&token=4ca928b9-2f7a-419f-914d-8f0c29484ad9';
        case 'difference':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fshapes.svg?alt=media&token=0c8424a0-b3a7-43b0-9ad4-ed207ade5464';
        case 'example':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fpost-it.svg?alt=media&token=5c381344-6f76-41bf-8f8c-22f03b208328';
        case 'free-question':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fsend.svg?alt=media&token=b2ee83e1-823f-4405-aa21-e9521748d767';
        case 'my-pronounce':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fmicrophone.svg?alt=media&token=13a380ea-8eb0-4107-9ea4-e775f793ad87';
        case 'your-pronounce':
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fheadphones.svg?alt=media&token=2167ee6a-d119-47a3-8ae8-52c5910c80cd';
        default:
          return 'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fquestion2.svg?alt=media&token=414d8810-6e33-4d61-8810-404575cdfcac';
      }
    },
  },

  methods: {
    async submit() {
      this.loadingSubmit = true;
      const input = {
        ownerID: this.user.id,
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
      await db
        .collection('users')
        .doc(this.user.id)
        .update({
          totalQuestions: FieldValue.increment(1),
        });
      await questionsIndex.saveObject({
        objectID: res.id,
        ownerID: this.user.id,
        lang: this.selectedLang,
        content: this.question,
        audioURL: this.audioURL,
        photoURL: this.photoURL,
        questionType: this.questionType,
        votes: 0,
        answers: 0,
      });
      this.loadingSubmit = false;

      // Analytics
      this.$store.dispatch('analytics/ask', {
        userID: this.user.id,
        lang: this.selectedLang,
        questionType: this.questionType,
      });

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
