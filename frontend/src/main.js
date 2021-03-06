import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import  './assets/theme.css';
import  './assets/app.css';


// import bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
// import bootstrap js
import 'bootstrap/dist/js/bootstrap.js'

const store = createStore({
    state: {
        products: [],
        manufacturers: [],
        customers: [],
        orders: [],
        loading:false
    },

    getters: {
        products(state) {
            return state.products
        },
        manufacturers(state) {
            return state.manufacturers
        },

        loading(state) {
            return state.loading
        }
    },

    mutations: {
        setProducts(state, products) {
            state.products = products
        },
        setManufacturers(state, manufacturers) {
            state.manufacturers = manufacturers
        },
        setLoading(state, loading) {
            state.loading = loading
        }
    },



})

const app = createApp(App);
app.use(store);
app.mount('#app');

