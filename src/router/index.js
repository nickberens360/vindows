import { createRouter, createWebHistory } from 'vue-router';
import { useAppStore } from '@/store/app';
import authGuard from '@/services/authGuard';
import componentDocRoutes from '@/plugins/component-documentation/routes';

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
    {
      path: '/:id',
      name: 'window',
      component: () => import('@/views/DesktopView'),
      children: [
        {
          path: 'dashboard',
        }
      ]
    },


    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/views/LoginPage'),
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashBoard'),
      meta: {
        title: 'Dashboard',
      },
    },
    {
      path: '/orders',
      name: 'ordersIndex',
      component: () => import('@/views/DefaultCategoryPage'),
      meta: {
        category: 'Orders',
        title: 'Index',
      },
      children: [
        {
          path: 'management',
          name: 'ordersManagement',
          component: () => import('@/views/orders/ManagementPage'),
          meta: {
            category: 'Orders',
            title: 'Management',
          },
          children: [
            {
              path: 'orders/:sessionId',
              name: 'orderDetails',
              component: () => import('@/views/orders/details/OrderDetails'),
              meta: {
                category: 'Orders',
                title: 'Details',
              },
            },
          ],
        },
        {
          path: 'fulfillment',
          name: 'ordersFulfillment',
          component: () => import('@/views/orders/FulfillmentPage'),
          meta: {
            category: 'Orders',
            title: 'Fulfillment',
          },
          children: [
            {
              path: 'picking',
              name: 'ordersPicking',
              component: () => import('@/views/orders/fulfillment/picking/PickingPage'),
              meta: {
                category: 'Orders',
                title: 'Fulfillment',
              },
              children: [
                {
                  path: 'pending-pick',
                  name: 'ordersPendingPick',
                  component: () => import('@/views/orders/fulfillment/picking/PendingPickPage'),
                  meta: {
                    category: 'Orders',
                    title: 'Fulfillment',
                  },
                },
                {
                  path: 'pick-in-progress',
                  name: 'ordersPickInProgress',
                  component: () => import('@/views/orders/fulfillment/picking/PickInProgressPage'),
                  meta: {
                    category: 'Orders',
                    title: 'Fulfillment',
                  },
                },
                {
                  path: 'picked',
                  name: 'ordersPicked',
                  component: () => import('@/views/orders/fulfillment/picking/PickedPage'),
                  meta: {
                    category: 'Orders',
                    title: 'Fulfillment',
                  },
                },

              ],
            },
            {
              path: 'cutting',
              name: 'ordersCutting',
              component: () => import('@/views/orders/fulfillment/cutting/CuttingPage'),
              meta: {
                category: 'Orders',
                title: 'Fulfillment',
              }
            },
            {
              path: 'programming',
              name: 'ordersProgramming',
              component: () => import('@/views/orders/fulfillment/programming/ProgrammingPage'),
              meta: {
                category: 'Orders',
                title: 'Fulfillment',
              }
            },
            {
              path: 'exceptions',
              name: 'ordersExceptions',
              component: () => import('@/views/orders/fulfillment/exceptions/ExceptionsPage'),
              meta: {
                category: 'Orders',
                title: 'Fulfillment',
              }
            }
          ],
        },
      ],
    },
    {
      path: '/product-management',
      name: 'productIndex',
      component: () => import('@/views/DefaultCategoryPage'),
      meta: {
        category: 'Product Management',
        title: 'Index',
      },
      children: [
        {
          path: 'design',
          name: 'productDesign',
          component: () => import('@/views/productManagement/DesignPage'),
          meta: {
            category: 'Product Management',
            title: 'Design',
          },
        },
        {
          path: 'marketing',
          name: 'productMarketing',
          component: () => import('@/views/productManagement/MarketingPage'),
          meta: {
            category: 'Product Management',
            title: 'Marketing',
          },
        },
        {
          path: 'pricing',
          name: 'productPricing',
          component: () => import('@/views/productManagement/PricingPage'),
          meta: {
            category: 'Product Management',
            title: 'Pricing',
          },
        },
      ],
    },
    {
      path: '/kiosk-fleet',
      name: 'kioskFleetIndex',
      component: () => import('@/views/DefaultCategoryPage'),
      meta: {
        category: 'Kiosk Fleet',
        title: 'Index',
      },
      children: [
        {
          path: 'locations',
          name: 'kioskFleetLocations',
          component: () => import('@/views/kioskFleet/LocationsPage'),
          meta: {
            category: 'Kiosk Fleet',
            title: 'Locations',
          },
        },
        {
          path: 'territory',
          name: 'kioskFleetTerritory',
          component: () => import('@/views/kioskFleet/TerritoryPage'),
          meta: {
            category: 'Kiosk Fleet',
            title: 'Territory',
          },
        },
        {
          path: 'tso-support',
          name: 'kioskFleetTSOSupport',
          component: () => import('@/views/kioskFleet/TSOSupportPage'),
          meta: {
            category: 'Kiosk Fleet',
            title: 'TSO Support',
          },
        },
      ],
    },
    {
      path: '/kiosk-tech',
      name: 'kioskTechIndex',
      component: () => import('@/views/DefaultCategoryPage'),
      meta: {
        category: 'Kiosk Fleet',
        title: 'Index',
      },
      children: [
        {
          path: 'kiosks',
          name: 'kioskTechKiosks',
          component: () => import('@/views/kioskTech/KiosksPage'),
          meta: {
            category: 'Kiosk Tech',
            title: 'Kiosks',
          },
        },
        {
          path: 'inventory',
          name: 'kioskTechInventory',
          component: () => import('@/views/kioskTech/InventoryPage'),
          meta: {
            category: 'Kiosk Tech',
            title: 'Inventory',
          },
        },
        {
          path: 'shipments',
          name: 'kioskTechShipments',
          component: () => import('@/views/kioskTech/ShipmentsPage'),
          meta: {
            category: 'Kiosk Tech',
            title: 'Shipments',
          },
        },
        {
          path: 'service-route-planner',
          name: 'kioskTechServiceRoutePlanner',
          component: () => import('@/views/kioskTech/ServiceRoutePlannerPage'),
          meta: {
            category: 'Kiosk Tech',
            title: 'Service Route Planner',
          },
        },
      ],
    },
    {
      path: '/system-admin',
      name: 'systemAdminIndex',
      component: () => import('@/views/DefaultCategoryPage'),
      meta: {
        category: 'System Admin',
        title: 'Index',
      },
      children: [
        {
          path: 'users',
          name: 'systemAdminUsers',
          component: () => import('@/views/systemAdmin/UsersPage'),
          meta: {
            category: 'System Admin',
            title: 'Users',
          },
        },
        {
          path: 'permissions',
          name: 'systemAdminPermissions',
          component: () => import('@/views/systemAdmin/PermissionsPage'),
          meta: {
            category: 'System Admin',
            title: 'Permissions',
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'pageNotFound',
      component: () => import('@/views/NotFound'),
      meta: {
        title: '404 Page Not Found',
      },
    },
    ...(import.meta.env.PROD ? [] : [
      {
        path: '/component-docs',
        children: componentDocRoutes,
        meta: {
          bypassSystemStatusGuard: true,
          timeoutConfig: {
            preWarningDuration: 0
          }
        }
      }
    ])
  ],
});

router.beforeEach(authGuard);

router.afterEach((to) => {
  const { title } = useAppStore().config;
  const pageCategory = to.meta.category || '';
  const pageTitle = to.meta.title || '';

  document.title = `${pageCategory} ${pageTitle} - ${title}`;
});

export default router;
