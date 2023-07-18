import { getLeftItemsState, getRightItemsState } from "@/api/home";
import HomeStateModel from "./models/homeStateModel";
import { actionTypes, mutationTypes, namespace, relativeNamespace } from "./types";
import BaseMixinBuilder from "../../shared/base";
import StateManipulationMixinBuilder from "../../shared/stateManipulation";

const baseMixin = (new BaseMixinBuilder()).build();
class DefaultStateBuilder {
	constructor() {
	}
	
	build() {
		new HomeStateModel({
			isLoading: false,
			leftItems: [],
			rightItems: []
		});
	}
}

const stateManipulationMixin = (new StateManipulationMixinBuilder({
	defaultStateBuilder: new DefaultStateBuilder()
})).build();

const state = () => (new DefaultStateBuilder()).build();


const actions = {
	...baseMixin.actions,
	...stateManipulationMixin.actions,
	async [actionTypes.initialize]({ commit }) {
		commit(mutationTypes.SET_IS_LOADING_STATE, true);
		try {
			let leftItems = await getLeftItemsState();
			let rightItems = await getRightItemsState();
			commit(mutationTypes.SET_LEFT_ITEMS_STATE, leftItems.map(x => ({ ...x, selected: false })));
			commit(mutationTypes.SET_RIGHT_ITEMS_STATE, rightItems.map(x => ({ ...x, selected: false })));
			commit(mutationTypes.SET_LEFT_SELECTED_LIST, []);
			commit(mutationTypes.SET_LEFT_LIST_MAX_ITEMS, 6); //Max length left selected items
			commit(mutationTypes.SET_RIGHT_SELECTED_ITEM, null);
		} catch (e) {
			console.error(e);
		} finally {
			commit(mutationTypes.SET_IS_LOADING_STATE, false);
		}
	},
	async [actionTypes.updateLeftSelectedList]({ commit, state }, { id, name }) {
		if(state.leftSelectedList.length < state.leftListMaxItems && !state.leftSelectedList.find(x => x.id === id)) {
			commit(mutationTypes.SET_LEFT_SELECTED_LIST,  [...state.leftSelectedList, { id, name }]);
			commit(mutationTypes.SET_LEFT_ITEMS_STATE, [...state.leftItems.map(x => {
				if(x.id === id) x = { ...x, selected: true }
				return x
			})]);
		}
	},
	async [actionTypes.deleteLeftSelectedItem]({ commit, state }, id) {
		commit(mutationTypes.SET_LEFT_SELECTED_LIST, [...state.leftSelectedList.filter(x => x.id !== id)]);
		commit(mutationTypes.SET_LEFT_ITEMS_STATE, [...state.leftItems.map(x => {
			if(x.id === id) x = { ...x, selected: false }
			return x
		})]);
	},
	async [actionTypes.clearLeftSelectedList]({ commit, state }) {
		commit(mutationTypes.SET_LEFT_SELECTED_LIST, []);
		commit(mutationTypes.SET_LEFT_ITEMS_STATE, [...state.leftItems.map(x => ({ ...x, selected: false }))]);
	},
	async [actionTypes.updateRightSelectedItem]({ commit, state }, item) {
		if(state.rightSelectedItem?.id !== item.id) {
			commit(mutationTypes.SET_RIGHT_SELECTED_ITEM, item);
			commit(mutationTypes.SET_RIGHT_ITEMS_STATE, [...state.rightItems.map(x => ({ ...x, selected: x.id === item.id }))]);
		}
	},
	async [actionTypes.clearRightSelectedItem]({ commit, state }) {
		commit(mutationTypes.SET_RIGHT_SELECTED_ITEM, null);
		commit(mutationTypes.SET_RIGHT_ITEMS_STATE, [...state.rightItems.map(x => ({ ...x, selected: false }))]);
	}
};

const mutations = {
	[mutationTypes.SET_IS_LOADING_STATE](state, value) {
		state.isLoading = value;
	},
	[mutationTypes.SET_LEFT_ITEMS_STATE](state, values) {
		state.leftItems = values;
	},
	[mutationTypes.SET_RIGHT_ITEMS_STATE](state, values) {
		state.rightItems = values;
	},
	[mutationTypes.SET_RIGHT_SELECTED_ITEM](state, value) {
		state.rightSelectedItem = value;
	},
	[mutationTypes.SET_LEFT_SELECTED_LIST](state, values) {
		state.leftSelectedList = values;
	},
	[mutationTypes.SET_LEFT_LIST_MAX_ITEMS](state, value) {
		state.leftListMaxItems = value;
	}
};

export {
	namespace, state, actions, mutations, relativeNamespace
};

const homeModule = {
	namespace, state, actions, mutations, namespaced: true, relativeNamespace
};

export default homeModule;
