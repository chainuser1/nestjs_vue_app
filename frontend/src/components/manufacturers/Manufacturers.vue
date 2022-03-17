<template>
    <div>
        <!-- search navbar -->
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand text-senary text-bold">Manufacturers</a>
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

                    <button style="margin-left:1px;" @click.prevent="getManufacturers" type="button" class="btn btn-outline-success">
                        <i class="fa fa-rotate"></i>
                    </button>
                </form>
                
            </div>
        </nav>
         
        <!-- show manufacturers table -->
        <!-- create table -->
        <loading-animation v-if="this.loading"></loading-animation>
        <table class="table table-striped "  v-if="!this.loading">
            <!-- theading -->
            <thead>
                <tr class="text-senary">
                    <th ><a @click="sortBy('id')">ID  <i :class="this.sort.type==='id'?this.sort.class:''"></i> </a></th>
                    <th ><a @click="sortBy('name')">Name <i :class="this.sort.type==='name'?this.sort.class:''"></i></a></th>
                    <th>Actions</th>
                </tr>
            </thead>
            <!-- tbody -->
            
            <tbody>
                <!-- loop through manufacturers -->
               
                <tr class="text-secondary" :key=manufacturer.id v-for="manufacturer of manufacturersPerPage">
                    <!-- manufacturer id -->
                    <td>{{ manufacturer.id }}</td>
                    <!-- manufacturer name -->
                    <td>{{ manufacturer.name }}</td>
                    
                    
                    <!-- <td>
                        <a :href="`#/${manufacturer.name}`" class="text-tertiary" data-toggle="modal" data-target="#id${manufacturer.id}`" >
                            {{ manufacturer.description.substring(0, 10) }}...
                        </a>
                        <div class="modal fade" :id="`id${manufacturer.id}`" tabindex="-1" role="dialog" aria-labelledby="#exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Description: '{{manufacturer.name}}'</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <p>
                                            {{manufacturer.description}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td> -->
                    <!-- manufacturer manufacturer -->
                    <td>
    
                        <a type="button" :href="`#?${manufacturer.id}/edit`" @click.prevent="actionShow('show','edit',manufacturer)" class="btn btn-outline-success senary" ><i class="fas fa-edit color-text-senary"></i></a>
                        <!-- delete manufacturer -->&nbsp;
                        <button class="btn btn-outline-danger" @click.prevent="deleteManufacturer(manufacturer)"><i class="fa fa-eraser color-text-tertiary" aria-hidden="true"></i></button>
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
        <!-- display the no of manufacturers below the table -->
        <div class="row" v-if="!this.loading==true">
            <div class="col-12">
                <p class="text-secondary">
                    Showing {{this.manufacturersPerPage.length}} of {{this.temp_manufacturers.length}} manufacturers
                    on page {{this.pages.current_page}} of {{this.totalPagesFiltered}}
                </p>
            </div>
        </div>
        <manufacturer-form v-if="this.action=='show'" v-bind:manufacturer="addOrUpdateManufacturer"
         v-on:add-manufacturer="addManufacturer"  v-on:update-manufacturer="editManufacturer" v-on:action-show="actionShow"></manufacturer-form>
    </div>
</template>

<script>
// import bootstrap modal

import ManufacturerForm from './ManufacturerForm.vue';
import LoadingAnimation from '../animation/Loading.vue'
const axios = require('axios');

// const alertify = require("//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js");

export default {
    name: 'ManufacturersPage',
    components: {
        'manufacturer-form':ManufacturerForm,
        'loading-animation':LoadingAnimation
    },
    data(){
        return {
            temp_manufacturers:[],
            action:'hide',
            manufacturer:{
                id:0,
                name:'',
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
                per_page:2,
            },
            loading:false,
        }
    },

    created(){
        // this.getManufacturers()
    },
    computed:{
            addOrUpdateManufacturer(){
                return this.manufacturer
            },
            
            manufacturersPerPage(){
                let manufacturers = this.sortedManufacturers;
                let from = (this.pages.current_page - 1) * this.pages.per_page;
                let to = from + this.pages.per_page;
                return manufacturers.slice(from, to);
            },

            filteredManufacturers(){
                const search = this.filter.search.toLowerCase()
                let manufacturers = this.temp_manufacturers
                if (search.length > 0) {
                    manufacturers = manufacturers.filter(manufacturer => {
                        return manufacturer.name.toLowerCase().includes(search)
                    })

                }
                // total = Math.ceil(manufacturers.length / this.pages.per_page)
                // this.pages.current_page = 1
                return manufacturers
            },

            totalPagesFiltered(){
                let manufacturers = this.sortedManufacturers
                return Math.ceil(manufacturers.length / this.pages.per_page)
            },

            sortedManufacturers(){
                let manufacturers = this.filteredManufacturers
                // check if sort type is number or string
                // check also if sort order is asc or desc
                if (this.sort.type === 'id') {
                    manufacturers = manufacturers.sort((a, b) => {
                        return this.sort.order === 'asc' ? a.id - b.id : b.id - a.id
                    })
                } else if (this.sort.type === 'name') {
                    manufacturers = manufacturers.sort((a, b) => {
                        return this.sort.order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
                    })
                } 
                // compare manufacturers created_at
                // manufacturers = manufacturers.sort((a, b) => {
                //     return this.sort.order === 'asc' ? a.created_at - b.created_at : b.created_at - a.created_at
                // })
                return manufacturers
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

        addManufacturer(manufacturer){
            console.log(manufacturer)
            axios.post(`http://localhost:5000/manufacturers/add`, manufacturer)
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

        // edit manufacturer
        editManufacturer(manufacturer){
            
           axios.put(`http://localhost:5000/manufacturers/${manufacturer.id}/edit`, manufacturer)
            .then(({data}) => {
                // this.success = true
                this.$emit('show-message',{
                    success:true,
                    type:'success',
                    title:'Success',
                    message:data.message
                })
                this.filter.search = manufacturer.name
            })
        
            .catch(error => {
                this.errorMessage = error.response.data.message
                // this.errors = error.response.data.errors
            })
            // hide modal
            this.actionShow('hide')
            
        },  
        
        deleteManufacturer(manufacturer){
    
            axios.delete(`http://localhost:5000/manufacturers/${manufacturer.id}/delete`)
            .then(({data}) => {
                // this.success = true
                this.$emit('show-message',{
                    success:true,
                    type:'success',
                    title:'Success',
                    message:data.message
                })
                this.filter.search = manufacturer.name
            })
            .catch(error => {
                this.errorMessage = error.response.data.message
            })
            
        },

        actionShow(showOrHide='hide',action='none',manufacturer=null){
            // this.getManufacturers()
            if(showOrHide === 'show'){
                this.action = showOrHide
                this.manufacturer = manufacturer
                if((action=='edit' || action=='add') && manufacturer!=null){
                    this.action = 'show'
                    this.manufacturer = manufacturer
                }
            }
            this.action = showOrHide
        },

        // get manufacturers from SSE server
        
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