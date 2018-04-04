import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import App from '@/App';
import LayoutView from '@/views/LayoutView';
import HeaderComponent from '@/components/HeaderComponent';
import ExtensionsCatalogComponent from '@/components/extensions-catalog/ExtensionsCatalogComponent';
import ExtensionsManagerContainer from '@/views/extensions-manager/ExtensionsManagerView';
import ExtensionInfosComponent from '@/components/extensions-catalog/ExtensionInfosComponent';

Vue.use(Router);

const layoutRoutes = [{
  component: ExtensionsCatalogComponent,
  path: 'extensions-catalog',
}, {
  component: ExtensionsManagerContainer,
  path: 'extensions-manager',
}, {
  component: ExtensionInfosComponent,
  path: 'extensions-catalog/:app_id/extension-info/:id',
}];

const rootRoutes = [];

export default new Router({
  routes: [{
    path: '/',
    component: LayoutView,
    children: layoutRoutes,
  },
  ...rootRoutes],
});

export const addRootRoute = (route) => {
  rootRoutes.push(route);
};

export const addLayoutRoute = (route) => {
  layoutRoutes.push(route);
};
