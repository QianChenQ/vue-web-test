<template>
  <el-container>
    <el-aside style="background: #2c3e50">
      <el-container>
        <el-header>

        </el-header>
        <el-main>
          <el-button type="info" class="pj-add-button" v-on:click="drawer=true"><i class="el-icon-plus"></i></el-button>
        </el-main>
      </el-container>
    </el-aside>
    <el-container>
      <el-header style="background: #8cc9c6"></el-header>
      <el-main>

      </el-main>
    </el-container>
    <el-drawer title="添加项目" :visible.sync="drawer" direction="ltr">
      <el-container>
        <el-main>
          <el-form :model="pjForm" size="mini" ref="pjForm" :rules="addRules">
            <el-form-item label="项目地址" prop="address">
              <el-input v-model="pjForm.address" placeholder="192.168.1.1" clearable></el-input>
            </el-form-item>
            <el-form-item label="端口号" prop="port">
              <el-input v-model="pjForm.port" placeholder="8080" clearable></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="username">
              <el-input v-model="pjForm.username" placeholder="admin" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="pjForm.password" placeholder="******" clearable></el-input>
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

  export default {
    name: 'ExtendSwaggerHome',
    data: function () {
      return {
        drawer: false,
        pjForm: {
          address: "",
          port: "",
          username: "",
          password: "",
        },
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
            let proxy = {

            }
            // if (this.username) {
            //   proxy.username = this.username
            // }
            // if (this.password) {
            //   proxy.password = this.password
            // }
            let http = axios.create({
              proxy: {
                host: '192.168.168.14',
                port: 18050
              }
            })
            http.get("/v2/api-docs").then(response => {
              console.log(response)
              this.addPjLoading = false
            }).catch(error => {
              this.$message({
                message: error.response.statusText,
                type: 'error',
                center: true
              })
              console.log(error)
              this.addPjLoading = false
            })
          } else {
            //取消按钮加载状态
            this.addPjLoading = false
            return false
          }
        })
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
