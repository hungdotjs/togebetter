<template>
  <div class="edit-profile">
    <h1>Edit Profile</h1>
    <div class="edit-profile__wrapper">
      <el-form label-position="top" ref="form" :model="form" :rules="rules" size="medium">
        <el-upload
          action="#"
          accept="image/*"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleChangeUpload"
        >
          <el-tooltip content="Click to change" placement="top">
            <el-avatar :src="form.photoURL" :size="80"></el-avatar>
          </el-tooltip>
        </el-upload>
        <!-- Username  -->
        <el-form-item prop="username">
          <template #label>
            <i class=" el-icon-user"></i>
            Username
            <p class="text-small">From <b>3 to 26</b> characters.</p>
          </template>
          <el-input
            placeholder="Alphanumeric and underline only"
            v-model="form.username"
            autocomplete="on"
            :minlength="3"
            :maxlength="26"
          ></el-input>
        </el-form-item>

        <!-- Bio  -->
        <el-form-item prop="bio">
          <template #label>
            <i class="el-icon-coffee-cup"></i>
            About me
          </template>
          <el-input
            placeholder="Describe who you are"
            v-model="form.bio"
            type="textarea"
            maxlength="101"
            rows="3"
            resize="none"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item>
          <template #label>
            <i class="el-icon-s-comment"></i>
            Native language
          </template>
          <select-language :value.sync="form.nativeLanguage"></select-language>
          <!-- <el-form-item label="Level" class="ml-16">
            <el-radio-group v-model="form.nativeLanguageLevel">
              <el-radio-button label="fluent">Fluent</el-radio-button>
              <el-radio-button label="near-fluent">Near fluent</el-radio-button>
            </el-radio-group>
          </el-form-item> -->
        </el-form-item>

        <el-form-item>
          <template #label>
            <i class="el-icon-edit"></i>
            Language of interest
          </template>

          <select-language :value.sync="form.interestLanguage"></select-language>
          <el-form-item class="ml-16">
            <template #label>
              <p>Level</p>
              <p class="text-small line-height-rs">
                This will help other users when they answer your questions.
              </p>
            </template>
            <el-radio-group v-model="form.interestLanguageLevel" class="custom-radio-group">
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
        </el-form-item>

        <el-form-item>
          <template #label>
            <i class=" el-icon-location"></i>
            Country or region you know well
          </template>
          <select-country :value.sync="form.knowingCountry"></select-country>
        </el-form-item>

        <el-form-item>
          <template #label>
            <i class=" el-icon-location"></i>
            Countries and regions of interest
          </template>
          <select-country :value.sync="form.interestCountry"></select-country>
        </el-form-item>

        <el-form-item class="center">
          <el-button type="primary" size="medium" @click="submitForm" :loading="loading" round>
            Save
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SelectLanguage from '@/components/atoms/SelectLanguage.vue';
import SelectCountry from '@/components/atoms/SelectCountry.vue';
import { Message } from 'element-ui';
import generateUID from '@/helpers/generateUID';
import { db, database, storage, FieldValue } from '@/firebase';

export default {
  name: 'EditProfile',
  components: {
    SelectLanguage,
    SelectCountry,
  },

  data() {
    return {
      file: null,
      loading: false,
      form: {
        nativeLanguage: 'en',
        // nativeLanguageLevel: 'fluent',
        interestLanguage: 'en',
        interestLanguageLevel: 'beginner',
        knowingCountry: 'US',
        interestCountry: 'US',
        photoURL: '',
        username: '',
        bio: '',
      },
      rules: {
        username: [
          {
            min: 3,
            max: 26,
            message: 'Please enter from 3 to 26 characters',
            trigger: 'blur',
          },
        ],
      },
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  mounted() {
    const { id } = this.$route.params;
    if (!this.user || this.user.id !== id) {
      this.$router.push({ name: 'profile', params: { id } });
    } else {
      this.form.nativeLanguage = this.user.nativeLanguage;
      // this.form.nativeLanguageLevel = this.user.nativeLanguageLevel;
      this.form.interestLanguage = this.user.interestLanguage;
      this.form.interestLanguageLevel = this.user.interestLanguageLevel;
      this.form.knowingCountry = this.user.knowingCountry;
      this.form.interestCountry = this.user.interestCountry;
      this.form.photoURL = this.user.photoURL;
      this.form.username = this.user.username;
      this.form.bio = this.user.bio;
    }
  },

  methods: {
    async submitForm() {
      this.loading = true;
      if (this.file) {
        const uid = `${generateUID()}_${this.file.uid}`;
        const storagePhotoRef = storage.ref(`assets/images/${uid}`);
        this.photoRef = storagePhotoRef;
        await storagePhotoRef.put(this.file);
        const downloadURL = await storagePhotoRef.getDownloadURL();
        this.form.photoURL = downloadURL;
      }

      await db
        .collection('users')
        .doc(this.user.id)
        .update({
          updatedAt: FieldValue.serverTimestamp(),
          ...this.form,
        });

      await database.ref(`users/${this.user.id}`).update({ ...this.form });

      this.loading = false;
      this.$router.replace({ name: 'profile', params: { id: this.user.id } });
    },

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

      this.form.photoURL = URL.createObjectURL(file.raw);
      this.file = file.raw;
    },
  },
};
</script>
