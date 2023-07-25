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
        component: 'DocumentsView',
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
        component: 'ProjectsView',
        children: [
          {
            name: 'atomic-docs',
            type: 'file',
            component: 'AtomicDocsView',
          },
          {
            name: 'tedx-fond-du-lac',
            type: 'file',
            component: 'TedxView',
          },
          {
            name: 'archived-portfolio-sites',
            type: 'folder',
            component: 'ArchivedPortfolioSitesView',
            children: [
              {
                name: 'portfolio-site-2010',
                type: 'file',
                component: 'PortfolioSite2010View',
              }
            ],
          }
        ],
      },
      {
        name: 'about',
        type: 'folder',
        component: 'AboutView',
        children: [
          {
            name: 'me',
            type: 'file',
            component: 'MeView',
          },
          {
            name: 'cats',
            type: 'folder',
            component: 'CatsView',
            children: [
              {
                name: 'richard-parker',
                type: 'file',
                component: 'RichardParkerView',
              },
              {
                name: 'barbara-walters',
                type: 'file',
                component: 'BarbaraWaltersView',
              },
            ],
          },
        ],
      },
    ],
  },
};

export default fileSystem;
