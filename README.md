# User Management System

A full-stack mobile user management application built with:

- **Frontend:** Ionic Angular + Capacitor
- **Backend:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Mobile Platforms:**
  - iOS Simulator / Physical iPhone using Xcode
  - Android Emulator using Android Studio

---

# Project Structure

```
user-management/
│
├── backend/              # NestJS API
│
├── ui/                   # Ionic Angular Application
│
├── docker-compose.yml    # PostgreSQL container
│
└── README.md
```

---

# 1. Clone Repository

```bash
git clone https://github.com/Abed-Taha/mob-user-management.git

cd mob-user-management
```

---

# 2. Backend Setup (NestJS)

Go to backend folder:

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

---

## Database Setup (PostgreSQL)

The project uses PostgreSQL.

### Using Docker

From the project root:

```bash
docker compose up -d
```


Check database container:

```bash
docker ps
```

---

## Environment Variables

Create a `.env` file inside:

```
backend/.env
```

Example:

```env
HOST=0.0.0.0
PORT=8000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=devUser
DB_PASSWORD=devUser123
DB_NAME=user_management

```

---

## Run Backend

Development mode:

```bash
npm run start:dev
```

Backend will run on you ip addres:

```
http://192.168.10.73:8000
```

---

# 3. Frontend Setup (Ionic Angular)

Open another terminal.

Go to UI folder:

```bash
cd ui
```

---

## Install Dependencies

```bash
npm install
```

---

## Run in Browser

```bash
ionic serve --host 0.0.0.0 --port 4200
```

Application will run on:

```
http://192.168.10.73:4200
```

---

# 4. Capacitor Setup

Capacitor allows the Ionic application to run as a native mobile application.

## Build Ionic Application

```bash
ionic build
```

---

## Add iOS Platform

Install iOS:

```bash
npm install @capacitor/ios
```

Add iOS project:

```bash
npx cap add ios
```

---

## Add Android Platform

Install Android:

```bash
npm install @capacitor/android
```

Add Android project:

```bash
npx cap add android
```

---

# 5. Capacitor Sync

After any frontend changes:

```bash
ionic build
```

Sync native projects:

```bash
npx cap sync
```

Specific platform:

### iOS

```bash
npx cap sync ios
```

### Android

```bash
npx cap sync android
```

---

# 6. iOS Setup (Xcode)

## Requirements

Install:

- macOS
- Xcode
- iOS Simulator

---

## Open iOS Project

```bash
npx cap open ios
```

or:

```bash
ionic cap open ios
```

---

## Run on iOS Simulator

In Xcode:

1. Select a simulator device:

Example:

```
iPhone 17 Simulator
```

2. Press:

```
Run ▶
```

---

## Run on Physical iPhone

Requirements:

- iPhone connected by USB
- Developer Mode enabled
- Apple ID configured in Xcode

Steps:

1. Open project:

```bash
npx cap open ios
```

2. Select your iPhone.

3. Configure:

```
Xcode
 → Project
 → Signing & Capabilities
 → Team
```

4. Press:

```
Run ▶
```

---

# 7. Android Setup (Android Studio)

## Requirements

Install:

- Android Studio
- Android SDK
- Android Emulator

---

## Open Android Project

```bash
npx cap open android
```

---

## Create Android Emulator

In Android Studio:

```
More Actions
    ↓
Virtual Device Manager
    ↓
Create Device
```

Select a device:

Example:

```
Pixel Device
```

Choose Android version and finish.

---

## Run Android Application

1. Start emulator.
2. Select emulator device.
3. Press:

```
Run ▶
```

---

# 8. API Configuration

## Browser Development

Use:

```ts
apiUrl: 'http://192.168.10.73:8000'
```

---

## Android Emulator

Use:

```ts
apiUrl: 'http://192.168.10.73:8000'
```

---

## Physical Device

Use your machine IP:

Example:

```ts
apiUrl: 'http://192.168.x.x:8000'
```

Make sure:

- Phone and computer are on the same network.
- Backend listens on all interfaces.

NestJS:

```ts
await app.listen(8000, '0.0.0.0');
```

---

# 9. Android HTTP Configuration

Because Capacitor runs using:

```
https://localhost
```

and the backend uses:

```
http://192.168.x.x:8000
```

Android may block mixed content.

Enable it in:

```
ui/capacitor.config.ts
```

Add:

```ts
android:{
    allowMixedContent:true
}
```

Then:

```bash
ionic build

npx cap sync android
```

---

# 10. Useful Commands

## Ionic

Start development server:

```bash
ionic serve
```

Build:

```bash
ionic build
```
dev ios:
```bash
ionic cap run ios -l --external
```
---

## Capacitor

Open iOS:

```bash
npx cap open ios
```

Open Android:

```bash
npx cap open android
```

Sync:

```bash
npx cap sync
```

---

## Check Devices

### Android

```bash
adb devices
```

### iOS

```bash
xcrun xctrace list devices
```

---

# Technologies Used

## Frontend

- Ionic Angular
- Angular
- Capacitor
- TypeScript
- RxJS


## Backend

- NestJS
- TypeORM
- PostgreSQL
- REST API


## Mobile

- Xcode
- iOS Simulator
- Android Studio
- Android Emulator
