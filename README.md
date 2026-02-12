# Email OTP Session App

## Setup Instructions

### 1️⃣ Prerequisites

Make sure you have the following installed:

* Node.js (v18+ recommended)
* npm or yarn
* Android Studio (for Android emulator) OR a physical Android device with USB debugging enabled
* Expo CLI

---

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/saju7946/EMAIL-OTP-SESSION.git
cd EMAIL-OTP-SESSION
```

---

### 3️⃣ Install Dependencies

```bash
npm install
```

---

### 4️⃣ Run in Development Mode

Start the Expo development server:

```bash
npm start
```

Then:

* Press `a` to open in Android emulator
  OR
* Scan the QR code using the Expo Go app on your device

---

## Building Release APK (Local)

If building locally using Gradle:

```bash
npx expo prebuild
cd android
./gradlew assembleRelease
```

Generated APK will be available at:

```
android/app/build/outputs/apk/release/app-release.apk
```
