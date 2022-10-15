<template>
  <div class="ui__vue_hotspot_hotspot" :style="`top: ${positionTop}; left: ${positionLeft}; background-color: white;`"
    :class="isActive || interactivity === 'none' ? 'active' : ''"
    @mouseenter="interactivity === 'hover' ? isActive=true : null"
    @mouseleave="interactivity === 'hover' ? isActive=false : null"
    @click="interactivity === 'click' ? toggleActive() : null">
    <!-- message box -->
      <div :style="`color:${textColor}`">
        <div class="ui__vue_hotspot_title" :style="`background: ${messageBoxColor}; opacity: ${opacity}`">
          <a :href="`http://localhost:8080/product/${ hotspot['Link']}`" style="color: black;font-size:medium;">
          {{hotspot['Title'] }} > 
          </a>
        </div>
        <div class="ui__vue_hotspot_message" :style="`background: ${messageBoxColor};opacity: ${opacity}`">
          <!--  <a :href="`product/${ hotspot['Link']}`">{{ hotspot['Title'] }}  </a><br> -->
          <div style="color: black;font-size:1.1em;"> {{hotspot['Prix'] }}Dh<br>
            {{ hotspot['Description'] }}
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { throttle } from '../utils/common.js'
import {
  createComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
  computed,
  watch
} from '@vue/composition-api'

export default createComponent({
  data:()=>({
    website:'http://ecours-ensa.uiz.ac.ma/my/'
  }),
  props: {
    hotspot: Object,
    config: Object,
    imageLoaded: Boolean,
    vueHotspotBackgroundImage: HTMLImageElement,
    vueHotspot: HTMLDivElement
  },
  
  setup (props, { emit }) {
    const isActive = ref(false)
    const conf = reactive({
      positionTop: 0,
      positionLeft: 0,
      interactivity: computed(() => props.config && props.config.interactivity),
      textColor: computed(() => props.config && props.config.textColor),
      messageBoxColor: computed(() => props.config && props.config.messageBoxColor),
      opacity: computed(() => props.config && props.config.opacity)
    })

    watch(() => props.imageLoaded, (loaded, prev) => {
      if (loaded) {
        getHotspotStyle()
      }
    })

    onMounted(() => {
      window.addEventListener('resize', throttle(getHotspotStyle, 50))
    })

    onUnmounted(() => {
      window.removeEventListener('resize', throttle(getHotspotStyle, 50))
    })

    function getHotspotStyle () {
      conf.positionTop = `${(props.hotspot.y * props.vueHotspotBackgroundImage.clientHeight / 100) + (props.vueHotspotBackgroundImage.offsetTop - props.vueHotspot.clientTop)}px;`
      conf.positionLeft = `${(props.hotspot.x * props.vueHotspotBackgroundImage.clientWidth / 100) + (props.vueHotspotBackgroundImage.offsetLeft - props.vueHotspot.clientLeft)}px;`
    }

    function toggleActive () {
      //isActive.value = !isActive.value
      console.log("click")
      //this.$router.go(`http://localhost:8080/product/${hotspot['Link']}`);
    }

    return {
      // data
      isActive,
      ...toRefs(conf),
      // methods
      getHotspotStyle,
      toggleActive
    }
  }
})
</script>

<style scoped>
/* CSS class for hotspot data points */
.ui__vue_hotspot_hotspot {
 position: absolute;
  content: "";
  top: 50%;
  left: 80%;
  height: 20px;
  width: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  cursor: pointer;
}
.ui__vue_hotspot_hotspot::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(24, 15, 15);
  border-radius: 50%;
  animation: puls-effect 1s ease infinite;
}
@keyframes puls-effect{
  0%{
    transform: scale(.5);
    opacity: 1;
  }
  100%{
    transform: scale(3);
    opacity: 0;
  }
}
.ui__vue_hotspot_hotspot > div {
  width: 160px;
  height: 94px;
  margin: -104px -60px;
  border-radius: 4px;
  overflow: hidden;
  font-size: 10px;
  display: none;
}
.ui__vue_hotspot_hotspot.active > div {
  display: block; /* Required */
}
.ui__vue_hotspot_hotspot.active > div:before {
  border: solid transparent;
  content: ' ';
  height: 0;
  left: 0;
  position: absolute;
  width: 0;
  border-width: 10px;
  border-left-color: rgba(255, 255, 255, 0.4);
  transform: rotate(90deg);
  top: -10px;
}
.ui__vue_hotspot_hotspot > div > .ui__vue_hotspot_title {
  height: 20px;
  line-height: 20px;
  font-weight: bold;
  padding: 4px 10px;
  transition: opacity 0.2s ease-in;
}
.ui__vue_hotspot_hotspot > div > .ui__vue_hotspot_message {
  margin-top: 2px;
  padding: 10px 10px;
  height: 120px;
  overflow-y: auto;
  transition: opacity 0.2s ease-in;
}
img{
    margin-top: 2px;
  padding: 10px 10px;
  height: 72px;
  overflow-y: auto;
  transition: opacity 0.2s ease-in;
}
</style>
