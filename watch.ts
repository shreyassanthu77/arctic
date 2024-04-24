const file = Deno.args[0]!;
const cmd = new Deno.Command("glow", {
  args: [
    file,
  ],
  stdout: "inherit",
});

let timer: number | undefined;
function main() {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(async () => {
    console.clear();
    const p = cmd.spawn();
    await p.status;
  }, 300);
}

const watcher = Deno.watchFs(".");
main();
for await (const event of watcher) {
  if (event.paths.some((path) => path.endsWith(file))) {
    main();
  }
}
