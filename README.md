# Portfolio Frontend

This is a personal project portfolio built using Next.Js mainly. It showcases various projects, with a focus on providing a smooth and interactive user experience through UI components and dynamic content loading.

## Features

- **Project Showcase**: Each project includes a title, description, links to GitHub repositories (frontend & backend), deployment links, and a list of technologies used.
- **Responsive Design**: The portfolio is responsive and works across different screen sizes, ensuring a great user experience on both mobile and desktop devices.
- **Image Gallery**: An interactive image gallery displays snapshots of each project.
- **Shiny Button**: A shiny, animated button that allows users to download your resume.
- **Animated Title & Content**: Titles and content come to life with animated effects.
- **Tech Stack Information**: The portfolio dynamically shows the frontend and backend tech stack used for each project.
- **Background Image**: The header section includes a background image with a low opacity effect, providing a visually appealing look.

## Technologies Used

### Frontend:

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide**: Icon library for modern and lightweight icons.
- **Next.js**: Framework for server-side rendering and static site generation.
- **Shiny Button**: Custom component with an animated shiny effect.
- **TypeScript**: For type safety and better development experience.

## Installation

To run the portfolio locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/RittikaDev/portfolio-nextjs-frontend
   cd portfolio
   ```

- **Install the dependencies**:

  ```bash
  npm install
  ```

- **Create a `.env` file in the root directory of the project with the following environment variables**:

  ```env
  GITHUB_ID=
  GITHUB_SECRET=
  GOOGLE_ID=
  GOOGLE_SECRET=
  NEXTAUTH_SECRET=
  API_BASE_URL=
  ```

- **Start the development server**:

  ```bash
  npm run dev
  ```

- **Visit** `http://localhost:3000` **in your browser to see the portfolio**.
