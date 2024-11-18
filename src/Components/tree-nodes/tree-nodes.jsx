
import { Node } from "./node"
import styles from "./tree-nodes.module.scss"

export const TreeNodes = ({ nodes }) => {
    const renderTree = (node) => {
        return <Node key={node.name} node={node} renderTree={renderTree} />
    }

    return (
        <div className={styles.container}>
            {nodes.map((node) => renderTree(node))}
        </div>
    )
}

