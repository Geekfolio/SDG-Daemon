interface PlatformConfig {
  selector: string;
  matches: string[];
}

const audit = async () => {
  const TIMEOUT = 5000;
  await new Promise((resolve) => setTimeout(resolve, TIMEOUT));
  const platforms: Record<string, PlatformConfig> = {
    unstop: {
      selector: "#un-register-btn",
      matches: ["View Details", "You've Registered"],
    },
    hack2skill: {
      selector: ".buttonv1Comp",
      matches: ["Team Dashboard", "Already Registered"],
    },
  };

  const platform = window.location.hostname.split(".").slice(-2, -1)[0];

  if (platforms[platform]) {
    const buttonText = document
      .querySelector(platforms[platform].selector)
      ?.textContent?.trim();

    if (!buttonText) return false;

    return platforms[platform].matches.includes(buttonText);
  }

  return false;
};

export default audit;
