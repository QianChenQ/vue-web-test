<template>
  <div class="pjCard" v-on:click="onClick" :class="{active:isActive}">
    <div>
      <div class="pjName">{{name}}
      </div>
      <div class="close el-icon-close" v-if="closeable" v-on:click="onClose">
      </div>
    </div>
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
    props: ['name', 'address', 'port', 'path', 'closeable', 'close', 'click', 'isActive'],
    methods: {
      onClose: function () {
        this.close(this.name)
      },
      onClick: function () {
        this.click(this.name)
      }
    }
  }
</script>

<style scoped>
  .pjCard {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    border: 1px solid #4d4d4d;
    border-radius: 4px;
    height: 100px;
    background: #8b8e8e;
    margin-bottom: 20px;
    color: aliceblue;
    text-align: left;
    cursor: pointer;
  }

  .pjCard:hover {
    background: #c1c5c5;
    box-shadow: 5px 10px 15px 3px rgba(0, 0, 0, 0.14);
  }

  .pjName {
    text-align: left;
    margin-bottom: 10px;
    font-size: 20px;
    width: 75%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
  }

  .close {
    vertical-align: top;
    float: right;
  }

  .close:hover {
    color: #323232;
  }

  .pjContent {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }

  .active {
    background: #c1c5c5;
    box-shadow: 5px 10px 15px 3px rgba(0, 0, 0, 0.14);
  }
</style>
