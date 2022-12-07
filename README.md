# FireFuze

A full stack JavaScript application for gamers who want to purchase shooter games.

## Why I Built This

To use all of the skills I have learned in the past 3 months

## Technologies Used

- React.js
- Webpack
- Node.js
- PostgreSQL
- HTML5
- CSS3
- Stripe

## Live Demo

Try the application live at [https://firefuze.quannampham.com/](https://firefuze.quannampham.com/)

## Features

- Users can view home page
- Users can view details of a game
- Users can add a game to cart
- Users can view cart
- Users can go to checkout screen
- Users can fill out checkout form
- Users can successfully checkout

## Preview

![Example](assets/example.gif)

## Development
- Users can search
- Users can sort search
- Users can filter search
- User can receieve email after purchasing

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- Postgresql

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/quannampham/firefuze.git
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Make a copy of .env.example.

   ```shell
   cp .env.example .env
   ```

1. Update the .env file.

    - Update TOKEN_SECRET
    - Update changeMe in DATABASE_URL to firefuze
    - Update STRIPE_SECRET_KEY
    - Update STRIPE_PUBLIC_KEY

1. Start PostgreSQL

   ```shell
   sudo service postgresql start
   ```

1. create the database.

    ```shell
    createdb firefuze
    ```

1. Import the example database.

    ```shell
    npm run db:import
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
