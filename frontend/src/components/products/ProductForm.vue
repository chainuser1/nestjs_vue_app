<template>
         <div class="modal-cs">
                <div class="modal-dialog modal-dialog-cs modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                            <div class="modal-header">
            
                                    <h5 class="modal-title">{{this.product!==null?'Update Product':'Add Product'}}</h5>
                                        <button type="button"  @click="actionShow()">
                                            <i class="fas fa-window-close    "></i>
                                        </button>
                                </div>
                        <form @submit.prevent="this.product!==null?updateProduct(this.new_product):addProduct(this.new_product)">
                            <!-- <input type="hidden" :value ="updateProduct"/> -->
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="form-group">
                                        <label for="name">Name</label>
                                        <input type="text" class="form-control" v-model="this.new_product.name" id="name" placeholder="Enter name">
                                    </div>
                                    <div class="form-group">
                                        <label for="price">Price</label>
                                        <input type="text" class="form-control" v-model="this.new_product.price" id="price" placeholder="Enter price">
                                    </div>
                                    <div class="form-group">
                                        <label for="stock">Stock</label>
                                        <input type="text" class="form-control" v-model="this.new_product.stock" id="stock" placeholder="Enter stock">
                                    </div>
                                    <div class="form-group">
                                        <label for="manufacturer">Manufacturer</label>
                                        <select  class="form-control" v-model="this.new_product.manufacturerId">
                                            <option selected>--Select Manufacturer--</option>
                                            <option :key="manufacturer.id" v-for="manufacturer in manufacturers" :value="manufacturer.id">{{manufacturer.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="description">Description</label>
                                        <textarea class="form-control" v-model="this.new_product.description" id="description" placeholder="Enter description"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-danger color-secondary">Save</button>
                            </div>
                         </form>
                    </div>
                </div>
    </div>
</template>
<script>
export default {
    name : 'ProductForm',
    props: ['product','manufacturers'],
    data() {
        return {
            new_product: {
                id: this.product!==null?this.product.id:'0',
                name: this.product!==null?this.product.name:'',
                price: this.product!==null?this.product.price:'',
                stock: this.product!==null?this.product.stock:'',
                manufacturerId: this.product!==null?this.product.manufacturerId:'',
                description: this.product!==null?this.product.description:'',
            }
        }
    },
    methods:{
        updateProduct(product){
            this.$emit('update-product', product);
        },
        addProduct(product){
            this.$emit('add-product', product);
        },
        actionShow(){
            this.$emit('action-show');
        }
    }
    

}
</script>

<style scoped>
/* create a modal dialog */
.modal-cs{
   width:100%;  
   height:100%; 
   background: rgba(0,0,0,0.8); 
    position:fixed;
    top:0;
    left:0;
    z-index:100;
}
.modal-dialog-cs{
    width:500px;
    height:auto;
    margin:auto;
}


</style>