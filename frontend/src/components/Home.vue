<template>
  <div class="container-main">
      
    <!-- left panel -->
    <div class="left-panel senary text-natural">
      <ul class="left-panel-ms nav flex-column text-natural">
        <!-- logo -->
        <!-- panel for dashboard, products, customers, manufacturers -->
        <li class="nav-item"><a :class="this.page=='Dashboard'?'active':''" class="nav-link text-natural" @click="goTo('Dashboard')"><i class="fa-solid fa-chart-line"></i></a></li>
        <li class="nav-item"><a :class="this.page=='Products'?'active':''" class="nav-link text-natural" @click="goTo('Products')"><i class="fa-solid fa-warehouse"></i></a></li>
        <li class="nav-item"><a :class="this.page=='Customers'?'active':''" class="nav-link  text-natural" @click="goTo('Customers')" ><i class="fa-solid fa-person-booth"></i></a></li>
        <li class="nav-item"><a :class="this.page=='Manufacturers'?'active':''" class="nav-link  text-natural" @click="goTo('Manufacturers')" ><i class="fa-solid fa-building"></i></a></li>
        <li class="nav-item"><a :class="this.page=='Orders'?'active':''" class="nav-link  text-natural" @click="goTo('Orders')" >Orders</a></li>
        <!-- <li class="nav-item" ><a>Categories</a></li> -->
        <!-- <li><a class="disabled-text">Reviews</a></li>
        <li><a class="disabled-text">Discounts</a></li>
        <li><a class="disabled-text">Shipping</a></li>
        <li><a class="disabled-text">Payments</a></li> -->
      </ul>
    </div>
    <!-- right panel -->
    <div class="right-panel">
        <ErrorWarning v-bind:statusClass="this.status.class" v-if="this.status.show" v-bind:message="this.status.message"
        v-bind:title="this.status.title"></ErrorWarning>
        <ProductPage v-if="page=='Products'" v-on:show-message="showMessage"></ProductPage>
    </div>
  </div>
</template>

<script>
import ProductPage from './products/Product.vue'
import ErrorWarning from './animation/ErrorWarning.vue'
export default {
    name: 'HomePage',
    components:{
        ProductPage,
        ErrorWarning,
    },
    data(){
        return {
            page: 'Products',
            status: {
                show: false,
                message: '',
                title: '',
                class: '',
            },
        }
    },
    watch: {
        'status.show': function(newVal){
            if(newVal){
                // set a timer for the message to disappear
                setTimeout(()=>{
                    this.status.show = false;
                }, 3000);
            }
        }
    },
    methods:{
        goTo(page){
            this.page = page
        },
        showMessage(e){
            this.status.show = true
            if(e.type==='success')
                this.status.class = 'alert-success'
            
            else if(e.type==='error')
                this.status.class = 'alert-danger'
            
            this.status.title = e.title
            this.status.message = e.message
        },
    }
}
</script>

<style>
.container-main{
    width:100%;
    height: 100%;
    display:grid;
    grid-template-columns: repeat(6,1fr);
    grid-gap:10px;
    margin:0 auto;
    padding:10px;
}
.left-panel{
    grid-column:1/2;
}
.left-panel-ms{
    list-style-type:none;
    padding:0;
    margin:0;
}

.left-panel-ms a.nav-link{
    font-display: block;
    font-family: var(--header-font-family);
    text-decoration:none;
    font-size:1.2em;
    transition: all 3ms ease-in-out;
}


.right-panel{
    grid-column:2/7;
}

.nav-item a:hover{
    cursor:pointer;
}

.active{
    background-color: var(--primary-color) !important;
    color: var(--primary-text-color);
}

</style>