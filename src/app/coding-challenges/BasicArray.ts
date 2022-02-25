import UtilityFunctions from "src/app/shared/UtiltiyFunctions";


export class BasicArray {

    isPlayingAnimation = false;
    isPlayingRandom = false;
    totalZeros = 0;
    buttonsDisabled = false;
    statusButtonDisabled = false;
    currentI = 0;
    currentJ = 0;
    svgId = 'temp-place-holder-for-svg-id';
    subHeading = 'use this for sub header';
    description = 'use this for breif desc';
    status = 'Stop';
    randomLoop = false;
    maxSize = 19;
    height = 150;


    constructor(public dataset: any[]) {

    }

    // Handle Single Play Animations Here
    animate(controls?: boolean): Promise<unknown> {
        return new Promise(() => {

        });
    }
    resolveAnimate(controlButtons?: boolean) {
        this.status = 'Finished.'
        this.buttonsDisabled = controlButtons ? this.buttonsDisabled : false;
    }
    async beginAnimate() {
        this.status = 'Animating'
        this.buttonsDisabled = true;
        this.isPlayingAnimation = true;
        this.statusButtonDisabled = true;
        return new Promise(async (resolve) => {
            await this.animate();
            setTimeout(() => {
                resolve(true)
            }, 200)
        })
    }
    stopAnimation(): void {
    }
    // Handle Multiple Play Animations Here

    async playRandom(controlButtons?: boolean): Promise<void> {
        return new Promise(async () => {

        });
    }
    async beginPlayRandom(controlButtons?: boolean) {
        return new Promise(async (resolve) => {
            console.log('playing')
            this.statusButtonDisabled = false;
            this.buttonsDisabled = true;
            this.isPlayingRandom = true;
            this.status = 'Stop'
            this.randomLoop = true;
            await this.playRandom(controlButtons);
            setTimeout(() => {
                resolve(true)
            }, 200)
        })
    }
    stopPlayRandom() {
        this.statusButtonDisabled = true;
        this.status = 'Ending...'
        this.randomLoop = false;
    }
    resolvePlayRandom() {
        this.buttonsDisabled = false;
        this.status = 'Finished';
    }
    reset(): void {
        this.update()
        this.isPlayingAnimation = false;
        this.isPlayingRandom = false;
    }
    update(): void {

    }
    pop(): void {
        this.dataset.pop();
        this.update();
    }
    pushOne() {
        this.dataset.push(1);
    }
    push(isZero?: number): void {
        if (this.dataset.length > this.maxSize)
            return;
        (isZero === 0) ? this.dataset.push(0) : this.dataset.push(UtilityFunctions.getRandomInt(1, 9))
        //this.dataset.sort((a, b) => a - b)
        this.update();
    }
    clear() {
        this.dataset = []
        this.update();
    }
    pushNegative(isNegative?: boolean): void {
        if (this.dataset.length > this.maxSize)
            return;
        (isNegative) ? this.dataset.push(UtilityFunctions.getRandomInt(-9, -1)) : this.dataset.push(UtilityFunctions.getRandomInt(1, 9))
        //this.dataset.sort((a, b) => a - b)
        this.update();
    }
    clearSVG(): void {

    }


}