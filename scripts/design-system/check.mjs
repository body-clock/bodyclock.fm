import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const inventories = ['COMPONENTS', 'LAYOUTS', 'PATTERNS'].flatMap(name => ['--inventory', `design-system/${name}.md`]);
function run(args) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
run(['scripts/design-system/generate-indexes.mjs', '--check', '.']);
for (const kind of ['component', 'layout', 'pattern']) {
  for (const name of readdirSync(`design-system/${kind}s`).filter(name => name.endsWith('.md'))) {
    run(['scripts/design-system/check-contract.mjs', '--kind', kind, ...inventories, `design-system/${kind}s/${name}`]);
  }
}
