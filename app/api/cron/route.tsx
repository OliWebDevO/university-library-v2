import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export async function GET(req: Request) {
  // Optional: Protect with CRON_SECRET
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
  await redis.set('keepalive', Date.now());
  return NextResponse.json({ ok: true });
}