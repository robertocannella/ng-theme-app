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
            let rightWindowEdge = 0
            let leftWindowEdge = 0

            while (right < len) {

                if (this.dataset[right] == 0) {
                    let currentZero = d3.select(`#rect${right}-0-${this.svgId}`)
                    await currentZero
                        .transition().duration(this.duration)
                        .attr('fill', 'cornflowerblue').end()
                    totalZeros++;
                    this.totalZeros++;
                }
                while (totalZeros == 2) {
                    let currentZero = d3.select(`#rect${left}-0-${this.svgId}`)
                    await currentZero
                        .transition().duration(this.duration)
                        .attr('fill', '#bbb').end()
                    if (this.dataset[left] == 0) {
                        totalZeros--;
                        this.totalZeros--;
                    }

                    let currentRect = d3.select(`#rect${left}-1-${this.svgId}`)
                    // Change to back to gray if 1 is no longer part of the group
                    currentRect
                        .attr('fill', () => '#bbb')
                    left++;
                    leftWindowEdge += 30;
                }
                this.currentConsecutive = right - left + 1;
                this.longestConsecutive = Math.max(this.longestConsecutive, right - left + 1);
                let window = d3.select(`#${this.svgId}-window`).select('rect')
                right++;
                rightWindowEdge += (index == 0) ? 28 : 30;

                await Promise.all([
                    window.transition().duration(this.duration * 2)
                        .attr('x', () => leftWindowEdge)
                        .attr('width', () => rightWindowEdge - leftWindowEdge).end()
                ])
                let currentRect = d3.select(`#rect${index}-${this.dataset[index]}-${this.svgId}`)
                // Change to green if it's a 1
                currentRect
                    .call((sel: any) => {
                        let fill = sel.attr('fill')
                        sel.attr('fill', (d: any) => (d == 1) ? '#79d14d' : fill)
                    })

                index++;
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
    }
}