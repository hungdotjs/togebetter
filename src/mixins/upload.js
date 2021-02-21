import generateUID from '@/helpers/generateUID';
import { storage } from '@/firebase';

export default {
  data() {
    return {
      loadingUpload: false,
      audioRef: null,
      photoRef: null,
      videoRef: null,
      audioURL: '',
      photoURL: '',
      videoURL: '',
    };
  },

  methods: {
    async handleChangeUpload(file) {
      const isImage = file.raw.type.includes('image/');
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isImage) {
        this.$message({
          message: 'File must be an image!',
          type: 'error',
        });
        return;
      }

      if (!isLt2M) {
        this.$message({
          message: 'Picture size can not exceed 10MB!',
          type: 'error',
        });
        return;
      }

      this.loadingUpload = true;
      const uid = `${generateUID()}_${file.raw.uid}`;
      const storagePhotoRef = storage.ref(`assets/images/${uid}`);
      this.photoRef = storagePhotoRef;
      await storagePhotoRef.put(file.raw);
      const downloadURL = await storagePhotoRef.getDownloadURL();
      this.photoURL = downloadURL;
      this.loadingUpload = false;
    },

    async handleUploadVideo(file) {
      const isVideo = file.raw.type.includes('video/');

      if (!isVideo) {
        this.$message({
          message: 'File must be an video!',
          type: 'error',
        });
        return;
      }

      this.loadingUpload = true;
      const uid = `${generateUID()}_${file.raw.uid}`;
      const storageVideoRef = storage.ref(`assets/videos/${uid}`);
      this.videoRef = storageVideoRef;
      await storageVideoRef.put(file.raw);
      const downloadURL = await storageVideoRef.getDownloadURL();
      this.videoURL = downloadURL;
      this.loadingUpload = false;
    },

    removeVideo() {
      this.loadingUpload = true;
      this.videoRef.delete().then(() => {
        this.videoURL = '';
        this.loadingUpload = false;
      });
    },

    removePhoto() {
      this.loadingUpload = true;
      this.photoRef.delete().then(() => {
        this.photoURL = '';
        this.loadingUpload = false;
      });
    },

    async handleRecordAudio(file) {
      this.loadingUpload = true;
      const uid = generateUID();
      const storageAudioRef = storage.ref(`assets/audio/${uid}.mp3`);
      this.audioRef = storageAudioRef;
      await storageAudioRef.put(file);
      const downloadURL = await storageAudioRef.getDownloadURL();
      this.audioURL = downloadURL;
      this.loadingUpload = false;
    },

    async handleChangeUploadEditor(file, command) {
      const isImage = file.raw.type.includes('image/');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message({
          message: 'File must be an image!',
          type: 'error',
        });
        return;
      }

      if (!isLt2M) {
        this.$message({
          message: 'Picture size can not exceed 2MB!',
          type: 'error',
        });
        return;
      }

      this.loadingUpload = true;
      const uid = `${generateUID()}_${file.raw.uid}`;
      const storagePhotoRef = storage.ref(`assets/images/${uid}`);
      this.photoRef = storagePhotoRef;
      await storagePhotoRef.put(file.raw);
      const downloadURL = await storagePhotoRef.getDownloadURL();
      this.photoURL = downloadURL;
      const src = downloadURL;
      command({ src });
      this.loadingUpload = false;
    },

    removeAudio() {
      this.loadingUpload = true;
      this.audioRef.delete().then(() => {
        this.audioURL = '';
        this.loadingUpload = false;
      });
    },
  },
};
