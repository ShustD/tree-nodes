import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


export const getTreeNodes = createAsyncThunk(
  'treeNodes/get',
  async (rejectWithValue) => {
    const treeName = 'myProjectTree'
    try {
      const response = await fetch(`https://test.vmarmysh.com/api.user.tree.get?treeName=${treeName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteNode = createAsyncThunk(
  'treeNodes/delete',
  async (nodeId, { dispatch, rejectWithValue }) => {
    const treeName = 'myProjectTree'
    try {
      const response = await fetch(`https://test.vmarmysh.com/api.user.tree.node.delete?treeName=${treeName}&nodeId=${nodeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      await dispatch(getTreeNodes())
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createTreeNode = createAsyncThunk(
  'treeNodes/create',
  async ({ nodeId, nodeName }, { dispatch, rejectWithValue }) => {
    const treeName = 'myProjectTree'
    
    try {
      const response = await fetch(`https://test.vmarmysh.com/api.user.tree.node.create?treeName=${treeName}&parentNodeId=${nodeId}&nodeName=${nodeName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      await dispatch(getTreeNodes())
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const editTreeNode = createAsyncThunk(
  'treeNodes/edit',
  async ({ nodeId, newNodeName }, { dispatch, rejectWithValue }) => {
    const treeName = 'myProjectTree'
    
    try {
      const response = await fetch(`https://test.vmarmysh.com/api.user.tree.node.rename?treeName=${treeName}&nodeId=${nodeId}&newNodeName=${newNodeName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      await dispatch(getTreeNodes())
      return await response.json()
      
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const treeNodesSlice = createSlice({
  name: 'treeNodes',
  initialState: {
    error: null,
    status: null,
    treeNodes: null,
	},
	reducers: {
		setDevLocale: (state, action) => {
		  state.language = action.payload
		},
	  }, 
  extraReducers: (builder) => {
    builder
      .addCase(getTreeNodes.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getTreeNodes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.treeNodes = action.payload
      })
      .addCase(getTreeNodes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
     
  },
})

export default treeNodesSlice.reducer