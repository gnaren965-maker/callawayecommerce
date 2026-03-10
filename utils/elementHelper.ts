/**
 * Element helper utility for common element interactions
 */

import { Page, Locator } from '@playwright/test';
import { logElementInteraction } from './logger';

export class ElementHelper {
  constructor(private page: Page) {}

  /**
   * Fill an input field
   */
  async fillInput(selector: string, value: string): Promise<void> {
    logElementInteraction('fill', selector);
    await this.page.fill(selector, value);
  }

  /**
   * Click a button or link
   */
  async click(selector: string): Promise<void> {
    logElementInteraction('click', selector);
    await this.page.click(selector);
  }

  /**
   * Click a button by role
   */
  async clickByRole(role: string, options?: { name?: string }): Promise<void> {
    logElementInteraction('clickByRole', `${role} ${options?.name || ''}`);
    await this.page.getByRole(role as any, options).click();
  }

  /**
   * Select an option from a dropdown
   */
  async selectOption(selector: string, value: string | { label: string }): Promise<void> {
    logElementInteraction('selectOption', selector);
    if (typeof value === 'string') {
      await this.page.selectOption(selector, value);
    } else {
      await this.page.selectOption(selector, { label: value.label });
    }
  }

  /**
   * Type text slowly
   */
  async typeText(selector: string, text: string, delay: number = 50): Promise<void> {
    logElementInteraction('type', selector);
    await this.page.locator(selector).type(text, { delay });
  }

  /**
   * Clear input field
   */
  async clearInput(selector: string): Promise<void> {
    logElementInteraction('clear', selector);
    await this.page.locator(selector).fill('');
  }

  /**
   * Check a checkbox
   */
  async checkCheckbox(selector: string): Promise<void> {
    logElementInteraction('check', selector);
    await this.page.check(selector);
  }

  /**
   * Uncheck a checkbox
   */
  async uncheckCheckbox(selector: string): Promise<void> {
    logElementInteraction('uncheck', selector);
    await this.page.uncheck(selector);
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    logElementInteraction('waitFor', selector);
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Get element text
   */
  async getText(selector: string): Promise<string> {
    logElementInteraction('getText', selector);
    return await this.page.locator(selector).textContent() || '';
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).isEnabled();
    } catch {
      return false;
    }
  }

  /**
   * Get attribute value
   */
  async getAttribute(selector: string, attributeName: string): Promise<string | null> {
    logElementInteraction('getAttribute', selector);
    return await this.page.locator(selector).getAttribute(attributeName);
  }

  /**
   * Hover over element
   */
  async hover(selector: string): Promise<void> {
    logElementInteraction('hover', selector);
    await this.page.locator(selector).hover();
  }

  /**
   * Double click element
   */
  async doubleClick(selector: string): Promise<void> {
    logElementInteraction('doubleClick', selector);
    await this.page.locator(selector).dblclick();
  }

  /**
   * Right click element
   */
  async rightClick(selector: string): Promise<void> {
    logElementInteraction('rightClick', selector);
    await this.page.locator(selector).click({ button: 'right' });
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(selector: string): Promise<void> {
    logElementInteraction('scrollIntoView', selector);
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Get locator
   */
  getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Wait for navigation after action
   */
  async clickAndWaitForNavigation(selector: string, timeout: number = 5000): Promise<void> {
    logElementInteraction('clickAndWaitForNavigation', selector);
    await Promise.all([this.page.waitForNavigation({ timeout }), this.page.click(selector)]);
  }

  /**
   * Get all text content
   */
  async getPageText(): Promise<string> {
    return await this.page.content();
  }
}

/**
 * Create ElementHelper instance
 */
export function createElementHelper(page: Page): ElementHelper {
  return new ElementHelper(page);
}
