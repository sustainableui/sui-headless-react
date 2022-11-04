# SUI Headless for React

Library providing set of base primitives for building carbon aware UIs to your React application.

## Installation

### NPM

```sh
npm install @sustainableui/sui-headless-react
```

### Yarn

```sh
yarn add @sustainableui/sui-headless-react
```

## Getting started with SUI Headless

1. Wrap root element of your application with `SuiProvider`

```jsx
import React from 'react'
import { SuiProvider } from '@sustainableui/sui-headless-react';

function App() {
  return (
    <SuiProvider>
      {/* { ...  } */}
    </SuiProvider>
  )
}
```

2. Provide required props to `SuiProvider`

   - `api: string` 
     - API endpoint that accepts `lat` and `lon` as parameters for user coordinates
     - returns grid carbon intensity in gCO2e/kWh as type `object` with `value: number` and `measurementRegion: string`
   - `LoaderComponent: React.FC<Record<string, unknown> & { onLocalizationCancel: () => void }>;`
     - rendered on a page load when user location with grid carbon intensity is being loaded
     - `onLocalizationCancel` handler that shall be called when the user desires to load the application instantly and use it in a fallback display mode
   - `SwitchComponent: React.FC<Record<string, unknown> & { gridCarbonIntensity: SuiGridCarbonIntensity; recommendedDisplayMode: SuiDisplayModes; displayMode: SuiDisplayModes; onDisplayModeSelect: (displayMode: SuiDisplayModes) => void; }`
     - rendered after loading is complete, allowing the user to change display mode of the application
       - `gridCarbonIntensity` - type `object` with `value: number` and `measurementRegion: string`
         - we suggest to display this information to the user
       - `recommendedDisplayMode` - best display mode for a given user location
         - we suggest to nudge the user to use this display mode
       - `displayMode` - currently selected display mode
       - `onDisplayModeSelect` - handler that shall be called when the user desires to change display mode

3. Use `withSui` higher-order component (HOC) as a Graceful Degradation Function to provide automatic graceful degradation to your component
   - accepts an array of components
   - first component in the list is rendered when display mode is set to low, meaning grid carbon intensity is high at a user location, and vice-versa
```jsx
import React from 'react'
import { withSui } from '@sustainableui/sui-headless-react';

const LowCarbonComponent = React.lazy(() => import('./sui/LowCarbonComponent'))

const ModerateCarbonComponent = React.lazy(() => import('./sui/ModerateCarbonComponent'))

const HighCarbonComponent = React.lazy(() => import('./sui/HighCarbonComponent'))

export default withSui([LowCarbonComponent, ModerateCarbonComponent, HighCarbonComponent])
```

## Examples

- POC implementation of Carbon Aware UI primitives for React - Carbon Hack 22 demo
  - NextJS, MUI, Vercel
  - [https://github.com/sustainableui/ch22-sui-headless-react-demo](https://github.com/sustainableui/ch22-sui-headless-react-demo)
