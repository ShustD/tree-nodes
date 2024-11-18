import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { getTreeNodes } from './store/treeNodeSlice';
import { TreeNodes } from './Components/tree-nodes/tree-nodes';
import { useEffect } from 'react';
import { TreeTitle } from './Components/tree-title/tree-title';

export const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTreeNodes())
    }, [dispatch])

    const { treeNodes } = useSelector(state => state.treeNodes)
    return (
        <div className='app'>
            {treeNodes
                && <>
                    <TreeTitle nodeId={treeNodes.id} name={treeNodes.name} />
                    <TreeNodes nodes={treeNodes.children} />
                </>
            }
        </div>
    )
}

