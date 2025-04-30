```markdown
# Connecting GitHub Commits to Jira Issues

Below is a concise, step-by-step guide you can drop straight into your internal docs or README.

---

## 1  Install **GitHub for Jira**

1. In **Jira → Settings → Apps → Find new apps**, search for **GitHub for Jira** and click **Get app**.  
2. Choose **GitHub Cloud** (or **GitHub Enterprise** if that’s your flavour).  
3. You’ll be redirected to GitHub to install the **Atlassian GitHub App**; grant access to the repos you want Jira to index and approve the requested scopes.  
4. Jira back-fills ~12 months of history and starts streaming new commits/PRs in real-time. citeturn0search1

---

## 2  Reference the Issue Key Everywhere

| Where you type it | Example                          | What Jira Shows                          |
| ----------------- | -------------------------------- | ---------------------------------------- |
| **Commit message**    | `feat(auth): add JWT flow HEAVB-42` | Commit card in the **Development** panel |
| **Branch name**       | `feature/HEAVB-42-jwt-auth`         | Linked branch                            |
| **PR title/body**     | `HEAVB-42 JWT-based login`          | Linked pull-request                      |

Keys (`HEAVB-128`, etc.) are case-insensitive and can appear anywhere in the string—even several at once. cite turn0search1

---

## 3  Super-charge with **Smart Commits**

```bash
git commit -m "fix(email): handle SES bounce codes

HEAVB-42 #comment Escaped the regex causing blank messages
HEAVB-42 #time 1h 30m
HEAVB-42 #transition Done"
```

* `#comment` – adds a comment to the issue  
* `#time` – logs work  
* `#transition` – moves the issue through your workflow  

Enable via **Jira → Settings → DVCS accounts → … Enable Smart Commits**. citeturn0search0

---

## 4  Lint Commits so Nobody Forgets the Key

```js
// .commitlintrc.cjs
module.exports = {
  rules: {
    'references-empty': [2, 'never'],
    'jira-key-format': [
      2,
      'always',
      '(^[A-Z][A-Z0-9]+-\\d+)|([A-Z][A-Z0-9]+-\\d+)$',
    ],
  },
  parserPreset: {
    parserOpts: { issuePrefixes: ['HEAVB-'] },
  },
};
```

Hook it with Husky (`pre-commit` or `commit-msg`) so pushes without a Jira key are rejected locally.

---

## 5  Surface the Data Inside Jira

* **Issue view → Development panel** – live commit, branch, PR & deployment links.  
* **Releases** – combine Jira versions with GitHub tags for change-log style views.  
* **Automation** – e.g., “When PR merges → transition linked issues to Done”.

---

## 6  Need More Bells & Whistles?

* **Git Integration for Jira** or **GitHub Connector** add deep code-search, monorepo support, and SLA dashboards.
* **GitHub Actions → atlassian/gajira** lets workflows annotate builds or publish release notes automatically.

---

### Quick Checklist

- [ ] GitHub for Jira installed on both sides  
- [ ] Smart Commits enabled  
- [ ] Agreed key convention (commit, branch, PR)  
- [ ] Commit-lint/Husky guard in place  
- [ ] Automation rule to close issues when PR merges  

Once these boxes are ticked, every commit, branch, and pull-request will appear directly in the matching Jira issue—no manual linking required.
```

### Sources

1. [GitHub for Jira — Atlassian Marketplace](https://marketplace.atlassian.com/apps/1219592/github-for-jira) 
2. [Process issues with Smart Commits — Jira Cloud Docs](https://support.atlassian.com/jira-software-cloud/docs/process-issues-with-smart-commits/)
3. [Enable Smart Commits — Jira Cloud Administration](https://support.atlassian.com/jira-cloud-administration/docs/enable-smart-commits/)
4. [Git Integration for Jira (Azure DevOps, GitHub, GitLab) — Atlassian Marketplace](https://marketplace.atlassian.com/apps/4984/git-integration-for-jira-azure-devops-github-gitlab)
5. [atlassian/gajira — GitHub Actions for Jira](https://github.com/atlassian/gajira)