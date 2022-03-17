<template>
         <div class="modal-cs">
                <div class="modal-dialog modal-dialog-cs modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                            <div class="modal-header">
            
                                    <h5 class="modal-title">{{this.manufacturer!==null?'Update Manufacturer':'Add Manufacturer'}}</h5>
                                        <button type="button"  @click="actionShow()">
                                            <i class="fas fa-window-close    "></i>
                                        </button>
                                </div>
                        <form @submit.prevent="this.manufacturer!==null?updateManufacturer(this.new_manufacturer):addManufacturer(this.new_manufacturer)">
                            <!-- <input type="hidden" :value ="updateManufacturer"/> -->
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="form-group">
                                        <label for="name">Name</label>
                                        <input type="text" class="form-control" v-model="this.new_manufacturer.name" id="name" placeholder="Enter name">
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
    name : 'ManufacturerForm',
    props: ['manufacturer'],
    data() {
        return {
            new_manufacturer: {
                id: this.manufacturer!==null?this.manufacturer.id:'0',
                name: this.manufacturer!==null?this.manufacturer.name:'',
               
            }
        }
    },
    methods:{
        updateManufacturer(manufacturer){
            this.$emit('update-manufacturer', manufacturer);
        },
        addManufacturer(manufacturer){
            this.$emit('add-manufacturer', manufacturer);
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