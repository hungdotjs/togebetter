<template>
  <div>
    <div class="mb-16">
      <el-button size="large" class="w-100 btn--google" round @click="logInWithGoogle">
        <span class="center">
          <img
            src="https://cdn.svgporn.com/logos/google-icon.svg"
            alt="google"
            width="16"
            height="16"
            class="mr-16"
          />
          Continue with Google
        </span>
      </el-button>
    </div>
    <div class="mb-16">
      <el-button size="large" class="w-100 btn--facebook" round @click="logInWithFacebook">
        <span class="center">
          <img
            src="https://cdn.svgporn.com/logos/facebook.svg"
            alt="google"
            width="16"
            height="16"
            class="mr-16"
          />
          Continue with Facebook
        </span>
      </el-button>
    </div>
  </div>
</template>

<script>
import { auth, db, GoogleAuthProvider, FacebookAuthProvider, FieldValue } from '@/firebase';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      countryCode: (state) => state.ui.countryCode,
      languageCode: (state) => state.ui.languageCode,
    }),
  },

  methods: {
    async logInWithGoogle() {
      const provider = new GoogleAuthProvider();
      auth
        .signInWithPopup(provider)
        .then((result) => {
          const { uid, email, displayName, photoURL } = result.user;
          const userRef = db.collection('users').doc(uid);
          userRef.get().then(async (doc) => {
            if (doc.exists) {
              // Analytics
              this.$store.dispatch('analytics/login', 'Google');

              this.$router.replace({ name: 'home' });
            } else {
              const user = {
                photoURL,
                username: displayName,
                nativeLanguage: 'en',
                interestLanguages: [{ lang: 'en', level: 'beginner' }],
                knowingCountry: this.countryCode || 'US',
                interestCountry: 'US',
              };
              // Save to Firestore
              await userRef.set({
                email,
                points: 0,
                totalAnswers: 0,
                totalQuestions: 0,
                bio: '',
                loginBy: 'google',
                status: 'active',
                createdAt: FieldValue.serverTimestamp(),
                ...user,
              });

              // Analytics
              this.$store.dispatch('analytics/signUp', 'Google');

              this.$router.replace({ name: 'home' });
            }
          });
        })
        .catch((error) => {
          const { code, message, email, credential } = error;
          console.log(code, message, email, credential);
        });
    },

    logInWithFacebook() {
      const provider = new FacebookAuthProvider();
      provider.addScope('email');
      auth.signInWithPopup(provider).then((result) => {
        const token = result.credential.accessToken;
        const { uid, email, displayName, photoURL } = result.user;
        const userRef = db.collection('users').doc(uid);
        userRef
          .get()
          .then(async (doc) => {
            if (doc.exists) {
              // Analytics
              this.$store.dispatch('analytics/login', 'Facebook');

              this.$router.replace({ name: 'home' });
            } else {
              const user = {
                photoURL: `${photoURL}?access_token=${token}`,
                username: displayName,
                nativeLanguage: 'en',
                interestLanguages: [{ lang: 'en', level: 'beginner' }],
                knowingCountry: this.countryCode || 'US',
                interestCountry: 'US',
              };
              // Save to Firestore
              await userRef.set({
                email,
                points: 0,
                totalAnswers: 0,
                totalQuestions: 0,
                bio: '',
                status: 'active',
                loginBy: 'facebook',
                createdAt: FieldValue.serverTimestamp(),
                ...user,
              });

              // Analytics
              this.$store.dispatch('analytics/signUp', 'Facebook');

              // this.$router.replace({ name: 'home' });
              window.location.replace('/questions');
            }
          })
          .catch((error) => {
            const { code, message, email, credential } = error;
            console.log(code, message, email, credential);
          });
      });
    },
  },
};
</script>
