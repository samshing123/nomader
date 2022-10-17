# c21-tw-cap-group2

## Folder Structure
```
Backend
├── middleware
│   └── isLoggedInGuard.ts
├── controller
│   ├── userController.ts
│   └── testing
│       └── userController.test.ts
├── service
│   ├── userService.ts
│   └── testing
│       └── userService.test.ts
├── routers
│   ├── signUp.ts
│   └── logIn.ts
├── migrations
├── seeds
├── sql
├── .gitignore
├── env
├── env.example
└── server.ts

Frontend
├── node_modules
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── README.md
├── src
│   ├── api
│   ├── Components
│       └── Login.tsx
│   ├── Redux
│       ├── course
│           ├── actions.ts
│           ├── reducer.ts
│           ├── state.ts
│           └── thunks.ts
│       └── store.ts
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   └── serviceWorker.ts
├── tsconfig.json
└── yarn.lock
```

## Command
```
 yarn init -y
 yarn add ts-node typescript @types/node
 yarn add express @types/express
 yarn add -D ts-node-dev
 yarn add express-session
 yarn add -D @types/express-session
 yarn add formidable @types/formidable
 yarn add winston
 yarn add --save-dev --save-exact prettier
 yarn add pg @types/pg dotenv
 yarn add socket.io
 yarn add bcryptjs @types/bcryptjs
 yarn add grant dotenv @types/dotenv
 yarn add cross-fetch
 yarn add --dev jest
 yarn add --dev typescript ts-jest @types/jest @types/node ts-node ts-node-dev
 yarn ts-jest config:init
 yarn add knex pg @types/pg
 yarn knex init -x ts
 yarn add --dev playwright
 yarn add redis @types/redis
 ```
 
 ### React Command
 ```
 yarn add bootstrap@5
 yarn add react-bootstrap@2
 yarn add redux react-redux @types/react-redux
 yarn add redux-logger @types/redux-logger
 yarn add react-router-dom @types/react-router-dom react-router @types/react-router
 yarn add @reduxjs/toolkit
 yarn add redux-thunk
 yarn add jwt-simple @types/jwt-simple permit @types/permit
 yarn add jwt-decode
 yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
 
 Testing:
 yarn add @testing-library/react @testing-library/jest-dom
 yarn add --dev fetch-mock redux-mock-store @types/fetch-mock @types/redux-mock-store node-fetch@2
 ```

### Format
- File Name: camelCase
- React Component: PascalCase
- Python/SQL : snake_case
