<template>
  <div class="quranic-verse">
    <div class="quranic-verse-header">
      <div class="quranic-verse-surah">
        {{ surah }}
      </div>
      <div class="quranic-verse-number">
        {{ verse }}
      </div>
    </div>
    <div class="quranic-verse-text">
      {{ text }}
    </div>
    <div class="quranic-verse-actions">
      <button @click="addBookmark()">Add Bookmark</button>
      <button @click="loadBookmarks()">Load Bookmarks</button>
      <div v-for="(bookmark, index) in bookmarks" :key="index">
        <p>{{ bookmark.surah }}:{{ bookmark.verse }}</p>
        <button @click="removeBookmark(index)">Remove</button>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from '@/firebase.js';
import axios from 'axios';

export default {
  props: {
    surah: {
      type: String,
      required: true
    },
    verse: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      bookmarks: []
    }
  },
  methods: {
    addBookmark() {
      const dbRef = firebase.database().ref('bookmarks');
      const newBookmarkRef = dbRef.push();
      newBookmarkRef.set({
        surah: this.surah,
        verse: this.verse
      });
    },
    loadBookmarks() {
      const dbRef = firebase.database().ref('bookmarks');
      dbRef.on('value', snapshot => {
        const bookmarks = [];
        snapshot.forEach(childSnapshot => {
          const bookmark = childSnapshot.val();
          bookmarks.push(bookmark);
        });
        this.bookmarks = bookmarks;
      });
    },
    removeBookmark(index) {
      const bookmark = this.bookmarks[index];
      const dbRef = firebase.database().ref('bookmarks/' + bookmark.id);
      dbRef.remove();
    }
  },
  created() {
    axios.get('https://api.alquran.cloud/ayah/' + this.verse + '/en.asad')
      .then(response => {
        this.text = response.data.data.text;
        this.surah = response.data.data.surah.englishName;
      })
      .catch(error => {
        console.log(error);
      });
      
    const dbRef = firebase.database().ref('bookmarks');
    dbRef.once('value', snapshot => {
      const bookmarks = [];
      snapshot.forEach(childSnapshot => {
        const bookmark = childSnapshot.val();
        bookmark.id = childSnapshot.key;
        bookmarks.push(bookmark);
      });
      this.bookmarks = bookmarks;
    });
  }
}
</script>
<style>
.quranic-verse {
  margin-bottom: 10px;
}

.quranic-verse-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.quranic-verse-surah {
  font-weight: bold;
  font-size: 1.2rem;
}

.quranic-verse-number {
  font-size: 1.2rem;
}

.quranic-verse-text {
  font-size: 1.1rem;
  line-height: 1.5;
  text-align: justify;
}

.quranic-verse-actions {
  margin-top: 10px;
}

.quranic-verse-actions button {
  margin-right: 10px;
}
</style>