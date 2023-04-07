export class NodeEntity {
  properties: { id: number }

  constructor(id: number) {
    this.properties = { id }
  }
}

class TreeNodeEntity {
  id: number
  children: TreeNodeEntity[] = []

  constructor(id: number) {
    this.id = id
  }
}

const _nodeToTree = (nodes: NodeEntity[][]): TreeNodeEntity[] => {
  const root = new TreeNodeEntity(-1)
  const lookup = new Map<number, TreeNodeEntity>()

  let sup: TreeNodeEntity
  for (const path of nodes) {
    sup = root

    for (const node of path.reverse()) {
      if (!lookup.has(node.properties.id)) {
        lookup.set(node.properties.id, new TreeNodeEntity(node.properties.id))
      }
      const treeNode = lookup.get(node.properties.id)
      if (!treeNode) { throw new Error('unreachable') }

      if (!sup.children.includes(treeNode)) {
        sup.children.push(treeNode)
      }

      sup = treeNode
    }
  }

  return root.children
}

const tree = _nodeToTree([
  [new NodeEntity(1), new NodeEntity(2), new NodeEntity(3)],
  [new NodeEntity(4), new NodeEntity(2), new NodeEntity(3)],
])

console.log(tree)

