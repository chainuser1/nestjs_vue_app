<template>
    <div>
        <!-- search navbar -->
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand text-senary text-bold">Products</a>
                <a class="navbar-item text-senary ">
                    <form @submit.prevent="goToPage()">
                        <div class="input-group">
                            <input class="form-control" type="number" v-model="this.pages.c_page" min="1" :max="this.pages.total" placeholder="Page No">
                            <div class="input-group-append">
                                <button type="button" disabled class="btn btn-outline-secondary">of {{this.totalPagesFiltered}}</button>
                            </div>
                        </div>
                    </form>
                   
                </a>
                
                <form class="d-flex" @submit.prevent="">
                    <input class="form-control me-3"  v-model="this.filter.search" type="search" placeholder="Search" aria-label="Search">
                    
                    <button @click="actionShow('show','add')" type="button" class="btn btn-outline-danger" 
                       data-bs-toggle="modal" data-bs-target="#modelId">
                       <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>

                    <button style="margin-left:1px;" @click.prevent="getProducts" type="button" class="btn btn-outline-success">
                        <i class="fa fa-rotate"></i>
                    </button>
                </form>
                
            </div>
        </nav>
         
        <!-- show products table -->
        <!-- create table -->
        <loading-animation v-if="this.loading"></loading-animation>
        <table class="table table-striped "  v-if="!this.loading">
            <!-- theading -->
            <thead>
                <tr class="text-senary">
                    <th ><a @click="sortBy('id')">ID  <i :class="this.sort.type==='id'?this.sort.class:''"></i> </a></th>
                    <th ><a @click="sortBy('name')">Name <i :class="this.sort.type==='name'?this.sort.class:''"></i></a></th>
                    <th ><a @click="sortBy('price')">Price <i :class="this.sort.type==='price'?this.sort.class:''"></i></a></th>
                    <th ><a @click="sortBy('stock')">Stock <i :class="this.sort.type==='stock'?this.sort.class:''"></i></a></th>
                    <th ><a @click="sortBy('description')">Description <i :class="this.sort.type==='description'?this.sort.class:''"></i></a></th>
                    <th ><a @click="sortBy('manufacturer')">Manufacturer<i :class="this.sort.type==='manufacturer'?this.sort.class:''"></i></a></th>
                    <th>Actions</th>
                </tr>
            </thead>
            <!-- tbody -->
            
            <tbody>
                <!-- loop through products -->
               
                <tr class="text-secondary" :key=product.id v-for="product of productsPerPage">
                    <!-- product id -->
                    <td>{{ product.id }}</td>
                    <!-- product name -->
                    <td>{{ product.name }}</td>
                    <!-- product price -->
                    <td>{{ product.price }}</td>
                    <!-- product stock -->
                    <td>{{ product.stock }}</td>
                    <!-- product description -->
                    
                    <td>
                        <a :href="`#/${product.name}`" class="text-tertiary" data-toggle="modal" data-target="#id${product.id}`" >
                            {{ product.description.substring(0, 10) }}...
                        </a>
                        <div class="modal fade" :id="`id${product.id}`" tabindex="-1" role="dialog" aria-labelledby="#exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Description: '{{product.name}}'</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <p>
                                            {{product.description}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <!-- product manufacturer -->
                    <td>{{ product.manufacturer.name}}</td>
                    <td style="display:flex; flex-direction: row; ">
                        <!-- edit product -->
                        
                        <a type="button" :href="`#?${product.id}/edit`" @click.prevent="actionShow('show','edit',product)" class="btn btn-outline-success senary" ><i class="fas fa-edit color-text-senary"></i></a>
                        <!-- delete product -->&nbsp;
                        <button class="btn btn-outline-danger" @click.prevent="deleteProduct(product)"><i class="fa fa-eraser color-text-tertiary" aria-hidden="true"></i></button>
                    </td>
                </tr>
                
               <tr>
                <td colspan="6" style="text-align:center;">
                    <!-- pagination -->
                    <ul class="pagination justify-content-center ">
                        <li class="page-item" v-if="this.pages.current_page > 1">
                            <a class="page-link" href="#" @click="first">
                                <i class="fas fa-angle-double-left text-senary"></i>
                            </a>
                        </li>
                        <li class="page-item">
                            <a @click="prev" v-if="this.pages.current_page > 1" class="page-link " href="#" tabindex="-1" aria-disabled="true">
                                <i class="fas fa-angle-left text-senary"></i>
                            </a>
                        </li>
                        
                            
                            <!-- <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li> --> 
                        
                        <li class="page-item">
                            <a @click="next" class="page-link " v-if="this.pages.current_page < this.totalPagesFiltered" href="#">
                                <i class="fas fa-angle-right text-senary"></i>
                            </a>
                        </li>
                        
                        <li class="page-item" v-if="this.pages.current_page < this.totalPagesFiltered">
                            <a class="page-link" href="#" @click="last">
                                <i class="fas fa-angle-double-right text-senary"></i>
                            </a>
                        </li>
                </ul>
                </td>
              </tr>
            </tbody>
        </table>
        <!-- display the no of products below the table -->
        <div class="row" v-if="!this.loading==true">
            <div class="col-12">
                <p class="text-secondary">
                    Showing {{this.productsPerPage.length}} of {{this.temp_products.length}} products
                    on page {{this.pages.current_page}} of {{this.totalPagesFiltered}}
                </p>
            </div>
        </div>
        <product-form v-if="this.action=='show'" v-bind:product="addOrUpdateProduct"
         v-on:add-product="addProduct" v-bind:manufacturers="this.temp_manufacturers" v-on:update-product="editProduct" v-on:action-show="actionShow"></product-form>
    </div>
</template>

<script>
// import bootstrap modal

import ProductForm from './ProductForm.vue';
import LoadingAnimation from '../animation/Loading.vue'
const axios = require('axios');

// const alertify = require("//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js");

export default {
    name: 'ProductPage',
    components: {
        'product-form':ProductForm,
        'loading-animation':LoadingAnimation
    },
    
    data(){
        return {
            temp_products:[],
            temp_manufacturers:[],
            action:'hide',
            product:{
                id:0,
                name:'',
                price:0,
                stock:0,
                description:'',
                // image:'',
                // category_id:0,
                // manufacturer_id:0,
                // created_at:'',
                // updated_at:'',
            },
            filter:{
                search:''
            },
            sort:{
                type: 'id',
                order: 'asc',
                class: 'arrow up'
            },

            pages:{
                total:0,
                c_page:1,
                current_page:1,
                per_page:3,
            },
            loading:false,
        }
    },

   created(){
    //    this.getProducts();
    },

    computed:{
            addOrUpdateProduct(){
                return this.product
            },
            
            productsPerPage(){
                let products = this.sortedProducts;
                let from = (this.pages.current_page - 1) * this.pages.per_page;
                let to = from + this.pages.per_page;
                return products.slice(from, to);
            },

            filteredProducts(){
                const search = this.filter.search.toLowerCase()
                let products = this.temp_products
                if (search.length > 0) {
                    products = products.filter(product => {
                        return product.name.toLowerCase().includes(search)
                    })

                }
                // total = Math.ceil(products.length / this.pages.per_page)
                // this.pages.current_page = 1
                return products
            },

            totalPagesFiltered(){
                let products = this.sortedProducts
                return Math.ceil(products.length / this.pages.per_page)
            },

            sortedProducts(){
                let products = this.filteredProducts
                // check if sort type is number or string
                // check also if sort order is asc or desc
                if (this.sort.type === 'id') {
                    products = products.sort((a, b) => {
                        return this.sort.order === 'asc' ? a.id - b.id : b.id - a.id
                    })
                } else if (this.sort.type === 'name') {
                    products = products.sort((a, b) => {
                        return this.sort.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
                    })
                } else if (this.sort.type === 'price') {
                    products = products.sort((a, b) => {
                        return this.sort.order === 'asc' ? a.price - b.price : b.price - a.price
                    })
                }else if(this.sort.type === 'stock'){
                    products = products.sort((a, b) => {
                        return this.sort.order === 'asc' ? a.stock - b.stock : b.stock - a.stock
                    })
                }else if (this.sort.type === 'description') {
                    products = products.sort((a, b) => {
                        return this.sort.order === 'asc' ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description)
                    })
                }
                // compare products created_at
                // products = products.sort((a, b) => {
                //     return this.sort.order === 'asc' ? a.created_at - b.created_at : b.created_at - a.created_at
                // })
                return products
            },
    },
    watch:{
        'filter.search':function(){
            this.pages.current_page = 1
        },
        'pages.current_page':function(){
            this.pages.c_page = this.pages.current_page
        },
        '$store.getters.loading':function(newV){
            this.loading = newV
        },
        '$store.getters.products':function(newV){
            this.temp_products = newV
        },
        '$store.getters.manufacturers':function(newV){
            this.temp_manufacturers = newV
        },
        'temp_products':function(){
            this.pages.total = this.totalPagesFiltered
        },
    },
    
    methods: 
    {
       
        next(){
            if (this.pages.current_page < this.pages.total) {
                this.pages.current_page++;
            }
           
        },
        prev(){
            if (this.pages.current_page > 1) {
                this.pages.current_page--;
            }
          
        },

        last(){
            this.pages.current_page = this.pages.total;
        },
     

        first(){
            this.pages.current_page = 1;
        },
        goToPage(){
            if(this.pages.c_page > 0 && this.pages.c_page <= this.totalPagesFiltered){
                this.pages.current_page = this.pages.c_page;
            }
            else{
                alert('Page number is not valid')
            }
        },
        sortBy(item){
            this.sort.type = item
            if(this.sort.order == 'asc'){
                this.sort.order = 'desc'
                this.sort.class = 'arrow down'
            }
            else{
                this.sort.order = 'asc'
                this.sort.class = 'arrow up'
            }
        },

        addProduct(product){
            console.log(product)
            axios.post(`http://localhost:5000/products/add`, product)
            .then(({data}) => {
                // this.success = true
                this.$emit('show-message',{
                    success:true,
                    type:'success',
                    title:'Success',
                    message:data.message
                })
                this.sort.type = 'id';
                this.sort.order = 'desc'
            })
            .catch(error => {
                // this.error = true
                alert( error.response.data.message);
                // this.errors = error.response.data.errors
            })
            // hide modal
            this.actionShow('hide')

        },

        // edit product
        editProduct(product){
            
           axios.put(`http://localhost:5000/products/${product.id}/edit`, product)
            .then(({data}) => {
                // this.success = true
                this.$emit('show-message',{
                    success:true,
                    type:'success',
                    title:'Success',
                    message:data.message
                })
                this.filter.search = product.name
            })
        
            .catch(error => {
                this.errorMessage = error.response.data.message
                // this.errors = error.response.data.errors
            })
            // hide modal
            this.actionShow('hide')
            
        },  
        
        deleteProduct(product){
    
            axios.delete(`http://localhost:5000/products/${product.id}/delete`)
            .then(({data}) => {
                // this.success = true
                this.$emit('show-message',{
                    success:true,
                    type:'success',
                    title:'Success',
                    message:data.message
                })
                this.filter.search = product.name
            })
            .catch(error => {
                this.errorMessage = error.response.data.message
            })
            
        },

        actionShow(showOrHide='hide',action='none',product=null){
            // this.getManufacturers()
            if(showOrHide === 'show'){
                this.action = showOrHide
                this.product = product
                if((action=='edit' || action=='add') && product!=null){
                    this.action = 'show'
                    this.product = product
                }
            }
            this.action = showOrHide
        },

        
        
    }
}
</script>

<style scoped>
th a{
    cursor: pointer;
}
.arrow {
    border:2px solid var(--color-senary) ;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
 }


.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

/* table striped even */
table.table-striped tbody tr:nth-child(even) {
    color:var(--color-text-senary) !important;
    /* background-color: #d60f0f !important; */
}



</style>