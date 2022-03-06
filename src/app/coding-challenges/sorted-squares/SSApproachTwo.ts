import * as d3 from 'd3';
import UtilityFunctions from '../../shared/UtiltiyFunctions';
import { BasicArray } from '../BasicArray';


export class SSApproachTwo extends BasicArray {

    svgId = 'ApproachTwo-sorted-squares';
    d3Sel = `#coding-outlet-${this.svgId}`
    subHeading = 'Approach 2'
    description = 'Two Pointer: O(N log N) time, O(N) or O(logN) space'
    duration = 300;
    height = 250;

    constructor(public dataset: any[]) {
        super(dataset)
    }

    override update(): void {
        d3.select(this.d3Sel).selectAll('*').remove()
        // For proper Z-index, this array is painted here.  It starts same 'y' as intial array
        this.createEmptyDuplicateArray();
        d3.select(this.d3Sel).append('g')
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
                                .attr('x', () => this.setTextXAlignment(node))
                                .attr('y', () => this.setTextYAlignment(node))
                                .attr('dominant-baseline', 'middle')
                                .attr('text-anchor', 'middle')
                        })
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
        // Logic here to support continuous play of random arrays
        this.dataset.sort((a, b) => a - b)
        this.update();
        return new Promise(async (resolve) => {
            await this._animate();
            setTimeout(() => {
                resolve(this.resolveAnimate(controlButtons))
            }, 200)
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
                this.dataset.sort((a, b) => a - b)
                this.update();
                await this._animate();
            }
            setTimeout(() => {
                resolve(this.resolvePlayRandom())
            }, 0)
        })
    }
    async _animate() {
        let hiddenArray = d3.select(`.new-array-group-${this.svgId}`).selectAll('rect')
            .each((data: any, index: any, nodes: any) => {
                d3.select(nodes[index]).attr('y', 150)
            })

        return new Promise(async (resolve) => {
            await this.startAnimation();
            setTimeout(() => {
                resolve(true)
            }, 1000)
        })
    }
    async createEmptyDuplicateArray() {
        return new Promise(async (resolve) => {
            d3.select(this.d3Sel)
                .append('g')
                .attr('class', `new-array-group-${this.svgId}`)
                .selectAll('g')
                .data(this.dataset)
                .join(
                    (enter) => {
                        return enter
                            .append('g')
                            .attr('class', `new-array-group-${this.svgId}`)
                            .attr('id', (_d: any, i: any) => `new-array-group-${i}-${this.svgId}`)
                            .each(async (data: any, index: any, nodes: any) => {

                                let node = d3.select(nodes[index])
                                node
                                    .append('rect')
                                    .attr('class', 'new-array-element-shape')
                                    .attr('width', 28)
                                    .attr('height', 40)
                                    .attr('id', () => `new-array-rect-${index}-${data}-${this.svgId}`)
                                    .attr('y', 15)
                                    .attr('x', () => 30 * index)
                                    .attr('fill', '#bbb')
                                    .attr('stroke', 1)
                                    .attr('stroke-width', 1)



                                node
                                    .append('text')
                                    .attr('class', 'new-array-element-text')
                                    .text('')
                                    .attr('id', () => `new-array-text-${index}-${data}-${this.svgId}`)
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

                            })
                    })

            setTimeout(() => {
                resolve('true')
            }, this.duration)
        })
    }
    async compareAndDrop(leftRect: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
        rightRect: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
        leftText: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
        rightText: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
        nextRectSlotNewArray: number,
        nextTextXNewArray: number,
        nextTextYNewArray: number) {
        return new Promise(async (resolve, reject) => {

            // Save current configurations prior to comparing
            let width = parseInt(rightRect.attr('width'));
            let padding = 1;

            let leftX = parseInt(leftRect.attr('x'));
            let rightX = parseInt(rightRect.attr('x'));
            let leftTextX = parseInt(leftRect.attr('x'));
            let yHeight = parseInt(leftRect.attr('height'));

            let rightTextX = parseInt(rightText.attr('x'));
            let leftXText = parseInt(leftText.attr('x'));
            let textXDiff = leftXText - leftX


            // Move both items towards the center for comparison
            let center = this.getCenter(leftX, rightX, rightRect.attr('width'));
            await Promise.all([
                leftRect.transition().duration(this.duration).attr('x', () => center - (padding + width)).end(),
                leftText.transition().duration(this.duration).attr('x', () => center - (padding + width) + textXDiff).end(),
                rightRect.transition().duration(this.duration).attr('x', () => - center + rightX + leftX + width + padding).end(),
                rightText.transition().duration(this.duration).attr('x', () => - center + rightX + leftX + width + padding + textXDiff).end(),
            ])

            // Set sqaure
            await Promise.all([
                leftText.text((d: any) => this.square(d)),
                rightText.text((d: any) => this.square(d)),
            ])

            // Compare squares
            let left = this.square(leftRect.data()[0]);
            let right = this.square(rightRect.data()[0]);
            if (right >= left) {

                await rightRect.transition().duration(this.duration).attr('fill', 'cornflowerblue').end()
                await Promise.all([
                    leftText.transition().duration(this.duration).attr('x', leftTextX + textXDiff).end(),
                    leftRect.transition().duration(this.duration).attr('x', leftX).end(),
                    rightRect.transition().duration(this.duration).attr('x', nextRectSlotNewArray).attr('y', 150).end(),
                    rightText.transition().duration(this.duration).attr('x', nextTextXNewArray + textXDiff).attr('y', nextTextYNewArray + yHeight / 2).end()
                ])
                resolve('rightShift')
            }

            // Shift element into place or return to outer egde for next comparison
            if (right < left) {
                await leftRect.transition().duration(this.duration).attr('fill', 'cornflowerblue').end()

                await Promise.all([
                    rightText.transition().duration(this.duration).attr('x', rightTextX).end(),
                    rightRect.transition().duration(this.duration).attr('x', rightX).end(),
                    leftRect.transition().duration(this.duration).attr('x', nextRectSlotNewArray).attr('y', 150).end(),
                    leftText.transition().duration(this.duration).attr('x', nextTextXNewArray + textXDiff).attr('y', nextTextYNewArray + yHeight / 2).end()
                ])
                resolve('leftShift')
            }
            reject('error')
        })
    }
    async startAnimation() {
        return new Promise(async (resolve) => {
            let n = this.dataset.length - 1;
            let left = 0
            let right = n

            for (let i = n; i >= 0; i--) {
                // Get current elements
                let leftRect = d3.select(`#rect${left}-${this.dataset[left]}-${this.svgId}`);
                let rightRect = d3.select(`#rect${right}-${this.dataset[right]}-${this.svgId}`);
                let leftText = d3.select(`#text${left}-${this.dataset[left]}-${this.svgId}`);
                let rightText = d3.select(`#text${right}-${this.dataset[right]}-${this.svgId}`);

                // Get new location of next element
                let nextRectSlot = d3.select(`#new-array-rect-${i}-${this.dataset[i]}-${this.svgId}`)
                let nextTextSlot = d3.select(`#new-array-rect-${i}-${this.dataset[i]}-${this.svgId}`)
                let nextSlotX = parseInt(nextRectSlot.attr('x'))
                let nextTextXNewArray = parseInt(nextTextSlot.attr('x'))
                let nextTextYNewArray = parseInt(nextTextSlot.attr('y'))

                // Edge case: Last item left to sort.
                if (i === 0) {
                    leftRect.transition().duration(this.duration / 2).attr('fill', 'cornflowerblue')

                    leftRect.transition().duration(this.duration / 2)
                        .attr('fill', 'cornflowerblue')
                        .attr('x', nextSlotX).attr('y', 150)
                        .end()
                    leftText.transition().duration(this.duration / 2)
                        .attr('x', () => {
                            let center = parseInt(leftRect.attr('width')) / 2;
                            return nextTextXNewArray + center;
                        })
                        .attr('y', () => {
                            let center = parseInt(leftRect.attr('height')) / 2;
                            return nextTextYNewArray + center;
                        })
                        .end()
                    continue;
                }

                // Move Down for comparison
                await Promise.all([
                    leftRect.attr('fill', '#79d14d'),
                    rightRect.attr('fill', '#79d14d'),
                    this.moveDown(75, leftRect, leftText),
                    this.moveDown(75, rightRect, rightText)
                ])
                // Kick off comparisons and distribution of elements
                let result = await this.compareAndDrop(leftRect, rightRect, leftText, rightText, nextSlotX, nextTextXNewArray, nextTextYNewArray)
                // Shift pointers 
                if (result === 'rightShift')
                    right--;
                if (result === 'leftShift')
                    left++;

            }
            setTimeout(() => {
                this.shiftUp()

                resolve('true')
            }, 200)
        })

    }
    async shiftUp() {

        d3.select(`.new-array-group-${this.svgId}`).transition().duration(this.duration).attr('transform', 'translate(0, -136)').end()
        d3.selectAll(`.group-${this.svgId}`).transition().duration(this.duration).attr('transform', 'translate(0, -136)').end()

    }
    // Utility Functions
    setTextXAlignment(node: any) {
        let curr = parseInt(node.select('rect').attr('x'));
        let width = parseInt(node.select('rect').attr('width'));
        return curr + (width / 2)
    }
    setTextYAlignment(node: any) {
        let curr = parseInt(node.select('rect').attr('y'));
        let height = parseInt(node.select('rect').attr('height'));
        return curr + (height / 2)
    }
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
    clearSVG() {
        d3.select(this.d3Sel).remove();
    }
}