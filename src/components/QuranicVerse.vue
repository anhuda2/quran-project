import firebase from '@/firebase.js';

<template>
    <div class="quranic-verse">
      <div class="verse-header">
        <span class="surah-name">{{ surahName }}</span>
        <span class="verse-number">{{ verseNumber }}</span>
      </div>
      <div class="verse-text">{{ verseText }}</div>
    </div>
  </template>
  
  <script>
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
  