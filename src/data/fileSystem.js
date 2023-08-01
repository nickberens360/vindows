// fileSystem.js

// File system data and functions to manage the file system
const fileSystem = {
  root: {
    name: 'root',
    type: 'folder',
    content: 'The root directory of the file system',
    children: [
      {
        name: 'documents',
        type: 'folder',
        depth: 1,
        children: [
          {
            name: 'resume.pdf',
            type: 'file',
            size: '1024 bytes',
          },
        ],
      },
      {
        name: 'projects',
        type: 'folder',
        depth: 1,
        children: [
          {
            name: 'atomic-docs',
            type: 'file',
          },
          {
            name: 'tedx-fond-du-lac',
            type: 'file',
          },
          {
            name: 'archived-portfolio-sites',
            type: 'folder',
            depth: 2,
            children: [
              {
                name: 'portfolio-site-2010',
                type: 'file',
              }
            ],
          }
        ],
      },
      {
        name: 'about',
        type: 'folder',
        depth: 1,
        children: [
          {
            name: 'me',
            type: 'file',
          },
          {
            name: 'cats',
            type: 'folder',
            depth: 2,
            children: [
              {
                name: 'richard-parker',
                type: 'file',
              },
              {
                name: 'barbara-walters',
                type: 'file',
              },
            ],
          },
        ],
      },
    ],
  },
};

// Function to add UID to file system nodes
function addUIDs(node, counter) {
  node.uid = counter; // Assign the current counter value as the UID

  // Increment the counter for the next node
  counter++;

  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      // Recursively add UIDs to children, passing the updated counter value
      counter = addUIDs(child, counter);
    }
  }

  return counter; // Return the updated counter value
}

// Call the function to add UIDs starting from 1 (you can change the starting value as needed)
addUIDs(fileSystem.root, 1);

export default fileSystem;
