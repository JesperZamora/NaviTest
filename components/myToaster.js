import Toast from 'react-native-root-toast'

export const myToast = (message, bgColor) => {
  let toast = Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    backgroundColor: bgColor,
    shadow: false,
    textColor: "#fff",
    animation: true,
    hideOnPress: true,
    delay: 400,
    opacity: 0.99
  });

  setTimeout(function hideToast() {
    Toast.hide(toast);
  }, 2400);
}