<template>
  <el-tree :data="treeData">
  </el-tree>
</template>

<script>
  export default {
    name: 'ApiList',
    data: function() {
    },
    props: ['treeData']
  }
</script>

<style scoped>

</style>
