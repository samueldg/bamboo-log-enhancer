(function() {

  // Separates the log file into separate rows
  // Each row is formatted by the type of the log line (build, command, error, simple).
  // accorging to the `bamboo_log.css` file.

  // Map the log line type to the corresponding css class
  var logLineTypes = {
    'build':'buildOutputLog',
    'command':'bambooCommandLog',
    'error':'errorOutputLog',
    'simple':''
  };
  var body = document.body
  body.className = "aui-layout aui-theme-default dec_result"
  
  var logLines = body.innerText.split('\n');

  // Create main DIV to contain the log TABLE
  var logDiv = document.createElement('div');
  logDiv.className = "tabs-pane active-pane";

  // Create the log TABLE and append it to the DIV
  var logTable = document.createElement('table')
  logTable.id = "buildLog"

  logDiv.appendChild(logTable)

  var currentLogLineType;
  var currentLogBlock;

  body.children[0].remove();

  for (var i = 0; i < logLines.length; ++i) {
    // Get the class to use depending on the first word
    logLine = logLines[i];
    logSections = logLine.split('\t')
    firstWord = logSections[0];

    // Get CSS class to use for this log line
    if (firstWord in logLineTypes){
      logLineType = logLineTypes[firstWord];
    } else {
      logLineType = '';
    }

    // Create log ROW
    currentLogBlock = document.createElement('tr');

    // Create time COLUMN
    currentLogTime = document.createElement('td');
    currentLogTime.className = "time";
    currentLogTime.innerText = logSections[1];

    // Create content COLUMN
    currentLogContent = document.createElement('td');
    // Apply COLUMN class if exists
    if (logLineType != '')
      currentLogContent.className = logLineType;

    // Handle multiple lines of bamboo command
    if(firstWord == 'command'){
      // Create a new div with the class corresponding to the log type
      currentBuildContent = document.createElement('div');
      currentBuildContentText = logSections[2];      
      currentBuildContent.innerHTML = currentBuildContentText;
      // Remove outer qoutes
      currentBuildContent.innerHTML = currentBuildContent.innerHTML.replace(/^"|"$/g, '')
      // Replace \n with BR
      currentBuildContent.innerHTML = currentBuildContent.innerHTML.replace(/\\n/g, '<br />');
      currentLogContent.appendChild(currentBuildContent);
    }
    else // For all other log line types, simply add text to COLUMN
      currentLogContent.innerText = logSections[2];

    // Add time and content columns to current row
    currentLogBlock.appendChild(currentLogTime);
    currentLogBlock.appendChild(currentLogContent);

    // Add row to TABLE
    logTable.appendChild(currentLogBlock)
  }

  body.appendChild(logDiv);

})();