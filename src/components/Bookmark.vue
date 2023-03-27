import firebase from '@/firebase.js';

<template>
    <div class="bookmark">
      <div class="bookmark-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="bookmark-content">
        <div v-for="bookmark in bookmarks" :key="bookmark.id">
          <p>{{ bookmark.surah }}:{{ bookmark.verse }}</p>
          <button @click="removeBookmark(bookmark.id)">Remove</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Bookmark',
    props: {
      title: {
        type: String,
        required: true
      },
      bookmarks: {
        type: Array,
        required: true
      }
    },
    methods: {
      removeBookmark(id) {
        this.$emit('removeBookmark', id);
      }
    }
  }
  </script>
  
  <style scoped>
  .bookmark {
    border: 1px solid #ccc;
    margin: 10px;
    padding: 10px;
  }
  
  .bookmark-header {
    margin-bottom: 10px;
  }
  
  .bookmark-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  