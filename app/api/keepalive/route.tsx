import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const runtime = "nodejs";

export async function GET() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
  await redis.set('keepalive', Date.now());
  return NextResponse.json({ ok: true });
}