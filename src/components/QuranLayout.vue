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
  </div>
</template>

<script>
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
</style>
