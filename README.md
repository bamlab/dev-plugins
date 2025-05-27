# Expo DevTools Plugins

- This is a collection of Expo DevTools Plugins maintained on the BamLab repository
- This repository is a fork from the [expo/dev-plugin](https://github.com/expo/dev-plugins) repository

## Plugins

- `@bam.tech/react-navigation-visualizer-dev-plugin`: Plugin for [React Navigation](https://reactnavigation.org/)

  - Credit: Most code is forked from [@react-navigation/devtools](https://github.com/react-navigation/react-navigation/tree/4797ace/packages/devtools) and the [Flipper plugin frontend](https://github.com/react-navigation/react-navigation/tree/4797ace/packages/flipper-plugin-react-navigation)

- `@dev-plugins/react-native-mmkv`: Plugin for [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)

  - Credit: Originally contributed by [cyrilbo](https://github.com/cyrilbo)

- A lot of other plugins are hosted on the [expo/dev-plugin](https://github.com/expo/dev-plugins) repository

## Example App

The [example app](/apps/example) is an [Expo Router](https://docs.expo.dev/routing/introduction/) app that provides test cases for plugins

- Expo Router is based on React Navigation, so you can just test `@bam.tech/react-navigation-visualizer-dev-plugin` from visiting different screens from the app.
- React Native MMKV screen to explore `@dev-plugins/react-native-mmkv`

### How to run the example app

```sh
$ git clone https://github.com/expo/dev-plugins.git
$ cd dev-plugins
$ cd apps/example
$ bun run ios
$ bun run android
```
