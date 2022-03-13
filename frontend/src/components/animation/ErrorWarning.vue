<template>
  <div class="alert alert-dismissible fade show" :class="this.statusClass" role="alert">
  <strong>{{this.title}}</strong> {{this.message}}.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
</template>

<script>
export default {
    name: 'ErrorWarning',
    props: ['title','message','statusClass'],
}
</script>

<style>

</style>