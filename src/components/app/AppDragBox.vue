<template>
  <div
    class="position-relative drag-box-container"
  >
    <div
      :id="id"
      :ref="id"
      class="drag-box"
    >
      <!--      @click="handleClick()"-->
      <div
        :id="`handle-${id}`"
        :ref="`handle-${id}`"
        class="drag-box__handle"
        @mousedown="handleMouseDown"
      >
        <!--        v-on="{ mousedown: handleMouseDown }"-->
        <slot name="drag-area" />
      </div>
      <slot name="default" />
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useWindowManagerStore } from '@/store/windowManager';
export default {
  name: 'DragBox',
  props: {
    id: {
      type: String,
      required: true,
    },
    initialX: {
      type: Number,
      required: false,
      default: 0,
    },
    initialY: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  emits: ['drag-box-clicked', 'drag-box-mousedown', 'drag-box-mouseup'],
  data() {
    return {
      x: 0,
      y: 0,
      zIndex: 1,
    };
  },
  computed: {
    ...mapStores(useWindowManagerStore),
    setZIndex() {
      return this.zIndex;
    },
    setPositionsX() {
      return this.x + 'px';
    },
    setPositionsY() {
      return this.y + 'px';
    },
  },
  mounted() {
    this.x = this.initialX - this.$refs[this.id].offsetWidth / 2;
    this.y = this.initialY;
  },
  methods: {
    handleClick() {
      this.$emit('drag-box-clicked');
    },
    handleMouseDown(event) {
      event.preventDefault();
      this.$emit('drag-box-mousedown');
      const {clientX, clientY} = event;
      let currentX = clientX;
      let currentY = clientY;

      const handleMouseMove = event => {
        event.preventDefault();
        const {clientX, clientY} = event;
        this.x += clientX - currentX;
        this.y += clientY - currentY;
        currentX = clientX;
        currentY = clientY;
      };

      const handleMouseUp = () => {
        this.$emit('drag-box-mouseup');
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
  },
};
</script>

<style>
.drag-box {
  position: absolute;
  z-index: v-bind(setZIndex);
  top: v-bind(setPositionsY);
  left: v-bind(setPositionsX);
}
</style>
