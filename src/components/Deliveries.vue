<template>
  <div class="col-md-12">
    <div class="p-2 alert alert-secondary">
      <h5 class="text-center">Deliveries</h5>
      <draggable class="list-group route-columns" :list="arrDeliveries" group="tasks" @start="drag=true" @end="drag=false"  :move="checkMove" >
        <div class="list-group-item" v-for="(element,index) in arrDeliveries"  :key="index" >
          <button type="button" class="close" @click="remove(index,element.id)" aria-label="Close">
            <small><span aria-hidden="true">&times;</span></small>
          </button>
          {{ element.title}}<br/>
          <span class="badge">position:{{ index+1 }}</span>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import axios from 'axios'

export default {
  title: 'App',
  props:['deliveries'],
  components: {
    draggable,
  },
  data(){
    return{
      arrDeliveries:this.deliveries,
    }
  },
  methods:{
    add(){
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
    checkMove: function (e){
      var data=[]
      data.push({
        'position':e.draggedContext.futureIndex,
        'delivery_id':e.draggedContext.element.id,
        'route_id':e.to.id,
      })
      axios.patch(process.env.VUE_APP_BASE_URL + 'routes',
        {
          'data':data
        }).then(response => (
        console.log('response')
      )).catch(e=>{
        console.log(e.message)
      })
    },
    remove: function(index,delivery_id){
      console.log(delivery_id)
      axios.delete(process.env.VUE_APP_BASE_URL + 'deliveries/'+delivery_id )
        .then(response => {
          if(response.status==200)
          {
            this.arrRoute.splice(index, 0);
          }
        }).catch(e=>{
        console.log(e);
      });
      this.arrDeliveries.splice(index, 1);
    },
  }
}
</script>
