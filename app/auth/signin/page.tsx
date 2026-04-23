'use client';

import { redirect } from 'next/navigation';

// Redirect to /auth/signup which handles both signup and signin
export default function SignInPage() {
  redirect('/auth/signup');
}
