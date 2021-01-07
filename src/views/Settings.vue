<template>
  <div class="settings box-content">
    <div style="max-width: 500px">
      <h1>{{ $t('navbar.settings') }}</h1>

      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item :title="$t('settings.translateTo')" name="1">
          <form autocomplete="off">
            <select-language :value.sync="translateTo"></select-language>
            <el-button type="primary" size="mini" @click="changeTranslateLanguage">
              {{ $t('save') }}
            </el-button>
          </form>
        </el-collapse-item>

        <el-collapse-item :title="$t('settings.language')" name="2">
          <form autocomplete="off">
            <el-select v-model="interfaceLanguage" class="w-100 mb-16">
              <el-option value="en" label="English"></el-option>
              <el-option value="vi" label="Tiếng Việt"></el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="changeInterfaceLanguage">
              {{ $t('save') }}
            </el-button>
          </form>
        </el-collapse-item>

        <el-collapse-item
          :disabled="!!user.loginBy"
          :title="$t('settings.changePassword')"
          name="3"
        >
          <form autocomplete="off">
            <p>Old password</p>
            <el-input
              type="password"
              v-model="passwordOld"
              class="mb-8"
              autocomplete="off"
            ></el-input>
            <p>New password</p>
            <el-input type="password" v-model="password" class="mb-8" autocomplete="off"></el-input>
            <p class="text-small">
              Passwords must be 8 or more characters. Please choose a unique password that isn't
              easy to guess.
            </p>
            <p>Confirm password</p>
            <el-input
              type="password"
              v-model="passwordConfirm"
              class="mb-8"
              autocomplete="off"
            ></el-input>
            <el-button type="primary" size="mini" @click="changePassword">Save changes</el-button>
          </form>
        </el-collapse-item>

        <el-collapse-item :title="$t('settings.signout')" name="sign-out"> </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SelectLanguage from '@/components/atoms/SelectLanguage.vue';

export default {
  name: 'Settings',
  components: {
    SelectLanguage,
  },

  data() {
    return {
      activeNames: '0',
      translateTo: 'vi',
      password: '',
      passwordOld: '',
      passwordConfirm: '',
      interfaceLanguage: 'en',
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      languageCode: (state) => state.ui.languageCode,
    }),
  },

  watch: {
    activeNames() {
      if (this.activeNames === 'sign-out') {
        this.$store.dispatch('auth/signOut');
        this.$message({
          type: 'success',
          message: 'Sign out successfully',
        });
        this.$router.push({ name: 'landing-page' });
      }
    },
  },

  created() {
    this.translateTo = this.languageCode;
    this.interfaceLanguage = this.$store.state.ui.interfaceLanguage;
  },

  methods: {
    changeTranslateLanguage() {
      this.$store.commit('ui/changeLanguageCode', this.translateTo);
      this.$message({
        type: 'success',
        message: 'Changed successfully!',
      });
      this.activeNames = '0';
    },

    changeInterfaceLanguage() {
      this.$store.dispatch('ui/changeInterfaceLanguage', this.interfaceLanguage);
      this.$i18n.locale = this.interfaceLanguage;
    },

    changePassword() {
      if (this.password.length < 8) {
        this.$message({
          type: 'error',
          message: 'Passwords must be 8 or more characters',
        });
        return;
      }
      if (this.password !== this.passwordConfirm) {
        this.$message({
          type: 'error',
          message: "Confirm password doesn't match",
        });
        return;
      }

      this.$store.dispatch('auth/changePassword', {
        oldPassword: this.passwordOld,
        newPassword: this.password,
      });
      this.$message({
        type: 'success',
        message: 'Change password successfully!',
      });
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
