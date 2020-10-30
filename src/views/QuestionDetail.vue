<template>
  <div class="container">
    <div v-loading="loading" class="question-detail main-layout">
      <div class="question-detail__content">
        <chat-bubble></chat-bubble>
      </div>

      <div class="answer-form">
        <div v-if="photoURL" style="position: relative; width: fit-content;">
          <el-image :src="photoURL" class="answer-form__image" fit="cover">
            <div slot="placeholder" class="text-center p-16">
              <i class="el-icon-loading"></i>
            </div>
          </el-image>
          <span @click="removePhoto" class="answer-form__image__remove">
            <i class="el-icon-error"></i>
          </span>
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
        <div class="answer-form__input-wrapper">
          <el-input
            class="answer-form__input"
            type="textarea"
            v-model="answer"
            placeholder="Answer in his/her native language as he/she is a beginner speaker."
            :autosize="{ minRows: 3, maxRows: 5 }"
            resize="none"
          >
          </el-input>
          <el-button
            class="answer-form__send"
            type="primary"
            size="mini"
            icon="el-icon-right"
            :loading="loadingSubmit"
            :disabled="!alreadyInput"
            @click="submit"
          ></el-button>
        </div>
        <div class="button-group">
          <div class="button-group__item">
            <i class="iconfont icon-keyboard"></i>
          </div>
          <record-audio
            @done="handleRecordAudio"
            class="button-group__item"
            :disable-preview="true"
          >
            <i class="iconfont icon-mic"></i>
          </record-audio>
          <el-upload
            action="#"
            accept="image/*"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleChangeUpload"
          >
            <div class="button-group__item">
              <i class="iconfont icon-camera"></i>
            </div>
          </el-upload>
          <chat-sticker @select="selectSticker">
            <div class="button-group__item">
              <i class="iconfont icon-smile"></i>
            </div>
          </chat-sticker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatBubble from '@/components/molecules/ChatBubble.vue';
import RecordAudio from '@/components/atoms/RecordAudio.vue';
import ChatSticker from '@/components/atoms/ChatSticker.vue';
import { storage, db, FieldValue } from '@/firebase';
import { mapState } from 'vuex';
import generateUID from '@/helpers/generateUID';
import { Message } from 'element-ui';

export default {
  name: 'Home',
  components: {
    ChatBubble,
    RecordAudio,
    ChatSticker,
  },

  data() {
    return {
      loading: false,
      loadingSubmit: false,
      audioRef: null,
      photoRef: null,
      answer: '',
      audioURL: '',
      photoURL: '',
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    alreadyInput() {
      return !!this.answer || !!this.audioURL || !!this.photoURL;
    },
  },

  created() {
    const { id } = this.$route.params;
    db.collection('questions')
      .doc(id)
      .get()
      .then((res) => {
        if (res.exists) {
          console.log('Document data:', res.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      });
  },

  methods: {
    async handleChangeUpload(file) {
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

      this.loading = true;
      const uid = generateUID();
      const storagePhotoRef = storage.ref(`assets/images/${uid}`);
      this.photoRef = storagePhotoRef;
      await storagePhotoRef.put(file.raw);
      const downloadURL = await storagePhotoRef.getDownloadURL();
      this.photoURL = downloadURL;
      this.loading = false;
    },

    removePhoto() {
      this.loading = true;
      this.photoRef.delete().then(() => {
        this.photoURL = '';
        this.loading = false;
      });
    },

    async handleRecordAudio(file) {
      this.loading = true;
      const uid = generateUID();
      const storageAudioRef = storage.ref(`assets/audio/${uid}`);
      this.audioRef = storageAudioRef;
      await storageAudioRef.put(file);
      const downloadURL = await storageAudioRef.getDownloadURL();
      this.audioURL = downloadURL;
      this.loading = false;
    },

    removeAudio() {
      this.loading = true;
      this.audioRef.delete().then(() => {
        this.audioURL = '';
        this.loading = false;
      });
    },

    selectSticker(stickerURL) {
      this.photoURL = stickerURL;
      this.answer = '';
      this.audioURL = '';
      this.submit();
    },

    async submit() {
      this.loadingSubmit = true;
      const input = {
        questionID: this.$route.params.id,
        ownerID: this.user.uid,
        content: this.answer,
        audioURL: this.audioURL,
        photoURL: this.photoURL,
        votes: [],
        createdAt: FieldValue.serverTimestamp(),
      };
      await db.collection('comments').add(input);
      this.loadingSubmit = false;
      this.photoURL = '';
      this.audioURL = '';
      this.answer = '';
    },
  },
};
</script>
