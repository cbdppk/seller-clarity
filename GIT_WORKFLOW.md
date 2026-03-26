# Git Workflow

## First setup
```bash
git init
git add .
git commit -m "Bootstrap Seller Clarity starter"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Branches
Use one short-lived branch per person:
- `feat/home-ui`
- `feat/analyze-api`
- `feat/charts-polish`

## Daily flow
Before work:
```bash
git checkout main
git pull origin main
git checkout -b feat/your-task-name
```

After work:
```bash
git add .
git commit -m "Describe your change clearly"
git push origin feat/your-task-name
```

Open a PR and merge early.

## Team rules
- Pull before pushing
- Keep commits small
- Do not refactor the whole app during the hackathon
- One person handles final merge decisions
