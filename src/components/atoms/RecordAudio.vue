<template>
  <div>
    <div @click="openDialog" class="record-audio__wrapper">
      <slot></slot>
    </div>
    <div class="record-audio__audio" v-if="!disablePreview">
      <audio type="audio/mpeg" v-if="audioURL" :src="audioURL" controls>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      custom-class="record-dialog"
      top="25vh"
      :close-on-click-modal="false"
      destroy-on-close
      append-to-body
      center
    >
      <div class="text-center">
        <p>Click the microphone to begin recording.</p>
        <el-tag type="primary" effect="dark" v-if="isStarting"> Recording </el-tag><br />
        <button
          class="record-dialog__mic"
          :class="{ 'mic-active': isStarting }"
          @click="openRecord"
        >
          <i class="iconfont icon-mic"></i>
        </button>
        <p>{{ time }} / 1:00</p>
        <el-tag type="primary" effect="dark" v-if="isStarting">
          Click the microphone again to finish recording </el-tag
        ><br />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    disablePreview: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialogVisible: false,
      audio: null,
      audioURL: '',
      isStarting: false,
      timeRecord: 0,
      mediaRecorder: null,
      interval: null,
      timeout: null,
      audioChunks: [],
    };
  },

  computed: {
    time() {
      if (this.timeRecord < 10) return `0:0${this.timeRecord}`;
      return `0:${this.timeRecord}`;
    },
  },

  methods: {
    openDialog() {
      this.dialogVisible = true;
    },

    handleStart() {
      this.isStarting = true;
      this.interval = setInterval(() => {
        this.timeRecord += 1;
      }, 1000);
      this.timeout = setTimeout(() => {
        this.mediaRecorder.stop();
      }, 60000);
    },

    handleDataAvailable(event) {
      this.audioChunks.push(event.data);
    },

    handleStop() {
      const audioBlob = new Blob(this.audioChunks, { type: 'audio/mpeg' });
      this.audioChunks = [];
      this.audio = audioBlob;
      this.audioURL = URL.createObjectURL(audioBlob);
      this.isStarting = false;
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      this.timeRecord = 0;
      this.$emit('done', this.audio);
      this.dialogVisible = false;
    },

    async openRecord() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        if (this.isStarting) {
          this.mediaRecorder.stop();
        } else {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();

          this.audioChunks = [];

          this.mediaRecorder.addEventListener('dataavailable', this.handleDataAvailable);
          this.mediaRecorder.addEventListener('start', this.handleStart);
          this.mediaRecorder.addEventListener('stop', this.handleStop);
        }
      });
    },
  },

  beforeDestroy() {
    if (this.mediaRecorder) {
      this.mediaRecorder.removeEventListener('start', this.handleStart);
      this.mediaRecorder.removeEventListener('dataavailable', this.handleDataAvailable);
      this.mediaRecorder.removeEventListener('stop', this.handleStop);
    }
  },
};
</script>
