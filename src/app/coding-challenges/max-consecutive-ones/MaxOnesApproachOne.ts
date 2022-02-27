import { transition } from '@angular/animations';
import * as d3 from 'd3';
import UtilityFunctions from '../../shared/UtiltiyFunctions';
import { BasicArray } from '../BasicArray';


export class MaxOnesApproachOne extends BasicArray {

    svgId = 'ApproachOne';
    d3Sel = `#coding-outlet-${this.svgId}`
    subHeading = 'Approach 1'
    description = 'Brute Force: O(n<sup>2</sup>) time, O(1) space'
    duration = 300;
    height = 150;
    stepForward = false;
    stepBackward = false;
    totalZeros = 0;
    longestConsecutive = 0;

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

    override async animate(controlButtons?: boolean): Promise<unknown> {
        // Logic here to support continuous play of random arrays
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
            await this.addWindow();
            await this.startAnimation();
            setTimeout(() => {
                resolve(true)
            }, 1000)
        })
    }
    async addWindow() {
        return d3.select(this.d3Sel)
            .append('g')
            .attr('class', 'window')
            .attr('id', `${this.svgId}-window`)
            .append('rect')
            .attr('x', 0)
            .attr('height', 40)
            .attr('width', 0)
            .attr('y', 15)
            .attr('fill-opacity', 0)
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
    }
    async startAnimation() {
        return new Promise(async (resolve) => {
            this.longestConsecutive = 0
            let totalZeros = 0;
            this.totalZeros = 0;
            let len = this.dataset.length;
            let left = 0
            let right = 0

            //D3 Attributes
            let index = 0
            this.currentI = 0;

            for (let left = 0; left < len; left++) {

                let currentRectI = d3.select(`#rect${left}-${this.dataset[left]}-${this.svgId}`)
                this.currentI++;
                this.totalZeros = 0;
                this.currentJ = 0;

                for (let right = left; right < len; right++) {
                    //currentRectI.transition().duration(this.duration).attr('fill', 'cornflowerblue')
                    let currentRectJ = d3.select(`#rect${right}-${this.dataset[right]}-${this.svgId}`)
                    this.currentJ++;

                    if (this.dataset[right] == 0) this.totalZeros++;

                    await currentRectJ.transition().duration(this.duration).attr('fill', () => {
                        if (this.dataset[right] === 1 && this.totalZeros < 2)
                            return '#79d14d'; // green
                        if (this.dataset[right] === 0 && this.totalZeros < 2)
                            return 'cornflowerblue';

                        return '#fcba03'; // yellow
                    }).end()

                    if (this.totalZeros <= 1) {

                        this.currentConsecutive = right - left + 1;
                        this.longestConsecutive = Math.max(this.longestConsecutive, this.currentConsecutive);
                    }
                }
                // clear indicators
                d3.select(this.d3Sel).selectAll('rect').transition().duration(this.duration).attr('fill', '#bbb')

            }
            setTimeout(() => {
                resolve('true')
            }, 200)
        })

    }
    override step(direction: string) {
        return new Promise((resolve) => {
            if (direction === 'forward')
                this.stepForward = true;
            if (direction === 'backward')
                this.stepBackward = true;

            resolve(true);
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
        this.longestConsecutive = 0;
        this.totalZeros = 0;
        this.currentI = 0;
        this.currentJ = 0;
    }
}