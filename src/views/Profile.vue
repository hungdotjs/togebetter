<template>
  <div class="profile" v-loading="loading">
    <div class="profile__wrapper" v-if="currentUser">
      <div class="profile__overview">
        <div class="profile__avatar-wrapper">
          <el-image class="profile__avatar" :src="currentUser.photoURL"></el-image>
          <router-link
            tag="div"
            class="text-center"
            v-if="isOwner"
            :to="{ name: 'edit-profile', params: { id: user.id } }"
          >
            <el-button size="mini" icon="iconfont icon-edit" plain>
              Edit Profile
            </el-button>
          </router-link>
        </div>
        <div class="p-16">
          <div class="profile__username">
            {{ currentUser.username }}
          </div>
          <div class="profile__stats">
            <div class="profile__stats__item profile__stats__item--points">
              <span class="text-bold">
                <i class="iconfont icon-heart-solid"></i>
                {{ currentUser.points }}
              </span>
              <span> points </span>
            </div>
            <p class="profile__stats__item profile__stats__item--question">
              <span class="text-bold">
                <i class="iconfont icon-ask-question"></i>
                {{ currentUser.totalQuestions }}
              </span>
              <span> questions </span>
            </p>
            <p class="profile__stats__item profile__stats__item--answer">
              <span class="text-bold">
                <i class="iconfont icon-answer"></i>
                {{ currentUser.totalAnswers }}
              </span>
              <span> answers </span>
            </p>
          </div>
        </div>
      </div>

      <el-tabs v-model="activeName">
        <!-- Tab Profile  -->
        <el-tab-pane label="Profile" name="profile">
          <div>
            <div class="profile__bio">
              <p class="text-bold">About me</p>
              <p class="profile__bio">
                {{ currentUser.bio }}
              </p>
            </div>
            <div class="profile__detail">
              <p class="profile__detail__title">
                <i class="el-icon-time mr-8"></i>
                Joined <b> {{ time }} </b>
              </p>
            </div>
            <div class="profile__detail">
              <p class="profile__detail__title">
                <i class="iconfont icon-earth mr-8"></i>
                From <b>{{ currentUser.knowingCountry | countryName }}</b>
              </p>
            </div>
            <div class="profile__detail">
              <p class="profile__detail__title">
                <i class="iconfont icon-message mr-8"></i>
                Native language <b>{{ currentUser.nativeLanguage | languageName }}</b>
              </p>
            </div>
            <div class="profile__detail">
              <p class="profile__detail__title">
                <i class="el-icon-edit mr-8"></i>
                Languages of interest
              </p>
              <level-icon
                v-for="item in currentUser.interestLanguages"
                :key="item.lang"
                :level="item.level"
              >
                <b>{{ item.lang | languageName }}</b>
                <el-popconfirm
                  v-if="isOwner && currentUser.interestLanguages.length > 1"
                  title="Are you sure to delete this?"
                  confirm-button-text="Yes"
                  cancel-button-text="No"
                  @onConfirm="removeLanguage(item)"
                >
                  <i slot="reference" class="el-icon-delete hover-text--primary p-8"></i>
                </el-popconfirm>
              </level-icon>
              <el-link
                v-if="isOwner"
                class="ml-8"
                type="primary"
                @click="addLanguageVisible = true"
              >
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
        </el-tab-pane>

        <!-- Tab Questions  -->
        <el-tab-pane v-loading="loadingTab" label="Questions" name="questions" lazy>
          <div v-if="!questions.length" class="profile__post--error">
            <el-image
              src="https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fhugo-292.png?alt=media&token=a02f5342-1704-4e81-ac7f-134feb83a105"
              lazy
            ></el-image>
            You haven't asked any questions yet.
          </div>
          <question-bubble
            v-else
            v-for="question in questions"
            :key="question.id"
            :content="question"
          ></question-bubble>
          <div class="text-center">
            <el-button
              v-if="!noMoreQuestion"
              type="primary"
              size="small"
              :loading="loadingTab"
              plain
              @click="loadMore('questions')"
            >
              Load more
            </el-button>
          </div>
        </el-tab-pane>

        <!-- Tab Answers  -->
        <el-tab-pane v-loading="loadingTab" label="Answers" name="answers" lazy>
          <div v-if="!answers.length" class="profile__post--error">
            <el-image
              src="https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fhugo-292.png?alt=media&token=a02f5342-1704-4e81-ac7f-134feb83a105"
              lazy
            ></el-image>
            You haven't answered any questions yet.
          </div>
          <chat-bubble
            v-else
            v-for="comment in answers"
            :key="comment.id"
            :content="comment"
            @delete="deleteComment(comment.id, comment.questionID)"
            mode="view"
          ></chat-bubble>
          <div class="text-center">
            <el-button
              v-if="!noMoreAnswer"
              type="primary"
              size="small"
              :loading="loadingTab"
              plain
              @click="loadMore('comments')"
            >
              Load more
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import LevelIcon from '@/components/atoms/LevelIcon.vue';
import QuestionBubble from '@/components/molecules/QuestionBubble.vue';
import ChatBubble from '@/components/molecules/ChatBubble.vue';
import InputInterestLanguage from '@/components/molecules/InputInterestLanguage.vue';
import { mapState } from 'vuex';
import { db, FieldValue } from '@/firebase';
import { questionsIndex } from '@/algolia';
import timeago from '@/helpers/timeago';

