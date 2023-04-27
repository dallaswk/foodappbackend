<template>
    <div :class="{active: active}" class="side-menu-link rounded-lg flex items-center h-12 gap-2 px-4">
        <span v-if="iconName" class=" h-7 w-7 rounded-lg flex items-center justify-center">
            <IconBase :iconName="iconName"/>
        </span>
        <span>{{ Name }}</span>
    </div>
</template>
<script>
import IconBase from '@/components/IconBase.vue'

export default {
  name: 'SideMenuLink',
  components: {
    IconBase
  },
  props: {
    Name: {
      type: String,
      default: 'Name',
      required: true
    },
    iconName: {
      type: String,
      default: '',
      required: true
    },
    active: {
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
    .side-menu-link.active {
        @apply shadow-lg bg-white;
        span:first-child {
            @apply bg-gray-50;
        }
    }
    .side-menu-link:not(.active):hover {
        @apply bg-gray-200 cursor-pointer;
        span:first-child {
            @apply bg-gray-50;
        }
    }
</style>
