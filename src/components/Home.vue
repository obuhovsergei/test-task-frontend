<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-row>
					<v-col cols="6" md="3">
						<v-card class="mx-auto"
								:loading="isLoading"
								variant="outlined">
							<v-card-item>
								<v-container>
									<v-row>
										<template v-if="leftSelectedList && leftSelectedList.length === 0">Empty left list</template>
										<v-col class="pa-4" cols="12" sm="6" lg="6" v-for="{ id, name } in leftSelectedList" :key="`${name}__${id}`">
											<v-row>
												<v-col cols="12" class="d-flex justify-space-between align-center border-dashed">
													<p>{{ name }}</p>
													<v-btn icon="$close" class="ma-0 pa-0" density="comfortable" variant="plain" @click.stop="deleteLeftItem(id)"/>
												</v-col>
											</v-row>
										</v-col>
									</v-row>
								</v-container>
							</v-card-item>

							<v-card-actions class="d-flex justify-space-between">
								<p class="ml-3" v-show="leftListMaxItems">Selected: {{ leftSelectedList && leftSelectedList.length }}/{{ leftListMaxItems }}</p>
								<v-btn variant="outlined" @click="clearLeftSelectedList" :disabled="leftSelectedList && leftSelectedList.length === 0 || isLoading">
									Clear all
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
					<v-col cols="6" md="3" offset-md="6">
						<v-card class="mx-auto" :loading="isLoading"
								variant="outlined">
							<v-card-item class="d-flex justify-center align-center">
								<h2 v-if="rightSelectedItem">
									{{ rightSelectedItem.name }}
								</h2>
								<p v-else>Empty right selected item</p>
							</v-card-item>

							<v-card-actions class="d-flex justify-end">
								<v-btn variant="outlined" :disabled="!rightSelectedItem || isLoading" @click.stop="clearRightSelectedItem">
									Clear
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12">
				<v-row>
					<v-col cols="6">
						<v-card class="mx-auto h-screen" style="overflow-y: auto;max-height: 100vh;" variant="outlined" :loading="isLoading">
							<v-container>
								<v-row>
									<v-col class="pa-4" cols="12" md="6" lg="3" v-for="item in leftItems" :key="item.id">
										<v-card variant="outlined" @click="setLeftItems(item)" :class="{ 'bg-grey-darken-1': item.selected }">
											<v-card-title>
												{{ item.name }}
											</v-card-title>
										</v-card>
									</v-col>
								</v-row>
							</v-container>
						</v-card>
					</v-col>
					<v-col cols="6">
						<v-card class="mx-auto h-screen" style="overflow-y: auto;max-height: 100vh;" variant="outlined" :loading="isLoading">
							<v-container>
								<v-row>
									<v-col class="pa-4" cols="12" md="6" lg="3" v-for="item in rightItems" :key="item.id">
										<v-card variant="outlined" @click="updateRightSelectedItem(item)" :class="{ 'bg-grey-darken-1': item.selected }">
											<v-card-title>
												{{ item.name }}
											</v-card-title>
										</v-card>
									</v-col>
								</v-row>
							</v-container>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { actionTypes, namespace } from "@/store/modules/home/types";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers(namespace);

export default {
	name: "HomeComponent",
	computed: {
		...mapState({
			leftItems: state => state.leftItems,
			rightItems: state => state.rightItems,
			isLoading: state => state.isLoading,
			leftSelectedList: state => state.leftSelectedList,
			rightSelectedItem: state => state.rightSelectedItem,
			leftListMaxItems: state => state.leftListMaxItems
		})
	},
	methods: {
		...mapActions({
			initializeStore: actionTypes.initialize,
			setLeftItems: actionTypes.updateLeftSelectedList,
			deleteLeftItem: actionTypes.deleteLeftSelectedItem,
			clearLeftSelectedList: actionTypes.clearLeftSelectedList,
			updateRightSelectedItem: actionTypes.updateRightSelectedItem,
			clearRightSelectedItem: actionTypes.clearRightSelectedItem,
			destroyStore: actionTypes.destroy,
		})
	},
	async created() {
		await this.initializeStore();
	},
	beforeUnmount() {
		this.destroyStore()
	}
};
</script>
