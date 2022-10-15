<template>
  <div class="ui__vue_hotspot_buttons_box">
    <div class="ui__vue_hotspot_buttons"
        :class="isEditable ? 'active' : ''">
      <!-- <button class="ui__vue_hotspot_save" @click="saveAllHotspots">Ok</button>
      <button class="ui__vue_hotspot_remove" @click="removeAllHotspots">Remove</button> -->
    </div>
  </div>
</template>

<script>
import { createComponent, computed } from '@vue/composition-api'
export default createComponent({
  props: {
    config: Object
  },
  setup (props, { emit }) {
    const isEditable = computed(() => props.config && props.config.editable)

    function saveAllHotspots () {
     
      emit('save-data', props.config.data)
    }

    function removeAllHotspots () {
      props.config.data = []
      emit('after-delete')
    }

    return {
      isEditable,
      saveAllHotspots,
      removeAllHotspots
    }
  }
})
</script>
