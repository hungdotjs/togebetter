<template>
  <div class="posts box-content">
    <h1>Edit post</h1>

    <!-- <el-upload
          class="mb-16"
          action="#"
          accept="image/*"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleChangeUpload"
        >
          <div v-if="photoURL">
            <img :src="photoURL" style="max-width: 100%" />
          </div>
          <el-button v-else size="small" type="primary" icon="el-icon-picture">
            Add cover
          </el-button>
        </el-upload>
        <el-button v-if="photoURL" type="danger" @click="removePhoto" class="mb-8">
          Remove
        </el-button> -->

    <p>Title</p>
    <el-input v-model="title" placeholder="Enter your title" class="mb-16"></el-input>

    <p>Tag</p>
    <el-select
      v-model="tags"
      multiple
      filterable
      allow-create
      placeholder="Enter tags for your post"
      class="mb-16"
    >
    </el-select>

    <div class="editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="editor-menubar">
          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <i class="iconfont icon-bold"></i>
          </button>

          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <i class="iconfont icon-italic"></i>
          </button>

          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <i class="iconfont icon-strikethrough"></i>
          </button>

          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <i class="iconfont icon-underline"></i>
          </button>

          <button class="editor-menubar__button" @click="showImagePrompt(commands.image)">
            <i class="iconfont icon-image-fill"></i>
          </button>

          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <i class="iconfont icon-code-line"></i>
          </button>

          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <i class="iconfont icon-paragraph"></i>
          </button>

          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>

          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <i class="iconfont icon-list-unordered"></i>
          </button>

          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <i class="iconfont icon-list-ordered"></i>
          </button>

          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <i class="iconfont icon-double-quotes-r"></i>
          </button>

          <button
            class="editor-menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <i class="iconfont icon-code-box-line"></i>
          </button>

          <button class="editor-menubar__button" @click="commands.horizontal_rule">
            <i class="iconfont icon-hr"></i>
          </button>

          <button class="editor-menubar__button" @click="commands.undo">
            <i class="iconfont icon-undo"></i>
          </button>

          <button class="editor-menubar__button" @click="commands.redo">
            <i class="iconfont icon-redo"></i>
          </button>
        </div>
      </editor-menu-bar>

      <editor-content class="editor__content" :editor="editor"></editor-content>
    </div>
    <el-button class="mt-16" type="primary" @click="publishPost" :loading="loading">
      Update
    </el-button>
  </div>
</template>

<script>
import upload from '@/mixins/upload';
// Import the editor
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Image,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder,
} from 'tiptap-extensions';
import { db, FieldValue } from '@/firebase';
import { mapState } from 'vuex';

export default {
  name: 'EditPost',
  mixins: [upload],
  components: {
    EditorContent,
    EditorMenuBar,
  },

  data() {
    return {
      loading: false,
      post: null,
      title: '',
      tags: [],
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Image(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Write something …',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
        ],
        onUpdate: ({ getHTML }) => {
          this.html = getHTML();
        },
      }),
      html: '',
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    postID() {
      return this.$route.params.id;
    },
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      db.collection('posts')
        .doc(this.postID)
        .get()
        .then((doc) => {
          this.post = {
            id: doc.id,
            ...doc.data(),
          };
          this.editor.setContent(this.post.html);
          this.title = this.post.title;
          this.tags = this.post.tags;
        });
    },

    showImagePrompt(command) {
      // eslint-disable-next-line no-alert
      const src = prompt('Enter the url of your image here');
      if (src !== null) {
        command({ src });
      }
    },

    async publishPost() {
      this.loading = true;
      const input = {
        title: this.title,
        html: this.html,
      };
      await db
        .collection('posts')
        .doc(this.postID)
        .update({
          ...input,
          tags: this.tags,
          status: 'open',
          updatedAt: FieldValue.serverTimestamp(),
        });

      this.$message({
        type: 'success',
        message: 'Your post has been updated successfully',
      });

      this.loading = false;
      this.$router.push({ name: 'post-detail', params: { id: this.postID } });
    },
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
