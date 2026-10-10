import Link from "next/link";

interface NavItem {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;

}

const NavLinks = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories")
    const data = await res.json()
    

    const navs = data
    
    return (
        
         <nav className="flex gap-8">
      {navs.map((nav:NavItem) => (
        <Link
          key={nav.id}
          href={`/category/${nav.slug}`}
          className="flex items-center gap-1 hover:text-green-600"
        >
          <span>{nav.icon}</span>
          <span>{nav.nameBn}</span>
        </Link>
      ))}
    </nav>
    
    );
};

export default NavLinks;