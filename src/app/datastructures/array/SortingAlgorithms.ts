
export class SortingAlgorithms {
    mergeSort(array: number[]) {
        this._mergeSort(array, 0, array.length - 1);

    }
    _mergeSort(array: number[], lo: number, hi: number) {
        if (hi <= lo) return;

        let mid: number = lo + Math.floor((hi - lo) / 2);
        this._mergeSort(array, lo, mid);
        this._mergeSort(array, mid + 1, hi);
        this._merge(array, lo, mid, hi);

    }
    _merge(array: number[], lo: number, mid: number, hi: number) {
        let aux: number[] = [];
        let i: number = lo;
        let j: number = mid + 1;

        for (let k = lo; k <= hi; k++)
            aux[k] = array[k];

        for (let k = lo; k <= hi; k++) {
            if (i > mid) array[k] = aux[j++];
            else if (j > hi) array[k] = aux[i++];
            else if (aux[j] < aux[i]) array[k] = aux[j++];
            else array[k] = aux[i++];
        }

    }
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
