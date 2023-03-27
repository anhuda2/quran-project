import firebase from '@/firebase.js';

<template>
    <div class="realtime-reading">
      <div class="reading-info">
        <p v-if="!isReading">No one is currently reading</p>
        <p v-else>{{readingName}} is reading {{surahName}} - {{verseNumber}}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isReading: false,
        readingName: '',
        surahName: '',
        verseNumber: ''
      };
    },
    methods: {
      updateReading(name, surah, verse) {
        this.isReading = true;
        this.readingName = name;
        this.surahName = surah;
        this.verseNumber = verse;
      },
      clearReading() {
        this.isReading = false;
        this.readingName = '';
        this.surahName = '';
        this.verseNumber = '';
      }
    }
  };
  </script>
  
  <style>
  .realtime-reading {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .reading-info {
    background-color: #f5f5f5;
    padding: 10px 20px;
    border-radius: 10px;
  }
  </style>
  