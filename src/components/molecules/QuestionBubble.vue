<template>
  <div class="question-bubble">
    <bubble>
      <div @click="goTo">
        <p class="text-small color-secondary"><i class="el-icon-s-comment"></i> Korean</p>
        <div class="color-secondary">Does this sound natural?</div>
        <p class="question-bubble__question__text text-truncate">
          Dear Allan <br />
          Hello,I am the leader of this project，I have already arranged a data well About the
          Hybrid module and Aircraft ground solid-state power models，but I am now out on a business
          trip,I will send it to you later。 <br />
          And feel free to send me an email if you have any question, I will try my best to reply
          ASAP
        </p>

        <el-button
          class="question-bubble__number"
          :type="totalAnswer ? 'danger' : 'primary'"
          circle
        >
          {{ totalAnswer }}
        </el-button>
      </div>
    </bubble>
  </div>
</template>

<script>
import Bubble from '@/components/molecules/Bubble.vue';

export default {
  components: {
    Bubble,
  },

  props: {
    totalAnswer: {
      type: Number,
      default: 0,
    },
    link: {
      type: String,
      default: '/questions/232323',
    },
  },
  data() {
    return {};
  },

  methods: {
    goTo() {
      this.$router.push(this.link);
    },
  },
};
</script>
