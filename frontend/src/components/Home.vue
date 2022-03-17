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
            v-bind:products="this.products" 
            v-bind:loading="this.loading"
            v-bind:manufacturers="this.manufacturers" 
            v-on:show-message="showMessage">
         </ProductPage>
        <ManufacturerPage v-if="page=='Manufacturers'" 
            :manufacturers="this.manufacturers" 
            v-bind:loading="this.loading"
            v-on:show-message="showMessage">
        </ManufacturerPage>
    </div>
  </div>
</template>

<script>
import ProductPage from './products/Product.vue'
import ManufacturerPage from './manufacturers/Manufacturers.vue'
import ErrorWarning from './animation/ErrorWarning.vue'
export default {
    name: 'HomePage',
    components:{
        ProductPage,
        ErrorWarning,
        ManufacturerPage
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

            products: [],
            manufacturers: [],
            loading:false,
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

    created(){
        this.loadFromSSE()
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
            let eventSource = new EventSource('http://localhost:5000/products/sse');
            // get data from eventSource
            eventSource.onmessage = function(event) {
                let {data,lastEventId} = event 
                if(typeof(data) !== 'undefined'){ 
                    
                    if(lastEventId == 1)
                    {
                            this.$emit('show-message',{
                                type:'success',
                                title:'Fetch Successfully',
                                message:'Manufacturers fetched successfully'
                            })
                    }
                    console.log(lastEventId)
                    let manufacturers = JSON.parse(data).manufacturers
                    let products = JSON.parse(data).products
                    // this.temp_manufacturers = [...manufacturers]
                    this.manufacturers = [...manufacturers]
                    this.products = [...products]
                    // this.pages.total = this.totalPagesFiltered;
                    // this.sort.type = 'id';
                    // this.sort.order = 'desc'
                    this.loading =  false
                }
                
            }.bind(this)


            eventSource.onerror = function(event) {
                console.log(event)
                this.$emit('show-message', {
                    title: 'Connection Problem',
                    type:'error',
                    message: 'There was a problem with the connection to the server'
                })

                this.loading=false
                this.manufacturers = []
                this.products = []
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