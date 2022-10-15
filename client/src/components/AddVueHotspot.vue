<template  >
<div>

<template >
  <div class="ui__vue_hotspot" ref="vueHotspot" v-if="config">
    <!-- image -->
    <img class="ui__vue_hotspot_background_image"
      ref="vueHotspotBackgroundImage"
      :src="config.image"
      @load="successLoadImg"
      alt="Hotspot Image"
      >
    <!-- overlay -->
    <span class="ui__vue_hotspot_overlay"  
      ref="vueHotspotOverlay"
      :style="`height: ${overlayHeight}; width: ${overlayWidth}; left: ${overlayLeft}; top: ${overlayTop};`"
      v-if="config.editable"
       @click.stop.prevent="getPosition"
       @click="dialog=true"
      >
      <p>{{ config.overlayText }}</p>
    </span>
    <!-- hotspot DataPoint -->
    <DataPoint
      v-for="(hotspot, i) in config.data"
      :key="i"
      :hotspot="hotspot"
      :config="config"
      :imageLoaded="imageLoaded"
      :vueHotspotBackgroundImage="vueHotspotBackgroundImage"
      :vueHotspot="vueHotspot"
    />
    <!-- ControlBox -->
    <ControlBox
      :config="config"
      
    />
  </div>
</template>

<template>
  
<div>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      
      max-width="500px"
    >
   
      <v-card>
   <v-form ref="form"   class="pa-5" enctype="multipart/form-data">
        <v-card-title>
          <span class="text-h5">Product Details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row
                cols="12"
                sm="6"
                md="4"
              >
<v-select  :options="options" label="title" v-model="item" v-on:input="onchange(`${item._id}`)" />


            </v-row>
              <v-row
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Prix"
                  v-model="item.Price"
                  hint="example of helper text only on focus"
                  required
                ></v-text-field>
              </v-row>
              <v-row
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Description"    
                  v-model="item.Description"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-row>
               <v-row
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="link"    
                  v-model="item._id"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-row>
           
             
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
          
            color="blue darken-1"
            text
            type="submit"
            @click.stop.prevent="addHotspot"   
            @click="dialog = false"   
          >
            Save
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
  </div> 
</template>    
   
</div>
</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'
import DataPoint from './module/DataPoint.vue'
import ControlBox from './module/ControlBox.vue'
import { throttle } from './utils/common.js'
import ProductDataService from '../../services/ProductDataService'
import CollectionDataService from '../../services/CollectionDataService'
import 'vue-select/dist/vue-select.css';


Vue.component('v-select', vSelect)
import VueCompositionApi, {
  createComponent,
  ref,
  reactive,
  toRefs,
  isRef,
  onMounted,
  onUnmounted,
  watch
} from '@vue/composition-api'

Vue.use(VueCompositionApi)

