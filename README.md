# ClickNurse Frontend challenge

## Objective

Develop an application that allows users to:

- List Available Shifts: View a list of shifts including basic information such as the company name, job title, date, location, and remuneration.
- View Shift Details: Click on a shift to be redirected to a detail page showing additional information like a service description, work schedule, requirements, and benefits.
- Apply for a Shift: Submit an application by clicking the "Candidatar-se" button, with feedback provided to indicate a successful or unsuccessful submission.

## Features

- Shift Listing: Display a list of available shifts with essential details.
- Shift Details: Provide a dedicated page with comprehensive information about each shift.
- Application Process: Allow users to apply for a shift and receive immediate feedback on their application.
- Responsive Design: Ensure a mobile-friendly experience for users on different devices.

## Technical Overview

This project is built with modern web technologies:

- **React** - Frontend library for building user interfaces
- **TypeScript** - Static typing for JavaScript
- **Vite** - Next generation frontend tooling
- **shadcn/ui** - High-quality React components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- pnpm (v9 or higher)

### Installation

1. Clone the repository:

```sh
git clone git@github.com:leonardorochaf/click-nurse-challenge.git
```

2. Navigate to the project directory:

```sh
cd click-nurse-challenge
```

3. Install dependencies:

```sh
pnpm install
```

4. Start the development server:

```sh
pnpm dev
```

The application will be available at `http://localhost:8080`

### Building for Production

To create a production build:

```sh
pnpm build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── lib/          # Utility functions and constants
```
