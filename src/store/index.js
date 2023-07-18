import { createStore } from "vuex";
import homeModule from "./modules/home";

const store = createStore({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		[homeModule.namespace]: {
			...homeModule
		}
	}
});

export default store;
