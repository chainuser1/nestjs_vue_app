<template>
    <div class="container-ms">
        <header>
            <!-- navigator -->
            <ul class="header-ms">
                <!-- logo -->
                <li><a class="text-secondary" @click="this.page='Home'">Home</a></li>
                <li><a class="text-secondary" @click="this.page='About'">About</a></li>
                <li><a class="text-secondary" @click="this.page='Contact'">Contact</a></li>
            </ul>
        </header>
        <main>
           <!-- create a notification -->
           
          <about-page v-if="this.page=='About'"></about-page>
          <home-page v-else-if="this.page=='Home'"></home-page>
          <contact-page v-else-if="this.page=='Contact'"></contact-page>
        </main>
        <footer>
            <p>&copy; Copyright 2022</p>
        </footer>
    </div>
</template>

<script>
import AboutPage from './components/About.vue'
import ContactPage from './components/Contact.vue'
import HomePage from './components/Home.vue'
export default {
  name: 'App',
  components: {
    'home-page':HomePage,
    'about-page':AboutPage,
    'contact-page':ContactPage,
  },
  data() {
    return {
      message: 'Hello Vue!',
      page:'Home'
    }
  },
  computed: {
    
    
  },
}
</script>

<style scoped>
div.container-ms{
    width:80%;
    display:grid;
    grid-template-columns: repeat(5,1fr);
    grid-template-rows: repeat(7,1fr);
    grid-gap:10px;
    margin:0 auto;
    padding:10px;
}
/* header */

div.container-ms>header{
    grid-column:1/6;
    grid-row:1/1;
    
    padding:10px;
    /* bottom-box-shadow */
    border-bottom:1px solid rgb(49, 48, 48);
}
div.container-ms>header .header-ms{
    display:grid;
    list-style-type: none;
    grid-template-columns: repeat(3,1fr);
    grid-gap:10px;
    margin:0 auto;
    padding:10px;
    border-radius:10px;
    color: var(--color-text-primary);
    font-size: x-large;
    font-family: var(--header-font-family);
    /* assign items to the right */
    justify-items: center;
}

.header-ms a{
    text-decoration:none;
    /* color: var(--color-text-primary); */
    font-size: x-large;
    font-family: var(--header-font-family);
    /* text-align: center; */
    text-shadow: 1px 1px 1px rgb(196, 178, 178);
    transition: color 0.5s;
}

.header-ms a:hover,.header-ms a:active{
    color: var(--color-text-senary);
}
/* main */
div#app>div.container-ms>main{
    grid-column:1/6;
    grid-row:2/7;
    border-radius:10px;
    padding:10px;
}
/* footer */
div#app>div.container-ms>footer{
    grid-column:1/6;
    grid-row:7/7;
    background-color:var(--color-quartenary);
    border-radius:10px;
    padding:10px;
}

</style>