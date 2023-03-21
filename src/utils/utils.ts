export const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--vh", `${window.innerHeight}px`);
}