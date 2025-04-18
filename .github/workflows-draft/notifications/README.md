# 🔔 Modular Notification System (Slack + Discord)

This folder contains modular, reusable GitHub Actions workflows to notify Slack, Discord, or both — with emoji support, markdown formatting, and branch-awareness.

## ✅ Features

- 📣 Slack support using `text` payload
- 🛎 Discord support using `content` payload
- 🧠 Markdown formatting: bold titles, code blocks, emoji
- 🧱 Branch-aware messages (auto-populates `ref_name`)
- 🔁 Modular: `workflow_call` for reuse in any workflow
- 📦 Centralized formatting logic (via `notify-base.yml`)

---

## 🗂 Workflow Files

| File                 | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `notify-base.yml`    | Internal formatter (not called directly) |
| `notify-slack.yml`   | Sends to Slack only                      |
| `notify-discord.yml` | Sends to Discord only                    |
| `notify-all.yml`     | Sends to both Slack + Discord            |

---

## 🔧 Inputs

All `workflow_call` versions accept:

| Input     | Type   | Required | Description                                             |
| --------- | ------ | -------- | ------------------------------------------------------- |
| `message` | string | ✅        | Main body of the message                                |
| `emoji`   | string | ❌        | Emoji prefix (default: 📢)                               |
| `title`   | string | ❌        | Title of the message (default: "Workflow Notification") |
| `branch`  | string | ❌        | Branch name (defaults to `github.ref_name`)             |

---

## 🧪 Example Usage

In any other workflow:

```yaml
jobs:
  notify:
    uses: ./.github/workflows/notifications/notify-all.yml
    with:
      emoji: "✅"
      title: "Deploy Complete"
      message: |
        The site has been deployed!
        🌍 https://example.com
```

---

## ✨ Bonus: Smart Emoji Suggestions

|Workflow Type    | Emoji |
| -------------   | ----- |
| Deploy          | 🚀    |
| Build Skipped   | ⚠️    |
| Success         | ✅    |
| Failure         | ❌    |
| Preview         | 🧪    |
| Content Updated | ✍️    |
| Cache Purged    | 🔁    |
