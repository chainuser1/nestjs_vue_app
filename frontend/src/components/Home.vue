<template>
  <div class="container-main">
      
    <!-- left panel -->
    <div class="left-panel senary text-natural">
      <ul class="left-panel-ms nav flex-column text-natural">
        <!-- logo -->
        <!-- panel for dashboard, products, customers, manufacturers -->
        <li class="nav-item"><a title="Dashboard" :class="this.page=='Dashboard'?'active':''" class="nav-link text-natural" @click="goTo('Dashboard')"><i class="fa-solid fa-chart-line"></i></a></li>
        <li class="nav-item"><a title="Products"  :class="this.page=='Products'?'active':''" class="nav-link text-natural" @click="goTo('Products')"><i class="fa-solid fa-warehouse"></i></a></li>
        <li class="nav-item"><a title="Customers"  :class="this.page=='Customers'?'active':''" class="nav-link  text-natural" @click="goTo('Customers')" ><i class="fa-solid fa-person-booth"></i></a></li>
        <li class="nav-item"><a title="Manufacturers"  :class="this.page=='Manufacturers'?'active':''" class="nav-link  text-natural" @click="goTo('Manufacturers')" ><i class="fa-solid fa-building"></i></a></li>
        <li class="nav-item"><a title="Orders"  :class="this.page=='Orders'?'active':''" class="nav-link  text-natural" @click="goTo('Orders')" >Orders</a></li>
        <!-- <li class="nav-item" ><a>Categories</a></li> -->
        <!-- <li><a class="disabled-text">Reviews</a></li>
        <li><a class="disabled-text">Discounts</a></li>
        <li><a class="disabled-text">Shipping</a></li>
        <li><a class="disabled-text">Payments</a></li> -->
      </ul>
    </div>
    <!-- right panel -->
    <div class="right-panel">
        <ErrorWarning v-bind:statusClass="this.status.class" v-bind:message="this.status.message"
        v-bind:title="this.status.title"></ErrorWarning>
        <ProductPage v-if="page=='Products'"
            v-on:show-message="showMessage">
         </ProductPage>
        <ManufacturersPage v-if="page=='Manufacturers'" 
            v-on:show-message="showMessage">
        </ManufacturersPage> 
    </div>
  </div>
</template>

<script>
import ProductPage from './products/Product.vue'
import ManufacturersPage from './manufacturers/Manufacturers.vue'
import ErrorWarning from './animation/ErrorWarning.vue'
export default {
    name: 'HomePage',
    components:{
        ProductPage,
        ErrorWarning,
        ManufacturersPage
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
        'status.show':function(){
            // set a timer for error to disappear

        }
    },

    created(){
        this.loadFromSSE()
        // console.log(this.$store.getters.loading)
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


        loadFromSSE(){
            this.$store.commit('setLoading',false)
            let eventSource = new EventSource('http://localhost:5000/products/sse');
            // get data from eventSource
            eventSource.onmessage = function(event) {
                let {data,lastEventId} = event 
                if(typeof(data) !== 'undefined'){ 
                    
                    if(lastEventId == 1)
                    {
                            this.showMessage({
                                type: 'success',
                                title: 'Success',
                                message: 'Data fetched successfully'
                            })
                    }
                    // console.log(lastEventId)
                    let manufacturers = JSON.parse(data).manufacturers
                    let products = JSON.parse(data).products
                    this.$store.commit('setManufacturers',manufacturers)
                    this.$store.commit('setProducts',products)
                    this.$store.commit('setLoading',false)
                }
                
            }.bind(this)
            let errorTime=0

            eventSource.onerror = function() {
                // console.log(event)
                this.showMessage({
                    title: 'Error Connecting',
                    // print a message and timer 
                    message:"Retrying connection to server in " + errorTime++ +'s',
                    type: 'error'
                })

                this.$store.commit('setLoading',true)
                this.$store.commit('setProducts',[])
                this.$store.commit('setManufacturers',[])

                // eventSource.close();
            }.bind(this)
            
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
    grid-column:1/2.5;
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
    grid-column:2/8;
}

.nav-item a:hover{
    cursor:pointer;
}

.active{
    background-color: var(--primary-color) !important;
    color: var(--primary-text-color);
}

</style>