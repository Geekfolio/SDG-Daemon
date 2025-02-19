interface PlatformConfig {
  selector: string;
  matches: string[];
}

const audit = async () => {
  const TIMEOUT = 10000;
  await new Promise((resolve) => setTimeout(resolve, TIMEOUT));

  const parts = window.location.hostname.split(".").map((part) => part.trim());
  const subdomain = parts.length <= 2 ? null : parts[0];
  const domain = parts[parts.length - 2];

  const platforms: Record<string, PlatformConfig> = {
    unstop: {
      selector: "#un-register-btn",
      matches: ["View Details", "You've Registered"],
    },
    hack2skill: {
      selector: ".buttonv1Comp",
      matches: ["Team Dashboard", "Already Registered"],
    },
    devfolio: {
      selector: `#${subdomain}-apply-button`,
      matches: ["Go to dashboard"],
    },
  };

  if (platforms[domain]) {
    const buttonText = document
      .querySelector(platforms[domain].selector)
      ?.textContent?.trim();
    if (!buttonText) return false;

    return platforms[domain].matches.includes(buttonText);
  }

  return false;
};

export default audit;
