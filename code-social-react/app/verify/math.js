
module.exports = {
    async timeStringToNumber(timeString) {
        if(timeString === "00:00") {
            return 2500;
          }
          if(timeString === "00:30") {
            return 2530;
          }
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
            300: 180
        };
        return numberToMinutesMap[number] ?? 'Invalid'
    }
}