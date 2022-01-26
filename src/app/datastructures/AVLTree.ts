import { AVLNode } from "./AVLNode";

export class AVLTree {
    public root: AVLNode | null = null;

    constructor(
        public width: number,
        public radius: number,
        public totalShift: number) { }

    insert(value: number) {
        if (this.root === null) {
            this.root = new AVLNode(value, this.width / 2, 20, this.radius, this.width / 2, 20, 1)
            return;
        }

        this.root = this._insert({ node: this.root, value, xOffset: this.width / 2, yOffset: this.radius, parentX: this.root.parentX, parentY: this.root.parentY, xShift: 25, depth: 1 })

    }

    private _insert({ node, value, xOffset, yOffset, parentX, parentY, xShift, depth }:
        { node: AVLNode | null; value: number; xOffset: number; yOffset: number; parentX: number; parentY: number; xShift: number; depth: number; }): AVLNode {

        if (node === null)
            return new AVLNode(value, xOffset, yOffset, this.radius, parentX, parentY, depth);

        if (value < node.value) {
            if (node.leftChild === null) {

                yOffset += 50;
                parentX = node.currentX
                parentY = node.currentY
                xOffset = parentX - (this.totalShift / depth) - xShift
                xShift -= 15

                node.leftChild = this._insert({ node: node.leftChild, value, xOffset, yOffset, parentX, parentY, xShift, depth: depth + 1 });
            }
            else {

                yOffset += 50;
                parentX = node.currentX
                parentY = node.currentY
                xOffset = parentX - (this.totalShift / depth) - xShift

                xShift -= 15

                this._insert({ node: node.leftChild, value, xOffset, yOffset, parentX, parentY, xShift, depth: depth + 1 });
            }
        }
        if (value > node.value) {
            if (node.rightChild === null) {

                yOffset += 50;
                parentX = node.currentX
                parentY = node.currentY
                xOffset = parentX + (this.totalShift / depth) + xShift

                xShift -= 15

                node.rightChild = this._insert({ node: node.rightChild, value, xOffset, yOffset, parentX, parentY, xShift, depth: depth + 1 });
            }
            else {

                yOffset += 50;
                parentX = node.currentX
                parentY = node.currentY
                xOffset = parentX + (this.totalShift / depth) + xShift

                xShift -= 15

                this._insert({ node: node.rightChild, value, xOffset, yOffset, parentX, parentY, xShift, depth: depth + 1 });
            }
        }

        this.setHeight(node);
        //console.log('Node: '+node.value+', parentX: ' + parentX +', xOffset: ' + xOffset + ', xShift: ' + xShift);
        //console.log(node.value, ': Depth: ' + depth)

        return node
        //return balance(node);
    }

    setHeight(node: AVLNode | null) {

        node!.height = Math.max(this.height(node!.leftChild), this.height(node!.rightChild)) + 1;

    }
    height(node: AVLNode | null) {
        return (node === null) ? -1 : node.height;
    }

    findNode(value: number) {
        return this._findNode({ node: this.root, value })
    }
    private _findNode({ node, value }: { node: AVLNode | null; value: number; }): AVLNode | undefined {
        if (node === null)
            return;

        if (node.value == value)
            return node;

        return this._findNode({ node: node.leftChild, value }) ||
            this._findNode({ node: node.rightChild, value });

    }
    preOrderArray(): AVLNode[] | undefined {
        let arr: AVLNode[] = []
        return this._preOrderArray({ node: this.root, arr })
    }
    private _preOrderArray({ node, arr }: { node: AVLNode | null; arr: AVLNode[]; }) {
        if (node === null)
            return;

        arr.push(node)

        this._preOrderArray({ node: node.leftChild, arr });
        this._preOrderArray({ node: node.rightChild, arr });

        return arr;
    }
    preOrderValues(node: AVLNode | null) {
        let arr: number[] = []
        return this._preOrderValues({ node: this.root, arr })
    }
    _preOrderValues({ node, arr }: { node: AVLNode | null; arr: number[]; }): number[] | undefined {
        if (node === null || node.value === null)
            return;

        arr.push(node.value)

        this._preOrderValues({ node: node.leftChild, arr });
        this._preOrderValues({ node: node.rightChild, arr });

        return arr;
    }
    traversePreOrder() {
        this._traversePreOrder(this.root);
    }
    private _traversePreOrder(node: AVLNode | null): void {
        if (node === null)
            return;

        console.log(node.value);
        this._traversePreOrder(node.leftChild);
        this._traversePreOrder(node.rightChild);
    }

    _isLeftHeavy(node: AVLNode): boolean {
        return this._balanceFactor(node) > 1;
    }
    _isRightHeavy(node: AVLNode): boolean {
        return this._balanceFactor(node) < -1;
    }
    public _balanceFactor(node: AVLNode | null): number {
        return (node === null) ? 0 : (this.height(node.leftChild) - this.height(node.rightChild));
    }
    public balance(node: AVLNode): AVLNode | null {

        if (this._isLeftHeavy(node)) {
            if (this._balanceFactor(node.leftChild) < 0)
                // LEFT
                node.leftChild = this._rotateLeft(node.leftChild);
            // RIGHT
            return this._rotateRight(node);
        }
        else if (this._isRightHeavy(node)) {
            if (this._balanceFactor(node.rightChild) > 0)
                node.rightChild = this._rotateRight(node.rightChild);
            return this._rotateLeft(node);
        }
        return node;
    }
    _rotateLeft(node: AVLNode | null): AVLNode | null {

        let newRoot: AVLNode | null = node!.rightChild;

        node!.rightChild = newRoot!.leftChild;
        newRoot!.leftChild = node;

        this.setHeight(node);
        this.setHeight(newRoot);

        return newRoot;
    }
    _rotateRight(node: AVLNode | null): AVLNode | null {

        let newRoot = node!.leftChild;

        node!.leftChild = newRoot!.rightChild;
        newRoot!.rightChild = node;

        this.setHeight(node);
        this.setHeight(newRoot);

        return newRoot;
    }
    changeRadius(newRadius: number) {
        this.radius = newRadius;
        this._changeRadius({ node: this.root, newRadius });
    }
    private _changeRadius({ node, newRadius }: { node: AVLNode | null; newRadius: number; }): void {
        if (node === null)
            return;

        this._changeRadius({ node: node.leftChild, newRadius });
        this._changeRadius({ node: node.rightChild, newRadius });
        node.radius = newRadius
    }

}