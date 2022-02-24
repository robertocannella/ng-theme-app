import * as d3 from 'd3';
import { timeThursdays } from 'd3';
import UtilityFunctions from '../../shared/UtiltiyFunctions';
import { BasicArray } from '../BasicArray';


export class SSApproachOne extends BasicArray {

    svgId = 'ApproachOne';
    d3Sel = `#coding-outlet-${this.svgId}`
    subHeading = 'Approach 1: Create an array of the squares of each element, and sort them (selection sort).'
    description = 'O(n<sup>2</sup>) time, O(1) space'
    duration = 300;
    override height = 150;

    constructor(public dataset: any[]) {
        super(dataset)
    }

    override update(): void {
        d3.select(this.d3Sel).selectAll('*').remove()
        d3.select(this.d3Sel)
            .selectAll('g')
            .data(this.dataset)
            .join(
                (enter) => {
                    return enter
                        .append('g')
                        .attr('class', `group-${this.svgId}`)
                        .attr('id', (_d: any, i: any) => `group-${i}-${this.svgId}`)
                        .each(async (data: any, index: any, nodes: any) => {

                            let node = d3.select(nodes[index])
                            node
                                .append('rect')
                                .attr('class', 'element-shape')
                                .attr('width', 28)
                                .attr('height', 40)
                                .attr('id', () => `rect${index}-${data}-${this.svgId}`)
                                .attr('y', 15)
                                .attr('x', () => 30 * index)
                                .attr('fill', '#bbb')
                                .attr('stroke', 1)
                                .attr('stroke-width', 1)

                            node
                                .append('text')
                                .attr('class', 'element-text')
                                .text(data)
                                .attr('id', () => `text${index}-${data}-${this.svgId}`)
                                .attr('x', () => {
                                    let currX = parseInt(node.select('rect').attr('x'));
                                    let width = parseInt(node.select('rect').attr('width'));
                                    return currX + (width / 2)
                                })
                                .attr('y', () => {
                                    let currY = parseInt(node.select('rect').attr('y'));
                                    let height = parseInt(node.select('rect').attr('height'));
                                    return currY + (height / 2)
                                })
                                .attr('dominant-baseline', 'middle')
                                .attr('text-anchor', 'middle')
                            // .attr('x', (d: any) => {
                            //     //logic to center negatives and double digits
                            //     if (Math.abs(d / 10) >= 1)
                            //         return (30 * index) + 5

                            //     return (30 * index) + 10
                            // })
                        })
                })
    }
    override async playRandom(controlButtons?: boolean): Promise<void> {
        let sizeEach = UtilityFunctions.getRandomInt(10, 10)
        return new Promise(async (resolve) => {

            while (this.randomLoop) {

                this.dataset = []
                this.update();
                for (let j = 0; j < sizeEach; j++) {
                    this.dataset.push(UtilityFunctions.getRandomInt(-9, 9))
                }
                this.dataset.sort((a, b) => a - b) // <-- For this class DATA set needs to be sorted
                this.update();
                await this._animate();
            }
            setTimeout(() => {
                resolve(this.resolvePlayRandom())
            }, 0)
        })
    }
    // arrays need to be sorted initially //
    override pushNegative(isNegative?: boolean): void {
        if (this.dataset.length > this.maxSize)
            return;
        (isNegative) ? this.dataset.push(UtilityFunctions.getRandomInt(-9, -1)) : this.dataset.push(UtilityFunctions.getRandomInt(1, 9))
        this.dataset.sort((a, b) => a - b)
        this.update();
    }
    // arrays need to be sorted initially //
    override push(isZero?: number): void {
        if (this.dataset.length > this.maxSize)
            return;
        (isZero === 0) ? this.dataset.push(0) : this.dataset.push(UtilityFunctions.getRandomInt(1, 9))
        this.dataset.sort((a, b) => a - b)
        this.update();
    }
    override async animate(controlButtons?: boolean): Promise<unknown> {
        return new Promise(async (resolve) => {
            await this._animate();
            setTimeout(() => {
                resolve(this.resolveAnimate(controlButtons))
            }, 200)
        })
    }
    async _animate() {
        await this.sqareAllElements();
        await this.selectionSort();
    }
    async sqareAllElements() {
        return new Promise(async (resolve) => {
            let n = this.dataset.length;

            for (let i = 0; i < n; i++) {
                let currentRect = d3.select(`#rect${i}-${this.dataset[i]}-${this.svgId}`);
                let currentText = d3.select(`#text${i}-${this.dataset[i]}-${this.svgId}`);
                await Promise.all([
                    currentRect.transition().duration(this.duration).attr('fill', '#79d14d').end(),
                    currentText.text((d: any) => this.square(d)),
                ])
            }
            setTimeout(() => {
                resolve('true')
            }, 0)
        })
    }
    async selectionSort() {
        return new Promise(async (resolve) => {

            let n = this.dataset.length;

            for (let i = 0; i < n; i++) {           // exchange a[i] with the smallest entry in a[i], ... , a[n-1].
                let min = i;                        // index of a minimal entry
                for (let j = i + 1; j < n; j++)     // we are comparing with the next element  a[i + 1]
                    if (this.less(this.dataset[j], this.dataset[min])) min = j;


                await this.swapAnimation(this.dataset[i], i, this.dataset[min], min, 500, 0);
                this.exchange(this.dataset, i, min);
            }
            setTimeout(() => {
                resolve(this.dataset.sort((a, b) => a - b))
            }, 1000)
        })
    }
    async moveLastItem(leftRect: any, leftText: any) {
        let newRectRight = d3.select(`#new-array-rect-${0}-${this.dataset[0]}-${this.svgId}`);
        let newTextRight = d3.select(`#new-array-text-${0}-${this.dataset[0]}-${this.svgId}`)
        let newRectX = newRectRight.attr('x');
        let newTextX = newRectX + 15;
        await Promise.all([
            leftRect.transition().duration(this.duration / 2).attr('fill', 'cornflowerblue').attr('x', () => newRectX).end(),
            leftText.transition().duration(this.duration / 2).attr('x', () => newTextX).end(),
        ])
        await this.moveDown(200, leftRect, leftText)
        await leftRect.transition().duration(this.duration / 3).attr('fill', '#79d14d').end()
        newTextRight
            .text(() => { return this.square(leftRect.data().toString()) })
        newRectRight
            .attr('stroke-width', 2)
            .attr('stroke', 'black')
            .transition().duration(this.duration / 3)
            .attr('opacity', 0)
        leftText.remove()
        d3.select(`.new-array-group-${this.svgId}`).transition().duration(this.duration).attr('transform', 'translate(0, -185)').end()
        d3.selectAll(`.group-${this.svgId}`).transition().duration(this.duration).attr('transform', 'translate(0, -185)').end()

    }
    // Utility Functions
    getCenter(left: any, right: any, width: any) {
        left = parseInt(left)
        right = parseInt(right)
        width = parseInt(width)
        return ((right + width + left) / 2)
    }
    square(value: any) {
        value = parseInt(value);
        return (Math.abs(value) * Math.abs(value))
    }
    moveDown(newY: number, rect: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
        text: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
    ) {

        let difference = newY - parseInt(rect.attr('y'));
        return Promise.all([
            rect.transition().duration(this.duration / 2).attr('y', newY).end(),
            text.transition().duration(this.duration / 2)
                .attr('y', () => {
                    let currY = parseInt(rect.attr('y')) + difference;
                    let height = parseInt(rect.attr('height'));
                    return currY + (height / 2)
                }).end(),
        ])

    }
    async swapAnimation(d: any, i: any, d1: any, i1: any, durationTime: number, delayTime: number) {

        let textSel = `#text${i}-${d}-${this.svgId}`;
        let textSelX = d3.select(textSel).attr('x');

        let textSel1 = `#text${i1}-${d1}-${this.svgId}`;
        let textSel1X = d3.select(textSel1).attr('x');

        let rectSel = `#rect${i}-${d}-${this.svgId}`;
        let rectSelX = d3.select(rectSel).attr('x');

        let rectSel1 = `#rect${i1}-${d1}-${this.svgId}`;
        let rectSel1X = d3.select(rectSel1).attr('x');

        //**********************************************************//
        //   Edge Case during selection sort.                       //
        //   No need to swap.                                       //
        //                                                          //
        if (rectSel1 === rectSel) {
            return Promise.all([
                d3.select(rectSel)
                    .transition()
                    .duration(durationTime)
                    .delay(delayTime)
                    .attr('x', () => rectSel1X)
                    .attr('fill', '#fcba03') // <-- yellow
                    .transition()
                    .duration(100)
                    .attr('fill', 'cornflowerblue')
                    .end().catch(error => console.log(error)),
            ])

        }

        return Promise.all([
            d3.select(textSel)
                .transition()
                .duration(durationTime)
                .delay(delayTime)
                .attr('x', textSel1X)
                .end().catch(error => console.log(error)),

            d3.select(textSel1)
                .transition()
                .duration(durationTime)
                .delay(delayTime)
                .attr('x', textSelX)
                .end().catch(error => console.log(error)),

            d3.select(rectSel)
                .transition()
                .duration(durationTime)
                .delay(delayTime)
                .attr('x', () => rectSel1X)
                .attr('fill', '#fcba03') //<-- yellow
                .transition()
                .duration(100)
                .attr('fill', 'cornflowerblue')
                .end().catch(error => console.log(error)),

            d3.select(rectSel1)
                .transition()
                .duration(durationTime)
                .delay(delayTime)
                .attr('x', rectSelX)
                .attr('fill', '#fcba03') // <-- yellow
                .transition()
                .duration(100)
                .attr('fill', 'cornflowerblue')
                .end().catch(error => console.log(error))

        ]).then(() => {
            d3.select(textSel).attr('id', `text${i1}-${d}-${this.svgId}`)   // <-- NOTICE that HASH IS REMOVED ON ID's
            d3.select(textSel1).attr('id', `text${i}-${d1}-${this.svgId}`)  // <-- NOTICE that HASH IS REMOVED ON ID's
            d3.select(rectSel).attr('id', `rect${i1}-${d}-${this.svgId}`)   // <-- NOTICE that HASH IS REMOVED ON ID's
            d3.select(rectSel1).attr('id', `rect${i}-${d1}-${this.svgId}`)  // <-- NOTICE that HASH IS REMOVED ON ID's
        }
        ).catch(error => {
            console.log(error.message)
        })
    }
    //***********************************************************//
    //   For this ALGORITHM, WE NEED to SQUARE the numbers       //
    //   DO NOT USE FOR LESS COMPARISONS in OTHER CLASSES        //

    less(v: number, w: number) {
        return (v * v) < (w * w);
    }
    exchange(arr: number[], i: number, j: number) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}