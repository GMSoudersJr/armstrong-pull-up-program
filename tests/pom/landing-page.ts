import { socials } from "@/lib/socials";
import { expect, type Locator, type Page } from "@playwright/test";

const githubAlt = socials.filter((social) => (social.id = "github"))[0].alt;
const linkedInAlt = socials.filter((social) => (social.id = "linkedIn"))[0].alt;

export class LandingPage {
  readonly page: Page;
  readonly learnMoreLink: Locator;
  readonly getStartedLink: Locator;
  readonly featuresLink: Locator;
  readonly testimonialsLink: Locator;
  readonly overviewLink: Locator;
  readonly getStartedHeader: Locator;
  readonly featuresHeader: Locator;
  readonly testimonialsHeader: Locator;
  readonly overviewHeader: Locator;
  readonly appInstallationHeader: Locator;
  readonly mostDevicesHeader: Locator;
  readonly iOSDevicesHeader: Locator;
  readonly pdfSourceLink: Locator;
  readonly suitYourselfLink: Locator;
  readonly githubIcon: Locator;
  readonly linkedInIcon: Locator;
  readonly copyrightSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.learnMoreLink = page.locator("a", { hasText: "Learn More" });
    this.getStartedLink = page.locator("a", { hasText: "Get Started!" });
    this.featuresLink = page.locator("a", { hasText: "features" });
    this.testimonialsLink = page.locator("a", { hasText: "testimonials" });
    this.overviewLink = page.locator("a", { hasText: "overview" });
    this.getStartedHeader = page.locator("h1", { hasText: "Get Started" });
    this.featuresHeader = page.locator("h1", { hasText: "Features" });
    this.testimonialsHeader = page.locator("h1", { hasText: "Testimonials" });
    this.overviewHeader = page.locator("h1", { hasText: "Overview" });
    this.appInstallationHeader = page.locator("h1", {
      hasText: "APP INSTALLATION",
    });
    this.mostDevicesHeader = page.locator("h2", { hasText: "MOST DEVICES" });
    this.iOSDevicesHeader = page.locator("h2", { hasText: "iOS DEVICES" });
    this.pdfSourceLink = page.locator("a", { hasText: "pdf source material" });
    this.suitYourselfLink = page.locator("a", { hasText: "suit yourself" });
    this.githubIcon = page.getByAltText(githubAlt);
    this.linkedInIcon = page.getByAltText(linkedInAlt);
    this.copyrightSection = page.locator("section#copyright");
  }

  async goto() {
    await this.page.goto("/");
  }

  async featuresSection() {
    await this.featuresLink.click();
    await expect(this.featuresHeader).toBeVisible();
  }

  async testimonialsSection() {
    await this.testimonialsLink.click();
    await expect(this.testimonialsHeader).toBeVisible();
  }

  async overviewSection() {
    await this.overviewLink.click();
    await expect(this.overviewHeader).toBeVisible();
  }

  async getStarted() {
    await this.getStartedLink.click();
    await expect(this.getStartedHeader).toBeVisible();
  }
}
