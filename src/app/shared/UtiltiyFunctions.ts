export default class UtilityFunctions {

    static timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);

        //The maximum is exclusive and the minimum is inclusive
    }
    static generateRandomBinary(binaryLength: number) {
        let binary = "0b";
        for (let i = 0; i < binaryLength; ++i) {
            binary += this.randomDigit();
        }
        return binary;
    }
    static randomDigit() {
        return Math.floor(Math.random() * Math.floor(2));
    }
}
