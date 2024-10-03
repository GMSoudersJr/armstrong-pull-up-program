import { socials } from "@/lib/socials";
import { expect, type Locator, type Page } from "@playwright/test";

const githubAlt = socials.filter((social) => social.id === "github")[0].alt;
const linkedInAlt = socials.filter((social) => social.id === "linkedIn")[0].alt;

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
    this.learnMoreLink = page.getByRole("link", { name: "Learn More" });
    this.getStartedLink = page.getByRole("link", { name: "Get Started!" });
    this.featuresLink = page.getByRole("link", { name: "features" });
    this.testimonialsLink = page.getByRole("link", { name: "testimonials" });
    this.overviewLink = page.getByRole("link", { name: "overview" });
    this.getStartedHeader = page.getByRole("heading", { name: "get started" });
    this.featuresHeader = page.getByRole("heading", { name: "features" });
    this.testimonialsHeader = page.getByRole("heading", {
      name: "testimonials",
    });
    this.overviewHeader = page.getByRole("heading", { name: "overview" });
    this.appInstallationHeader = page.getByRole("heading", {
      name: "APP INSTALLATION",
    });
    this.mostDevicesHeader = page.getByRole("heading", {
      name: "MOST DEVICES",
    });
    this.iOSDevicesHeader = page.getByRole("heading", { name: "iOS DEVICES" });
    this.pdfSourceLink = page.getByRole("link", {
      name: "pdf source material",
    });
    this.suitYourselfLink = page.getByRole("link", { name: "suit yourself" });
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
