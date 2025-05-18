export interface IBlog {
  _id: string;
  title: string;
  brief: string;
  cover: string;
  slug: string;
}

export interface IProject {
  _id: string;
  title: string;
  slug: string;
  brief: string;
  cover: string;
  type: string;
  frontend: {
    technologies: string[];
    deploymentLink: string;
    github: string;
  };
  backend: {
    technologies: string[];
    deploymentLink: string;
    github: string;
  };
}
