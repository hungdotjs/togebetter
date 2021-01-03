<template>
  <div class="question-related__box">
    <h5 class="question-related__box__title">
      <i class="el-icon-edit mr-8"></i> Languages of interest
    </h5>
    <div class="profile__detail p-16">
      <level-icon v-for="item in user.interestLanguages" :key="item.lang" :level="item.level">
        <b>{{ item.lang | languageName }}</b>
        <el-popconfirm
          v-if="user.interestLanguages.length > 1"
          title="Are you sure to delete this?"
          confirm-button-text="Yes"
          cancel-button-text="No"
          @onConfirm="removeLanguage(item)"
        >
          <i slot="reference" class="el-icon-delete hover-text--primary p-8"></i>
        </el-popconfirm>
      </level-icon>
      <el-link class="ml-8" type="primary" @click="addLanguageVisible = true">
        + Add more
      </el-link>

      <div v-if="addLanguageVisible">
        <el-dialog
          title="Add Language"
          :visible.sync="addLanguageVisible"
          top="60px"
          width="90%"
          custom-class="max-w-600"
          append-to-body
        >
          <el-form label-position="top" size="medium">
            <input-interest-language @add="handleAddLanguage"></input-interest-language>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import LevelIcon from '@/components/atoms/LevelIcon.vue';
import InputInterestLanguage from '@/components/molecules/InputInterestLanguage.vue';
import { db, FieldValue } from '@/firebase';

export default {
  components: {
    LevelIcon,
    InputInterestLanguage,
  },

  props: {
    user: {
      type: Object,
    },
  },

  data() {
    return {
      addLanguageVisible: false,
    };
  },

  methods: {
    async removeLanguage(data) {
      await db
        .collection('users')
        .doc(this.user.id)
        .update({
          interestLanguages: FieldValue.arrayRemove(data),
        });

      this.$message({
        type: 'success',
        message: 'Remove Successfully!!',
      });
    },

    async handleAddLanguage(data) {
      const isDuplicate = this.user.interestLanguages.findIndex((item) => {
        return item.lang === data.lang;
      });
      if (isDuplicate !== -1) {
        this.$message({
          type: 'error',
          message: "You've already added this language",
        });
      } else {
        await db
          .collection('users')
          .doc(this.user.id)
          .update({
            interestLanguages: FieldValue.arrayUnion(data),
          });
        this.$message({
          type: 'success',
          message: 'Added Successfully!!',
        });
        this.addLanguageVisible = false;
      }
    },
  },
};
</script>
