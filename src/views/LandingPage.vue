<template>
  <div class="landing-page">
    <!-- Hero  -->
    <div class="hero hero-bg">
      <el-row :gutter="42">
        <el-col :xs="24" :sm="12">
          <lottie-animation path="img/welcome.json" />
        </el-col>
        <el-col :xs="24" :sm="12">
          <div class="text-center" style="padding: 20% 0">
            <div class="mb-32 text-center">
              <h1 class="hero__title">A language learning Q&A app</h1>
              <p class="hero__subtitle">Learn foreign languages for free</p>
            </div>
            <p>Search questions about</p>
            <el-select placeholder="Select" class="hero__select" v-model="language" size="medium">
              <el-option label="English (US)" value="en_us"> </el-option>
            </el-select>
            <el-input class="hero__search" placeholder="habit example" size="medium">
              <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
            </el-input>
            <router-link tag="div" to="/signup">
              <el-button type="primary" size="medium" class="text-bold">Join us</el-button>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Newest questions  -->
    <div class="landing-page__box">
      <h2 class="landing-page__box__title">Newest Questions</h2>
      <el-row :gutter="16">
        <el-col v-for="i in 6" :key="i" :xs="24" :sm="12">
          <div class="landing-page__box__question">
            <p>
              How do you say this in English (US)? 왜 니가 계산하는거야? 내가 낼게
            </p>
            <span type="danger" class="landing-page__box__answer">1</span>
          </div>
        </el-col>
      </el-row>
      <div class="text-center">
        <el-button type="primary" size="medium">Show more</el-button>
      </div>
    </div>

    <!-- Question with language  -->
    <div class="landing-page__box">
      <h2 class="landing-page__box__title">Questions for Korean</h2>
      <el-row :gutter="16">
        <el-col v-for="i in 6" :key="i" :xs="24" :sm="12">
          <div class="landing-page__box__question">
            <p>
              How do you say this in English (US)? 왜 니가 계산하는거야? 내가 낼게
            </p>
            <span type="danger" class="landing-page__box__answer">1</span>
          </div>
        </el-col>
      </el-row>
      <div class="text-center">
        <el-button type="primary" size="medium">Show more</el-button>
      </div>
    </div>
    <el-divider></el-divider>

    <div class="landing-page__info">
      <el-row :gutter="16">
        <el-col :xs="24" :sm="12" class="text-center">
          <lottie-animation :width="250" path="img/earth.json" />
        </el-col>
        <el-col :xs="24" :sm="12">
          <h2 class="mb-16 text-center">
            Get answers from real native speakers of Spanish, French, and other languages you're
            learning!
          </h2>
          <p>
            You can ask questions about any language you want and get answers from real native
            speakers from around the world. You can ask questions like, "How do you say this in
            Spanish?" "What's the difference between these two words?" "Is my pronunciation
            correct?" You can also teach other users about your own native language. We have a
            friendly, give-and-take community waiting to help!
          </p>
        </el-col>
      </el-row>
    </div>

    <el-divider></el-divider>

    <div class="landing-page__info">
      <el-row :gutter="16" class="landing-page__info--reverse">
        <el-col :xs="24" :sm="12">
          <h2 class="mb-16 text-center">
            Even beginners can get great answers from native speakers.
          </h2>
          <p>
            HiNative's question templates make it easy for even beginners to ask great language
            questions. The HiNative community is made up of kind, helpful users who are here to help
            you learn. You can even get help with your pronunciation. Just upload an audio answer to
            get tips and pointers from other users.
          </p>
        </el-col>
        <el-col :xs="24" :sm="12" class="text-center">
          <lottie-animation :width="250" path="img/message.json" />
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>

    <div class="landing-page__info">
      <el-row :gutter="16">
        <el-col :xs="24" :sm="12" class="text-center">
          <lottie-animation :width="250" path="img/heart.json" />
        </el-col>
        <el-col :xs="24" :sm="12">
          <h2 class="mb-16 text-center">
            Full of useful features for learning languages
          </h2>
          <ul class="landing-page__feature">
            <li>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/icon%2Ffeature-speaker.svg?alt=media&token=c9662f47-3957-4606-a7de-ca30925c6472"
                alt="#"
              />
              <span>
                Post voice questions and answers via a simple app interface
              </span>
            </li>
            <li>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/icon%2Ffeature-streak.svg?alt=media&token=1cb024a7-870e-4e7a-9543-ebc3513c499b"
                alt="#"
              />
              <span>
                Question templates make asking questions easy
              </span>
            </li>
            <li>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/icon%2Ffeature-check.svg?alt=media&token=93bd0381-9270-4930-9135-1b2c17f9b893"
                alt="#"
              />
              <span>
                Ask in English, Spanish, or any language you want and get the answer!
              </span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue';

export default {
  name: 'LandingPage',
  components: {
    LottieAnimation,
  },

  data() {
    return {
      language: 'en_us',
    };
  },
};
</script>
