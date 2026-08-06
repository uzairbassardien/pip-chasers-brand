const modules = import.meta.glob("../assets/*.jpeg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export const lifestyleImages = Object.entries(modules)
  .filter(([path]) => /Lifestyle/i.test(path))
  .map(([path, src]) => ({
    src,
    label: path.match(/Lifestyle \((\d+)\)/)?.[1] ?? "",
  }))
  .sort((a, b) => Number(a.label) - Number(b.label));
