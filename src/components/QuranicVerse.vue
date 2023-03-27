<template>
    <div class="quranic-verse">
        <div class="verse-header">
            <span class="surah-name">{{ surahName }}</span>
            <span class="verse-number">{{ verseNumber }}</span>
        </div>
        <div class="verse-text">{{ verseText }}</div>
        <button @click="addBookmark">Bookmark</button>
    </div>
</template>

<script>
    import firebase from '@/firebase.js';
    import axios from 'axios';

    export default {
      props: {
        surahName: {
          type: String,
          required: true,
        },
        verseNumber: {
          type: Number,
          required: true,
        },
        verseText: {
          type: String,
          required: true,
        },
      },
      methods: {
        addBookmark() {
          const dbRef = firebase.database().ref('bookmarks');
          const newBookmarkRef = dbRef.push();
          newBookmarkRef.set({
            surah: this.surahName,
            verse: this.verseNumber,
          });
        },
        updateVerseText() {
          const dbRef = firebase.database().ref(`verses/${this.surahName}/${this.verseNumber}`);
          dbRef.update({
            text: this.verseText,
          });
        },
        readVerseText() {
          axios
            .get(`https://api.alquran.cloud/v1/ayah/${this.verseNumber}/editions/quran-uthmani,en.asad`)
            .then((response) => {
              this.verseText = response.data.data[0].text;
            })
            .catch((error) => {
              console.error(error);
            });
        },
        readBookmarks() {
          const dbRef = firebase.database().ref('bookmarks');
          dbRef.once('value', (snapshot) => {
            const bookmarks = [];
            snapshot.forEach((childSnapshot) => {
              const bookmark = childSnapshot.val();
              bookmark.id = childSnapshot.key;
              bookmarks.push(bookmark);
            });
            this.$emit('bookmarksLoaded', bookmarks);
          });
        },
      },
      mounted() {
        this.readVerseText();
        this.readBookmarks();
      },
    };
</script>

<style>
    .quranic-verse {
        margin: 20px;
        padding: 10px;
        border: 1px solid #ccc;
    }

    .verse-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .surah-name {
        font-size: 1.2rem;
    }

    .verse-number {
        font-size: 1rem;
    }

    .verse-text {
        font-size: 1.2rem;
        line-height: 1.5;
        text-align: justify;
    }
</style>
