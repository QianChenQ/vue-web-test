<template>
  <el-collapse>
    <div v-for="items in treeNodeData">
      <el-collapse-item v-for="api in items.api">
        <template slot="title">
          <div class="title">
            {{api.name}}
          </div>
        </template>
        <el-collapse>
          <el-collapse-item v-for="path in api.paths">
            <template slot="title">
              <div class="type">
                {{path.type}}
              </div>
              <div class="url">
                {{path.url}}
              </div>
              <div class="summary">
                {{path.summary}}
              </div>
            </template>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </div>
  </el-collapse>
</template>

<script>
  export default {
    name: 'ApiList',
    data: function () {
      return {
        treeNodeData: this.treeData
      }
    },
    props: ['treeData'],
    methods: {
      filter: function (value) {
        let newTreeData = []
        let tempTreeNodeData = this.treeData
        tempTreeNodeData.forEach((treeNode)=>{
          //对api进行遍历
          treeNode.api.forEach((item) => {
            //判断api中的name是否包含过滤值
            if (item.name.indexOf(value) > -1) {
              let treeNode = {
                name : item.name,
                description: item.description,
                api: [item]
              }
              newTreeData.push(treeNode)
            } else {
              let paths = []
              item.paths.forEach((path) => {
                //判断path中的描述和url是否包含过滤值
                if (path.summary.indexOf(value) > -1) {
                  paths.push(path)
                } else if (path.url.indexOf(value) > -1) {
                  paths.push(path)
                }
              })
              let apiItem = {
                name: item.name,
                description: item.description,
                paths: paths
              }
              if (paths.length > 0) {
                let newTreeNode = {
                  name : treeNode.name,
                  description: treeNode.description,
                  api: []
                }
                newTreeNode.api.push(apiItem)
                newTreeData.push(newTreeNode)
              }
            }
          })
        })
        this.treeNodeData = newTreeData
      }
    },
    created() {
      console.log(this.treeData)
    }
  }
</script>

<style scoped>
  .path {

  }

  .post {

  }

  .type {
    margin: 0 10px 0 10px;
    font-size: 14px;
    font-weight: bold;
  }

  .url {
    margin-right: 10px;
  }

  .title {
    font-size: 16px;
    font-weight: bold;
  }
</style>
