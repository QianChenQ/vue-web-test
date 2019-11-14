<template>
  <el-container>
    <el-aside style="background: #2c3e50">
      <el-container>
        <el-header>
        </el-header>
        <el-main>
          <project-card :name="item.name" :address="item.address" :port="item.port" :path="item.path"
                        v-for="item in pjCardList" :closeable="true" :close="deletePjCard"
                        :click="clickCard" :isActive="item.name === activeCardName"></project-card>
          <el-button type="info" class="pj-add-button" v-on:click="drawer=true"><i class="el-icon-plus"></i></el-button>
        </el-main>
      </el-container>
    </el-aside>
    <el-container>
      <el-header style="background: #8cc9c6">
        <el-form :inline="true">
          <div style="margin-top: 10px;text-align: left">
            <el-form-item>
              <el-input v-model="searchForm.value"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" v-on:click="search"></el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-header>
      <el-main>
        <api-list ref="apiList"></api-list>
      </el-main>
    </el-container>
    <el-drawer title="添加项目" :visible.sync="drawer" direction="ltr" ref="drawer">
      <el-container>
        <el-main>
          <el-form :model="pjForm" size="mini" ref="pjForm" :rules="addRules">
            <el-form-item label="项目地址" prop="address">
              <el-input v-model="pjForm.address" placeholder="192.168.1.1" clearable></el-input>
            </el-form-item>
            <el-form-item label="端口号" prop="port">
              <el-input v-model="pjForm.port" placeholder="8080" clearable></el-input>
            </el-form-item>
            <el-form-item label="路径" prop="path">
              <el-input v-model="pjForm.path" placeholder="/v2/api-docs" clearable></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="username">
              <el-input v-model="pjForm.username" placeholder="admin" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="pjForm.password" placeholder="******" clearable></el-input>
            </el-form-item>
            <el-form-item label="文档名称" prop="pjName">
              <el-input v-model="pjForm.pjName" placeholder="新建文档" clearable></el-input>
            </el-form-item>
            <el-button v-on:click="addPj" :loading="addPjLoading" type="button" class="full-width">添加</el-button>
          </el-form>
        </el-main>
      </el-container>
    </el-drawer>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import ProjectCard from "../components/ProjectCard"
  import ApiList from "../components/ApiList"

  export default {
    name: 'ExtendSwaggerHome',
    components: {ApiList, ProjectCard},
    data: function () {
      return {
        drawer: false,
        pjForm: {
          address: "192.168.168.14",
          port: "18060",
          username: "",
          password: "",
          path: '/v2/api-docs',
          pjName: ""
        },
        searchForm: {
          value: ""
        },
        pjCardList: [],
        addPjLoading: false,
        addRules: {
          port: [
            {required: true, message: '端口不能为空', trigger: "blur"}
          ],
          address: [
            {required: true, message: '地址不能为空', trigger: "blur"}
          ]
        },
        localStorageApiList: [],
        activeCardName: ''
      }
    },
    methods: {
      addPj: function (event) {
        //设置按钮为加载状态
        this.addPjLoading = true
        //对表单进行验证
        this.$refs['pjForm'].validate((valid) => {
          //验证通过，获取api文档
          if (valid) {
            let baseRrl = "http://" + this.pjForm.address + ":" + this.pjForm.port
            let http = axios.create({
              baseURL: baseRrl,
              proxy: {
                host: this.address,
                port: this.port
              }
            })
            //api路径
            let path = this.path ? this.path : '/v2/api-docs'
            http.get(path).then(response => {
              console.log(response)
              //成功时关闭drawer
              this.$refs['drawer'].closeDrawer()
              //建结果新建文档卡片存入localstorage
              let pjCardList = localStorage.getItem('pjCardList')
              if (!this.pjForm.pjName) {
                this.pjForm.pjName = response.data.info.title
              }
              let pjCard = {
                name: this.pjForm.pjName,
                address: this.pjForm.address,
                port: this.pjForm.port,
                path: this.pjForm.path
              }
              if (pjCardList) {
                pjCardList = JSON.parse(pjCardList)
                pjCardList.push(pjCard)
                localStorage.setItem('pjCardList', JSON.stringify(pjCardList))
              } else {
                pjCardList = []
                pjCardList[0] = pjCard
                localStorage.setItem("pjCardList", JSON.stringify(pjCardList))
              }
              this.pjCardList.push(pjCard)
              this.addPjLoading = false
              let data = response.data
              //对api数据重新封装
              let pjList = this.buildApiObj(data, this.pjForm.pjName)
              this.$store.commit("replaceApiList", pjList)
              //存到localStorage中
              let localPjList = JSON.parse(localStorage.getItem("pjList"))
              if (localPjList) {
                localPjList.push(pjList)
                localStorage.setItem("pjList", JSON.stringify(localPjList))
                this.localStorageApiList = localPjList
              } else {
                localStorage.setItem("pjList", JSON.stringify([pjList]))
                this.localStorageApiList = pjList
              }
            })//.catch(error => {
            //   console.log(error)
            //   this.$message({
            //     message: error.response.statusText,
            //     type: 'error',
            //     center: true
            //   })
            //   this.addPjLoading = false
            // })
          } else {
            //取消按钮加载状态
            this.addPjLoading = false
            return false
          }
        })
      },
      buildApiObj: function (data, aliasName) {
        let _this = this
        let pjInfo = {
          aliasName: aliasName ? aliasName : data.info.title,
          name: data.info.title,
          description: data.info.description,
          host: "http://" + _this.pjForm.address + ":" + _this.pjForm.port,
          api: []
        }
        //对pai的tags进行循环
        data.tags.forEach(function (item) {
          let api = {
            name: item.name,
            description: item.description,
            pjName: data.info.name
          }
          let paths = []
          //对path进行循环
          Object.getOwnPropertyNames(data.paths).forEach((pathName) => {
            let pathItem = data.paths[pathName]
            //对每个path的type进行循环
            Object.getOwnPropertyNames(pathItem).forEach((pathType) => {
              let path = pathItem[pathType]
              //判断path的tags与tags的name是否相同
              if (path.tags[0] === item.name) {
                path.type = pathType
                path.url = pathName
                paths.push(path)
              }
            })
          })
          api.paths = paths
          pjInfo.api.push(api)
        })
        return pjInfo
      },
      search: function () {
        if (this.searchForm.value) {
          this.$refs.apiList.filter(this.searchForm.value)
        } else {

        }
      },
      //点击卡片时的事件
      clickCard: function (name) {
        let _this = this
        let apiList = JSON.parse(localStorage.getItem('pjList'))
        _this.activeCardName = name
        apiList.forEach((item) => {
          if (item.aliasName === name) {
            _this.$store.commit("replaceApiList", item)
          }
        })
        this.search()
      },
      //删除卡片
      deletePjCard: function (name) {
        //删除卡片
        for (let i = this.pjCardList.length - 1; i >= 0; i--) {
          if (this.pjCardList[i].name === name) {
            this.pjCardList.splice(i, 1)
          }
        }
        localStorage.setItem('pjCardList', JSON.stringify(this.pjCardList))
        //删除api列表
        this.$store.commit("deleteApiListByName", name)
        for (let j = this.localStorageApiList.length - 1; j >= 0; j--) {
          if (this.localStorageApiList[j].aliasName === name) {
            this.localStorageApiList.splice(j, 1)
          }
        }
        localStorage.setItem("pjList", JSON.stringify(this.localStorageApiList))
      }
    },
    computed: {
      apiList: function () {
        return this.$store.state.apiList
      }
    },
    created: function () {
      //从localstorage中获取文档卡片列表
      let pjCardList = localStorage.getItem('pjCardList')
      if (pjCardList) {
        this.pjCardList = JSON.parse(pjCardList)
      }
      //重localStorage中获取api列表的值
      let apiList = localStorage.getItem('pjList')
      if (apiList) {
        this.localStorageApiList = JSON.parse(apiList)
        this.$store.commit("replaceApiList", this.localStorageApiList)
      }
    }
  }
</script>

<style scoped>
  .el-container {
    height: 100%;
  }

  .el-aside {
    height: 100%;
  }

  .full-width {
    width: 100%;
  }

  .pj-add-button {
    width: 100%;
  }
</style>
