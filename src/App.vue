<template>
  <div id="app">
    <QuranLayout>
      <RealTimeReading />
      <div class="quran-container">
        <QuranicVerse />
        <Bookmark :title="'My Bookmarks'" :bookmarks="bookmarks" @addBookmark="addBookmark" @removeBookmark="removeBookmark" />
      </div>
    </QuranLayout>
  </div>
</template>

<script>
import QuranicVerse from '@/components/QuranicVerse.vue'
import QuranLayout from '@/components/QuranLayout.vue'
import RealTimeReading from '@/components/RealTimeReading.vue'
import Bookmark from '@/components/Bookmark.vue'
import firebase from '@/firebase.js'

export default {
  name: 'App',
  components: {
    QuranicVerse,
    QuranLayout,
    RealTimeReading,
    Bookmark
  },
  data() {
    return {
      bookmarks: []
    }
  },
  methods: {
    addBookmark(bookmark) {
      this.bookmarks.push(bookmark)
    },
    removeBookmark(id) {
      const index = this.bookmarks.findIndex((bookmark) => bookmark.id === id)
      if (index !== -1) {
        this.bookmarks.splice(index, 1)
      }
    }
  },
  mounted() {
    // Load bookmarks from Firebase Realtime Database
    firebase
      .database()
      .ref('bookmarks')
      .once('value')
      .then((snapshot) => {
        const bookmarksObject = snapshot.val()
        if (bookmarksObject) {
          const bookmarksArray = Object.keys(bookmarksObject).map((key) => ({
            id: key,
            surah: bookmarksObject[key].surah,
            verse: bookmarksObject[key].verse,
            text: bookmarksObject[key].text
          }))
          this.bookmarks = bookmarksArray
        }
      })

    // Listen for new bookmarks added to Firebase Realtime Database
    firebase
      .database()
      .ref('bookmarks')
      .on('child_added', (snapshot) => {
        const newBookmark = {
          id: snapshot.key,
          surah: snapshot.val().surah,
          verse: snapshot.val().verse,
          text: snapshot.val().text
        }
        this.addBookmark(newBookmark)
      })

    // Listen for bookmarks removed from Firebase Realtime Database
    firebase
      .database()
      .ref('bookmarks')
      .on('child_removed', (snapshot) => {
        this.removeBookmark(snapshot.key)
      })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
