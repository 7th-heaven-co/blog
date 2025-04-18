# 🧪 Workflows Drafts

This folder contains non-production GitHub Actions workflows that are:

- Under development or testing
- Optional integrations not wired in yet
- References for future enhancements

## Files

- `test-selective-deploy.yml`: Tests the changelog-based logic without triggering full deploys.
- `notify-slack-discord.yml`: Example for Slack/Discord notification if a deploy is skipped.
- `coverage-report.yml`: Placeholder for future test coverage summary runner.

## How to Use

To activate a draft workflow:
1. Copy it to `.github/workflows/`
2. Rename if needed
3. Customize the `on:` trigger and environment
