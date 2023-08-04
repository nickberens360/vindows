import { createRouter, createWebHistory } from 'vue-router';
// import ContentView  from '@/views/content/ContentView.vue';
// import FileView  from '@/views/content/FileView.vue';
import fileSystem from '@/data/fileSystem';
const generatedRoutes = generateRoutesFromFileSystem(fileSystem.root);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'desktop',
      component: () => import('@/views/DesktopView'),
      meta: {
        title: 'Desktop',
      },
    },
    // {
    //   path: '/explorer/:id*',
    //   name: 'explorer',
    //   component: () => import('@/views/DesktopView'),
    // },

    ...generatedRoutes,
    // {
    //   path: '/',
    //   name: 'desktop',
    //   component: () => import('@/views/DesktopView'),
    //   meta: {
    //     title: 'Desktop',
    //   },
    // },
    // {
    //   path: '/explorer/:id*',
    //   name: 'explorer',
    //   component: () => import('@/views/DesktopView'),
    //   props: (route) => ({
    //     query: route.query, // Pass all query parameters as the `query` prop
    //   }),
    // },


    {
      path: '/:pathMatch(.*)*',
      name: 'pageNotFound',
      component: () => import('@/views/NotFound'),
      meta: {
        title: '404 Page Not Found',
      },
    },
  ],
});

// Custom recursive function to generate routes
function generateRoutesFromFileSystem(fileSystemData, currentPath = '') {
  const routes = [];

  for (const item of fileSystemData.children) {

    const itemPath = currentPath === '' ? `/${item.name}` : `${currentPath}/${item.name}`;
    // TODO: Such mess. Need to refactor
    let component = null;
    if (item.type === 'folder' && item.depth === 1) {
      component = () => import('@/views/DesktopView');
    } else if (item.type === 'folder' && item.depth > 1) {
      component = () => import('@/views/content/SubContentView.vue');
    } else if (item.type === 'file') {
      component = () => import('@/views/content/FileView.vue');
    }

    const route = {
      path: `/explorer${itemPath}`,
      name: `${item.name}`,
      component: component,
      children: [], // Add an empty children array for nested routes
    };

    // Add route to routes array
    routes.push(route);

    if (item.type === 'folder' && item.children && item.children.length > 0) {
      // Recursively generate routes for nested folders and files
      const nestedRoutes = generateRoutesFromFileSystem(item, itemPath);
      route.children.push(...nestedRoutes); // Add nested routes to the children array
    }
  }

  return routes;
}



export default router;
