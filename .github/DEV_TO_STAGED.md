# 🎯 Dev-To-Staged Workflow Breakdown

🚀 **Workflow 1: Dev to Staged (dev-to-staged.yml)**

📌 Trigger: When a PR is created, updated, or reopened for dev → staged.
📌 Outcome:

1. 📜 Generates a commit list with links for the PR description.
2. 🔢 Auto-increments the version (e.g., 1.0.0 → 1.0.1).
3. 📌 Updates the VERSION file and commits it to staged.
4. 🤖 Auto-approves & merges the PR (ensuring at least one approval).
5. 🔄 Commits PR changes to staged.
6. 🏷️ After merging, creates a Git tag (vX.Y.Z-staged) for the staged release.
