import NavigationLink from './NavigationLink';

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavigationLink href="/">M & J</NavigationLink>
          
          <div className="hidden sm:flex space-x-8">
            <NavigationLink href="/story">Our Story</NavigationLink>
            <NavigationLink href="/details">Details</NavigationLink>
            <NavigationLink href="/rsvp">RSVP</NavigationLink>
            <NavigationLink href="/registry">Registry</NavigationLink>
          </div>
        </div>
      </div>
    </nav>
  );
} 