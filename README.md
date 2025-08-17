# <img src="https://i.imgur.com/jDzaMrZ.png" alt="icon" width="25"/> Goddess Story Library

A modern, cross-platform mobile and web application for viewing and managing Goddess Story Library (GSL) cards and other anime card collections. Built with React Native and Expo for seamless cross-platform experience.

<img src="https://i.imgur.com/nktRR4F.jpg" alt="img1" width="200"/> <img src="https://i.imgur.com/UHT7my3.jpg" alt="img2" width="200"/> <img src="https://i.imgur.com/kmYG7sb.jpg" alt="img3" width="200"/>

## ✨ Features

### Core Functionality

- **Card Gallery**: Responsive grid layout with adaptive column sizing for different screen sizes
- **Advanced Filtering**: Multi-select filters for Set Number, Rarity, and Series
- **Search & Filter**: Real-time character name search with instant results
- **Sorting Options**: Ascending/descending sorting by Set Number, Rarity, and Card Number
- **Card Details**: Full-screen card view with high-resolution images
- **Web Integration**: Built-in web search for cards without available images

### Card Collections

- **Goddess Story Library (GSL)**: Complete collection of GSL cards
- **Senpai Goddess Haven**: Dedicated collection viewer
- **Non-GSL Sets**: Support for various anime card collections
- **Raw Data Support**: JSON-based card data management

### Technical Features

- **Cross-Platform**: Native iOS, Android, and Web support
- **Responsive Design**: Adaptive layouts for mobile, tablet, and desktop
- **Offline Capable**: Local data storage with SWR for efficient data fetching
- **Modern UI**: Smooth animations, haptic feedback, and modern design patterns
- **TypeScript**: Full type safety and modern development experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/arjunverano95/goddess-story-library.git
   cd goddess-story-library
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

### Development Commands

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Lint code
npm run lint

# Format code
npm run format

# Deploy to GitHub Pages
npm run deploy
```

## 📱 Platform Support

### Mobile Apps

- **Android**: APK builds available via EAS Build
- **iOS**: Native iOS app with tablet support
- **Cross-Platform**: Single codebase for both platforms

### Web Application

- **Progressive Web App**: Modern web experience
- **Responsive Design**: Optimized for all device sizes
- **GitHub Pages**: Hosted at [goddess-story-library](https://arjunverano95.github.io/goddess-story-library)

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React Native 0.79.5 + Expo SDK 53
- **Navigation**: Expo Router with typed routes
- **State Management**: SWR for data fetching and caching
- **UI Components**: React Native Elements (RNUI)
- **Styling**: React Native StyleSheet with custom design system
- **Build System**: EAS Build for mobile, Metro for web

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SetList/        # Card gallery and filtering
│   ├── Header/         # Navigation and app header
│   └── BaseScreen/     # Main screen layout
├── hooks/              # Custom React hooks
├── models/             # TypeScript interfaces
├── services/           # API and data services
└── constants/          # Design system constants
```

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

## 📊 Data Sources

The app includes comprehensive card collections:

- **GSL Cards**: Complete Goddess Story Library collection
- **Senpai Goddess Haven**: Dedicated anime collection
- **Community Sets**: Various anime and gaming card sets
- **Raw Data**: JSON files for easy data management and updates

## 🔧 Configuration

### Environment Setup

- **Expo Configuration**: Configured in `app.json`
- **EAS Build**: Production builds via EAS
- **GitHub Pages**: Web deployment configuration
- **TypeScript**: Strict type checking enabled

### Build Configuration

- **Android**: Edge-to-edge display, adaptive icons
- **iOS**: Tablet support, automatic interface styling
- **Web**: Static export with custom bundler configuration

## 📥 Download

### Mobile Apps

- **Android**: [Google Drive APK](https://drive.google.com/file/d/1jSvF128oKd4pizkIhjIpiZFEoBw7kRCB/view)
- **iOS**: Available via App Store (coming soon)

### Web Application

- **Live Demo**: [Goddess Story Library](https://arjunverano95.github.io/goddess-story-library)

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:

- Code style and standards
- Pull request process
- Issue reporting
- Feature requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Waifu Card Community**: [Discord Server](https://discord.gg/waifucard)
- **Goddess Story Cards PH**: [Facebook Group](https://www.facebook.com/groups/768146134112112)
- **Expo Team**: For the amazing cross-platform development framework
- **React Native Community**: For the robust mobile development ecosystem

---

**Built with ❤️ using React Native & Expo**
