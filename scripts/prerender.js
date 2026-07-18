import puppeteer from 'puppeteer';
import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

async function prerender() {
  const app = express();
  app.use(express.static(distPath));
  
  const server = app.listen(0, async () => {
    const port = server.address().port;
    const url = `http://localhost:${port}`;
    console.log(`Server running at ${url}`);

    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    
    // Intercept and disable network requests we don't need for prerendering to speed it up
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const resourceType = req.resourceType();
      if (['image', 'media', 'font'].includes(resourceType)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    try {
      console.log('Loading page...');
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      console.log('Waiting for Svelte to mount the full app...');
      // Wait for the last section (Contact) to render, meaning all sections are mounted
      await page.waitForSelector('#contact-section');
      
      // Get the outer HTML
      const html = await page.evaluate(() => document.documentElement.outerHTML);
      
      const doctype = '<!DOCTYPE html>';
      const finalHtml = `${doctype}\n<html lang="en">${html.substring(html.indexOf('<head>'))}`;

      const indexPath = path.join(distPath, 'index.html');
      await fs.writeFile(indexPath, finalHtml, 'utf-8');
      console.log('Successfully prerendered index.html');
    } catch (e) {
      console.error('Error during prerendering:', e);
      process.exit(1);
    } finally {
      await browser.close();
      server.close();
    }
  });
}

prerender();
