# 🎯 Dev-To-Staged Workflow Breakdown

🚀 **Workflow 1: Dev to Staged (dev-to-staged.yml)**

📌 Trigger: When a PR is created, updated, or reopened for dev → staged.
📌 Outcome:

1. 📜 Generates a commit list with links for the PR description.
2. 🤖 Auto-approves & merges the PR (ensuring at least one approval).
3. 🔄 Commits PR changes to staged.
4. 🏷️ After merging, creates a Git tag (vX.Y.Z-staged) for the staged release.

🎯 New Workflow Behavior

| Trigger | Action |
| ---------- | ------- |
| PR Created from dev → staged | ✅ Auto-approve & merge the PR |
| PR Updated (synchronized) | ✅ Auto-approve & merge the PR again if needed |
| PR Reopened | ✅ Auto-approve & merge the PR again |
| After Merge | ✅ Ensures changes are committed to staged |
| Final Step | ✅ Tags the release as vX.Y.Z-staged |

🔥 Why This is Better

✅ More controlled deployments → Only runs when a PR is explicitly created.
✅ Less risk of unwanted deployments → Does not trigger on every dev push.
✅ Automated, but flexible → If manual review is needed, you can hold off merging the PR.
