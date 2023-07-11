<template>
  <v-layout class="d-flex h-100">
    <v-navigation-drawer
      v-model="drawer"
      class="h-100"
      width="400"
      permanent
      sticky
      color="#eee"
      style="padding-bottom: 275px;"
    >
      <div class="search-box mb-4">
        <v-text-field
          v-model="filterText"
          name="filter-list"
          placeholder="Filter Components"
          variant="underlined"
          class="rounded-10"
          prepend-inner-icon="fal fa-search"
          hide-details
        >
          <template #append-inner>
            <v-icon
              v-if="filterText"
              icon="fal fa-times"
              size="18"
              @click="filterText = ''"
            />
          </template>
        </v-text-field>
      </div>
      <v-list
        nav
        class="side-nav"
      >
        <RecursiveNavItem
          v-for="(item, index) in filteredDirectoryStructure"
          :key="index"
          :nav-items="item"
          @nav-click="handleNavClick"
        />
      </v-list>
      <v-sheet
        color="#ccc"
        class="nav-footer"
      >
        <img
          alt="Foxy Logo"
          src="../images/logo.png"
          class="foxy-logo"
          :class="{ 'animate-logo': isLogoMounted }"
        >
      </v-sheet>
    </v-navigation-drawer>
    <v-app-bar
      app
      class="z-999"
      title="Foxy Docs!"
      color="#eee"
      flat
    >
      <template #prepend>
        <v-btn
          icon
          @click="drawer = !drawer"
        >
          <img
            alt="Foxy Logo"
            src="../images/logo.png"
            class="foxy-logo"
            :class="{ 'animate-logo': !drawer }"
            style="max-width: 40px;"
          >
        </v-btn>
      </template>
      <v-btn
        variant="outlined"
        @click="$router.push(backBtnRoute)"
      >
        Back to App
      </v-btn>
    </v-app-bar>
    <v-main class="content">
      <Suspense>
        <router-view :key="$route.path" />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </v-main>
  </v-layout>
</template>

<script setup>
import { inject, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import RecursiveNavItem from '../components/RecursiveNavItem';

const componentDocPlugin = inject('componentDocPlugin');
const router = useRouter();

let filterText = ref(''); // define filterText as a reactive property
let drawer = ref(true); // define drawer as a reactive property
let isLogoMounted = ref(false); // track if the logo is mounted
let backBtnRoute = null; // track the route to go back to


onMounted(async () => {
  await router.isReady();
  const previousPath = router?.options?.history?.state.back || '/dashboard';
  if (previousPath === '/component-docs') {
    backBtnRoute = '/dashboard';
  } else {
    backBtnRoute = previousPath;
  }
  rotateLogo();
});
function rotateLogo() {
  setTimeout(() => {
    isLogoMounted.value = true;
  }, 0);
}

const directoryStructure = Object.keys(import.meta.glob('@/components/**/*.vue'))
  .reduce((accumulator, filePath) => {
    const relativePath = filePath.split('components/').slice(1).join('');
    const exampleComponent = componentDocPlugin.convertPathToExampleName(relativePath);
    const pathSegments = relativePath.split('/');
    let lastRef = accumulator;
    pathSegments.forEach((pathSegment) => {
      if (pathSegment.endsWith('.vue')) {
        lastRef[pathSegment] = ({ type: 'component', label: pathSegment, relativePath, exampleComponent });
      } else if (!lastRef[pathSegment]) {
        lastRef[pathSegment] = { type: 'directory', label: pathSegment, relativePath, children: {} };
        lastRef = lastRef[pathSegment].children;
      } else {
        lastRef = lastRef[pathSegment].children;
      }
    });
    return accumulator;
  }, {});

// Recursive filter function
function filterNestedStructure(structure, filterText) {
  return Object.entries(structure)
    .reduce((accumulator, [key, value]) => {
      if (value.type === 'directory' && Object.keys(value.children).length > 0) {
        const filteredChildren = filterNestedStructure(value.children, filterText);

        if (Object.keys(filteredChildren).length > 0) {
          accumulator[key] = { ...value, children: filteredChildren };
        }
      } else if (value.type === 'component' && value.label.toLowerCase().includes(filterText.toLowerCase())) {
        accumulator[key] = value;
      }

      return accumulator;
    }, {});
}

// create a computed property that returns the filtered directory structure
const filteredDirectoryStructure = computed(() => {
  if (!filterText.value) return directoryStructure; // if filter text is empty, return the full directory structure
  return filterNestedStructure(directoryStructure, filterText.value);
});

function handleNavClick(arg) {
  router.push({
    name: 'componentDoc',
    params: { componentName: arg.exampleComponent },
    query: { relativePath: arg.relativePath }
  });
}

</script>

<style lang="scss" scoped>
.side-nav {
  flex-basis: 300px;
}
.content {
  flex-basis: 100vw;
}

.nav-footer {
  position: absolute;
  z-index: 999;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.foxy-logo {
  display: block;
  position: relative;
  max-width: 200px;
  margin: 0 auto;
}

.animate-logo {
  animation: slideInFromBottom 0.8s ease forwards, rotateIn 1.2s ease forwards;
  animation-delay: 0.2s;
}

@keyframes slideInFromBottom {
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes rotateIn {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
