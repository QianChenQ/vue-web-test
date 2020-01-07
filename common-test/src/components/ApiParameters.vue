<template>
  <div class="content all-border">
    <div class="header border-bottom">
      <div>Parameters</div>
      <el-button size="mini" class="try-button" v-on:click="isTry=!isTry">Try</el-button>
    </div>
    <el-form>
      <el-form-item>
        <div>test</div>
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <div class="table-container bg-color">
      <el-form :inline="true">
        <div class="form-container">
          <div v-for="item in path.parameters">
            <div>
              <div class="parameter-name">
                {{item.name}} <sup v-if="item.required" style="font-size: 10px;color: red">*required</sup>
              </div>
              <div style="font-size: 12px">
                {{item.type}}
              </div>
              <div style="font-size: 12px;color: #808080">
                ({{item.in}})
              </div>
            </div>
            <div>
              <el-input></el-input>
            </div>
          </div>
        </div>
      </el-form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in path.parameters">
            <td>
              <div class="parameter-name">
                {{item.name}} <sup v-if="item.required" style="font-size: 10px;color: red">*required</sup>
              </div>
              <div style="font-size: 12px">
                {{item.type}}
              </div>
              <div style="font-size: 12px;color: #808080">
                ({{item.in}})
              </div>
            </td>
            <td v-if="!isTry">
              {{item.description}}
            </td>
            <td v-if="isTry">
              <el-input></el-input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ApiParameters',
    props: ["path"],
    data() {
      return {
        isTry: false
      }
    }
  }
</script>

<style scoped>
  .header {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    padding: 8px 10px;
  }

  .header > div {

  }

  .try-button {
    align-items: flex-end;
  }

  .content {
    border: 1px solid;
    border-radius: 4px;
  }
  .table-container {
    padding: 10px;
    text-align: left;
  }
  .table-container thead th{
    margin-bottom: 10px;
    border-bottom: 1px solid #c1c5c5;
    padding: 0px;
  }
  .table-container tbody td {
    padding-top: 10px;
  }
  .table-container table {
    width: 100%;
  }
  .parameter-name {
    font-size: 16px;
    font-weight: 700;
  }
  .post .bg-color {
    background: #e8f6f0;
  }
  .post .all-border {
    border: 1px solid #49cc90;
  }
  .post .border-bottom {
    border-bottom: 1px solid #49cc90;
  }
  .get .bg-color {
     background: #ebf3fb;
   }
  .get .all-border {
    border: 1px solid #61affe;
  }
  .get .border-bottom {
    border-bottom: 1px solid #61affe;
  }
  .put .bg-color {
       background: #fbf1e6;
     }
  .put .all-border {
    border: 1px solid #fca130;
  }
  .put .border-bottom {
    border-bottom: 1px solid #fca130;
  }
  .delete .bg-color {
    background: #fae7e7
  }
  .delete .all-border {
    border: 1px solid #f93e3e;
  }
  .delete .border-bottom {
    border-bottom: 1px solid #f93e3e;
  }

</style>
