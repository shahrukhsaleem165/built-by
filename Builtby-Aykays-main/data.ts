
import { PortfolioItem } from './types';
import laserLensImg from './assets/images/Laserlens.png';
import pakTalentImg from './assets/images/Paktalent.png';
import goLeanImg from './assets/images/golean.png';
import giftedHandsImg from './assets/images/Gifthands.png';
import sZaibImg from './assets/images/S.Zaib.png';

export const portfolioData: PortfolioItem[] = [
  {
    id: 'laser-lens',
    title: 'Laser Lens',
    shortDescription: 'Timeless Storytelling through the lens.',
    longDescription: 'Capturing moments that define a lifetime. Laser Lens Photography specializes in creating visual narratives that are both personal and profound, preserving memories with artistic precision.',
    link: 'https://builtby.aykays.com/laser-lens/',
    categories: ['Photography', 'Creative', 'Design'],
    imageUrl: laserLensImg,
    year: '2024',
    client: 'Laser Lens'
  },
  {
    id: 'pak-talent',
    title: 'Pak Talent Academy',
    shortDescription: 'Nurturing potential, transforming futures.',
    longDescription: 'A premier institution committed to providing quality education that is both accessible and transformative. Focusing on character and technical competence to prepare students for the professional world.',
    link: 'https://builtby.aykays.com/paktalent/',
    categories: ['Education', 'Development', 'Branding'],
    imageUrl: pakTalentImg,
    year: '2024',
    client: 'Pak Talent'
  },
  {
    id: 'golean-360',
    title: 'GoLean360',
    shortDescription: 'Industrial Luxury Fitness. Transform Your Reality.',
    longDescription: 'More than a gym. A 360° lifestyle shift designed by science, fueled by community, and executed with precision. Data-driven programming for industrial results.',
    link: 'https://builtby.aykays.com/golean/',
    categories: ['Fitness', 'Lifestyle', 'Development'],
    imageUrl: goLeanImg,
    year: '2024',
    client: 'GoLean360'
  },
  {
    id: 'gifted-hands',
    title: 'Gifted Hands',
    shortDescription: 'Artistry in Every Stitch.',
    longDescription: 'Bridging the gap between generational heritage and contemporary luxury. Each piece is a testament to the patient hands of artisans who spend hours perfecting a single stitch.',
    link: 'https://builtby.aykays.com/gifted-hands/',
    categories: ['E-commerce', 'Luxury', 'Design'],
    imageUrl: giftedHandsImg,
    year: '2024',
    client: 'Gifted Hands'
  },
  {
    id: 's-zaib-studio',
    title: 'S.Zaib Studio',
    shortDescription: 'Legacy Crafted Through Glass.',
    longDescription: 'Merging the timeless aesthetic of classical photography with the precision of modern cinema. We don\'t just capture images; we archive legacies for future generations.',
    link: 'https://builtby.aykays.com/s-zaib-studio/',
    categories: ['Photography', 'Cinema', 'Editorial'],
    imageUrl: sZaibImg,
    year: '2024',
    client: 'S.Zaib'
  }
];
