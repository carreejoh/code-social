module.exports = {
  async clearConsoleScreen() {
    consoleMessages.length = 0;
    while (consoleOutput.firstChild) {
      consoleOutput.removeChild(consoleOutput.firstChild);
    }
  },
  async printToConsole() {
    consoleMessages.forEach((log) => {
      const newLogItem = document.createElement("li");
      const newLogText = document.createElement("pre");

      newLogText.className = log.class;
      newLogText.textContent = `> ${log.message}`;

      newLogItem.appendChild(newLogText);
      consoleOutput.appendChild(newLogItem);
    });
  },
};
