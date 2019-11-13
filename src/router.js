import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/hello-world',
			name: 'hello-world',
			component: () => import('./views/HelloWorld.vue')
		},
		{
			path: '/hello-popping',
			name: 'hello-popping',
			component: () => import('./views/HelloPopping.vue')
		},
		{
			path: '/popping',
			name: 'popping',
			component: () => import('./views/Popping.vue')
		},
		{
			path: '/loadinator',
			name: 'loadinator',
			component: () => import('./views/Loadinator.vue')
		}
	]
});
