<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
import tools from "../utils/tools"
export default {
  name: 'Home',
  components: {
  },
  computed:{

  },
  mounted() {
    console.log("Mount")
    console.log(tools.version)
    tools.log("1",2)
  }
}
</script>
