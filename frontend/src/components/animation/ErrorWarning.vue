<template>
  <div class="alert alert-dismissible" :class="this.statusClass" role="alert">
  <strong>{{this.title}}</strong> {{this.message}}.
</div>
</template>

<script>
export default {
    name: 'ErrorWarning',
    props: ['title','message','statusClass','actionShow'],
}
</script>

<style>
/* fade the element */
.fade-animation-disapper{
    animation: fade-out 0.3s;
    animation-fill-mode: forwards;
    opacity:0;
}
.fade-animation-appear{
    animation: fade-in 0.3s;
    animation-fill-mode: forwards;
    opacity:1;
}
</style>