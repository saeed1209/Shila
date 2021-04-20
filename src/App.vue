<template>
  <div id="app" class="container mt-5">
    <div class="row">
      <div class="col form-inline">
        <b-form-input v-model="newDeliveryTitle" placeholder="Title for delivery" @keyup.enter="addDelivery"></b-form-input>
        <b-form-input v-model="newDeliveryDate" placeholder="Ex:2021-12-21 09:10:42" @keyup.enter="addDelivery"></b-form-input>
        <b-button class="ml-2" variant="primary" @click="addDelivery">Create new Delivery</b-button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-3">
        <div class="row">
        <Deliveries v-bind:deliveries="this.arrDeliveries"></Deliveries>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-4"  v-for="(array,index) in this.routesArray"  :key="index">
            <Route v-bind:routeArray="array"  v-bind:routeNumber="index"></Route>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style>
.route-columns{
  min-height: 300px;
}
</style>
<script>
import draggable from 'vuedraggable'
import axios from 'axios'
import Route from './components/Route'
import Deliveries from './components/Deliveries'
export default {
  title: 'App',
  components: {
    draggable,
    Route,
    Deliveries
  },
  data() {
    return {
      "newDeliveryTitle":'',
      "newDeliveryDate":'',
      "newArrDelivery":'',
      arrDeliveries:[
      ],
      routesArray:[],
      arrRoute:[]
    }
  },
  methods:{
    addDelivery(){
      if(this.newDeliveryTitle && this.newDeliveryDate){
        axios.post(process.env.VUE_APP_BASE_URL + 'deliveries',
          {
              'title':this.newDeliveryTitle,
              'date':this.newDeliveryDate
          }).then(response => {
          this.arrDeliveries.push({
            title:response.data.data.title,
            date:response.data.data.date,
            id:response.data.data.id
          })
      }).catch(e=>{
            console.log(e)
        })
        this.newDeliveryTitle=""
        this.newDeliveryDate=""
      }
    },
    getDeliveries:function(){
      for(var i=0;i<5;i++){
        this.routesArray[i]=[];
      }
      axios
        .get(process.env.VUE_APP_BASE_URL + 'deliveries')
        .then(response => {
          response.data.data.map((response,index)=>{
            if(response.route.route_id !=null ) this.routesArray[response.route.route_id-1].push(response)
            if(response.route.route_id==null) this.arrDeliveries.push(response)
          })
        }).catch(e=>{
        console.log(e)
      })
      console.log(this.arrDeliveries)
    },
  },
  created(){
    this.getDeliveries()
  }
}
</script>
