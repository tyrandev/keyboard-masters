const darkBlueThemeChanger = document.querySelector("#dark-blue-theme-changer");
const darkRedThemeChanger = document.querySelector("#dark-red-theme-changer");
const darkGreyThemeChanger = document.querySelector("#dark-grey-theme-changer");
const lightBlueThemeChanger = document.querySelector(
  "#light-blue-theme-changer"
);
const lightPinkThemeChanger = document.querySelector(
  "#light-pink-theme-changer"
);
const lightVioletThemeChanger = document.querySelector(
  "#light-violet-theme-changer"
);

darkBlueThemeChanger.addEventListener("click", () => {
  setTheme("dark-blue-theme");
  location.reload();
});

darkRedThemeChanger.addEventListener("click", () => {
  setTheme("dark-red-theme");
  location.reload();
});

darkGreyThemeChanger.addEventListener("click", () => {
  setTheme("default");
  location.reload();
});

lightBlueThemeChanger.addEventListener("click", () => {
  setTheme("light-blue-theme");
  location.reload();
});

lightPinkThemeChanger.addEventListener("click", () => {
  setTheme("light-pink-theme");
  location.reload();
});

lightVioletThemeChanger.addEventListener("click", () => {
  setTheme("light-violet-theme");
  location.reload();
});
