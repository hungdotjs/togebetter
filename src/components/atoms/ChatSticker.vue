<template>
  <div @click="openDialog" class="chat-sticker">
    <slot></slot>

    <el-dialog
      :visible.sync="dialogVisible"
      custom-class="chat-sticker__dialog"
      append-to-body
      center
    >
      <div>
        <el-image
          v-for="sticker in stickerURLs"
          :key="sticker.name"
          :src="sticker.url"
          fit="fill"
          class="chat-sticker__image"
          lazy
          @click="selectSticker(sticker.url)"
        >
          <div slot="placeholder" class="text-center p-16">
            <i class="el-icon-loading"></i>
          </div>
        </el-image>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      stickerURLs: [
        {
          name: 'thanks',
          url:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fsticker%2Fthanks.svg?alt=media&token=4a2a7cd9-7bb5-455e-9470-6d94084778ce',
        },
        {
          name: 'welcome',
          url:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fsticker%2Fwelcome.svg?alt=media&token=88ae0cd8-4845-4765-a6ab-f05a63506a4e',
        },
        {
          name: 'got-it',
          url:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fsticker%2Fgotit.svg?alt=media&token=888feadb-5df9-45c2-a6c6-84045677dfd2',
        },
        {
          name: 'understand',
          url:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fsticker%2Funderstand.svg?alt=media&token=9cb0627d-eaba-431e-8c3b-09f7666d01ce',
        },
        {
          name: 'agree',
          url:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fsticker%2Fagree.svg?alt=media&token=5348bc10-7894-4965-a664-41c11ba5b8d2',
        },
        {
          name: 'ask-more',
          url:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fsticker%2Faskmore.svg?alt=media&token=e59ab013-4db9-4454-97fa-c2f909fe9b45',
        },
        {
          name: 'examples',
          url:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fsticker%2Fexamples.svg?alt=media&token=69fa035b-e0b8-4b08-a95b-be160586a141',
        },
        {
          name: 'more-detail',
          url:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fsticker%2Fmoredetail.svg?alt=media&token=f629cc65-f857-4865-a65f-0054a11c6ed5',
        },
        {
          name: 'not-really',
          url:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fsticker%2Fnotreally.svg?alt=media&token=bec4e87d-2249-4fff-8418-ecc209f8dcf4',
        },
        {
          name: 'pronunciation',
          url:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fsticker%2Fpronunciation.svg?alt=media&token=41f11448-0f58-4e7d-8968-500f37a5f0cc',
        },
        {
          name: 'situation',
          url:
            'https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fsticker%2Fsituation.svg?alt=media&token=bcfc1c41-d52e-43f4-87c8-0389932a399b',
        },
      ],
    };
  },

  methods: {
    openDialog() {
      this.dialogVisible = true;
    },

    selectSticker(url) {
      this.dialogVisible = false;
      this.$emit('select', url);
    },
  },
};
</script>
