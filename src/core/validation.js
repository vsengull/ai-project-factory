export function normalizeProjectName(value) {
  const name = value?.trim().toLowerCase();
  if (!name || !/^[a-z0-9][a-z0-9-]*$/.test(name)) {
    throw new Error('Project name must use lowercase letters, numbers, and hyphens.');
  }
  return name;
}
