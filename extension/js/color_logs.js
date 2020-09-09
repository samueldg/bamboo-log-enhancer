(function() {

  // Separates the log file into separate blocks, depending
  // on the type of the log line (build, command, error, simple).
  // Each block is then colored accorging to the `log_lines.css` file.

  var logLineTypes = [
    'build',
    'command',
    'error',
    'simple'
  ];
  var body = document.body
  var logLines = body.innerText.split('\n');
  var logDiv = document.createElement('div');
  logDiv.className = "log";

  var currentLogLineType;
  var currentLogBlock;

  body.children[0].remove();

  for (var i = 0; i < logLines.length; ++i) {
    // Get the class to use depending on the first word
    logLine = logLines[i];
    firstWord = logLine.split('\t')[0];

    if (logLineTypes.indexOf(firstWord) >= 0){
      logLineType = firstWord;
    } else {
      logLineType = 'default';
    }

    if(logLineType != currentLogLineType){
      // Create a new div with the class corresponding to the log type
      currentLogBlock = document.createElement('div');
      currentLogBlock.className = logLineType;
      logDiv.appendChild(currentLogBlock);
      currentLogLineType = logLineType;
    }

    // Append the line in the current block's text
    currentLogBlock.innerHTML = currentLogBlock.innerHTML + logLine + '<br/>';
  }

  body.appendChild(logDiv);

})();