import { db, FieldValue } from '@/firebase';

export default {
  methods: {
    sendNotification(payload) {
      const { senderID, receiveID, questionID, message, detectID } = payload;
      const noti = {
        senderID,
        receiveID,
        questionID,
        message,
        isRead: false,
        createdAt: FieldValue.serverTimestamp(),
      };
      db.collection('notifications')
        .doc(detectID)
        .set(noti);
    },

    removeNotification(payload) {
      const { detectID } = payload; // Detect = senderID_postID
      console.log(detectID);
      db.collection('notifications')
        .doc(detectID)
        .delete();
    },
  },
};
