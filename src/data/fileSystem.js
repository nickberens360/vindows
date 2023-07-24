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
        content: 'Contains various documents',
        children: [
          {
            name: 'file1.txt',
            type: 'file',
            size: '1024 bytes',
            content: 'This is the content of file1.txt.',
          },
          {
            name: 'file2.txt',
            type: 'file',
            size: '512 bytes',
            content: 'Hello, this is file2.txt.',
          },
        ],
      },
      {
        name: 'pictures',
        type: 'folder',
        content: 'Contains image files',
        children: [
          {
            name: 'image1.jpg',
            type: 'file',
            size: '2048 bytes',
            content: 'Binary data of image1.jpg',
          },
        ],
      },
      {
        name: 'videos',
        type: 'folder',
        content: 'Empty folder for videos',
        children: [],
      },
      {
        name: 'projects',
        type: 'folder',
        content: 'Contains project-related folders and files',
        children: [
          {
            name: 'project1',
            type: 'folder',
            content: 'Project folder 1',
            children: [
              {
                name: 'project1_file1.txt',
                type: 'file',
                size: '1024 bytes',
                content: 'Content of project1_file1.txt.',
              },
            ],
          },
          {
            name: 'project2',
            type: 'folder',
            content: 'Project folder 2',
            children: [],
          },
        ],
      },
    ],
  },
};

export default fileSystem;
