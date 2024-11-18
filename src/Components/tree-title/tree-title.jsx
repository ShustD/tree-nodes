import { useState } from 'react'
import { ReactComponent as Create} from '../../assets/create.svg'
import style from './tree-title.module.scss'
import Modal from '../modal-window/modal-window'

export const TreeTitle = ({nodeId, name}) => {
    const [modalInfo, setModalInfo] = useState({ type: null, node: null })
    const openModal = (type) => {
        setModalInfo({ type, node: {id: nodeId}})
    }
    return (
        <div className={style.title_contaliner}>
            <h1>{name}</h1>
            <Create onClick={(e) => openModal("create", e)}/>
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