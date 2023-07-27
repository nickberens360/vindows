<template>
  <div>
    <pre>{{ content.children }}</pre>
    <!--    TODO: Check for nested children-->
    <ul v-if="content.children">
      <li
        v-for="item in content.children"
        :key="item.name"
      >
        <router-link
          :to="{
            name: item.name,
          }"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <router-view />
    <!--    <pre-->
    <!--      v-for="item in content"-->
    <!--      :key="item.name"-->
    <!--    >{{ item.name }}</pre>-->
    <!--    <pre>{{ content.children }}</pre>-->
  </div>
</template>
<script>

export default {
  name: 'ContentView',
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
