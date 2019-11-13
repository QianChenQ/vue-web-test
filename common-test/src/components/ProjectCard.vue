<template>
  <div class="pjCard">
    <div class="pjName">{{name}}</div>
    <div>
      <div class="pjContent">
        {{address}}:{{port}}{{path}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProjectCard',
    props: ['name', 'address', 'port', 'path']
  }
</script>

<style scoped>
  .pjCard {
    width: 100%;
    border: 1px solid #4d4d4d;
    border-radius: 4px;
    height: 100px;
    background: #8b8e8e;
    margin-bottom: 20px;
    color: aliceblue;
  }

  .pjCard:hover {
    background: #c1c5c5;
    box-shadow: 5px 10px 15px 3px rgba(0, 0, 0, 0.14)
  }

  .pjName {
    text-align: left;
    padding: 10px 0 10px 10px;
    font-size: 20px;
  }

  .pjContent {
    text-overflow: ellipsis;
  }
</style>
