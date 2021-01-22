<template>
  <div class="question-related__box">
    <h5 class="question-related__box__title">{{ title }}</h5>
    <question-simple v-for="item in questions" :question="item" :key="item.id"></question-simple>
  </div>
</template>

<script>
import QuestionSimple from '@/components/atoms/QuestionSimple.vue';
import { db } from '@/firebase';

export default {
  name: 'QuestionNeedYourHelp',
  components: {
    QuestionSimple,
  },

  props: {
    title: {
      type: String,
      default: 'We need your help',
    },
    currentQuestionID: {
      type: String,
    },
    user: { default: null },
  },

  data() {
    return {
      questions: [],
    };
  },

  created() {
    db.collection('questions')
      .where('lang', '==', this.user.nativeLanguage)
      .where('comments', '==', [])
      .limit(5)
      .get()
      .then((querySnapshot) => {
        const questions = [];
        querySnapshot.forEach((doc) => {
          if (doc.id === this.currentQuestionID) return;

          questions.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.questions = questions;
      });
  },
};
</script>
