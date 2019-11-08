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
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import('./views/HelloWorld.vue')
		},
		{
			path: '/popping',
			name: 'popping',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import('./views/Popping.vue')
		}
	]
});
