# Portfolio - Dashboard

A secure admin dashboard for managing portfolio content.

## Features

- **✅ Project Management**

  - Create, edit, delete projects
  - Add details like title, slug, brief, description, tech stack, GitHub links, deployment link, cover image & gallery

- **✅ Blog Management**

  - Create, edit, delete blogs
  - Add blog title, cover, brief, published date, read time, and content

- **✅ Skill Management**

  - Add, update, or remove skills
  - Categorize skills (e.g., frontend, backend, tools)

- **✅ Experience Management**

  - Add, update, or remove experiences
  - Define title, company, duration, description, and responsibilities

- **✅ Message Viewer**
  - View all messages submitted from the contact form
  - See sender name, email, message body, and submission timestamp

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
   git clone https://github.com/RittikaDev/portfolio-dashboard
   cd portfolio
   ```

- **Install the dependencies**:

  ```bash
  npm install
  ```

- **Create a `.env` file in the root directory of the project with the following environment variables**:

  ```env
  NEXT_PUBLIC_API_BASE_UR=
  ```

- **Start the development server**:

  ```bash
  npm run dev
  ```

- **Visit** `http://localhost:3000` **in your browser to see the portfolio**.
