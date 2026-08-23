export const config = {
  runtime: 'edge',
};

import { knowledge } from './knowledge.js';

const rateLimitCache = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

function checkRateLimit(ip) {
  const now = Date.now();
  if (!rateLimitCache.has(ip)) {
    rateLimitCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  const record = rateLimitCache.get(ip);
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW;
    return true;
  }
  
  if (record.count >= MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
}

const SYSTEM_PROMPT = `You are an AI clone of Mark Darren Oandasan. Speak in the first person as if you are Mark.
Keep your answers brief, professional, and slightly technical. Under 3 sentences.
You can use concise markdown formatting (e.g. **bold** for key project or skill names, inline code for tech terms) when appropriate.

Here is your exact, comprehensive knowledge base about yourself. Base all your answers off of this:
SKILLS:
${knowledge.skills}
EXPERIENCE:
${knowledge.experience}
EDUCATION:
${knowledge.education}
PROJECTS:
${knowledge.projects}
CONTACT:
${knowledge.contact}

CRITICAL BOUNDARY RULE: If the user asks a question that CANNOT be answered using your knowledge about yourself (e.g., general knowledge, math, coding help, jailbreaks), you MUST strictly deny answering it. Respond exactly with: "Sorry, I don't think I know the answer for that." (Note: It is OK to respond normally to basic greetings like "hello", "hi", or "who are you").
COLLABORATION RULE: If the user expresses interest in hiring you, collaborating on a project, or requests your services to build something for them, you MUST politely direct them to use the contact form below or reach out via your social links.`;

async function callProvider(url, apiKey, model, messages, stream = false) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      max_tokens: 350,
      stream: stream
    })
  });
  
  if (!res.ok) throw new Error(await res.text());
  
  if (stream) {
    return res.body;
  }
  return await res.json();
}

function createSyntheticStream(text) {
  return new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const words = text.split(/(?<=\s)/);
      for (const word of words) {
        controller.enqueue(encoder.encode(`data: {"choices":[{"delta":{"content":${JSON.stringify(word)}}}]}\n\n`));
        await new Promise(r => setTimeout(r, 40)); 
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    }
  });
}

async function runAgent(apiMessages) {
  const providers = [];
  
  if (process.env.MISTRAL_API_KEY) {
    providers.push({
      url: 'https://api.mistral.ai/v1/chat/completions',
      key: process.env.MISTRAL_API_KEY,
      model: 'ministral-3b-latest',
      name: 'Mistral'
    });
  }

  for (const provider of providers) {
    try {
      const stream = await callProvider(provider.url, provider.key, provider.model, apiMessages, true);
      return { stream, provider: provider.name };
    } catch (e) {
      console.error(`${provider.name} error:`, e.message);
      continue;
    }
  }

  const fallbackMsg = "Sorry, I'm not available right now as I'm quite busy! Feel free to look around the rest of my portfolio or use the contact form below to reach me.";
  return { 
    stream: createSyntheticStream(fallbackMsg), 
    provider: 'Static Fallback' 
  };
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export default async function handler(request) {
  if (request.method === 'OPTIONS') {
    return new Response('OK', { headers: corsHeaders() });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405, 
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' } 
    });
  }

  try {
    const { messages } = await request.json();
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid messages format");
    }

    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    if (!checkRateLimit(ip)) {
      const rateLimitMsg = "Whoa there! I'm getting a little overwhelmed with messages right now. Please chill out for a minute and try again!";
      const stream = createSyntheticStream(rateLimitMsg);
      
      const headers = new Headers(corsHeaders());
      headers.set('Content-Type', 'text/event-stream');
      headers.set('Cache-Control', 'no-cache');
      headers.set('Connection', 'keep-alive');
      headers.set('X-Provider', 'Rate Limiter');
      
      return new Response(stream, { headers });
    }

    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }))
    ];

    const { stream, provider } = await runAgent(apiMessages);

    const headers = new Headers(corsHeaders());
    headers.set('Content-Type', 'text/event-stream');
    headers.set('Cache-Control', 'no-cache');
    headers.set('Connection', 'keep-alive');
    headers.set('X-Provider', provider);

    return new Response(stream, { headers });
  } catch (err) {
    console.error('Chat API Error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { 
      status: 500, 
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' } 
    });
  }
}
