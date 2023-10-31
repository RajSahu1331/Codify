const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, userInput) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  try {
    // Compile the C++ source file and capture both stdout and stderr
    const compileCommand = `g++ ${filepath} -o ${outPath} 2>&1`;
    const childCompile = execSync(compileCommand, {
      input: userInput,
      stdio: "pipe",
    });

    // Execute the compiled binary based on the operating system and capture its stdout
    let childExecute;
    if (os.platform() === "win32") {
      // Check if running on Windows and skip WSL-related error messages
      if (childCompile.toString().includes("Windows Subsystem for Linux has no installed distributions")) {
        return "Compilation error: Windows Subsystem for Linux is not configured.";
      }
      childExecute = execSync(`${outPath}`, {
        input: userInput,
        stdio: "pipe",
      });
    } else {
      childExecute = execSync(`./${jobId}.out`, {
        input: userInput,
        stdio: "pipe",
      });
    }

    const compilationOutput = removeFilePathFromError(childCompile.toString());
    const executionOutput = childExecute.toString();

    // Combine the compilation and execution outputs into a single string
    // const combinedOutput = `${compilationOutput}\n${executionOutput}`;
    // console.log("hehe output",combinedOutput);

    return executionOutput;
  } catch (error) {
    // If compilation failed, capture the error message and remove the path
    return removeFilePathFromError(error.stdout.toString());
  }
};

function removeFilePathFromError(errorOutput) {
  // Use a regular expression to remove file paths from the error message
  const pathRemovedError = errorOutput.replace(/\S+\:\S+\:\S+\:\S+\:/g, '');
  return pathRemovedError.trim();
}

module.exports = {
  executeCpp,
};
