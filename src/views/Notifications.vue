<template>
  <div class="notifications">
    <div class="notifications__content">
      <div class="notifications__image">
        <el-image
          src="https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fhugo-no-messages.png?alt=media&token=47fe31b7-0c4c-45f1-8cb1-7df7c6cbb4b2"
          lazy
        ></el-image>
      </div>
      <p class="text-bold">You don't have any notifications yet.</p>
      <p class="color-secondary">If you receive an answer of a like, it will be shown here.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
};
</script>
