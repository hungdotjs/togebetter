<template>
  <div class="page page--login">
    <h1 class="text-center mb-32">Sign up</h1>
    <el-form label-position="top" ref="form" :model="form" :rules="rules" size="medium">
      <el-form-item>
        <template #label>
          <i class="el-icon-s-comment"></i>
          Native language
        </template>
        <el-select v-model="form.nativeLanguage" class="w-100">
          <el-option value="en_us" label="English (US)"> </el-option>
        </el-select>
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
        <el-select v-model="form.interestLanguage" class="w-100 mb-8">
          <el-option value="en_us" label="English (US)"> </el-option>
        </el-select>
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
        <el-select v-model="form.knowingCountry" class="w-100 mb-8">
          <el-option value="us" label="United States"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <template #label>
          <i class=" el-icon-location"></i>
          Countries and regions of interest
        </template>
        <el-select v-model="form.interestCountry" class="w-100 mb-8">
          <el-option value="us" label="United States"> </el-option>
        </el-select>
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
      <el-form-item prop="name">
        <template #label>
          <i class=" el-icon-user"></i>
          Nickname
          <p class="text-small">From <b>3 to 26</b> characters.</p>
        </template>
        <el-input
          placeholder="Alphanumeric and underline only"
          v-model="form.name"
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
        <el-button type="primary" size="medium" @click="submitForm" round>Sign up</el-button>
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

export default {
  name: 'Login',
  components: {
    LevelIcon,
  },

  data() {
    return {
      form: {
        nativeLanguage: 'en_us',
        nativeLanguageLevel: 'fluent',
        interestLanguage: 'en_us',
        interestLanguageLevel: 'beginner',
        knowingCountry: 'us',
        interestCountry: 'us',
        email: '',
        name: '',
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
        name: [
          { required: true, message: 'Please input your nickname', trigger: 'blur' },
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
          console.log('submit');
          this.$store.dispatch('auth/createUser', this.form);
          return true;
        }
        return false;
      });
    },
  },
};
</script>
