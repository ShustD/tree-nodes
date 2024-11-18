import React, { useState } from "react"
import styles from "./modal-window.module.scss"
import { useDispatch } from "react-redux"
import { createTreeNode, deleteNode, editTreeNode } from "../../store/treeNodeSlice"

const Modal = ({ type, node, onClose }) => {
    const [inputValue, setInputValue] = useState(node?.name || "")
    const dispatch = useDispatch()
    const confirmButton = (type, node) => {        
        switch (type) {
            case 'edit':
                dispatch(editTreeNode({ nodeId: node.id, newNodeName:  inputValue}))
                break
            case 'delete':
                dispatch(deleteNode(node.id))
                break
            case 'create':
                dispatch(createTreeNode({ nodeId: node.id, nodeName:  inputValue}))
                break
            default:
                break;
        }
    onClose()
    }   

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h3>{type === "edit" ? "Edit Node" : type === "delete" ? "Delete Node" : "Add Child"}</h3>
                {(type === "edit" || type === "create") && (
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter name"
                    />
                )}
                <div className={styles.modalActions}>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={() => confirmButton(type, node)}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default Modal
