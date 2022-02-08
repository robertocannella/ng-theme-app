

export class LinkedList {


    constructor(
        private first: LLNode | null = null,
        public last: LLNode | null = null,
        private size: number = 0) { }

    addFirst(value: number) {
        var node = new LLNode(value);
        if (this.isEmpty())
            this.first = this.last = node;

        node.next = this.first;
        this.first = node;
        this.last!.next = null;
        this.size++;
    }
    addLast(value: number) {
        var node = new LLNode(value);
        if (this.isEmpty()) {
            console.log('list is empty. ')
            this.first = this.last = node;
        }
        this.last!.next = node;
        node.previous = this.last;
        this.last = node;

        this.size++;
    }
    deleteFirst() {
        if (this.isEmpty())
            throw new Error('List is empty')

        if (this.first === this.last)
            this.first = this.last = null;
        else {
            let nextNode = this.first!.next;
            this.first!.next = null;
            this.first = nextNode;
        }
        this.size--;
    }
    contains(value: number) {
        return (this.indexOf(value) != -1);
    }
    deleteLast() {
        if (this.isEmpty())
            throw new Error('List is empty.');

        if (this.first === this.last)
            this.first = this.last = null;
        else {
            this.last = this.getPrevious(this.last);
            this.last!.next = null;
        }
        this.size--;
    }
    getSize() {
        return this.size;
    }
    indexOf(value: number): number {
        let index = 0;
        let current = this.first;
        while (current != null) {
            if (current.value == value) return index;
            current = current.next;
            index++;
        }
        return -1;
    }
    removeValue(value: number): number {
        let index = 0;
        let current = this.first;

        while (current != null) {
            if (current.value == value) {
                current.previous!.next = current.next;
                current.next!.previous = current.previous;
                current = null;
                return 1;
            }
            current = current.next;
            index++
        }
        return -1
    }
    toLLNodeArray(): LLNode[] {
        let array: LLNode[] = [];
        let current = this.first;
        let index = 0;

        while (current != null) {
            array[index++] = current;
            current = current.next;
            if (current == this.first)  // break out of loop if there is a single item in the Linked List
                break;                  // ( all pointers, 'first','previous','last'  point to this node)
        }

        return array
    }

    toArray(): number[] {
        let array: number[] = [];
        let current = this.first;
        let index = 0;

        while (current != null) {
            array[index++] = current.value;
            current = current.next;
            if (current == this.first)  // break out of loop if there is a single item in the Linked List
                break;                  // ( all pointers, 'first','previous','last'  point to this node)
        }
        return array;
    }
    reverse() {

        let current = this.first!.next;
        let previous = this.first;
        this.last = this.first;
        this.last!.next = null;
        while (current != null) {
            let next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }
        this.first = previous;
    }
    print() {
        if (this.isEmpty())
            console.log("No elements");

        else {
            let node = this.first;
            while (node !== null) {
                console.log("LLNode.value: " + node.value);
                node = node.next;
            }
        }
    }
    getKthFromTheEnd(k: number) {

        if (this.isEmpty())
            throw new Error('Array is empty');
        let p1: LLNode | null = this.first;
        let p2: LLNode | null = this.first;

        for (let i = 0; i < k - 1; i++) {
            p2 = p2!.next;
            if (p2 == null)
                throw new Error('Null error.');
        }

        while (p2 !== this.last) {
            p1 = p1!.next;
            p2 = p2!.next;
        }

        return p1!.value;

    }
    printMiddle() {
        if (this.isEmpty())
            throw new Error('List is empty');
        var p1 = this.first;
        var p2 = this.first;
        // [ 10 -> 20 -> 30 -> 40 -> 50 ]
        //   *           *
        while (p2 !== this.last && p2!.next !== this.last) {
            p2 = p2!.next!.next;
            p1 = p1!.next;
        }
        if (p2 == this.last)
            console.log(p1!.value);
        else {
            console.log(p1!.value + ", " + p1!.next!.value);
        }
    }
    public hasLoop(): boolean {
        //Floyd’s Cycle-finding Algorithm

        let p1: LLNode | null = this.first;
        let p2: LLNode | null = this.first;

        //last.next = first.next;  //uncomment to test functionality
        while (p2!.next !== null) {
            p1 = p1!.next;
            p2 = p2!.next.next;

            if (p1 == p2)
                return true;
        }
        return false;
    }

    getPrevious(node: LLNode | null): LLNode | null {
        let current: LLNode | null = this.first;
        while (current != null) {
            if (current.next == node) return current;
            current = current.next;
        }
        return null;
    }
    isEmpty() {
        return (this.first == null);
    }
}

export class LLNode {
    value: number;
    next: LLNode | null = null;
    previous: LLNode | null = null;

    constructor(value: number) {
        this.value = value

    }
}