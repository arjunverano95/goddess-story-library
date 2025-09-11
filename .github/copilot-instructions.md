# Goddess Story Library

Goddess Story Library is a modern, cross-platform mobile and web application for viewing and managing Goddess Story Library (GSL) cards and other anime card collections. Built with React Native 0.79.5, Expo SDK 53, and TypeScript 5.8.3, featuring responsive card galleries, advanced filtering, and seamless cross-platform experience.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites & Environment Setup
- Install Node.js 18+ (recommended: latest LTS version)
- Install Expo CLI globally:
  ```bash
  npm install -g @expo/cli
  ```
- For mobile development:
  - Android: Android Studio with Android SDK
  - iOS: Xcode (macOS only)

### Bootstrap and Build Process
- Install dependencies:
  ```bash
  yarn install
  # or
  npm install
  ```
  - Takes 10-30 seconds normally. NEVER CANCEL. Set timeout to 5+ minutes for network-restricted environments.

- Start development server:
  ```bash
  yarn start
  # or
  npm start
  ```
  - Starts Expo development server with tunnel mode
  - Runs on http://localhost:8081 (Metro bundler)
  - Web version available at http://localhost:8081

- Build for production:
  ```bash
  # Web build
  yarn predeploy
  # or
  npm run predeploy
  ```
  - Creates static web build in `dist/` directory
  - Uses Expo export with web platform

### Development Workflow
- Start development server:
  ```bash
  yarn start
  ```
  - Starts in 3-5 seconds and runs on http://localhost:8081
  - Uses Metro bundler for React Native development
  - Supports hot reloading and fast refresh

- Run on specific platforms:
  ```bash
  # Android
  yarn android
  # or
  npm run android

  # iOS
  yarn ios
  # or
  npm run ios

  # Web
  yarn web
  # or
  npm run web
  ```

- Run linting:
  ```bash
  yarn lint
  # or
  npm run lint
  ```
  - Takes 3-5 seconds. NEVER CANCEL. Set timeout to 2+ minutes.

- Run formatting:
  ```bash
  yarn format
  # or
  npm run format
  ```
  - Takes 2-5 seconds. NEVER CANCEL. Set timeout to 2+ minutes.

- Deploy to GitHub Pages:
  ```bash
  yarn deploy
  # or
  npm run deploy
  ```
  - Builds and deploys to GitHub Pages
  - Live at: https://arjunverano95.github.io/goddess-story-library

## Validation

### Required Validation Steps
- ALWAYS run through these validation steps after making any changes:
  1. `yarn lint` - Ensure code style compliance
  2. `yarn format` - Verify formatting is correct
  3. `yarn start` - Start development server and verify it loads
  4. Test on web: Visit http://localhost:8081 to ensure the application loads
  5. Test mobile: Use Expo Go app to scan QR code for mobile testing

### Manual Testing Scenarios
- Test card gallery functionality with different screen sizes
- Verify filtering and search functionality works correctly
- Test offline mode when network is unavailable
- Verify responsive design on mobile, tablet, and desktop
- Test card detail views and image loading
- Verify navigation between different collections (GSL, Senpai Goddess Haven)

### Critical Build Requirements
- NEVER CANCEL builds or long-running commands - build processes may take 5+ minutes in some environments
- Always set explicit timeouts of 5+ minutes for build commands
- Always set explicit timeouts of 2+ minutes for lint and format commands
- Web builds require `dist/` directory to be clean before building

## Common Tasks

### Card Collection Management
The app supports multiple card collections:
- **Goddess Story Library (GSL)**: Main collection (`goddess-story`)
- **Senpai Goddess Haven (SGH)**: Secondary collection (`senpai-goddess-haven`)
- Collections are defined in `src/constants/cardListing.ts`
- Each collection has its own API endpoints and data structure

### API Development
- API client is in `src/services/api.ts`
- Uses Axios for HTTP requests
- Base URL configured in `src/constants/variables.ts`
- Supports filtering, pagination, and search
- Key endpoints: `/cards`, `/series`, `/rarity`, `/set`

### Data Model
```typescript
interface GSLCard {
  ID: string;
  Code: string;
  SetNumber: string;
  CardNumber: string;
  CharacterName: string;
  SeriesName: string;
  Rarity: string;
  ImageUrl: string;
  HasImage: string;
}
```

### UI Components
- **SetList**: Main card gallery with filtering and search
- **CardDetails**: Full-screen card view with image display
- **FilterForm**: Advanced filtering interface
- **Gallery**: Responsive grid layout for cards
- **Header**: Navigation and app header
- **BaseScreen**: Main screen layout wrapper

### Technology Stack
- **Frontend**: React Native 0.79.5 + Expo SDK 53
- **Navigation**: Expo Router with typed routes
- **State Management**: SWR for data fetching and caching
- **UI Components**: React Native Elements (RNUI)
- **Styling**: React Native StyleSheet with custom design system
- **Build System**: EAS Build for mobile, Metro for web
- **TypeScript**: 5.8.3 with strict type checking
- **Linting**: ESLint with Expo configuration
- **Formatting**: Prettier

### Project Structure
```
goddess_story_library/
├── app/                    # Expo Router app directory
│   ├── _layout.tsx        # Root layout with drawer navigation
│   ├── index.tsx          # Main GSL collection page
│   ├── senpai-goddess-haven.tsx  # SGH collection page
│   └── +not-found.tsx     # 404 page
├── src/
│   ├── components/        # React components
│   │   ├── SetList/       # Card gallery and filtering
│   │   ├── Header/        # Navigation components
│   │   └── BaseScreen/    # Layout components
│   ├── hooks/             # Custom React hooks
│   ├── models/            # TypeScript interfaces
│   ├── services/          # API and data services
│   ├── constants/         # Design system constants
│   └── utils/             # Utility functions
├── assets/                # Static assets (images, fonts)
├── dist/                  # Web build output
└── public/                # Public web assets
```

### Cross-Platform Development
- **Mobile**: Native iOS and Android apps via EAS Build
- **Web**: Progressive Web App with static export
- **Responsive**: Adaptive layouts for all screen sizes
- **Offline**: Network status detection and offline screens

### EAS Build Configuration
- **Development**: Development client builds
- **Preview**: Internal distribution APK builds
- **Production**: App store ready builds with auto-increment
- Configuration in `eas.json`

### Known Limitations
- Web builds require clean `dist/` directory
- Some React Native features may not work on web
- Image loading depends on external API availability
- Offline mode shows placeholder screen when no network

### Troubleshooting
- If `yarn start` fails, clear Metro cache: `yarn start --clear`
- If web build fails, ensure `dist/` directory is clean
- If mobile builds fail, check EAS CLI is installed and authenticated
- Always check network connectivity for API-dependent features
- Verify Expo CLI version compatibility

## Time Expectations
- Dependency installation: 10-30 seconds (2+ minutes with network issues)
- Linting: 3-5 seconds
- Formatting: 2-5 seconds
- Development server startup: 3-5 seconds
- Web build process: 30-60 seconds
- Mobile builds: 5-15 minutes (via EAS Build)

Remember: NEVER CANCEL any build, lint, format, or installation command. Always wait for completion or use appropriate timeouts.