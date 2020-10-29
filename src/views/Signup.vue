<template>
  <div class="page page--login">
    <h1 class="text-center mb-32">Sign up</h1>
    <el-form label-position="top" ref="form" :model="form" :rules="rules" size="medium">
      <el-form-item>
        <template #label>
          <i class="el-icon-s-comment"></i>
          Native language
        </template>
        <select-language :value.sync="form.nativeLanguage"></select-language>
        <el-form-item label="Level" class="ml-16">
          <el-radio-group v-model="form.nativeLanguageLevel">
            <el-radio-button label="fluent">Fluent</el-radio-button>
            <el-radio-button label="near-fluent">Near fluent</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <template #label>
          <i class="el-icon-edit"></i>
          Language of interest
        </template>

        <select-language :value.sync="form.interestLanguage"></select-language>
        <el-form-item class="ml-16">
          <template #label>
            <p>Level <i @click="openDialog" class="el-icon-question cursor"></i></p>
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

      <el-divider>Almost there!</el-divider>

      <!-- Email  -->
      <el-form-item prop="email">
        <template #label>
          <i class="el-icon-message"></i>
          Email Address
        </template>
        <el-input
          type="email"
          autocomplete="on"
          placeholder="Email Address"
          v-model="form.email"
        ></el-input>
      </el-form-item>

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

      <!-- Password  -->
      <el-form-item prop="password">
        <template #label>
          <i class=" el-icon-lock"></i>
          Password
          <p class="text-small">
            Passwords must be <b>8 or more characters</b>. Please choose a unique password that
            isn't easy to guess.
          </p>
        </template>
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="on"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item class="center">
        <el-button type="primary" size="medium" @click="submitForm" :loading="loading" round>
          Sign up
        </el-button>
      </el-form-item>
    </el-form>
    <div class="text-center">
      <router-link tag="el-link" to="/login">
        Already have an account. Login here!
      </router-link>
    </div>

    <!-- Dialog  -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      custom-class="symbol-dialog"
      :append-to-body="true"
    >
      <template #title>
        <level-icon level="2" class="symbol-dialog__title">
          <h2>What’s this symbol?</h2>
        </level-icon>
        <p>
          The Language Level symbol shows a user's proficiency in the languages they're interested
          in. Setting your Language Level helps other users provide you with answers that aren't too
          complex or too simple.
        </p>
      </template>
      <div>
        <level-icon level="1">Beginner</level-icon>
        Has difficulty understanding even short answers in this language.
        <el-divider></el-divider>
        <level-icon level="2">Beginner-Intermediate</level-icon>
        Can ask simple questions and can understand simple answers.
        <el-divider></el-divider>
        <level-icon level="3">Intermediate</level-icon>
        Can ask all types of general questions and can understand longer answers.
        <el-divider></el-divider>
        <level-icon level="4">Advanced</level-icon>
        Can understand long, complex answers.
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LevelIcon from '@/components/atoms/LevelIcon.vue';
import SelectLanguage from '@/components/atoms/SelectLanguage.vue';
import SelectCountry from '@/components/atoms/SelectCountry.vue';
import { db, auth } from '@/firebase';
import { Message } from 'element-ui';

export default {
  name: 'Signup',
  components: {
    LevelIcon,
    SelectCountry,
    SelectLanguage,
  },

  data() {
    return {
      loading: false,
      form: {
        nativeLanguage: 'en',
        nativeLanguageLevel: 'fluent',
        interestLanguage: 'en',
        interestLanguageLevel: 'beginner',
        knowingCountry: 'US',
        interestCountry: 'US',
        email: '',
        username: '',
        password: '',
      },
      rules: {
        email: [
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: 'blur',
          },
          { required: true, message: 'Please input email address', trigger: 'blur' },
        ],
        username: [
          { required: true, message: 'Please input your username', trigger: 'blur' },
          {
            min: 3,
            max: 26,
            message: 'Please enter from 3 to 26 characters',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: 'Please input the password', trigger: 'blur' },
          { min: 8, message: 'Please enter at least 8 characters', trigger: 'blur' },
        ],
      },
      dialogVisible: false,
    };
  },

  methods: {
    openDialog() {
      this.dialogVisible = true;
    },

    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.createUser();
          return true;
        }
        return false;
      });
    },

    createUser() {
      this.loading = true;
      // eslint-disable-next-line object-curly-newline
      const { email, password, username, ...profile } = this.form;
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          // Update profile
          res.user
            .updateProfile({
              displayName: username,
              photoURL:
                'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Favatar-default.webp?alt=media&token=22fe2ae6-3a19-48cd-9fab-582df2d2f879',
            })
            .then(({ user }) => {
              const userData = {
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName,
                email: user.email,
              };
              // Save user and token to store
              this.$store.commit('auth/saveUser', userData);
            });

          const user = {
            username,
            email,
            id: res.user.uid,
            createdAt: new Date(),
            photoURL:
              'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Favatar-default.webp?alt=media&token=22fe2ae6-3a19-48cd-9fab-582df2d2f879',
            ...profile,
          };

          // Save to Firestore
          db.collection('users')
            .doc(res.user.uid)
            .set(user)
            .then(() => {
              this.$router.push('/home');
            })
            .catch((err) => {
              console.error(err);
            });
          this.loading = false;
        })
        .catch((error) => {
          const errorMessage = error.message;
          Message.error(errorMessage);
          this.loading = false;
        });
    },
  },
};
</script>
