<template>
    <div class="realtime-reading">
      <div class="reading-info">
        <p v-if="!isReading">No one is currently reading</p>
        <p v-else>
          {{readingName}} is reading {{surahName}} - {{verseNumber}}
          <br>
          {{quranVerse}}
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import firebase from '@/firebase.js';
  import axios from 'axios';
  
  export default {
  data() {
  return {
  isReading: false,
  readingName: '',
  surahName: '',
  verseNumber: '',
  quranText: ''
  };
  },
  created() {
  // Initialize Firebase Realtime Database instance
        const db = firebase.database();
   // Create a reference to the 'reading' node in the database
const readingRef = db.ref('reading');

// Read data from the 'reading' node in real-time
readingRef.on('value', (snapshot) => {
  const readingData = snapshot.val();
  if (readingData) {
    this.isReading = true;
    this.readingName = readingData.name;
    this.surahName = readingData.surah;
    this.verseNumber = readingData.verse;

    // Call Quran API and get Quran text
    const url = 'https://api.alquran.cloud/v1/ayah/' + this.surahName + ':' + this.verseNumber + '/editions/quran-uthmani,en.pickthall';
    axios.get(url)
      .then(response => {
        const quranData = response.data.data[0];
        this.quranText = quranData.text;
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    this.clearReading();
  }
});
},
methods: {
updateReading(name, surah, verse) {
// Initialize Firebase Realtime Database instance
              const db = firebase.database();
  // Create a reference to the 'reading' node in the database
  const readingRef = db.ref('reading');

  // Write data to the 'reading' node in the database
  readingRef.set({
    name: name,
    surah: surah,
    verse: verse
  });
},
clearReading() {
  // Initialize Firebase Realtime Database instance
  const db = firebase.database();

  // Create a reference to the 'reading' node in the database
  const readingRef = db.ref('reading');

  // Clear data from the 'reading' node in the database
  readingRef.set(null);

  this.isReading = false;
  this.readingName = '';
  this.surahName = '';
  this.verseNumber = '';
  this.quranText = '';
}
}
};