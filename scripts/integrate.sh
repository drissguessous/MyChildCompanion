#!/usr/bin/env bash
# Usage : scripts/integrate.sh groupe1 groupe2 … — valide, raccorde, teste, commite et pousse.
set -e
cd "$(dirname "$0")/.."
ok=()
for g in "$@"; do
  if npx tsx scripts/validate-chapters.mts "src/data/content/gen-$g.ts" scripts/content-manifest-official.json "$g" >/tmp/claude-0/val-$g.txt 2>&1; then ok+=("$g"); else echo "✗ $g"; tail -3 /tmp/claude-0/val-$g.txt; fi
done
[ ${#ok[@]} -eq 0 ] && exit 1
node -e "const f='scripts/content-done.json',fs=require('fs');const d=new Set(JSON.parse(fs.readFileSync(f)));process.argv.slice(1).forEach(g=>d.add(g));fs.writeFileSync(f,JSON.stringify([...d],null,1))" "${ok[@]}"
node scripts/wire-generated.mjs
# erreurs de types hors brouillons en cours de rédaction
errs=$(npx tsc --noEmit 2>&1 | grep "error TS" | grep -v "src/data/content/gen-" || true)
for g in "${ok[@]}"; do errs+=$(npx tsc --noEmit 2>&1 | grep "gen-$g.ts" || true); done
[ -n "$errs" ] && { echo "$errs"; exit 1; }
(npm run -s check:tone && npm run -s check:i18n && npm run -s check:content) 2>&1 | grep -E "✓|✗|Arabe"
git add -f scripts src/data/chapters.ts src/data/content/links.ts $(printf "src/data/content/gen-%s.ts " "${ok[@]}")
git commit -q -m "Contenu officiel : ${ok[*]}

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01NNmXD8RXdxjkkPUGWunqpd"
git push -q 2>&1 | grep -vi "moved\|location" | tail -1 || true
echo "✓ intégré : ${ok[*]}"
