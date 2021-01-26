# Cài đặt Android Linux

- Java JDK

```bash
sudo apt-get install openjdk-8-jdk
sudo update-alternatives --config java
sudo update-alternatives --config javac
```

- Download Android SDK

Command line tools only
https://developer.android.com/studio#downloads

Platform tools
https://developer.android.com/studio/releases/platform-tools

Tạo folder chứa hai package tên `cmdline-tools`

- Cài đặt môi trường

```bash
export ANDROID_HOME=$HOME/Android/cmdline-tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

- Liceses Andoird SDK

```bash
sdkmanager --licenses
```

Sau đó vào folder Android copy folder tên linceses vào folder cmdline-tools
