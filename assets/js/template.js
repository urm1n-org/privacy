(function () {
  "use strict";

  // Global owner profile for all app policies.
  const GLOBAL_PROFILE = Object.freeze({
    developerName: "Urmin Hirpara",
    baseContactEmail: "urmin.org@gmail.com"
  });

  window.PRIVACY_GLOBAL = GLOBAL_PROFILE;

  const config = window.APP_CONFIG || {};
  const appName = config.appName || "My App";
  const developer = config.developer || GLOBAL_PROFILE.developerName;
  const contactEmail = config.contactEmail || buildAliasEmail(config.contactAlias || slugify(appName));
  const lastUpdated = config.lastUpdated || new Date().toISOString().slice(0, 10);

  document.title = appName + " Privacy Policy";
  setMetaByName("description", "Privacy policy for " + appName + " by " + developer + ".");
  setMetaByProperty("og:title", appName + " Privacy Policy");
  setMetaByProperty("og:description", "Read the privacy policy for " + appName + ".");
  setMetaByProperty("og:type", "website");
  setMetaByProperty("og:url", window.location.href);

  const policyRoot = document.querySelector("[data-policy-root]");
  const policyContent = document.querySelector("[data-policy-content]");

  if (!policyRoot || !policyContent) {
    return;
  }

  const header = document.createElement("header");
  header.className = "policy-header";

  const title = document.createElement("h1");
  title.textContent = appName + " Privacy Policy";

  const metaLine = document.createElement("p");
  metaLine.className = "policy-meta";

  const updatedSpan = document.createElement("span");
  updatedSpan.textContent = "Last updated: " + formatDate(lastUpdated);

  const divider = document.createElement("span");
  divider.className = "policy-meta-divider";
  divider.textContent = " \u2022 ";

  const contactSpan = document.createElement("span");
  contactSpan.textContent = "Contact: ";

  const emailLink = document.createElement("a");
  emailLink.href = "mailto:" + contactEmail;
  emailLink.textContent = contactEmail;

  contactSpan.appendChild(emailLink);
  metaLine.appendChild(updatedSpan);
  metaLine.appendChild(divider);
  metaLine.appendChild(contactSpan);

  header.appendChild(title);
  header.appendChild(metaLine);

  policyRoot.insertBefore(header, policyRoot.firstChild);

  function buildAliasEmail(alias) {
    const parts = GLOBAL_PROFILE.baseContactEmail.split("@");
    if (parts.length !== 2) {
      return GLOBAL_PROFILE.baseContactEmail;
    }

    const cleanAlias = String(alias || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!cleanAlias) {
      return GLOBAL_PROFILE.baseContactEmail;
    }

    return parts[0] + "+" + cleanAlias + "@" + parts[1];
  }

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function formatDate(rawDate) {
    const parsed = new Date(rawDate + "T00:00:00");
    if (Number.isNaN(parsed.getTime())) {
      return rawDate;
    }

    return parsed.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function setMetaByName(name, content) {
    let tag = document.querySelector('meta[name="' + name + '"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  }

  function setMetaByProperty(property, content) {
    let tag = document.querySelector('meta[property="' + property + '"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  }
})();
