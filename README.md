# CFAch6MyFlixAngularClient

Visit [HERE](https://andersontsaitw.github.io/CF_Ach6_myFlix-Angular-client/welcome) to see the webpage!  
  
This project is the client-side application for the **myFlix** movie app, developed using [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8. It connects to the existing myFlix server-side (REST API and database) to provide a responsive, single-page application for users to explore movies, directors, and genres.

## Objective

The goal of this project is to build an Angular-based client-side interface for the **myFlix** app, supporting functionality like user authentication, browsing movies, and managing user profiles. It showcases Angular development skills and includes comprehensive documentation using TypeDoc and JSDoc.

## Key Features

- **Welcome View**: Users can register or log in.  
  <img src="https://github.com/user-attachments/assets/ef883ca4-3096-4719-8563-eada5607be01" width="65%" alt="Welcome View">

- **Movie Catalog**: Displays a list of all movies for authenticated users.  
  <img src="https://github.com/user-attachments/assets/5761a102-5972-4caa-b512-1e2e1f79e200" width="65%" alt="Movie Catalog">

- **Single Movie View**:
  - Provides details about a selected movie.
  - Links to the **Director View** and **Genre View** for additional information.  
  <img src="https://github.com/user-attachments/assets/48a0e99b-0257-4ca7-9218-b37016412d46" width="65%" alt="Single Movie View">

- **User Profile**:
  - Allows users to view and update their profile.
  - Enables users to manage the list of their favorite movies.  
  <img src="https://github.com/user-attachments/assets/cbe060a8-b7e4-4103-92a8-2bb805bd878c" width="65%" alt="User Profile">


## Development Server

Run `ng serve` for a development server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Technical Details

- **Framework**: Angular (version 18.2.9)
- **UI Library**: Angular Material (version 18.2.10)
- **Backend**: RESTful API (Node.js + MongoDB)
- **SSR (Server-Side Rendering)**: Angular Universal with Express
- **Build Tool**: Angular CLI (version 18.2.10)
- **Reactive Programming**: RxJS (~7.8.0)
- **Documentation**: TypeDoc
- **Testing Tools**:
  - Unit Testing: Jasmine and Karma
  - End-to-End Testing: Protractor or equivalent framework
- **Hosting**: GitHub Pages (using `angular-cli-ghpages`)

## Why This Project?

The **myFlix** app demonstrates proficiency in building responsive, single-page applications using Angular, a crucial skill for modern web developers. It also highlights the importance of clear and concise documentation to facilitate collaboration and technical handoffs.
