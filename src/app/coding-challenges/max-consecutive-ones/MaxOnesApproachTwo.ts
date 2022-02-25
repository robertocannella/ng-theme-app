import * as d3 from 'd3';
import UtilityFunctions from '../../shared/UtiltiyFunctions';
import { BasicArray } from '../BasicArray';


export class MaxOnesApproachTwo extends BasicArray {

    svgId = 'ApproachTwo';
    d3Sel = `#coding-outlet-${this.svgId}`
    subHeading = 'Approach 2'
    description = 'Sliding Window: O(n) time, O(1) space'
    duration = 300;
    height = 250;

    constructor(public dataset: any[]) {
        super(dataset)
    }
    override pushOne(): void {
        this.dataset.push(1);
        this.update();
    }
    override update(): void {
        d3.select(this.d3Sel).selectAll('*').remove()
        // For proper Z-index, this array is painted here.  It starts same 'y' as intial array
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
                    this.dataset.push(UtilityFunctions.getRandomInt(0, 2))
                }
                this.update();
                await this._animate();
            }
            setTimeout(() => {
                resolve(this.resolvePlayRandom())
            }, 0)
        })
    }
    async _animate() {
        return new Promise(async (resolve) => {
            await this.startAnimation();
            setTimeout(() => {
                resolve(true)
            }, 1000)
        })
    }

    async startAnimation() {
        return new Promise(async (resolve) => {
            let n = this.dataset.length - 1;
            let left = 0
            let right = n



            setTimeout(() => {

                resolve('true')
            }, 200)
        })

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