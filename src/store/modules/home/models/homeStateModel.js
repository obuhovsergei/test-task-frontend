export default class HomeStateModel {
	constructor({
		isLoading,
		leftItems,
		rightItems,
		leftListMaxItems,
		leftSelectedList,
		rightSelectedItem
	})
	{
		this.isLoading = isLoading;
		this.leftItems = leftItems;
		this.rightItems = rightItems;
		this.leftListMaxItems = leftListMaxItems;
		this.leftSelectedList = leftSelectedList;
		this.rightSelectedItem = rightSelectedItem;
	}
}
