// src/data/projectsData.js
export const projectsData = [
  {
    id: 1,
    name: "Project Alpha",
    status: "Ongoing",
    progress: 35,
    deadline: "2024-12-31",
    team: [
      { id: 1, name: "John Doe", assign: "Team Lead" },
      { id: 2, name: "Jane Smith", assign: "Developer" },
      { id: 3, name: "Mike Johnson", assign: "Tester" },
    ],
  },
  {
    id: 2,
    name: "Project Beta",
    status: "Completed",
    progress: 100,
    deadline: "2024-08-01",
    team: [
      { id: 1, name: "John Doe", assign: "Team Lead" },
      { id: 5, name: "Chris Green", assign: "Developer" },
      { id: 6, name: "Mary Brown", assign: "Tester" },
    ],
    githubLink: "https://github.com/project-beta",
    deploymentLink: "https://beta.com",
  },
  {
    id: 3,
    name: "Project Gamma",
    status: "Ongoing",
    progress: 60,
    deadline: "2024-11-15",
    team: [
      { id: 7, name: "Alice Cooper", assign: "Team Lead" },
      { id: 8, name: "Bob Martin", assign: "Developer" },
      { id: 9, name: "Charlie White", assign: "Tester" },
    ],
  },
];
