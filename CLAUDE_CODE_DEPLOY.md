# CLAUDE CODE DEPLOYMENT PROMPT
# ================================
# Copy everything below the line and paste it into Claude Code CLI.
# This will create the repo, push the code, and enable GitHub Pages.
# ================================

You are deploying the DissOLinK's project to GitHub Pages. Execute these steps autonomously and report status after each:

## Step 1: Initialize Git Repository
Navigate to the project folder containing index.html, README.md, and LICENSE.
Run:
```
cd ~/dissolinks
git init
git add -A
git commit -m "feat: DissOLinK's v1.0 -- Sovereign Deep Link Generator"
```

## Step 2: Create GitHub Repository
Using the GitHub CLI (gh), create a PUBLIC repository:
```
gh repo create dissolinks --public --source=. --remote=origin --description="Sovereign Deep Link Generator // Break the walled garden // DISSOVERSE Neural Network"
```

## Step 3: Push Code
```
git push -u origin main
```

## Step 4: Enable GitHub Pages
```
gh api repos/{owner}/dissolinks/pages -X POST -f source.branch=main -f source.path=/
```

If that endpoint errors, try:
```
gh browse --settings
```
And instruct me to enable Pages manually under Settings > Pages > Source: main branch, / (root).

## Step 5: Verify Deployment
```
gh browse
```

Report the live URL. It will be: https://{username}.github.io/dissolinks/

## Step 6: Confirm
Print:
- Repository URL
- GitHub Pages URL
- File count and sizes
- Deployment status

EXECUTE ALL STEPS. DO NOT ASK FOR CONFIRMATION. REPORT RESULTS.
