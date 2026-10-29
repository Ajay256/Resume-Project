/**
 * Triggers standard browser print/save-as-PDF dialog.
 * Sets document.title dynamically so the browser defaults the PDF filename
 * to the person's name (e.g. "Alex_Morgan_Resume.pdf").
 */
export function printResume(personName?: string) {
  if (typeof window === "undefined") return;

  const originalTitle = document.title;
  const sanitizedName = personName?.trim()
    ? personName
        .trim()
        .replace(/[^a-zA-Z0-9_\-\s]/g, "")
        .replace(/\s+/g, "_")
    : "Resume";
  const fileName = `${sanitizedName}_Resume`;

  document.title = fileName;

  const restoreTitle = () => {
    document.title = originalTitle;
    window.removeEventListener("afterprint", restoreTitle);
  };

  window.addEventListener("afterprint", restoreTitle);

  // Trigger standard browser print
  window.print();

  // Fallback restoration after 3 seconds
  setTimeout(restoreTitle, 3000);
}
