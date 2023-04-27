<template>
    <svg xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      viewBox="0 0 16 16"
      :aria-labelledby="iconName"
      role="presentation"
    >
      <title
        :id="iconName"
        lang="en"
      >{{ iconName }} icon</title>
      <g :fill="iconColor">
        {{ iconSVG }}
      </g>
    </svg>
  </template>
<script>
export default {
  name: 'IconBase',
  props: {
    iconName: {
      type: String,
      default: 'box',
      required: true
    },
    width: {
      type: [Number, String],
      default: 16
    },
    height: {
      type: [Number, String],
      default: 16
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  },
  data () {
    return {
      icons: {
        rayo: '<path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M8.667 1.333 2 9.333h6l-.667 5.334 6.667-8H8l.667-5.334Z"/>',
        minimizar: '<path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M5.333 2v2A1.333 1.333 0 0 1 4 5.333H2m12 0h-2A1.333 1.333 0 0 1 10.667 4V2m0 12v-2A1.333 1.333 0 0 1 12 10.667h2m-12 0h2A1.333 1.333 0 0 1 5.333 12v2"/>'
      }
    }
  },
  computed: {
    iconSVG () {
      return this.icons[this.iconName] || ''
    }
  }
}
</script>
