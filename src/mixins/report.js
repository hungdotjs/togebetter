import { db, FieldValue } from '@/firebase';
import Report from '@/components/molecules/Report.vue';

export default {
  components: { Report },
  data() {
    return {
      openReport: false,
    };
  },

  methods: {
    report(input) {
      db.collection('reports').add({ ...input, createdAt: FieldValue.serverTimestamp() });

      const { value, message, userID, contentID, type } = input;
      this.$store.dispatch('api/report', {
        userID,
        postID: contentID,
        message: `${type} - ${value} - ${message}`,
      });

      this.$message({
        type: 'success',
        message: 'Thanks for your report!',
      });
    },
  },
};
