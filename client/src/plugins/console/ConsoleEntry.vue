<template>
  <div :class="value.type">
      <span>[{{value.time}}]</span>
      <span>[{{value.source}}]</span>
      <span>{{value.value}}</span>
  </div>
</template>

<script>

export default {
    name: "ConsoleEntry",
    props: [
        'value' // {source, type, time, value}
    ]

}
</script>

<style>

</style>