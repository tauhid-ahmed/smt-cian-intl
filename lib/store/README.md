# Redux Store Setup

এই প্রজেক্টে Redux Toolkit ব্যবহার করে state management করা হয়েছে।

## 📁 Structure

```
lib/store/
├── index.ts          # Store configuration
├── hooks.ts          # Typed Redux hooks
├── selectors.ts      # Reusable selectors
└── slices/
    ├── authSlice.ts  # Authentication state
    ├── musicSlice.ts # Music player state
    ├── cartSlice.ts  # Shopping cart state
    └── uiSlice.ts    # UI state (theme, sidebar, etc.)
```

## 🚀 Usage Examples

### 1. Using Hooks in Components

```tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { openSignIn, loginSuccess } from "@/lib/store/slices/authSlice";
import { selectIsAuthenticated, selectUser } from "@/lib/store/selectors";

export default function MyComponent() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  const handleLogin = () => {
    dispatch(openSignIn());
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}
    </div>
  );
}
```

### 2. Using Auth Slice

```tsx
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  openSignIn,
  openSignUp,
  closeAuthModal,
  loginSuccess,
  logout,
} from "@/lib/store/slices/authSlice";
import { selectAuthModal } from "@/lib/store/selectors";

// Open sign in modal
dispatch(openSignIn());

// Open sign up modal
dispatch(openSignUp());

// Close modal
dispatch(closeAuthModal());

// Login user
dispatch(loginSuccess({ id: "1", name: "John", email: "john@example.com" }));

// Logout
dispatch(logout());
```

### 3. Using Music Slice

```tsx
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  openPlayer,
  togglePlay,
  playNext,
  toggleLike,
} from "@/lib/store/slices/musicSlice";
import { selectCurrentTrack, selectIsPlaying } from "@/lib/store/selectors";

const dispatch = useAppDispatch();
const currentTrack = useAppSelector(selectCurrentTrack);
const isPlaying = useAppSelector(selectIsPlaying);

// Open player with track
dispatch(
  openPlayer({
    track: {
      id: "1",
      title: "Song Title",
      artist: "Artist Name",
      url: "/audio/song.mp3",
      artwork: "/images/artwork.jpg",
    },
    playlist: [...tracks],
  })
);

// Toggle play/pause
dispatch(togglePlay());

// Play next track
dispatch(playNext());

// Like/unlike track
dispatch(toggleLike("track-id"));
```

### 4. Using Cart Slice

```tsx
import { useAppDispatch } from "@/lib/store/hooks";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/lib/store/slices/cartSlice";

const dispatch = useAppDispatch();

// Add item to cart
dispatch(
  addToCart({
    id: "product-1",
    name: "Product Name",
    price: 29.99,
    quantity: 1,
    image: "/images/product.jpg",
  })
);

// Update quantity
dispatch(updateQuantity({ id: "product-1", quantity: 3 }));

// Remove from cart
dispatch(removeFromCart("product-1"));

// Clear cart
dispatch(clearCart());
```

### 5. Using UI Slice

```tsx
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setTheme,
  toggleSidebar,
  addNotification,
} from "@/lib/store/slices/uiSlice";
import { selectTheme } from "@/lib/store/selectors";

const dispatch = useAppDispatch();
const theme = useAppSelector(selectTheme);

// Set theme
dispatch(setTheme("dark"));

// Toggle sidebar
dispatch(toggleSidebar());

// Add notification
dispatch(
  addNotification({
    message: "Success!",
    type: "success",
  })
);
```

## 📝 Available Slices

### Auth Slice
- `openSignIn()`, `openSignUp()`, `openForgotPassword()`, `openEmailVerified()`
- `closeAuthModal()`, `switchAuthMode(mode)`
- `loginStart()`, `loginSuccess(user)`, `loginFailure(error)`
- `logout()`, `updateUser(user)`, `clearError()`

### Music Slice
- `openPlayer({ track, playlist? })`, `closePlayer()`
- `togglePlay()`, `playTrack(track)`, `playNext()`, `playPrevious()`
- `setVolume(volume)`, `toggleMute()`
- `setCurrentTime(time)`, `setDuration(duration)`
- `setIsExpanded(expanded)`, `setShowPlaylist(show)`
- `toggleShuffle()`, `toggleRepeat()`, `toggleLike(trackId)`
- `setPlayerMode(mode)`

### Cart Slice
- `addToCart(item)`, `removeFromCart(id)`
- `updateQuantity({ id, quantity })`
- `clearCart()`, `openCart()`, `closeCart()`, `toggleCart()`

### UI Slice
- `setTheme(theme)`, `toggleSidebar()`, `setSidebarOpen(open)`
- `toggleMobileMenu()`, `setMobileMenuOpen(open)`
- `setLoading(loading)`
- `addNotification({ message, type })`, `removeNotification(id)`, `clearNotifications()`

## 🔧 TypeScript Support

সব hooks এবং actions fully typed। TypeScript IntelliSense support আছে।

```tsx
import type { RootState, AppDispatch } from "@/lib/store";
import type { Track } from "@/lib/store/slices/musicSlice";
```

## 📚 Best Practices

1. **Use Selectors**: Always use selectors instead of accessing state directly
2. **Typed Hooks**: Use `useAppDispatch` and `useAppSelector` instead of plain hooks
3. **Action Creators**: Use action creators from slices instead of dispatching plain objects
4. **Component Structure**: Keep Redux logic in components, complex logic in thunks (if needed)

