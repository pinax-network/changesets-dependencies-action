import { exec } from "@actions/exec";
import fs from "fs-extra";

export async function setupGitCredentials(
  githubToken: string,
  loginName?: string
) {
  const login = loginName || "github-actions[bot]";
  await fs.writeFile(
    `${process.env.HOME}/.netrc`,
    `machine github.com\nlogin ${login}\npassword ${githubToken}`
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
export const setupGitUser = async (userName?: string, userEmail?: string) => {
  const name = userName || "github-actions[bot]";
  const email = userEmail || "github-actions[bot]@users.noreply.github.com";
  await exec("git", ["config", "user.name", `"${name}"`]);
  await exec("git", ["config", "user.email", `"${email}"`]);
};
