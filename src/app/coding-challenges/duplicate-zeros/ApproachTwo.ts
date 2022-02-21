import * as d3 from 'd3';
import UtilityFunctions from '../../shared/UtiltiyFunctions';
import { Approach } from '../duplicate-zeros/Approach';

export class ApproachTwo extends Approach {
    svgId = 'ApproachTwo';
    d3Sel = `#coding-outlet-${this.svgId}`
    subHeading = 'Approach 2'
    description = 'Two Passes O(n) time, O(1) space'

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
                                .attr('x', () => (30 * index) + 10)
                                .attr('y', 40)
                        })
                })
    }
    // STAGE 2 Animations
    override async animate(): Promise<unknown> {
        return new Promise(async (resolve) => {
            await this._animate();
            setTimeout(() => {
                resolve(this.resolveAnimate())
            }, 200)
        })
    }

    async _animate() {

        await this.firstPass().catch(_e => { console.log('Promise Interrupted') })
        await this.secondPass().catch(_e => { console.log('Promise Interrupted') })
        await UtilityFunctions.timeout(200) // time between each iteration
    }
    // STAGE 2 Helper Methods
    override async stopAnimation(): Promise<void> {

    }

    async firstPass() {

        let n = this.dataset.length - 1;
        this.totalZeros = 0;
        this.currentJ = 0;

        for (let i = 0; i <= n; i++) {  // begin animation loop
            let curr = `#rect${i}-${this.dataset[i]}-${this.svgId}`
            this.currentI = i

            await d3.select(curr)
                .transition()
                .duration(200)
                .attr('fill', (_data: any, index: any, nodes: any) => {
                    if (this.dataset[i] === 0) {
                        let remainSpace = n - i
                        if (i > n - this.totalZeros) return '#fcba03'; // yellow

                        if (this.totalZeros >= remainSpace) {
                            return '#79d14d' // green
                        }
                        d3.select(nodes[index]).attr('duplicate', true) // tag with "duplicate" attribute for later processing
                        this.totalZeros++;
                        return 'cornflowerblue';
                    }
                    else {
                        if (i > n - this.totalZeros) return '#fcba03'; // yellow
                        return '#79d14d' // green
                    }
                }).end()

        }
    }
    async secondPass() {
        return new Promise(async (resolve, _reject) => {
            if (this.totalZeros < 1) resolve(false);
            else {
                let n = this.dataset.length - 1;
                let last = n - this.totalZeros;
                let coords: any = [];
                // save all the X-Positions into a list
                for (let i = 0; i <= n; i++) {
                    let currRect = d3.select(`#rect${i}-${this.dataset[i]}-${this.svgId}`);
                    let currText = d3.select(`#text${i}-${this.dataset[i]}-${this.svgId}`);
                    coords.push({ rectX: currRect.attr('x'), textX: currText.attr('x') });
                }
                await this.clearEnds();

                // Start backwards from the last element and begin writing over old values
                for (let j = last; j >= 0; j--) {
                    this.currentJ = j

                    await this.insertAnimation(j, coords)

                    if (this.totalZeros === 0) break;
                }
                resolve(true)

            }
        }).catch(e => console.log(e))
    }
    override async playRandom(sizeEach: number = UtilityFunctions.getRandomInt(9, 9)): Promise<void> {
        return new Promise(async (resolve) => {

            while (this.randomLoop) {

                this.dataset = []
                this.update();
                for (let j = 0; j < sizeEach; j++) {
                    this.dataset.push(UtilityFunctions.getRandomInt(0, 9))
                }
                if (!this.dataset.includes(0))
                    continue;
                console.log('loop')
                this.update();
                await this._animate();
            }
            setTimeout(() => {
                resolve(this.resolvePlayRandom())
            }, 200)
        })

    }

    insertAnimation(index: number, coords: any[]) {
        return new Promise(async (resolve, _reject) => {
            let lastRect = d3.select(`#rect${index}-${this.dataset[index]}-${this.svgId}`)
            let lastText = d3.select(`#text${index}-${this.dataset[index]}-${this.svgId}`)

            if (this.dataset[index] === 0 && lastRect.attr('duplicate')) {
                await this.insertZero(index, coords)
                this.totalZeros--;
            }
            // interrupt code below not used, but cool idea to store animation stat in localstorage for pause/resume functionallity
            lastRect.transition().duration(400).attr('x', coords[index + this.totalZeros].rectX)
                .on('interrupt', (_: any, index: any, nodes: any) => {
                    localStorage.setItem(nodes[index], d3.select(nodes[index]).attr('x'))
                })
            lastText.transition().duration(400).attr('x', coords[index + this.totalZeros].textX)

            setTimeout(resolve, 200)

        });
    }
    clearEnds() {
        return new Promise(async (resolve) => {
            let len = this.dataset.length - 1
            for (let i = 0; i < this.totalZeros; i++) {
                d3.select(`#rect${len - i}-${this.dataset[len - i]}-${this.svgId}`).remove()
                d3.select(`#text${len - i}-${this.dataset[len - i]}-${this.svgId}`).remove()
            }
            resolve(true)
        })
    }
    insertZero(index: number, coords: any[]) {
        return new Promise((resolve) => {
            d3.select(this.d3Sel).append('g')
                .append('rect')
                .attr('class', 'element-shape')
                .attr('width', 28)
                .attr('height', 40)
                .attr('id', () => `rect${index + this.totalZeros}-0-${this.svgId}`)
                .attr('y', 15)
                .attr('x', () => {
                    return coords[index + this.totalZeros].rectX
                })
                .attr('fill', 'cornflowerblue')
                .attr('stroke', 1)
                .attr('stroke-width', 1)
                .attr('opacity', 0)
                .transition().duration(300).attr('opacity', 1)

            d3.select(this.d3Sel).append('g')
                .append('text')
                .attr('class', 'element-text')
                .text('0')
                .attr('id', () => `text${index}-0}-${this.svgId}`)
                .attr('x', () => {
                    return coords[index + this.totalZeros].textX
                })
                .attr('y', 40)
                .attr('opacity', 0)
                .transition().duration(200).attr('opacity', 1)
            resolve(true)
        })
    }
}