export default {
  name: 'Profile',
  components: {
    LevelIcon,
    QuestionBubble,
    ChatBubble,
    InputInterestLanguage,
  },

  data() {
    return {
      addLanguageVisible: false,
      currentUser: null,
      loading: false,
      loadingTab: false,
      activeName: 'profile',
      limit: 5,
      questions: [],
      answers: [],
      noMoreQuestion: true,
      noMoreAnswer: true,
      lastQuestionDoc: null,
      lastAnswerDoc: null,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    time() {
      if (this.currentUser) return timeago(this.currentUser.createdAt.toDate());
      return timeago(new Date());
    },

    isOwner() {
      return this.user && this.currentUser.id === this.user.id;
    },
  },

  watch: {
    activeName(value) {
      if (value === 'questions') {
        if (this.questions.length) return;
        this.loadingTab = true;
        // Get questions
        db.collection('questions')
          .where('ownerID', '==', this.currentUser.id)
          .orderBy('createdAt', 'desc')
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

            this.lastQuestionDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
            if (querySnapshot.docs.length < this.limit) {
              this.noMoreQuestion = true;
            } else {
              this.noMoreQuestion = false;
            }

            this.questions = this.questions.concat(questions);
            this.loadingTab = false;
          });
      } else if (value === 'answers') {
        if (this.answers.length) return;

        this.loadingTab = true;
        // Get answers
        db.collection('comments')
          .where('ownerID', '==', this.currentUser.id)
          .orderBy('createdAt', 'desc')
          .limit(this.limit)
          .get()
          .then((querySnapshot) => {
            const answers = [];
            querySnapshot.forEach((doc) => {
              answers.push({
                id: doc.id,
                ...doc.data(),
              });
            });

            this.lastAnswerDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
            if (querySnapshot.docs.length < this.limit) {
              this.noMoreAnswer = true;
            } else {
              this.noMoreAnswer = false;
            }

            this.answers = this.answers.concat(answers);
            this.loadingTab = false;
          });
      }
    },
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      const userID = this.$route.params.id;
      this.loading = true;
      const doc = await db
        .collection('users')
        .doc(userID)
        .get();

      if (doc.exists) {
        const user = {
          id: doc.id,
          ...doc.data(),
        };
        this.currentUser = user;
        this.loading = false;
      } else {
        this.$router.push({ name: '404' });
      }
    },

    async loadMore(collectionName) {
      this.loadingTab = true;
      const lastDoc = collectionName === 'questions' ? this.lastQuestionDoc : this.lastAnswerDoc;

      const querySnapshot = await db
        .collection(collectionName)
        .where('ownerID', '==', this.currentUser.id)
        .orderBy('createdAt', 'desc')
        .startAfter(lastDoc)
        .limit(this.limit)
        .get();

      // Get the last visible document
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      if (querySnapshot.docs.length < this.limit) {
        if (collectionName === 'questions') this.noMoreQuestion = true;
        else this.noMoreAnswer = true;
      }

      if (collectionName === 'questions') {
        this.lastQuestionDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.questions = this.questions.concat(data);
      } else {
        this.lastAnswerDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.answers = this.answers.concat(data);
      }

      this.loadingTab = false;
    },

    deleteComment(commentID, questionID) {
      this.$confirm('Are you sure you want to delete?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'danger',
      }).then(async () => {
        await db
          .collection('comments')
          .doc(commentID)
          .delete();
        await db
          .collection('questions')
          .doc(questionID)
          .update({
            comments: FieldValue.arrayRemove(commentID),
          });
        questionsIndex.partialUpdateObject({
          objectID: questionID,
          comments: {
            _operation: 'Decrement',
            value: 1,
          },
        });
        await db
          .collection('users')
          .doc(this.user.id)
          .update({
            totalAnswers: FieldValue.increment(-1),
          });
        this.$message({
          message: 'Delete completed',
          type: 'success',
        });
        this.$router.go();
      });
    },

    async handleAddLanguage(data) {
      console.log(data);
      const isDuplicate = this.currentUser.interestLanguages.findIndex((item) => {
        console.log(item);
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
          .doc(this.currentUser.id)
          .update({
            interestLanguages: FieldValue.arrayUnion(data),
          });
        this.$message({
          type: 'success',
          message: 'Added Successfully!!',
        });
        this.addLanguageVisible = false;
        this.getData();
      }
    },

    async removeLanguage(data) {
      await db
        .collection('users')
        .doc(this.currentUser.id)
        .update({
          interestLanguages: FieldValue.arrayRemove(data),
        });

      this.$message({
        type: 'success',
        message: 'Remove Successfully!!',
      });
      this.getData();
    },
  },
};
</script>
