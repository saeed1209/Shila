<template>
    <div :class="this.getClass()">
      <h5 class="text-center">Route {{ this.routeNumber+1}}</h5>
      <draggable class="list-group route-columns"  :id="this.routeNumber+1"  :sort="true"
                 :list="this.routeArray" group="tasks"  :move="checkMove" >
        <div class="list-group-item" v-for="(element,index) in arrRoute"  :key="index" >
          <button type="button" class="close" @click="remove(index,element.id)" aria-label="Close">
            <small><span aria-hidden="true">&times;</span></small>
          </button>
          title:{{ element.title}}<br/>
          <span class="badge">position:{{ index}}</span>
        </div>
      </draggable>
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

export default {
  title: 'App',
  props:['routeArray','routeNumber'],
  components: {
    draggable,
  },
  data(){
    return{
      arrRoute:this.routeArray,
      relatedData:[],
      bootstrapClass:[
        'p-2 alert alert-warning',
        'p-2 alert alert-success',
        'p-2 alert alert-info',
        'p-2 alert alert-danger',
        'p-2 alert alert-primary'
      ]
    }
  },
  methods:{
    checkMove: function (e){
      var data=[];
      if(!!e.draggedContext.element.route){
        axios.post(process.env.VUE_APP_BASE_URL + 'routes',
          {
            'delivery_id':e.draggedContext.element.id
          }).then(response => {
            console.log(response)
        }).catch(e=>{
          console.log(e.message)
        })
      }

      if(e.relatedContext.list.length>0) {
        var that = this;
        setTimeout(function (){
          for(var i=0;i<e.relatedContext.list.length;i++){
            data.push({
              position:i,
              delivery_id : e.relatedContext.list[i]['id'],
              route_id: e.to.id
            });
          }
          that.sendData(data)
        },1000)

      }else{
        data.push({
          'position':e.draggedContext.futureIndex,
          'delivery_id':e.draggedContext.element.id,
          'route_id':e.to.id,
        })
        this.sendData(data)
      }
    },
    sendData(data){
      axios.patch(process.env.VUE_APP_BASE_URL + 'routes',
        {
          'data':data
        }).then(response => {
      }).catch(e=>{
        console.log(e.message)
      })
    },
    getClass()
    {
      return this.bootstrapClass[this.routeNumber]
    },
    remove: function(index,delivery_id){
      axios.delete(process.env.VUE_APP_BASE_URL + 'deliveries/'+delivery_id )
        .then(response => {
          if(response.status==200)
          {
            this.arrRoute.splice(index, 0);
          }
        }).catch(e=>{
          console.log(e);
      });
      this.arrRoute.splice(index, 1);
    },
  }
}
</script>
