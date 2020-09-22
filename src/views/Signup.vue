<template>
  <div class="page page--login">
    <h1 class="title text-center">Sign up</h1>
    <el-divider></el-divider>
    <el-form label-position="top" ref="form" :model="form" :rules="rules">
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
        <el-input type="email" placeholder="Email Address" v-model="form.email"></el-input>
      </el-form-item>

      <!-- Username  -->
      <el-form-item prop="username">
        <template #label>
          <i class=" el-icon-user"></i>
          Username
        </template>
        <el-input placeholder="Alphanumeric and underline only" v-model="form.username"></el-input>
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
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item class="center">
        <el-button type="primary" size="medium" @click="submitForm" round>Sign up</el-button>
      </el-form-item>
    </el-form>

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
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import LevelIcon from '@/components/atoms/LevelIcon.vue';

export default {
  name: 'Login',
  components: {
    LevelIcon,
  },

  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (value.length > 8) {
          this.$refs.form.validateField('password');
        }
        callback(new Error('Please enter at least 8 characters'));
      }
    };
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please input the username'));
      } else {
        const re = new RegExp(/^[a-zA-Z0-9_]{3,16}$/);
        if (re.test(value)) {
          this.$refs.form.validateField('username');
        }
        callback(new Error('Please enter at least 3 characters'));
      }
    };

    return {
      form: {
        nativeLanguage: 'en_us',
        nativeLanguageLevel: 'fluent',
        interestLanguage: 'en_us',
        interestLanguageLevel: 'beginner',
        knowingCountry: 'us',
        interestCountry: 'us',
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
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
      },
      dialogVisible: false,
    };
  },

  created() {
    // Set layout
    this.$emit('update:layout', LayoutDefault);
  },

  methods: {
    openDialog() {
      this.dialogVisible = true;
    },

    submitForm() {
      this.$refs.form.validate((valid) => !!valid);
    },
  },
};
</script>

<style lang="scss">
.symbol-dialog {
  &__title {
    font-size: 1.1rem;
    margin-bottom: 16px;
  }
}

.custom-radio-group {
  display: flex;
  flex-direction: column;

  .el-radio-button {
    width: 100%;
    display: block;

    span {
      width: 100%;
      text-align: left;
      border: 1px solid #dcdfe6;
      border-radius: 0 !important;
    }
  }
}
</style>
