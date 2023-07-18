import { leftItems, rightItems } from "../client/mock";
import ApiLeftItemsStateModel from "../models/ApiLeftItemsStateModel";
import ApiRightItemsStateModel from "../models/ApiRightItemsStateModel";

export const getLeftItemsState = async () => {
	let items = await new Promise(resolve => setTimeout(() => {
		resolve(leftItems);
	}, 500));
	return items.map(x => new ApiLeftItemsStateModel(x));
};

export const getRightItemsState = async () => {
	let items = await new Promise(resolve => setTimeout(() => {
		resolve(rightItems);
	}, 500));
	return items.map(x => new ApiRightItemsStateModel(x));
};
