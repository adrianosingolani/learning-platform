# Training Platform Walkthrough

This repository contains a simple employee training platform built with React, Vite, and Express.

## Project Structure
- `client/`: React frontend
- `server/`: Express backend
- `demo/`: Demo videos and screenshots

## Demo Video

The video below shows the complete flow of the application:

![Complete Flow Demo](./demo/complete_flow_demo.webp)

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation

1.  **Clone the repository**
2.  **Install dependencies and start the server:**
    ```bash
    cd server
    npm install
    npm run dev
    ```
3.  **Install dependencies and start the client:**
    ```bash
    cd client
    npm install
    npm run dev
    ```
4.  **Access the application:**
    Open `http://localhost:5173/?token=valid-token-123` in your browser.

## Features
- **Token Verification**: Access is restricted via mock tokens.
- **Content Viewer**: Integrated PDF viewer for training materials.
- **Quiz System**: Multiple-choice questions with real-time grading.
- **Results Tracking**: Final score and pass/fail status.
