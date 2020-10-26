<template>
  <div class="container">
    <div class="question-new">
      <div class="mb-16">
        <p class="text-bold">How do you say this in</p>
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
        <div class="mb-16">
          <el-upload
            class="avatar-uploader"
            action="#"
            accept="image/*"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleChangeUpload"
          >
            <el-tooltip content="Click to change" placement="top" v-if="imageUrl">
              <img :src="imageUrl" class="question-new__image" />
            </el-tooltip>
            <el-button v-else icon="el-icon-camera-solid" plain>Upload Image</el-button>
          </el-upload>
        </div>
        <div>
          <record-audio @done="handleRecordAudio">
            <button class="question-new__button-mic">
              <i class="iconfont icon-mic"></i>
            </button>
          </record-audio>
          <p class="color-secondary text-small">Click to record a voice answer</p>
        </div>
      </div>
      <div class="mb-16">
        <p class="text-bold">Additional Information</p>
        <el-input
          type="textarea"
          v-model="additionalInformation"
          :autosize="{ minRows: 4, maxRows: 6 }"
          resize="none"
          placeholder="Write additional information here. You can write in any language."
        ></el-input>
      </div>
      <div class="text-center">
        <el-button type="primary" size="medium" round @click="submit">Ask</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectLanguage from '@/components/atoms/SelectLanguage.vue';
import RecordAudio from '@/components/atoms/RecordAudio.vue';
import { Message } from 'element-ui';
import { mapState } from 'vuex';
import { storage, db } from '@/firebase';
import generateUID from '@/helpers/generateUID';

export default {
  name: 'QuestionNew',
  components: {
    SelectLanguage,
    RecordAudio,
  },

  data() {
    return {
      file: null,
      audio: null,
      imageUrl: '',
      selectedLang: 'en',
      question: '',
      additionalInformation: '',
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  methods: {
    handleChangeUpload(file) {
      const isImage = file.raw.type.includes('image/');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        Message.error('File must be an image!');
        return;
      }

      if (!isLt2M) {
        Message.error('Picture size can not exceed 2MB!');
        return;
      }

      this.imageUrl = URL.createObjectURL(file.raw);
      this.file = file.raw;
    },

    handleRecordAudio(file) {
      this.audio = file;
    },

    submit() {
      const uid = generateUID();
      const input = {
        ownerId: this.user.uid,
        lang: this.selectedLang,
        question: this.question,
        additionalInformation: this.additionalInformation,
      };
      if (this.imageUrl) {
        const storageRef = storage.ref(`assets/images/${uid}`);
        storageRef.put(this.file).then(() => {
          storageRef.getDownloadURL().then((downloadURL) => {
            input.photoURL = downloadURL;
            if (this.audio) {
              const audioUID = generateUID();
              const storageAudioRef = storage.ref(`assets/audio/${audioUID}`);
              storageAudioRef.put(this.audio).then(() => {
                storageAudioRef.getDownloadURL().then((downloadURL) => {
                  input.audioURL = downloadURL;
                  db.collection('posts')
                    .add(input)
                    .then((res) => {
                      console.log(res);
                    });
                });
              });
            } else {
              db.collection('posts')
                .add(input)
                .then((res) => {
                  console.log(res);
                });
            }
          });
        });
      } else {
        db.collection('posts')
          .add(input)
          .then((res) => {
            console.log(res);
          });
      }
    },
  },
};
</script>
