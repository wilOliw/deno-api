const ColorSchemes = new Map();

ColorSchemes.set("dark", {
  bgColor: "#555",
  textColor: "#eee",
  bulbColor: "lightcoral",
}).set("light", {
  bgColor: "lightcoral",
  textColor: "#eee",
  bulbColor: "green",
}).set("cucumber", {
  bgColor: "green",
  textColor: "yellow",
  bulbColor: "tomato",
}).set("tomato", {
  bgColor: "tomato",
  textColor: "#fff",
  bulbColor: "#555",
});

const SchemeStepMap = function () {
  const schemeNames = Array.from(ColorSchemes).map((arr) => arr[0]);
  const result = {};
  for (const i in schemeNames) {
    const name = schemeNames[i];
    const notLast = i < schemeNames.length - 1;
    result[name] = schemeNames[notLast ? (+i + 1) : 0];
  }
  return result;
}();

const preferredName = function () {
  const storageName = localStorage.getItem("preferred-color-scheme") || "";
  let queryName = "";
  if (/scheme=/.test(location.search)) {
    queryName = location.search.split("scheme=")[1].split("&")[0];
  }
  return queryName || storageName || "light";
}();

const curSchemeName = () => document.body.getAttribute("color-scheme");
const newSchemeName = () => SchemeStepMap[curSchemeName()];

function toggleColorScheme(extraName) {
  const name = extraName || newSchemeName();
  if (!ColorSchemes.has(name)) {
    return;
  }
  const scheme = ColorSchemes.get(name);
  document.body.setAttribute("color-scheme", name);
  localStorage.setItem("preferred-color-scheme", name);
  document.body.setAttribute(
    "style",
    [
      "background-color:" + scheme.bgColor,
      "--text-color:" + scheme.textColor,
      "--bulb-color:" + scheme.bulbColor,
    ].join("; "),
  );
}

toggleColorScheme(preferredName);
