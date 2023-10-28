# @keyur-gondaliya/3d-sun

3D Sun is a React component that renders an interactive 3D representation of the sun. You can also provide custom as per needed. It is Three.js Based package so make sure you have it installed already.

## Installation

```bash
npm install @keyur-gondaliya/3d-sun three
```

## Usage

```bash
import React from 'react';
import ThreeDimensionalSun from '@keyur-gondaliya/3d-sun';

const YourComponent = () => {
  return (
    <div>
      <ThreeDimensionalSun
        backgroundImage="URL_TO_YOUR_BACKGROUND_IMAGE"
        sunUVLayoutImage="URL_TO_YOUR_SUN_UV_IMAGE"
        sunTextureImage="URL_TO_YOUR_SUN_TEXTURE_IMAGE"
        disableBackground={false}
        starCount={1000}
        rotationSpeed={0.004}
        orbitColor={0xff0000}
      />
    </div>
  );
};

export default YourComponent;
```

## Props

```bash
backgroundImage (string)
URL for the background image.

sunUVLayoutImage (string)
URL for the sun's UV layout image.

sunTextureImage (string)
URL for the sun's texture image.

disableBackground (boolean)
Default: false
Set to true to disable the background.

starCount (number)
Range: 0 to 100000
Number of stars to be displayed.

rotationSpeed (number)
Range: 0 to 1
Speed of the sun's rotation.

orbitColor (number)
Color input in the hexadecimal format. Example: 0xff0000 (Red)
```

## Example

```bash
<ThreeDimensionalSun
  backgroundImage="https://example.com/background.jpg"
  sunUVLayoutImage="https://example.com/uvlayout.jpg"
  sunTextureImage="https://example.com/suntexture.jpg"
  disableBackground={false}
  starCount={1000}
  rotationSpeed={0.004}
  orbitColor={0xff0000}
/>
```

Make sure to provide valid image URLs for backgroundImage, sunUVLayoutImage, and sunTextureImage.

For further customization and functionality, explore the props and their expected values.

### Happy coding!
