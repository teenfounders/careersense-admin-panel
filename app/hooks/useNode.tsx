interface TreeNode {
  id: number;
  name?: string;
  items: TreeNode[];
}

interface NodeFunctions {
  insertNode: (tree: TreeNode, commentId: number, item: string) => TreeNode;
  editNode: (tree: TreeNode, commentId: number, value: string) => TreeNode;
  deleteNode: (tree: TreeNode, id: number) => TreeNode;
}

const useNode = (): NodeFunctions => {
  const insertNode = (
    tree: TreeNode,
    commentId: number,
    item: string
  ): TreeNode => {
    if (tree.id === commentId) {
      return {
        ...tree,
        items: [
          ...tree.items,
          {
            id: new Date().getTime(),
            name: item,
            items: [],
          },
        ],
      };
    }

    const updatedItems = tree.items.map((ob) =>
      insertNode(ob, commentId, item)
    );

    return { ...tree, items: updatedItems };
  };

  const editNode = (
    tree: TreeNode,
    commentId: number,
    value: string
  ): TreeNode => {
    if (tree.id === commentId) {
      return { ...tree, name: value };
    }

    const updatedItems = tree.items.map((ob) => editNode(ob, commentId, value));

    return { ...tree, items: updatedItems };
  };

  const deleteNode = (tree: TreeNode, id: number): TreeNode => {
    const updatedItems = tree.items.filter((item) => item.id !== id);

    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        tree.items.splice(i, 1);
        return { ...tree, items: updatedItems };
      } else {
        const result = deleteNode(currentItem, id);
        if (result.items.length !== currentItem.items.length) {
          return { ...tree, items: result.items };
        }
      }
    }

    return { ...tree, items: updatedItems };
  };

  return { insertNode, editNode, deleteNode };
};

export default useNode;
