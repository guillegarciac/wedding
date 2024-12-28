'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavigationLink({ href, children }: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      className={`
        relative px-2 py-1 transition-colors duration-200
        ${isActive ? 'text-foreground' : 'text-muted hover:text-foreground'}
        after:content-[''] after:absolute after:bottom-0 after:left-0 
        after:w-full after:h-[1px] after:bg-current
        after:scale-x-0 after:origin-right after:transition-transform
        ${isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100 hover:after:origin-left'}
      `}
    >
      {children}
    </Link>
  );
} 