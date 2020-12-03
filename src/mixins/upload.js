import generateUID from '@/helpers/generateUID';
import { storage } from '@/firebase';

export default {
  data() {
    return {
      loadingUpload: false,
      audioRef: null,
      photoRef: null,
      audioURL: '',
      photoURL: '',
    };
  },

  methods: {
    async handleChangeUpload(file) {
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
      this.loadingUpload = false;
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
      const storageAudioRef = storage.ref(`assets/audio/${uid}`);
      this.audioRef = storageAudioRef;
      await storageAudioRef.put(file);
      const downloadURL = await storageAudioRef.getDownloadURL();
      this.audioURL = downloadURL;
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
