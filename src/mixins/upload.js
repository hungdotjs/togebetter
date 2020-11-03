import { Message } from 'element-ui';
import generateUID from '@/helpers/generateUID';
import { storage } from '@/firebase';

export default {
  data() {
    return {
      loading: false,
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
        Message.error('File must be an image!');
        return;
      }

      if (!isLt2M) {
        Message.error('Picture size can not exceed 2MB!');
        return;
      }

      this.loading = true;
      const uid = generateUID();
      const storagePhotoRef = storage.ref(`assets/images/${uid}`);
      this.photoRef = storagePhotoRef;
      await storagePhotoRef.put(file.raw);
      const downloadURL = await storagePhotoRef.getDownloadURL();
      this.photoURL = downloadURL;
      this.loading = false;
    },

    removePhoto() {
      this.loading = true;
      this.photoRef.delete().then(() => {
        this.photoURL = '';
        this.loading = false;
      });
    },

    async handleRecordAudio(file) {
      this.loading = true;
      const uid = generateUID();
      const storageAudioRef = storage.ref(`assets/audio/${uid}`);
      this.audioRef = storageAudioRef;
      await storageAudioRef.put(file);
      const downloadURL = await storageAudioRef.getDownloadURL();
      this.audioURL = downloadURL;
      this.loading = false;
    },

    removeAudio() {
      this.loading = true;
      this.audioRef.delete().then(() => {
        this.audioURL = '';
        this.loading = false;
      });
    },
  },
};
