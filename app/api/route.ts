import { Octokit } from '@octokit/core';

import { prompt } from '../ai';
import { getInstallationAccessToken } from '../auth';

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  console.log("Got a GET request");

  return new Response("Hello World!", {
    headers: { "content-type": "text/plain" },
  });
}

export async function POST(request: Request) {
  const json = await request.json();

  if (!["opened", "reopened", "synchronize"].includes(json.action)) {
    return new Response("Hello World!", {
      headers: { "content-type": "text/plain" },
    });
  }

  // 80% chance of not responding
  //   if (Math.random() > 0.2) {
  //     return new Response("Hello World!", {
  //       headers: { "content-type": "text/plain" },
  //     });
  //   }

  const token = await getInstallationAccessToken(json.installation.id);
  const octokit = new Octokit({
    auth: token,
  });

  const files = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
    {
      owner: json.repository.owner.login,
      repo: json.repository.name,
      pull_number: json.pull_request.number,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const aiComment = await prompt(JSON.stringify(files));

  if (aiComment) {
    await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: json.repository.owner.login,
        repo: json.repository.name,
        issue_number: json.pull_request.number,
        body: aiComment,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
  }

  return new Response("Hello World!", {
    headers: { "content-type": "text/plain" },
  });
}
