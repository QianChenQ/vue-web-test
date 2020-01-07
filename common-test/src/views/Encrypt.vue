<template>
  <div>
    <input name="pwd" v-model="pwd"></input>
    <button type="button" v-on:click="submit">提交</button>
  </div>
</template>

<script>
  import Jsencrypt from 'jsencrypt'
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: 'Encrypt',
    data() {
      return {
        pwd: ""
      }
    },
    methods: {
      submit: function () {
        axios.get("http://localhost:8080/rsa").then((response) => {
          var encrypt = new Jsencrypt();
          encrypt.setPublicKey(response.data);
          var encrypted = encrypt.encrypt(this.pwd);
          let data = {
            password: encrypted
          }
          axios.post("http://localhost:8080/rsa", qs.stringify(data),{
              headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
              },
            }
          ).then((response) => {
            console.log(response.data)
          })
        })
        return false;
      }
    }
  }
</script>

<style scoped>

</style>
