import { baseActionTypes } from "./types";
import stateManipulationMixinTypes from "../stateManipulation/types";

export default class BaseMixinBuilder {
	constructor() {
	}
	
	build() {
		return {
			actions: {
				[baseActionTypes.initialize]() {
				},
				[baseActionTypes.destroy]({ dispatch }) {
					dispatch(stateManipulationMixinTypes.actionTypes.resetState);
				}
			}
		};
	}
}