export default createComponent({
   data() {
        return{

          dialog :false,
            detail:{
                _id:"",
                title:"",
                Price:"",
                Description:"",
                link:""
       },
        options: [],
      
      
      }},
     
   async created(){
     /*  this.options=[
          { value: '1', text: 'aa' + ' - ' + '1',test:'0' },
          { value: '2', text: 'ab' + ' - ' + '2',test:'0' },
          { value: '3', text: 'bc' + ' - ' + '3',test:'0' },
          { value: '4', text: 'cd' + ' - ' + '4',test:'0' },
          { value: '5', text: 'de' + ' - ' + '5',test:'0' }
        ]  */

      this.options= await ProductDataService.getAllProduct()
       
  /*    for (let i=0 ; i<products.length;i++){
this.options[i] ={...products[i],value:products[i].Price,label:products[i].title,Description:products[i].Description}
  console.log(this.options)
     }  */
  

     
               }, 

          
  components: {
    DataPoint,
    ControlBox,
    vSelect
    

    
  },
  props: {
    initOptions: Object
  },
  setup (props, { emit }) {

      let detail={
                title:"",
                Price:"",
                Description:"",
                link:"",
                _id:""
       }
    let relativeX
    let relativeY
  
      let  item= {
          _id:'',
          title: '',
          Price:'',
          Description:'',
          link:''
        }

    const vueHotspot = ref(null)
    const vueHotspotOverlay = ref(null)
    const vueHotspotBackgroundImage = ref(null)
    const defaultOptions = reactive({
      // Object to hold the hotspot data points
      data: [
      ],
      

      // Default image placeholder
      image: 'https://via.placeholder.com/600x500?text=Oops!+image+not+found...',

      // Specify editable in which the plugin is to be used
      // `true`: Allows to create hotspots from UI
      // `false`: Display hotspots from `data` object
      editable: true,

      // Event on which the hotspot data point will show up
      // allowed values: `click`, `hover`, `none`
      interactivity: 'hover',

      // background color for hotspots
      hotspotColor: 'rgb(66, 184, 131)',
      messageBoxColor: 'rgb(255, 255, 255)',
      textColor: 'rgb(53, 73, 94)',

      // overlay text
      overlayText: 'Please Click The Image To Add Hotspots.',

      // opacity for hotspots, default is 0.8
      opacity: 0.8,

      // Hotspot schema
      schema: [
        {
          'property': 'Title',
          'default': 'Title'
        },
        {
          'property': 'Description',
          'default': 'Description'
        },
        {
          'property': 'Prix',
          'default': 'Prix'
        },
        {
          'property': 'link',
          'default': 'link'
        },
         {
          'property': 'id',
          'default': 'id'
        }
      ],
    
    })
  
    const config = ref(null)
    const imageLoaded = ref(false)
    const frameSize = reactive({
      overlayHeight: 0,
      overlayWidth: 0,
      overlayLeft: 0,
      overlayTop: 0
    })

    watch(imageLoaded, (loaded, prev) => {
     
      if (loaded) {
        resizeOverlay()
      }
    })

    watch(() => props.initOptions, (initOptions, prev) => {
      // overwrite defaults with initOptions
      config.value = { ...config.value ? config.value : deepCopy(defaultOptions), ...initOptions }
      
    
    },
     {
      deep: true,
       dialog (val) {
        val 
      },
        
    })

    onMounted(() => {
      
      window.addEventListener('resize', throttle(resizeOverlay, 50))
    })
    
    onUnmounted(() => {
      window.removeEventListener('resize', throttle(resizeOverlay, 50))
    })


    function getPosition(e){
       relativeX = e.offsetX
       relativeY = e.offsetY 
    }


      async function onchange(e){
          detail = await ProductDataService.getProductById(e); 
          console.log("detail",detail)
    }

  
    
    async function addHotspot (e) {
      //console.log('detail',detail)
      const unWrappedConfig = isRef(config) ? config.value : config
      const height = vueHotspotOverlay.value.offsetHeight
      const width = vueHotspotOverlay.value.offsetWidth
      const hotspot = { x: relativeX / width * 100, y: relativeY / height * 100 }
      const schema = unWrappedConfig.schema
   
     // enter via prompt id of product and then we generate info from backend
      hotspot['Title']=detail.title
      hotspot['Prix']=detail.Price
      hotspot['Description']=detail.Description
      hotspot['link']=detail._id
      hotspot['id']=detail._id

      unWrappedConfig.data.push(hotspot)  
      //console.log("testimage",unWrappedConfig)  
      //const response = await  CollectionDataService.create(unWrappedConfig);
      
    }
  function add(e){
    console.log("x",e.offsetX)
  }
    function resizeOverlay () {
      const image = isRef(vueHotspotBackgroundImage) ? vueHotspotBackgroundImage.value : vueHotspotBackgroundImage
      const frame = isRef(vueHotspot) ? vueHotspot.value : vueHotspot
      frameSize.overlayHeight = `${(image.clientHeight / frame.clientHeight) * 100}%`
      frameSize.overlayWidth = `${(image.clientWidth / frame.clientWidth) * 100}%`
      frameSize.overlayLeft = `${image.offsetLeft - frame.clientLeft}px`
      frameSize.overlayTop = `${image.offsetTop - frame.clientTop}px`
    }

    function deepCopy (obj) {
      return JSON.parse(JSON.stringify(obj))
    }

    function successLoadImg (event) {
      if (event.target.complete === true) {
        imageLoaded.value = true
      }
    }

     function saveAllHotspots () {
      const unWrappedConfig = isRef(config) ? config.value : config
      console.log("fromsave",unWrappedConfig)
      emit('save-data', unWrappedConfig.data) 
    }

    function removeAllHotspots () {
      emit('after-delete')
    }
   

    return {
      // data
      defaultOptions,
      config,
      imageLoaded,
      detail,item,
      
      ...toRefs(frameSize),
      // dom
      vueHotspot,
      vueHotspotOverlay,
      vueHotspotBackgroundImage,
      // methods
      deepCopy,
      successLoadImg,
      saveAllHotspots,
      removeAllHotspots,
      resizeOverlay,
      addHotspot,
      getPosition,
      onchange
    }
  }
})
</script>

<style>
.ui__vue_hotspot {
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
}
.ui__vue_hotspot_background_image {
  max-width: 100%;
  width: 100%;
}
/* CSS class for overlay used in `editable:true` mode */
span.ui__vue_hotspot_overlay {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0px;
  left: 0px;
  cursor: pointer;
}
span.ui__vue_hotspot_overlay > p {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.4);
  margin-top: 0px;
  padding: 20px;
  text-align: center;
}
</style>
