/**
 * File containing all the defaults
 */

import * as github from "@actions/github";

export const lockfileName = "discord-webhook-lastrun-time.lock";
export const holddownTime = 3000; // ms
export const avatarUrl =
  "https://cdn.jsdelivr.net/gh/opp-studio/discord-webhook-notify@main/img/default_avatar.png";
export const username = "Notification (GitHub)";
export const colors = {
  info: "#00ff00",
  warn: "#ff9900",
  error: "#ff0000"
};
export const longSeverity = {
  info: "Informational",
  warn: "Warning",
  error: "Error"
};

/**
 * @returns { undefined }
 * This default is very minimal and its much better to create one yourself.
 * See https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs#github-context
 */
export async function getDefaultDescription() {
  const context = github.context;
  const payload = context.payload;
  const eventName = context.eventName;

  const defaultDescription =
    `- **Repository:** [${payload.repository.name}](${context.serverUrl}/${payload.repository.full_name})\n` +
    `- **Workflow:** ${context.workflow}\n` +
    `- **Event:** ${eventName}\n` +
    `- **Triggering Actor:** ${context.actor}\n`;

  if (eventName === "push") {
    return (
      defaultDescription +
      `- **Ref:** ${payload.ref}\n` +
      `- **Committer:** ${payload.head_commit.committer.name}\n` +
      `- **Pusher:** ${payload.pusher.name}\n` +
      `- **Author:** ${payload.head_commit.author.name}\n` +
      `- **Commit URL:** ${payload.head_commit.url}\n` +
      `- **Commit Message:** ${payload.head_commit.message}\n`
    );
  }

  return defaultDescription;
}
