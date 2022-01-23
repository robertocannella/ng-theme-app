class AVLNode {
    public height: number;
    rightChild: AVLNode | null = null;
    leftChild: AVLNode | null = null;
    naturalX: number;
    naturalY: number;
    currentX: number;
    currentY: number

    constructor(
        public value: number,
        public x: number,
        public y: number,
        public radius: number,
        public parentX: number,
        public parentY: number,
        public depth: number) {

        this.height = 0;
        this.naturalX = this.currentX = x
        this.naturalY = this.currentY = y
    }
}