import * as d3 from 'd3';
import UtilityFunctions from '../../shared/UtiltiyFunctions';
import { BasicArray } from '../BasicArray';


export class SSApproachOne extends BasicArray {

    svgId = 'ApproachOne';
    d3Sel = `#coding-outlet-${this.svgId}`
    subHeading = 'Approach 1'
    description = 'O(N log N) time, O(N) or O(logN) space'
    duration = 300;

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
        await this.createEmptyDuplicateArray();
        await this.getEnds();
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
                                    .attr('y', 55)
                                    .attr('x', () => 30 * index)
                                    .attr('fill', '#bbb')
                                    .attr('stroke', 1)
                                    .attr('stroke-width', 1)
                                    .transition().duration(this.duration)
                                    .attr('y', 200)

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
                                    .transition().duration(this.duration)
                                    .attr('y', 200 + 20)
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
        rightText: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
        return new Promise(async (resolve, reject) => {

            let left = this.square(leftRect.data()[0]);
            let right = this.square(rightRect.data()[0]);
            if (right >= left) {
                await this.moveDown(130, rightRect, rightText);
                //console.log('shift right down')
                resolve('rightShift')
            }
            if (right < left) {
                await this.moveDown(130, leftRect, leftText);
                //console.log('shift left down')
                resolve('leftShift')
            }
            reject('error')
        })
    }
    async getEnds() {
        return new Promise(async (resolve) => {
            let n = this.dataset.length - 1;
            let nums = this.dataset
            let left = 0
            let right = n
            let leftRect = d3.select(`#rect${0}-${this.dataset[0]}-${this.svgId}`);
            let rightRect = d3.select(`#rect${n}-${this.dataset[n]}-${this.svgId}`);
            let leftText = d3.select(`#text${0}-${this.dataset[0]}-${this.svgId}`);
            let rightText = d3.select(`#text${n}-${this.dataset[n]}-${this.svgId}`);

            let width = parseInt(rightRect.attr('width'));
            let padding = 1;
            let center = this.getCenter(leftRect.attr('x'), rightRect.attr('x'), rightRect.attr('width'));

            for (let i = n; i >= 0; i--) {

                // get new location of next element

                let leftRect = d3.select(`#rect${left}-${this.dataset[left]}-${this.svgId}`);
                let rightRect = d3.select(`#rect${right}-${this.dataset[right]}-${this.svgId}`);
                let leftText = d3.select(`#text${left}-${this.dataset[left]}-${this.svgId}`);
                let rightText = d3.select(`#text${right}-${this.dataset[right]}-${this.svgId}`);

                let leftOrigX = leftText.attr('x')
                let rightOrigX = rightText.attr('x')

                let rightRectLocation = d3.select(`#rect${right}-${this.dataset[right]}-${this.svgId}`).attr('x');
                let rightTextLocation = d3.select(`#text${right}-${this.dataset[right]}-${this.svgId}`).attr('x');
                let leftRectLocation = d3.select(`#rect${left}-${this.dataset[left]}-${this.svgId}`).attr('x');
                let leftTextLocation = d3.select(`#text${left}-${this.dataset[left]}-${this.svgId}`).attr('x');
                let newRectRight = d3.select(`#new-array-rect-${i}-${this.dataset[i]}-${this.svgId}`)
                let newRectX = newRectRight.attr('x')
                let newTextX = parseInt(newRectX) + 15;
                let newTextRight = d3.select(`#new-array-text-${i}-${this.dataset[i]}-${this.svgId}`)
                // Last Item
                if (i === 0) {
                    await this.moveLastItem(leftRect, leftText);
                    break;
                }
                // Move Down for comparison
                await Promise.all([
                    this.moveDown(75, leftRect, leftText),
                    this.moveDown(75, rightRect, rightText)
                ])

                //Center Items
                let center = this.getCenter(leftRect.attr('x'), rightRect.attr('x'), rightRect.attr('width'));
                let width = parseInt(rightRect.attr('width'));
                // let padding = 1;

                let groupLeft = d3.select(`#group-${left}-${this.svgId}`)
                let groupRight = d3.select(`#group-${right}-${this.svgId}`)
                await Promise.all([
                    groupLeft.transition().duration(this.duration).attr('transform', `translate(${center - parseInt(leftRect.attr('x')) - width - padding}, 0)`).end(),
                    groupRight.transition().duration(this.duration).attr('transform', `translate(${-center + (parseInt(leftRect.attr('x')) + width + padding)}, 0)`).end(),
                ])
                // Display Square
                await Promise.all([
                    leftRect.transition().duration(this.duration).attr('fill', 'cornflowerblue').end(),
                    leftText.text((d: any) => this.square(d)),
                    rightRect.transition().duration(this.duration).attr('fill', 'cornflowerblue').end(),
                    rightText.text((d: any) => this.square(d)),
                ])
                var trigger = "2",
                    regexp = new RegExp('^[1-9]\d{0,2}$'),
                    test = regexp.test(trigger);
                //alert(test + ""); // will display true
                let match: any = groupLeft.attr('transform').match(/\d+/)

                // Begin Comparing and dropping into new array
                await Promise.all([
                    groupLeft.transition().duration(this.duration).attr('transform', `translate(0, 0)`).end(),
                    groupRight.transition().duration(this.duration).attr('transform', `translate(0, 0)`).end(),
                ])
                let result = await this.compareAndDrop(leftRect, rightRect, leftText, rightText)

                if (result === 'rightShift') {
                    await Promise.all([
                        // groupLeft.transition().duration(this.duration).attr('transform', `translate(0, 0)`).end(),
                        //rightRect.attr('x', () => groupRight.attr('transform').match(/\d+/)),
                        rightRect.transition().duration(this.duration).attr('x', () => newRectX).end(),
                        rightText.transition().duration(this.duration).attr('x', () => newTextX).end(),
                        ///leftRect.transition().duration(this.duration).attr('x', () => leftRectLocation).end(),
                        //leftText.transition().duration(this.duration).attr('x', () => leftTextLocation).end()
                    ])
                    await this.moveDown(200, rightRect, rightText)
                    rightText.remove()
                    rightRect.transition().duration(this.duration).attr('fill', '#79d14d').end()
                    newTextRight
                        .text(() => { return this.square(rightRect.data().toString()) })
                    newRectRight
                        .attr('stroke-width', 2)
                        .attr('stroke', 'black')
                        .transition().duration(this.duration)
                        .attr('opacity', 0)
                    right--;
                    rightRect = d3.select(`#rect${right}-${this.dataset[right]}-${this.svgId}`);
                    rightText = d3.select(`#text${right}-${this.dataset[right]}-${this.svgId}`);
                }
                if (result === 'leftShift') {
                    //leftRect.attr('x', () => groupLeft.attr('transform').match(/\d+/))

                    await Promise.all([
                        // groupRight.transition().duration(this.duration).attr('transform', `translate(0, 0)`).end(),

                        leftRect.transition().duration(this.duration).attr('x', () => newRectX).end(),
                        leftText.transition().duration(this.duration).attr('x', () => newTextX).end(),

                        //rightRect.transition().duration(this.duration).attr('x', () => rightRectLocation).end(),
                        //rightText.transition().duration(this.duration).attr('x', () => rightTextLocation).end()
                    ])
                    await this.moveDown(200, leftRect, leftText).then()

                    leftText.remove()
                    leftRect.transition().duration(this.duration).attr('fill', '#79d14d').end()
                    newTextRight
                        .text(() => { return this.square(leftRect.data().toString()) })
                    newRectRight
                        .attr('stroke-width', 2)
                        .attr('stroke', 'black')
                        .transition().duration(this.duration)
                        .attr('opacity', 0)

                    // set up next iteration
                    left++;
                    leftRect = d3.select(`#rect${left}-${this.dataset[left]}-${this.svgId}`);
                    leftText = d3.select(`#text${left}-${this.dataset[left]}-${this.svgId}`);
                }

            }

            setTimeout(() => {
                resolve('true')

            }, 0)
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
}