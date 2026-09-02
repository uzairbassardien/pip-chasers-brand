const modules = import.meta.glob("../assets/*.jpeg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export const resultsImages = Object.entries(modules)
  .filter(([path]) => /Results/i.test(path))
  .map(([path, src]) => ({
    src,
    label: path.match(/Results \((\d+)\)/)?.[1] ?? "",
  }))
  .sort((a, b) => Number(a.label) - Number(b.label));
