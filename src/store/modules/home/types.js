import { baseActionTypes } from "../../shared/base/types";
import stateManipulationMixinTypes from "../../shared/stateManipulation/types";

export const namespace = "home";
export const relativeNamespace = "home";

export const actionTypes = {
	...baseActionTypes,
	...stateManipulationMixinTypes.actionTypes,
	updateLeftSelectedList: "updateLeftSelectedList",
	deleteLeftSelectedItem: "deleteLeftSelectedItem",
	clearLeftSelectedList: "clearLeftSelectedList",
	updateRightSelectedItem: "updateRightSelectedItem",
	clearRightSelectedItem: "clearRightSelectedItem"
};

export const mutationTypes = {
	SET_IS_LOADING_STATE: "SET_IS_LOADING_STATE",
	SET_LEFT_ITEMS_STATE: "SET_LEFT_ITEMS_STATE",
	SET_RIGHT_ITEMS_STATE: "SET_RIGHT_ITEMS_STATE",
	SET_LEFT_SELECTED_LIST: "SET_LEFT_SELECTED_LIST",
	SET_LEFT_LIST_MAX_ITEMS: "SET_LEFT_LIST_MAX_ITEMS",
	CLEAR_LEFT_SELECTED_LIST: "CLEAR_LEFT_SELECTED_LIST",
	SET_RIGHT_SELECTED_ITEM: "SET_RIGHT_SELECTED_ITEM"
};
