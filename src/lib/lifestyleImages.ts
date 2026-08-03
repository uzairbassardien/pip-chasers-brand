export const lifestyleImages = Object.entries(
  import.meta.glob("@/assets/Lifestyle (*.jpeg)", {
    eager: true,
    query: "?url",
    import: "default",
  }),
)
  .map(([path, src]) => ({
    src: src as string,
    label: path.match(/Lifestyle \((\d+)\)/)?.[1] ?? "",
  }))
  .sort((a, b) => Number(a.label) - Number(b.label));
