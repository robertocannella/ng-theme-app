import { RouterTestingModule } from "@angular/router/testing";

export class CircleTree {

    circleNodeArray: CircleNode[] = [];
    public root: any;

    constructor() {
        this.root = null;
    }

    private height(node: CircleNode | null): number {
        return (node == undefined) ? -1 : node.height;
    }
    private setHeight(node: CircleNode | null) {
        node!.height = Math.max(this.height(node!.leftChild), this.height(node!.rightChild)) + 1;
    }
    private setDepths(node: CircleNode | undefined): number {

        if (node == undefined)
            return -1;

        if (node.leftChild == undefined && node.radius == undefined) {
            return 0;
        }


        if (node.rightChild)
            node.depth = this.setDepths(node.rightChild) + 1;

        if (node.leftChild)
            node.depth = this.setDepths(node.leftChild) + 1;

        return node.depth;


    }
    public preorderPrint(root: CircleNode | null) {
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
    }
    public countNodes(root: CircleNode | null): number {
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
    }
    public addNode(value: number, cx: number, cy: number): CircleNode | null {
        return this.insert(value, cx, cy, this.root);
    }
    private insert(value: number, cx: number, cy: number, node: CircleNode | null,): CircleNode | null {
        if (node == null || node.value == value) {
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

        this.setHeight(node);
        return this.balance(node);

        // node.height = Math.max(this.height(node.leftChild), this.height(node.rightChild)) + 1;
        // return node;
    }
    public isLeftHeavy(node: CircleNode | null): boolean {
        return this.balanceFactor(node) > 1;
    }
    public isRightHeavy(node: CircleNode | null): boolean {
        return this.balanceFactor(node) < -1;
    }
    private balanceFactor(node: CircleNode | null): number {
        return (this.root == undefined) ? 0 : this.height(node!.leftChild) - this.height(node!.rightChild);
    }
    private balance(node: CircleNode | null): CircleNode | null {
        if (this.isLeftHeavy(node)) {
            if (this.balanceFactor(node!.leftChild) < 0)
                node!.leftChild = this.rotateLeft(node!.leftChild);
            return this.rotateRight(node);
        }
        else if (this.isRightHeavy(node)) {
            if (this.balanceFactor(node!.rightChild) > 0)
                node!.rightChild = this.rotateRight(node!.rightChild);
            return this.rotateLeft(node);
        }
        return node;
    }
    public moveTreeToArray() {
        return this.traversePreOrder(this.root, this.circleNodeArray)
    }
    public traversePreOrder(root: CircleNode | null, arr: CircleNode[]): CircleNode[] {
        if (!root)
            return arr;

        arr.push(root)
        this.traversePreOrder(root.leftChild, arr);
        this.traversePreOrder(root.rightChild, arr);

        return arr;
    }
    public sumOfLeafDepths(node: CircleNode | null, depth: number): number {
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
    private rotateRight(node: CircleNode | null): CircleNode | null {
        var newRoot = node!.leftChild;

        node!.leftChild = newRoot!.rightChild;
        newRoot!.rightChild = node;

        this.setHeight(node);
        this.setHeight(newRoot);

        return newRoot;
    }
    private rotateLeft(node: CircleNode | null): CircleNode | null {
        var newRoot = node!.rightChild;

        node!.rightChild = newRoot!.leftChild;
        newRoot!.leftChild = node;

        newRoot!.leftChild!.height -= 2;
        node = newRoot;

        this.setHeight(node);
        this.setHeight(newRoot);

        return newRoot
    }
}


export class CircleNode {
    public leftChild: CircleNode | null = null;
    public rightChild: CircleNode | null = null;
    public height = 0;
    public depth: number = 0;
    public radius = 15;



    constructor(

        public value: number,
        public cx: number,
        public cy: number) {

        this._id = value;

    }


    private _id: number;
    public get id(): number {
        return this._id;
    }



}