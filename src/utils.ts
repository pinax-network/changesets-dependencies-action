import { exec } from "@actions/exec";
import fs from "fs-extra";

export async function setupGitCredentials(githubToken: string) {
  await fs.writeFile(
    `${process.env.HOME}/.netrc`,
    `machine github.com\nlogin pinax-bot\npassword ${githubToken}`
  );
}

export async function execWithOutput(
  command: string,
  args?: string[],
  options?: { ignoreReturnCode?: boolean; cwd?: string }
) {
  let myOutput = "";
  let myError = "";

  return {
    code: await exec(command, args, {
      listeners: {
        stdout: (data: Buffer) => {
          myOutput += data.toString();
        },
        stderr: (data: Buffer) => {
          myError += data.toString();
        },
      },

      ...options,
    }),
    stdout: myOutput,
    stderr: myError,
  };
}
export const setupGitUser = async () => {
  await exec("git", ["config", "user.name", `"pinax-bot"`]);
  await exec("git", [
    "config",
    "user.email",
    `"pinax-bot@users.noreply.github.com"`,
  ]);
};
