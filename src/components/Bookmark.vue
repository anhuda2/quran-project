<template>
    <div class="bookmarks">
      <div class="bookmarks-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="bookmarks-content">
        <div v-for="(bookmark, index) in bookmarks" :key="index">
          <p>{{ bookmark.surah }}:{{ bookmark.verse }} - {{ bookmark.text }}</p>
          <button @click="removeBookmark(bookmark.id)">Remove</button>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from "axios";
  import firebase from "@/firebase.js";
  
  export default {
    name: "Bookmarks",
    props: {
      title: {
        type: String,
        required: true,
      },
      bookmarks: {
        type: Array,
        required: true,
      },
    },
    methods: {
      removeBookmark(id) {
        // Remove bookmark from Firebase Realtime Database
        firebase
          .database()
          .ref("bookmarks/" + id)
          .remove()
          .then(() => {
            // Emit event to remove bookmark from parent component
            this.$emit("removeBookmark", id);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      addBookmark(surah, verse) {
        // Add new bookmark to Firebase Realtime Database
        axios
          .get(`http://api.alquran.cloud/v1/ayah/${surah}:${verse}/en.asad`)
          .then((response) => {
            const text = response.data.data.text;
            const bookmarkRef = firebase.database().ref("bookmarks").push();
            bookmarkRef
              .set({
                surah: surah,
                verse: verse,
                text: text,
              })
              .then(() => {
                // Emit event to add new bookmark to parent component
                this.$emit("addBookmark", {
                  id: bookmarkRef.key,
                  surah: surah,
                  verse: verse,
                  text: text,
                });
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
    mounted() {
      // Listen for new bookmarks added to Firebase Realtime Database
      firebase
        .database()
        .ref("bookmarks")
        .on("child_added", (snapshot) => {
          const newBookmark = {
            id: snapshot.key,
            surah: snapshot.val().surah,
            verse: snapshot.val().verse,
            text: snapshot.val().text,
          };
          this.$emit("addBookmark", newBookmark);
        });
  
      // Listen for bookmarks removed from Firebase Realtime Database
      firebase
        .database()
        .ref("bookmarks")
        .on("child_removed", (snapshot) => {
          this.$emit("removeBookmark", snapshot.key);
        });
    },
  };
  </script>
  <style scoped>
  .bookmarks {
    border: 1px solid #ccc;
    margin: 10px;
    padding: 10px;
  }
  
  .bookmarks-header {
    margin-bottom: 10px;
  }
  
  .bookmarks-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>