
export class CircleTree {

    circleNodeArray: CircleNode[] = [];
    public root?: CircleNode;



    private height(node: CircleNode | undefined): number {
        return (node == undefined) ? -1 : node.height;
    }
    public preorderPrint(root: CircleNode | undefined) {
        if (root == null)
            return;
        // Print all the items in the tree to which root points.
        // The item in the root is printed first, followed by the
        // items in the left subtree and then the items in the
        // right subtree.
        if (root != null) {  // (Otherwise, there's nothing to print.)
            console.log(root.value + " ");  // Print the root item.
            this.preorderPrint(root.leftChild);   // Print items in left subtree.
            this.preorderPrint(root.rightChild);  // Print items in right subtree.
        }
    } // end preorderPrint()

    public countNodes(root: CircleNode | undefined): number {
        // Count the nodes in the binary tree to which
        // root points, and return the answer.
        if (root == null)
            return 0;  // The tree is empty.  It contains no nodes.
        else {
            var count = 1;   // Start by counting the root.
            count += this.countNodes(root.leftChild);  // Add the number of nodes
            //     in the left subtree.
            count += this.countNodes(root.rightChild); // Add the number of nodes
            //    in the right subtree.
            return count;  // Return the total.
        }
    } // end countNodes()

    public addNode(value: number, cx: number, cy: number): CircleNode {
        return this.insert(value, cx, cy, this.root);
    }

    private insert(value: number, cx: number, cy: number, node?: CircleNode,): CircleNode {
        if (node == undefined || node.value == value) {
            return new CircleNode(value, cx, cy)
        }

        if (value > node.value)
            node.rightChild = this.insert(value, cx, cy, node.rightChild,);

        if (value < node.value)
            node.leftChild = this.insert(value, cx, cy, node.leftChild);


        if (this.isLeftHeavy(node))
            console.log(node.value + " is left heavy");
        if (this.isRightHeavy(node))
            console.log(node.value + " is right heavy")



        node.height = Math.max(this.height(node.leftChild), this.height(node.rightChild)) + 1;
        return node;
    }
    private isLeftHeavy(node: CircleNode): boolean {
        return this.balanceFactor(node) > 1;
    }
    private isRightHeavy(node: CircleNode): boolean {
        return this.balanceFactor(node) < -1;
    }
    private balanceFactor(node: CircleNode): number {
        return (this.root == undefined) ? 0 : this.height(node.leftChild) - this.height(node.rightChild);
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
    public sumOfLeafDepths(node: CircleNode | undefined, depth: number): number {
        // When called as sumOfLeafDepths(root,0), this will compute the
        // sum of the depths of all the leaves in the tree to which root
        // points.  When called recursively, the depth parameter gives
        // the depth of the node, and the routine returns the sum of the
        // depths of the leaves in the subtree to which node points.
        // In each recursive call to this routine, depth goes up by one.
        if (node == null) {
            // Since the tree is empty and there are no leaves,
            // the sum is zero.
            return 0;
        }
        else if (node.leftChild == null && node.rightChild == null) {
            // The node is a leaf, and there are no subtrees of node, so
            // the sum of the leaf depths is just the depth of this node.
            return depth;
        }
        else {
            // The node is not a leaf.  Return the sum of the
            // the depths of the leaves in the subtrees.
            return this.sumOfLeafDepths(node.leftChild, depth + 1)
                + this.sumOfLeafDepths(node.rightChild, depth + 1);
        }
    } // end sumOfLeafDepth()
    private printAncestors(node: CircleNode, root?: CircleNode): boolean {
        // base case
        if (this.root == null) {
            return false;
        }

        // return true if a given node is found
        if (this.root == node) {
            return true;
        }

        // search node in the left subtree
        var left = this.printAncestors(node, this.root.leftChild);

        // search node in the right subtree
        var right = false;
        if (!left) {
            right = this.printAncestors(node, this.root.rightChild);
        }

        // if the given node is found in either left or right subtree,
        // the current node is an ancestor of a given node
        console.log("inside ancestor method")
        if (left || right) {
            console.log(node.value + " ");
        }

        // return true if a node is found
        return left || right;
    }
}


export class CircleNode {
    public leftChild?: CircleNode;
    public rightChild?: CircleNode;
    public height = 0;
    public depth: number = 0;
    public radius = 15;
    private id: number;


    constructor(

        public value: number,
        public cx: number,
        public cy: number) {

        this.id = value;

    }

}