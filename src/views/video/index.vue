<template>
  <div>
    我是视频页面{{a}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      a:1
    }
  },
  created(){
    
    setTimeout(()=>{
      this.a = 2
    },2000)
  },
  methods: {},
  beforeUpdate() {
   console.log("beforeUpdate")
},
updated(){
  console.log("updated")
}
}

</script>
<style  scoped>
</style>
