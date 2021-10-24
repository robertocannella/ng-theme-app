

export class CircleTree {

    circleNodeArray: CircleNode[] = [];
    public root?: CircleNode;
    private height(node: CircleNode | undefined): number {
        return (node == undefined) ? -1 : node.height;
    }

    public addNode(value: number, cx: number, cy: number): CircleNode {
        return this.insert(value, cx, cy, this.root);
    }

    private insert(value: number, cx: number, cy: number, node?: CircleNode,): CircleNode {
        if (node == undefined || node.value == value)
            return new CircleNode(value, cx, cy)

        if (value > node.value)
            node.rightChild = this.insert(value, cx, cy, node.rightChild,);

        if (value < node.value)
            node.leftChild = this.insert(value, cx, cy, node.leftChild);

        node.height = Math.max(this.height(node.leftChild), this.height(node.rightChild)) + 1;
        return node;
    }
    public moveTreeToArray() {
        return this.traversePreOrder(this.root, this.circleNodeArray)
    }
    private traversePreOrder(root: CircleNode | undefined, arr: CircleNode[]) {
        if (!root)
            return;

        arr.push(root)
        this.traversePreOrder(root.leftChild, arr);
        this.traversePreOrder(root.rightChild, arr);

        return;
    }
}


export class CircleNode {
    public leftChild?: CircleNode;
    public rightChild?: CircleNode;
    public height = 0;
    public radius = 15;

    constructor(

        public value: number,
        public cx?: number,
        public cy?: number) {

    }

}