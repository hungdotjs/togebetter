<template>
  <bubble
    v-if="content"
    :userID="content.ownerID"
    :userInfo="content.ownerInfo"
    :createdAt="content.createdAt"
  >
    <p v-if="content.questionType">
      <el-tag type="success" effect="plain">
        Question about <b>{{ languageName }}</b>
      </el-tag>
    </p>
    <p class="color-secondary" v-if="content.questionType">{{ questionType }}</p>
    <div v-if="content.photoURL">
      <el-image :src="content.photoURL" class="chat-bubble__image"></el-image>
    </div>
    <div v-if="content.audioURL">
      <audio :src="content.audioURL" class="chat-bubble__audio" controls></audio>
    </div>
    <div v-if="content.content">
      <div v-if="editVisible">
        <el-input
          type="textarea"
          resize="none"
          class="mb-8"
          :rows="2"
          :autosize="{ minRows: 4 }"
          v-model="editContent"
        ></el-input>
        <el-button type="primary" size="small" @click="updateContent" :loading="loading" plain>
          Save changes
        </el-button>
        <el-button size="small" plain @click="editVisible = false">Cancel</el-button>
      </div>
      <p class="chat-bubble__content" v-else>
        {{ content.content }}
        <span v-if="content.updatedAt" class="text-small color-secondary"><br />(edited)</span>
      </p>
    </div>
    <p
      class="chat-bubble__content chat-bubble__additional-info"
      v-if="content.additionalInformation"
    >
      {{ content.additionalInformation }}
    </p>

    <div class="chat-bubble__command">
      <div class="chat-bubble__social">
        <vote :votes="content.votes" @vote="handleVote" @unvote="handleUnvote"></vote>

        <!-- <div class="chat-bubble__button">
          <p><i class="iconfont icon-share"></i></p>
          <p class="chat-bubble__button__text">Share</p>
        </div> -->
        <div class="chat-bubble__button" v-if="content.questionType">
          <p><i class="iconfont icon-bookmark"></i></p>
          <p class="chat-bubble__button__text">Save</p>
        </div>
      </div>

      <el-dropdown trigger="click" v-if="user" @command="handleCommand">
        <div class="chat-bubble__button">
          <p><i class="iconfont icon-ellipsis"></i></p>
          <p class="chat-bubble__button__text">More</p>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" v-if="isOwner && content.content" command="edit">
            Edit
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-delete" v-if="isOwner" command="delete">
            Delete
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-warning-outline" command="report">
            Report
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </bubble>
</template>

<script>
import Bubble from '@/components/molecules/Bubble.vue';
import Vote from '@/components/atoms/Vote.vue';
import languages from '@/data/languages';
import { mapState } from 'vuex';
import { db, FieldValue } from '@/firebase';

export default {
  components: {
    Bubble,
    Vote,
  },

  props: {
    content: {
      type: Object,
    },
  },

  data() {
    return {
      loading: false,
      editVisible: false,
      editContent: '',
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    isOwner() {
      if (this.user) return this.user.id === this.content.ownerID;
      return false;
    },

    languageName() {
      return languages.find((item) => item.code === this.content.lang).name;
    },

    questionType() {
      switch (this.content.questionType) {
        case 'what-mean':
          return 'What does this mean?';
        case 'sound-natural':
          return 'Does this sound natural?';
        case 'example':
          return 'Please show me example sentences with?';
        case 'difference':
          return "What's the difference?";
        case 'your-pronounce':
          return 'Please show me how to pronounce?';
        case 'my-pronounce':
          return "How's my pronunciation?";
        case 'free-question':
          return 'Ask about a country, culture or anything you want.';
        default:
          return 'How do you say this?';
      }
    },
  },

  methods: {
    handleCommand(command) {
      switch (command) {
        case 'edit':
          this.editVisible = true;
          this.editContent = this.content.content;
          break;
        case 'delete':
          this.$emit('delete');
          break;
        default:
          break;
      }
    },

    adjustUserPoint(point) {
      const userRef = db.collection('users');
      userRef.doc(this.content.ownerID).update({
        points: FieldValue.increment(point),
      });
    },

    handleVote() {
      const ref = this.content.lang ? db.collection('questions') : db.collection('comments');
      ref
        .doc(this.content.id)
        .update({
          votes: FieldValue.arrayUnion(this.user.id),
        })
        .then(() => {
          this.adjustUserPoint(1);
        });
    },

    handleUnvote() {
      const ref = this.content.lang ? db.collection('questions') : db.collection('comments');
      ref
        .doc(this.content.id)
        .update({
          votes: FieldValue.arrayRemove(this.user.id),
        })
        .then(() => {
          this.adjustUserPoint(-1);
        });
    },

    async updateContent() {
      this.loading = true;
      await db
        .collection('comments')
        .doc(this.content.id)
        .update({
          content: this.editContent,
          updatedAt: FieldValue.serverTimestamp(),
        });
      this.content.content = this.editContent;
      this.loading = false;
    },
  },
};
</script>
