export function isRequestDemoLabel(label: string) {
  return /^request\s+(a\s+)?demo$/i.test(label.trim());
}
