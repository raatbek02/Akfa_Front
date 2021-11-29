import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
	name: 'test',
	initialState: {
		test_arr:[]
	},
	reducers: {
		test(state,actions) {
			state.test_arr.push({
				
			})
		}
	}
})

export const { add } = testSlice.actions
export default testSlice.reducer