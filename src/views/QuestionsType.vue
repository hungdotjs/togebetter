<template>
  <div class="questions-type" :class="mode === 'page' && 'box-content'">
    <h1 class="questions-type__title">{{ $t('questions.template.title') }}</h1>
    <h2 class="title">{{ $t('questions.template.subtitle1') }}</h2>
    <question-tag
      :title="$t('questions.template.type1')"
      subtitle="How do you say this in ~~?~~"
      icon="el-icon-question"
      icon-bg="#3ad04c"
      :to="{ name: 'questions-new', params: { type: 'how-say' } }"
    ></question-tag>
    <question-tag
      :title="$t('questions.template.type2')"
      icon="iconfont icon-plant"
      icon-bg="#35bcfd"
      :to="{ name: 'questions-new', params: { type: 'sound-natural' } }"
    ></question-tag>
    <question-tag
      :title="$t('questions.template.type3')"
      subtitle="What does ~~ mean"
      icon="iconfont icon-ask"
      icon-bg="#fa8231"
      :to="{ name: 'questions-new', params: { type: 'what-mean' } }"
    ></question-tag>
    <question-tag
      :title="$t('questions.template.type4')"
      subtitle="What’s the difference between A and B? Feel free to just provide example sentences."
      icon="iconfont icon-vectordifference"
      icon-bg="#b554d9"
      :to="{ name: 'questions-new', params: { type: 'difference' } }"
    ></question-tag>
    <question-tag
      :title="$t('questions.template.type5')"
      subtitle="Please show me example sentences with ~~?"
      icon="iconfont icon-edit"
      icon-bg="#ea4242"
      :to="{ name: 'questions-new', params: { type: 'example' } }"
    ></question-tag>

    <h2 class="title">{{ $t('questions.template.subtitle2') }}</h2>
    <question-tag
      :title="$t('questions.template.type6')"
      subtitle="Please show me how to pronounce ~~."
      icon="iconfont icon-sound"
      icon-bg="#34495e"
      :to="{ name: 'questions-new', params: { type: 'your-pronounce' } }"
    ></question-tag>
    <question-tag
      :title="$t('questions.template.type7')"
      subtitle="How's my pronunciation? Please record yours too."
      icon="iconfont icon-sound"
      icon-bg="#2bcbba"
      :to="{ name: 'questions-new', params: { type: 'my-pronounce' } }"
    ></question-tag>

    <h2 class="title">{{ $t('questions.template.subtitle3') }}</h2>
    <question-tag
      :title="$t('questions.template.type8')"
      icon="iconfont icon-smile"
      icon-bg="#fed330"
      :to="{ name: 'questions-new', params: { type: 'free-question' } }"
    ></question-tag>
  </div>
</template>

<script>
import QuestionTag from '@/components/molecules/QuestionTag.vue';

export default {
  name: 'QuestionsType',
  components: {
    QuestionTag,
  },

  props: {
    mode: {
      type: String,
      default: 'page',
    },
  },
};
</script>
