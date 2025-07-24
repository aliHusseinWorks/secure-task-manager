# Secure Task Manager

A simple React Native (Expo) app that demonstrates secure authentication and task management using `expo-secure-store`.

## ✅ Features

- 🔐 Secure login using token storage via `expo-secure-store`
- 🚪 Logout functionality that clears token and state
- 🔄 Persistent authentication across app restarts
- 🛡️ Protected routes with context-based authentication
- 📋 Fetches tasks from a static public API
- 📱 Keyboard handling on iOS & Android for proper input behavior
- 🧪 Modular structure and clean context setup

## 🔧 Tech Stack

- React Native (Expo)
- TypeScript
- Context API for Auth
- `expo-secure-store` for secure token storage
- `@react-native-async-storage/async-storage` for offline caching
- Public API: [JSONPlaceholder Todos](https://jsonplaceholder.typicode.com/todos)

## 🚀 How to Run

1. Clone the repo:

   ```bash
   git clone https://github.com/aliHusseinWorks/secure-task-manager.git
   cd secure-task-manager

   ```

2. Install dependencies:

   npm install or yarn install

3. Start the Expo server:

   npx expo start

4. Use the app:

. On first load, you'll be presented with the login screen.

. You can log in using either of the following methods:

    . Username & password (token is securely stored).

    . Biometric authentication (if supported by device).

. Once logged in, you'll be navigated to the Home screen, where you can:

    - View a list of tasks.

    - Add a task to the list of tasks.

    - Toggle between light and dark themes using the icon in the header.

    - Press Logout icon from the header to:

        * Clear your authentication token.

        * Return to the login screen.

## ✍️ Author

Ali Hussein – GitHub
