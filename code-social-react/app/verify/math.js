
module.exports = {
    async timeStringToNumber(timeString) {
          return parseInt(timeString.replace(':', ''), 10)
    },
    async convertToMinutes(number) {
        const numberToMinutesMap = {
            30: 30,
            70: 30,
            100: 60,
            130: 90,
            170: 90,
            200: 120,
            230: 150,
            270: 150,
            300: 180,
            330: 210,
            370: 210,
            400: 240,
            430: 270,
            470: 270,
            500: 300,
            530: 330,
            570: 330,
            600: 360
        };
        return numberToMinutesMap[number] ?? 'Invalid'
    }
}