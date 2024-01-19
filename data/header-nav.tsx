import { NavLinkProps } from '../components/nav-link'

const hideMobile = {
  // display: ['none', null, 'block'],
}

const headerNav: NavLinkProps[] = [
  { id: 'home', label: 'Home', display: 'none' },
 
  {
    href: '/pricing',
    label: 'Pricing',
    ...hideMobile,
  },
  { href: 'https://workspace.unlimitpotential.com/signin', label: 'Sign in', ...hideMobile },
  { href: 'https://developers.unlimitednow.me/', label: 'Documentation', ...hideMobile },
  {
    href: '/demo',
    label: 'Demo',
    variant: 'solid',
    colorScheme: 'primary',
    fontSize: 'sm',
  },
]

export default headerNav
