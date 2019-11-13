<template>
  <el-container>
    <el-aside style="background: #2c3e50">
      <el-container>
        <el-header>

        </el-header>
        <el-main>
          <project-card :name="item.name" :address="item.address" :port="item.port" :path="item.path"
                        v-for="item in pjCardList"></project-card>
          <el-button type="info" class="pj-add-button" v-on:click="drawer=true"><i class="el-icon-plus"></i></el-button>
        </el-main>
      </el-container>
    </el-aside>
    <el-container>
      <el-header style="background: #8cc9c6"></el-header>
      <el-main>

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

  export default {
    name: 'ExtendSwaggerHome',
    components: {ProjectCard},
    data: function () {
      return {
        drawer: false,
        pjForm: {
          address: "",
          port: "",
          username: "",
          password: "",
          path: '/v2/api-docs',
          pjName: ""
        },
        treeData: [],
        pjCardList: [],
        addPjLoading: false,
        addRules: {
          port: [
            {required: true, message: '端口不能为空', trigger: "blur"}
          ],
          address: [
            {required: true, message: '地址不能为空', trigger: "blur"}
          ]
        }
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
            console.log(baseRrl)
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
              //对api数据重新封装
              let data = response.data
              let pjList = []
              let pjInfo = {
                name: data.info.name,
                description: data.info.description,
                api: []
              }
              data.tags.forEach(function (item) {
                let api = {
                  name: item.name,
                  description: item.description,
                  pjName: data.info.name
                }
                let paths = []
                data.paths.forEach(function (pathItem) {
                  let pathArray = pathItem.keys()
                  pathArray.forEach(function (path) {
                    paths.push(pathItem[path])
                  })
                })
                api.paths = paths
                pjInfo.api.push(api)
              })
              pjList.push(pjInfo)
              let localPjList = JSON.parse(localStorage.getItem("pjList"))
              if (localPjList) {
                localPjList.push(pjList)
                localStorage.setItem("pjList", JSON.stringify(localPjList))
              }else {
                localStorage.setItem("pjList", JSON.stringify(pjList))
              }


            }).catch(error => {
              this.$message({
                message: error.response.statusText,
                type: 'error',
                center: true
              })
              this.addPjLoading = false
            })
          } else {
            //取消按钮加载状态
            this.addPjLoading = false
            return false
          }
        })
      }
    },
    created: function () {
      //从localstorage中获取文档卡片列表
      let pjCardList = localStorage.getItem('pjCardList')
      if (pjCardList) {
        this.pjCardList = JSON.parse(pjCardList)
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
