import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { mkdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { spawn } from "node:child_process";

const DEFAULT_OUTPUT = "../outputs/lower-third-transparent.mov";
const pipedAnswers = input.isTTY
  ? []
  : readFileSync(0, "utf8").split(/\r?\n/);

function normalizeOutputPath(answer) {
  const rawPath = answer.trim() || DEFAULT_OUTPUT;
  const withExtension = extname(rawPath) ? rawPath : `${rawPath}.mov`;
  return resolve(process.cwd(), withExtension);
}

function runCommand(command, args) {
  return new Promise((resolveProcess, rejectProcess) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", rejectProcess);
    child.on("close", (code) => {
      if (code === 0) {
        resolveProcess();
      } else {
        rejectProcess(new Error(`${command} exited with code ${code}`));
      }
    });
  });
}

const rl = input.isTTY ? createInterface({ input, output }) : null;

async function ask(question) {
  if (rl) {
    return rl.question(question);
  }

  output.write(question);
  return pipedAnswers.shift() ?? "";
}

try {
  const answer = await ask(
    `Where should the transparent MOV be saved? [${DEFAULT_OUTPUT}] `,
  );
  const outputPath = normalizeOutputPath(answer);
  let shouldRender = true;

  if (existsSync(outputPath)) {
    const overwrite = await ask(
      `File already exists at ${outputPath}. Overwrite? [y/N] `,
    );
    if (!/^y(es)?$/i.test(overwrite.trim())) {
      console.log("Render cancelled.");
      shouldRender = false;
    }
  }

  if (shouldRender) {
    await mkdir(dirname(outputPath), { recursive: true });

    await runCommand("npx", [
      "--yes",
      "hyperframes@0.6.95",
      "render",
      "--format",
      "mov",
      "--quality",
      "high",
      "--fps",
      "60",
      "--output",
      outputPath,
    ]);
  }
} finally {
  rl?.close();
}
