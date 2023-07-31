// Helper function to find an item in the file system data by its name
export function findSystemNodeByName(name, systemData) {
  if (systemData.name === name) {
    return systemData;
  }

  if (systemData.children) {
    for (const child of systemData.children) {
      const result = findSystemNodeByName(name, child);
      if (result) {
        return result;
      }
    }
  }

  return null;
}
