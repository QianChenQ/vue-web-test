<template>
  <div class="content all-border">
    <div class="header border-bottom">
      <div>Parameters</div>
      <el-button size="mini" class="try-button">Try</el-button>
    </div>
    <div class="table-container bg-color">
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
              {{item.name}}
            </td>
            <td>
              {{item.description}}
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
    props: ["path"]
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
  .table-container table {
    width: 100%;
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


</style>
