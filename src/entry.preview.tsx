import { createQwikCity } from '@builder.io/qwik-city/middleware/node';
import render from './entry.ssr';

/**
 * Development entry point using Vite's development server.
 */
export default createQwikCity({ render });