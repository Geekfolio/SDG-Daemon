interface PlatformConfig {
  selector: string;
  matches: string[];
  title: string;
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
      title: "h1",
    },
    hack2skill: {
      selector: ".buttonv1Comp",
      matches: ["Team Dashboard", "Already Registered"],
      title: "h1",
    },
    devfolio: {
      selector: `#${subdomain}-apply-button`,
      matches: ["Go to dashboard"],
      title: "h1",
    },
  };

  if (platforms[domain]) {
    const buttonText = document
      .querySelector(platforms[domain].selector)
      ?.textContent?.trim();
    const titleText =
      document.querySelector(platforms[domain].title)?.textContent?.trim() ||
      "Event";
    if (!buttonText) return false;
    const result = {
      status: platforms[domain].matches.includes(buttonText),
      title: titleText,
      description: `
This is a conventional photography competition with a maximum participation of 100 students (only individual participation allowed).
(If the link is not opening, message the organizer Tarun.)
Selected students will be added to a WhatsApp group for further communication.
The competition will take place within the premises of the Department of Statistics, Sri Venkateswara College, University of Delhi.
The theme of the competition will be revealed on the spot.
Participants must be able to justify their photographs with the final picture clicked on the day of the event.
Photography must be done using mobile phones only.
Submitted photos must be raw (no editing allowed).
Participants will be judged on originality and creativity of the picture.
AI-generated photographs are strictly prohibited; if found, the participant will be disqualified.
The decision of the judges is final; no re-evaluation or reconsideration will be entertained.
`,
    };
    return result;
    // return platforms[domain].matches.includes(buttonText);
  }

  return false;
};

export default audit;
