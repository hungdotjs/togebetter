<template>
  <div class="post-detail__comment-form">
    <el-avatar class="post-detail__comment-form__avatar" :size="32" :src="user.photoURL">
    </el-avatar>
    <div class="w-100">
      <photo-uploaded :photoURL="photoURL" @remove="removePhoto"></photo-uploaded>
      <el-input
        style="font-size: inherit"
        type="textarea"
        :placeholder="placeholder"
        v-model="text"
        :rows="4"
        resize="none"
      ></el-input>
      <div class=" post-detail__comment-form__input-wrapper">
        <el-upload
          action="#"
          accept="image/*"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleChangeUpload"
        >
          <button class="post-detail__comment-form__button">
            <i class="iconfont icon-photo"></i> Upload Image
          </button>
        </el-upload>
      </div>
      <el-button type="primary" @click="submit" :loading="loading" size="small">
        Add comment
      </el-button>
    </div>
  </div>
</template>

<script>
import upload from '@/mixins/upload';
import { mapState } from 'vuex';
import PhotoUploaded from '@/components/atoms/PhotoUploaded.vue';

export default {
  name: 'InputReply',
  mixins: [upload],
  components: {
    PhotoUploaded,
  },

  props: {
    placeholder: {
      type: String,
      default: 'Add to the disscussion',
    },

    parentID: {
      type: String,
      required: true,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      text: '',
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  methods: {
    submit() {
      this.$emit('submit', {
        content: this.text,
        photoURL: this.photoURL,
        parentID: this.parentID,
      });
      this.text = '';
      this.photoURL = '';
    },
  },
};
</script>
