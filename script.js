const SUPPORTED_LANGUAGES = ["en", "de", "fr", "es", "pt", "ar", "zh"];
const PROJECT_URLS = [
  "https://github.com/Toyor12/cdc-logistics-pipeline",
  "https://github.com/Toyor12/un-agri-commodity-pipeline",
  "https://github.com/Toyor12/gcp-product-review-pipeline",
  "https://github.com/Toyor12/snowflake-finance-mart",
  "https://github.com/Toyor12/healthcare-provider-pipeline",
  "https://github.com/Toyor12/ecommerce-crm-analytics",
  "https://github.com/Toyor12/-ml-pipeline-k8s",
  "https://github.com/Toyor12/Performance-Review-of-Forggith-Pharmaceuticals",
];
const PROJECT_PATHS = [
  "M0 246 C90 232 132 155 210 175 S350 252 430 134 S565 43 650 104 S770 220 900 54",
  "M0 220 C90 190 145 240 220 160 S350 60 430 130 S560 215 650 125 S790 48 900 82",
  "M0 250 C110 240 160 200 245 210 S380 110 470 130 S610 90 700 105 S815 70 900 40",
  "M0 210 C100 160 150 170 235 195 S390 230 470 145 S620 80 690 120 S790 150 900 80",
  "M0 252 C90 240 150 220 225 185 S355 210 450 125 S590 80 680 90 S795 55 900 35",
  "M0 230 C100 210 165 120 245 165 S365 250 450 145 S590 55 675 112 S810 190 900 70",
  "M0 260 C95 180 155 195 230 145 S360 110 450 170 S600 210 680 120 S820 45 900 68",
  "M0 235 C120 235 145 120 240 120 S355 220 455 155 S600 95 690 95 S810 150 900 45",
];

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");
const languageSelect = document.getElementById("languageSelect");
const cursor = document.querySelector(".cursor-orbit");
const signalLabel = document.getElementById("signalLabel");
const signalDetail = document.getElementById("signalDetail");
const satellites = document.querySelectorAll(".satellite");
const tabs = document.querySelectorAll(".system-tab");
const fields = {
  number: document.getElementById("projectNumber"),
  type: document.getElementById("projectType"),
  title: document.getElementById("projectTitle"),
  description: document.getElementById("projectDescription"),
  source: document.getElementById("projectSource"),
  process: document.getElementById("projectProcess"),
  output: document.getElementById("projectOutput"),
  metric: document.getElementById("projectMetric"),
  path: document.getElementById("chartPath"),
  link: document.getElementById("projectLink"),
};

let activeProjectIndex = 0;
let activeSignalKey = null;

function getInitialLanguage() {
  const savedLanguage = localStorage.getItem("portfolioLanguage");
  if (SUPPORTED_LANGUAGES.includes(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = navigator.language.toLowerCase().split("-")[0];
  return SUPPORTED_LANGUAGES.includes(browserLanguage) ? browserLanguage : "en";
}

async function loadResources() {
  const resources = {};

  await Promise.all(
    SUPPORTED_LANGUAGES.map(async (language) => {
      const response = await fetch(`locales/${language}.json`);
      if (!response.ok) {
        throw new Error(`Unable to load locale: ${language}`);
      }
      resources[language] = { translation: await response.json() };
    }),
  );

  return resources;
}

function translateDocument() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = i18next.t(key);

    if (element.dataset.i18nHtml === "true") {
      element.innerHTML = value;
    } else if (element.classList.contains("system-tab")) {
      const number = element.querySelector("span")?.outerHTML ?? "";
      element.innerHTML = `${number}${value}`;
    } else {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute(
      "aria-label",
      i18next.t(element.dataset.i18nAriaLabel),
    );
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.setAttribute("alt", i18next.t(element.dataset.i18nAlt));
  });
}

function updateDirection(language) {
  const isRtl = language === "ar";
  document.documentElement.lang = language;
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", isRtl);
}

function loadProject(index) {
  const project = i18next.t(`projects.${index}`, { returnObjects: true });
  activeProjectIndex = index;

  tabs.forEach((tab, tabIndex) => {
    tab.classList.toggle("active", tabIndex === index);
  });

  fields.number.textContent = i18next.t("systems.systemLabel", {
    number: String(index + 1).padStart(2, "0"),
  });
  fields.type.textContent = project.type;
  fields.title.textContent = project.title;
  fields.description.textContent = project.description;
  fields.source.textContent = project.source;
  fields.process.textContent = project.process;
  fields.output.textContent = project.output;
  fields.metric.textContent = project.metric;
  fields.link.href = PROJECT_URLS[index];
  fields.link.setAttribute(
    "aria-label",
    `${i18next.t("systems.openSource")} — ${project.title}`,
  );
  fields.path.setAttribute("d", PROJECT_PATHS[index]);
  fields.path.style.strokeDashoffset = "1200";

  requestAnimationFrame(() => {
    fields.path.style.strokeDashoffset = "0";
  });
}

function updateSignal(signalKey) {
  activeSignalKey = signalKey;
  satellites.forEach((satellite) => {
    satellite.classList.toggle(
      "active",
      satellite.dataset.signalKey === signalKey,
    );
  });

  if (!signalKey) {
    signalLabel.textContent = i18next.t("observatory.defaultLabel");
    signalDetail.textContent = i18next.t("observatory.defaultDetail");
    return;
  }

  signalLabel.textContent = i18next.t(`observatory.signals.${signalKey}.label`);
  signalDetail.textContent = i18next.t(
    `observatory.signals.${signalKey}.detail`,
  );
}

async function changeLanguage(language) {
  await i18next.changeLanguage(language);
  localStorage.setItem("portfolioLanguage", language);
  languageSelect.value = language;
  updateDirection(language);
  translateDocument();
  loadProject(activeProjectIndex);
  updateSignal(activeSignalKey);
}

function setupNavigation() {
  menu.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
    menu.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
      menu.setAttribute("aria-expanded", "false");
    });
  });
}

function setupCursor() {
  window.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll("a, button, select").forEach((element) => {
    element.addEventListener("mouseenter", () =>
      cursor.classList.add("active"),
    );
    element.addEventListener("mouseleave", () =>
      cursor.classList.remove("active"),
    );
  });
}

function setupInteractions() {
  satellites.forEach((satellite) => {
    satellite.addEventListener("click", () =>
      updateSignal(satellite.dataset.signalKey),
    );
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener("mouseenter", () => loadProject(index));
    tab.addEventListener("focus", () => loadProject(index));
    tab.addEventListener("click", () => {
      loadProject(index);
      window.open(PROJECT_URLS[index], "_blank", "noopener,noreferrer");
    });
  });

  languageSelect.addEventListener("change", (event) => {
    changeLanguage(event.target.value);
  });

  fields.link.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(28px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 750,
            easing: "cubic-bezier(.2,.8,.2,1)",
            fill: "forwards",
          },
        );
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll(
      ".profile-manifesto, .profile-notes, .systems-intro, .system-deck, .capability-title, .capability-orbits, .contact-copy, .contact-terminal",
    )
    .forEach((element) => {
      element.style.opacity = "0";
      observer.observe(element);
    });
}

async function initialize() {
  const resources = await loadResources();
  const initialLanguage = getInitialLanguage();

  await i18next.init({
    lng: initialLanguage,
    fallbackLng: "en",
    resources,
    interpolation: { escapeValue: false },
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  setupNavigation();
  setupCursor();
  setupInteractions();
  setupRevealAnimations();
  await changeLanguage(initialLanguage);
}

initialize().catch((error) => {
  console.error(error);
});
