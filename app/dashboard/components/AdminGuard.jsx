'use client';

import AuthGuard from './AuthGuard';

export default function AdminGuard({ children }) {
  return (
    <AuthGuard requiredRole="administrador">
      {children}
    </AuthGuard>
  );
}