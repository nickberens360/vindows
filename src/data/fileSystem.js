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

export default fileSystem;
