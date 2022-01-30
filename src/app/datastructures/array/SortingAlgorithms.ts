
export class SortingAlgorithms {

    bubbleSort(array: number[]) {
        let isSorted;

        for (let i = 0; i < array.length; i++) {
            isSorted = true;
            for (let j = 0; j < array.length - 1 - i; j++) {
                if (array[j] > array[j + 1]) {
                    console.log(array[j], array[j + 1])
                    this.swap(array, j, j + 1)

                    isSorted = false;
                }
            }
            if (isSorted)
                return;
        }
    }
    swap(array: number[], index1: number, index2: number) {
        let temp = array[index1]
        array[index1] = array[index2]
        array[index2] = temp;
    }
}
