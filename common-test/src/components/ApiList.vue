<template>
  <el-collapse>
    <div v-for="items in apiList">
      <el-collapse-item v-for="api in items.api">
        <template slot="title">
          <div class="title">
            {{api.name}}
          </div>
        </template>
        <el-collapse>
          <el-collapse-item v-for="path in api.paths" :class="path.type">
            <template slot="title">
              <div class="path-title">
                <div class="type">
                  {{path.type}}
                </div>
                <div class="url">
                  {{path.url}}
                </div>
                <div class="summary">
                  {{path.summary}}
                </div>
              </div>
            </template>
            <api-parameters :path="path"></api-parameters>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </div>
  </el-collapse>
</template>

<script>
  import ApiParameters from "./ApiParameters"
  export default {
    name: 'ApiList',
    components: {ApiParameters},
    data: function () {
      return {
      }
    },
    methods: {
      filter: function (value) {
        let newApiList = []
        this.apiList.forEach((treeNode) => {
          //对api进行遍历
          treeNode.api.forEach((item) => {
            //判断api中的name是否包含过滤值
            if (item.name.indexOf(value) > -1) {
              let treeNode = {
                name: item.name,
                description: item.description,
                api: [item]
              }
              newApiList.push(treeNode)
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
              if (paths.length > 0) {
                //构建一个api
                let apiItem = {
                  name: item.name,
                  description: item.description,
                  paths: paths
                }
                let newTreeNode = {
                  name: treeNode.name,
                  description: treeNode.description,
                  api: []
                }
                newTreeNode.api.push(apiItem)
                newApiList.push(newTreeNode)
              }
            }
          })
        })
        this.$store.commit("replaceApiList", newApiList)
      }
    },
    computed: {
      apiList() {
        return this.$store.state.apiList
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .path {

  }

  .post {

  }

  .type {
    margin: 0px 10px 0px 10px;
    font-size: 14px;
    font-weight: bold;
    width: 80px;
  }

  .url {
    margin-right: 10px;
  }

  .title {
    font-size: 16px;
    font-weight: bold;
  }

  .path-title {
    display: flex;
    height: 40px;
    line-height: 44px;
  }

  .post {

  }
  .post .path-title {

  }
  .type {
    color: #fff;
    border-radius: 2px;
  }
  .post .type {
    background: #49cc90;
  }
  .get .type {
    background: #61affe;
  }
  .put .type {
    background: #fca130;
  }
  .delete .type {
    background: #f93e3e
  }
</style>
