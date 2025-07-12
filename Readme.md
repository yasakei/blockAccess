# BlockAccess

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

BlockAccess is a powerful and easy-to-use React library for controlling content access based on user geolocation and VPN/proxy status. It provides a flexible way to protect your content by allowing or blocking users from specific countries.

>[!WARNING]
> This version might contain unexpected behaviors.

>[!IMPORTANT]
> Untested Version (4.0_Alpha) 

## Features

- **Geolocation-based Access Control:** Restrict or grant access to users based on their country.
- **VPN/Proxy Detection:** Detect and block users who are using VPNs or proxies.
- **Flexible Configuration:** Configure access rules using a simple JSON file.
- **Easy to Integrate:** Provides a React component (`AccessControlGate`) and a hook (`useAccessControl`) for seamless integration into your React application.
- **Customizable UI:** Easily customize the loading and blocked access pages.

## Installation

```bash
npm install github:yasakei/blockAccess#react
```

## Usage

### `AccessControlGate` Component

The `AccessControlGate` component is the easiest way to protect your content. Wrap the content you want to protect with this component, and it will handle the access control logic automatically.

```jsx
import React from 'react';
import { AccessControlGate } from 'blockaccess';

function App() {
  return (
    <div>
      <h1>My Awesome App</h1>
      <AccessControlGate>
        {/* This content will be protected */}
        <p>This is a secret message for authorized users only.</p>
      </AccessControlGate>
    </div>
  );
}

export default App;
```

### `useAccessControl` Hook

For more advanced use cases, you can use the `useAccessControl` hook to get the access control state and build your own custom logic.

```jsx
import React from 'react';
import { useAccessControl } from 'blockaccess';

function MyProtectedComponent() {
  const { isLoading, isGranted, statusInfo } = useAccessControl();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isGranted) {
    return <div>Welcome! You have access.</div>;
  }

  return (
    <div>
      <h2>{statusInfo.title}</h2>
      <p>{statusInfo.message}</p>
    </div>
  );
}
```

## Configuration

BlockAccess uses a JSON file to configure the access rules. By default, it looks for a file named `access.json` in your public directory. You can customize the path to this file using the `configPath` prop on the `AccessControlGate` component or in the `useAccessControl` hook.

Here is an example of an `access.json` file:

```json
{
  "allow_vpn": false,
  "only": ["United States", "Canada"],
  "block": [],
  "allow": []
}
```

- **`allow_vpn`**: (boolean) If `false`, users with VPNs or proxies will be blocked.
- **`only`**: (string[]) An array of countries that are exclusively allowed access. If this array is not empty, only users from these countries will be granted access.
- **`block`**: (string[]) An array of countries that will be blocked.
- **`allow`**: (string[]) An array of countries that will be allowed. If the `only` array is empty, you can use this to create a whitelist of allowed countries.

## `AccessControlGate` Props

| Prop               | Type     | Default          | Description                                                                                             |
| ------------------ | -------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| `children`         | `node`   | **required**     | The content to be protected.                                                                            |
| `configPath`       | `string` | `'/access.json'` | The path to the access control configuration file.                                                      |
| `loadingComponent` | `node`   | `null`           | A custom React component to display while the access check is in progress.                              |
| `blockedComponent` | `node`   | `null`           | A custom React component to display when access is denied. It will receive `statusInfo` as a prop.      |

## `useAccessControl` Return Values

The `useAccessControl` hook returns an object with the following properties:

| Key         | Type      | Description                                                                                                |
| ----------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| `isLoading` | `boolean` | `true` if the access check is in progress, otherwise `false`.                                              |
| `isGranted` | `boolean` | `true` if access is granted, otherwise `false`.                                                            |
| `statusInfo`| `object`  | An object containing information about the access status (e.g., title, message). This is `null` on loading. |


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
