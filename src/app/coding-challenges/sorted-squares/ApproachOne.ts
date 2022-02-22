import * as d3 from 'd3';
import UtilityFunctions from '../../shared/UtiltiyFunctions';

import { Approach } from './Approach';

export class ApproachOne extends Approach {

    svgId = 'ApproachOne';
    d3Sel = `#coding-outlet-${this.svgId}`
    subHeading = 'Approach 1'
    description = 'Brute Force O(n<sup>2</sup>) time, O(1) space'

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
                                .attr('x', (d: any) => {
                                    //logic to center negatives and double digits
                                    if (Math.abs(d / 10) >= 1)
                                        return (30 * index) + 5

                                    return (30 * index) + 10
                                })
                                .attr('y', 40)
                        })
                })
    }

}