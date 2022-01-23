export class AVLTree {
    root: AVLNode | null = null;

    constructor(
        public width: number,
        public radius: number,
        public totalShift: number) { }

    insert(value: number) {
        if (this.root === null) {
            this.root = new AVLNode(value, this.width / 2, 20, this.radius, this.width / 2, 20, 1)
            return;
        }

        this.root = this._insert(this.root, value, this.width / 2, this.radius, this.root.parentX, this.root.parentY, 25, 1)

    }

    _insert(node: AVLNode | null, value: number, xOffset: number, yOffset: number, parentX: number, parentY: number, xShift: number, depth: number) {

        if (node === null)
            return new AVLNode(value, xOffset, yOffset, this.radius, parentX, parentY, depth);

        if (value < node.value) {
            if (node.leftChild === null) {

                yOffset += 50;
                parentX = node.currentX
                parentY = node.currentY
                xOffset = parentX - (this.totalShift / depth) - xShift
                xShift -= 15

                node.leftChild = this._insert(node.leftChild, value, xOffset, yOffset, parentX, parentY, xShift, depth + 1);
            }
            else {

                yOffset += 50;
                parentX = node.currentX
                parentY = node.currentY
                xOffset = parentX - (this.totalShift / depth) - xShift

                xShift -= 15

                this._insert(node.leftChild, value, xOffset, yOffset, parentX, parentY, xShift, depth + 1);
            }
        }
        if (value > node.value) {
            if (node.rightChild === null) {

                yOffset += 50;
                parentX = node.currentX
                parentY = node.currentY
                xOffset = parentX + (this.totalShift / depth) + xShift

                xShift -= 15

                node.rightChild = this._insert(node.rightChild, value, xOffset, yOffset, parentX, parentY, xShift, depth + 1);
            }
            else {

                yOffset += 50;
                parentX = node.currentX
                parentY = node.currentY
                xOffset = parentX + (this.totalShift / depth) + xShift

                xShift -= 15

                this._insert(node.rightChild, value, xOffset, yOffset, parentX, parentY, xShift, depth + 1);
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
        return this._findNode(this.root, value)
    }
    _findNode(node: AVLNode | null, value: number): AVLNode | undefined {
        if (node === null)
            return;

        if (node.value == value)
            return node;

        return this._findNode(node.leftChild, value) ||
            this._findNode(node.rightChild, value);

    }
    preOrderArray(node: AVLNode) {
        let arr: AVLNode[] = []
        return this._preOrderArray(this.root, arr)
    }
    _preOrderArray(node: AVLNode | null, arr: AVLNode[]) {
        if (node === null)
            return;

        arr.push(node)

        this._preOrderArray(node.leftChild, arr);
        this._preOrderArray(node.rightChild, arr);

        return arr;
    }
    preOrderValues(node: AVLNode | null) {
        let arr: number[] = []
        return this._preOrderValues(this.root, arr)
    }
    _preOrderValues(node: AVLNode | null, arr: number[]) {
        if (node === null || node.value === null)
            return;

        arr.push(node.value)

        this._preOrderValues(node.leftChild, arr);
        this._preOrderValues(node.rightChild, arr);

        return arr;
    }
    traversePreOrder() {
        this._traversePreOrder(this.root);
    }
    _traversePreOrder(node: AVLNode | null) {
        if (node === null)
            return;

        console.log(node.value);
        this._traversePreOrder(node.leftChild);
        this._traversePreOrder(node.rightChild);
    }

    _isLeftHeavy(node: AVLNode) {
        return this._balanceFactor(node) > 1;
    }
    _isRightHeavy(node: AVLNode) {
        return this._balanceFactor(node) < -1;
    }
    _balanceFactor(node: AVLNode | null) {
        return (node === null) ? 0 : (this.height(node.leftChild) - this.height(node.rightChild));
    }
    balance(node: AVLNode) {

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
    _rotateLeft(node: AVLNode | null) {

        let newRoot: AVLNode | null = node!.rightChild;

        node!.rightChild = newRoot!.leftChild;
        newRoot!.leftChild = node;

        this.setHeight(node);
        this.setHeight(newRoot);

        return newRoot;
    }
    _rotateRight(node: AVLNode | null) {

        let newRoot = node!.leftChild;

        node!.leftChild = newRoot!.rightChild;
        newRoot!.rightChild = node;

        this.setHeight(node);
        this.setHeight(newRoot);

        return newRoot;
    }
    changeRadius(newRadius: number) {
        this.radius = newRadius;
        this._changeRadius(this.root, newRadius);
    }
    _changeRadius(node: AVLNode | null, newRadius: number) {
        if (node === null)
            return;

        this._changeRadius(node.leftChild, newRadius);
        this._changeRadius(node.rightChild, newRadius);
        node.radius = newRadius
    }

}