<template>
  <div class="container">
    <div class="home main-layout">
      <question-bubble
        v-for="question in questions"
        :key="question.id"
        :content="question"
      ></question-bubble>
    </div>
  </div>
</template>

<script>
import QuestionBubble from '@/components/molecules/QuestionBubble.vue';
import { db } from '@/firebase';

export default {
  name: 'Home',
  components: {
    QuestionBubble,
  },

  data() {
    return {
      limit: 10,
      questions: [],
    };
  },

  created() {
    db.collection('questions')
      .limit(this.limit)
      .get()
      .then((querySnapshot) => {
        const questions = [];
        querySnapshot.forEach((doc) => {
          questions.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.questions = this.questions.concat(questions);
      });
  },
};
</script>
