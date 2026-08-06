export function scrollToSection(id: string) {
  const target = document.getElementById(id);

  if (!target || window.location.pathname !== "/") {
    window.location.href = `/#${id}`;
    return;
  }

  const navOffset = 88;
  const top = target.getBoundingClientRect().top + window.scrollY - navOffset;

  window.scrollTo({ top, behavior: "smooth" });
  window.history.pushState(null, "", `/#${id}`);
}
