import { useState } from "react"
import styles from "./tree-nodes.module.scss"
import Modal from "../modal-window/modal-window"
import { ReactComponent as Create} from '../../assets/create.svg'
import { ReactComponent as Edit} from '../../assets/edit.svg'
import { ReactComponent as Delete} from '../../assets/delete.svg'

export const Node = ({ node, renderTree }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState({ type: null, node: null })
    const toggleNode = () => setIsOpen(!isOpen)
    const openModal = (type, event) => {
        event.stopPropagation()
        setModalInfo({ type, node });
    }
    return (
        <div>
            <div onClick={toggleNode} className={styles.node}>
                <div>
                    <span
                        className={styles.toggleIcon}
                    >
                        {node.children && node.children.length > 0 ? (isOpen ? "▼" : "▶") : "•"}
                    </span>
                    <span className={styles.nodeText}>{node.name}</span>
                </div>
                <div className={styles.actions}>
                    <Create onClick={(e) => openModal("create", e)} />
                    <Edit onClick={(e) => openModal("edit", e)} />
                    <Delete onClick={(e) => openModal("delete", e)} />
                </div>
            </div>

            {isOpen && node.children && node.children.length > 0 && (
                <div className={styles.childrenContainer}>
                    {node.children.map((child) => renderTree(child))}
                </div>
            )}
            {modalInfo.type && (
                <Modal
                    type={modalInfo.type}
                    node={modalInfo.node}
                    onClose={() => setModalInfo({ type: null, node: null })}
                />
            )}
        </div>
    )
}

