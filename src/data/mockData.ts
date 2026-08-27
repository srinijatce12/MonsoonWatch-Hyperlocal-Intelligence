export type Status = 'favourable' | 'moderate' | 'attention';

export type Role = 'farmer' | 'officer';

export interface Block {
  id: string;
  name: string;
  district: string;
  onset: number;
  break: number;
  expectedOnset: string;
  possibleBreak: string;
  status: Status;
  expectedRainfall: number;
  historicalRainfall: number;
  majorCrops: string[];
  concern: string;
  rainfallTrend: { day: string; mm: number; historical: number }[];
  outlook: { day: string; onset: number; break: number }[];
  sevenDay: { day: string; status: Status; label: string }[];
  suggestedAction: 'advisory' | 'warning';
  suggestedMessage: string;
}

export interface Advisory {
  id: string;
  blockId: string;
  blockName: string;
  type: 'Advisory' | 'Warning';
  title: string;
  message: string;
  crop: string;
  language: 'Tamil' | 'English';
  date: string;
  issuedBy: string;
  read: boolean;
  issued: boolean;
  severity: 'high' | 'moderate' | 'low' | 'info';
}

export const DISTRICTS = ['Madurai', 'Theni', 'Sivaganga'];

export const BLOCKS: Block[] = [
  {
    id: 'thirupparankundram',
    name: 'Thirupparankundram',
    district: 'Madurai',
    onset: 82,
    break: 18,
    expectedOnset: 'Sep 2 – Sep 6',
    possibleBreak: 'Sep 20 – Sep 23',
    status: 'favourable',
    expectedRainfall: 78,
    historicalRainfall: 72,
    majorCrops: ['Paddy', 'Groundnut', 'Pulses'],
    concern: 'Favourable monsoon onset conditions expected.',
    rainfallTrend: [
      { day: 'Mon', mm: 12, historical: 10 },
      { day: 'Tue', mm: 18, historical: 14 },
      { day: 'Wed', mm: 22, historical: 18 },
      { day: 'Thu', mm: 16, historical: 16 },
      { day: 'Fri', mm: 24, historical: 20 },
      { day: 'Sat', mm: 20, historical: 18 },
      { day: 'Sun', mm: 14, historical: 12 },
    ],
    outlook: Array.from({ length: 30 }, (_, i) => ({
      day: `D${i + 1}`,
      onset: Math.round(60 + 25 * Math.sin(i / 4) + i * 0.4),
      break: Math.round(20 + 8 * Math.cos(i / 5)),
    })),
    sevenDay: [
      { day: 'Mon', status: 'moderate', label: 'Partly Cloudy' },
      { day: 'Tue', status: 'favourable', label: 'Light Rain' },
      { day: 'Wed', status: 'favourable', label: 'Rain' },
      { day: 'Thu', status: 'favourable', label: 'Rain' },
      { day: 'Fri', status: 'favourable', label: 'Showers' },
      { day: 'Sat', status: 'favourable', label: 'Showers' },
      { day: 'Sun', status: 'moderate', label: 'Cloudy' },
    ],
    suggestedAction: 'advisory',
    suggestedMessage:
      'Favourable rainfall conditions are expected in your area. Prepare your field and monitor rainfall before beginning sowing.',
  },
  {
    id: 'melur',
    name: 'Melur',
    district: 'Madurai',
    onset: 74,
    break: 24,
    expectedOnset: 'Sep 3 – Sep 7',
    possibleBreak: 'Sep 19 – Sep 22',
    status: 'favourable',
    expectedRainfall: 68,
    historicalRainfall: 70,
    majorCrops: ['Paddy', 'Maize', 'Cotton'],
    concern: 'Normal onset expected. Monitor rainfall for sowing.',
    rainfallTrend: [
      { day: 'Mon', mm: 10, historical: 12 },
      { day: 'Tue', mm: 14, historical: 14 },
      { day: 'Wed', mm: 18, historical: 16 },
      { day: 'Thu', mm: 12, historical: 14 },
      { day: 'Fri', mm: 16, historical: 18 },
      { day: 'Sat', mm: 14, historical: 14 },
      { day: 'Sun', mm: 10, historical: 12 },
    ],
    outlook: Array.from({ length: 30 }, (_, i) => ({
      day: `D${i + 1}`,
      onset: Math.round(55 + 20 * Math.sin(i / 4.5) + i * 0.3),
      break: Math.round(22 + 6 * Math.cos(i / 4)),
    })),
    sevenDay: [
      { day: 'Mon', status: 'moderate', label: 'Cloudy' },
      { day: 'Tue', status: 'moderate', label: 'Light Rain' },
      { day: 'Wed', status: 'favourable', label: 'Rain' },
      { day: 'Thu', status: 'favourable', label: 'Showers' },
      { day: 'Fri', status: 'favourable', label: 'Rain' },
      { day: 'Sat', status: 'moderate', label: 'Cloudy' },
      { day: 'Sun', status: 'moderate', label: 'Partly Cloudy' },
    ],
    suggestedAction: 'advisory',
    suggestedMessage:
      'Monsoon onset is likely within the coming week. Prepare your field and monitor rainfall before sowing.',
  },
  {
    id: 'usilampatti',
    name: 'Usilampatti',
    district: 'Madurai',
    onset: 54,
    break: 42,
    expectedOnset: 'Sep 6 – Sep 10',
    possibleBreak: 'Sep 16 – Sep 20',
    status: 'moderate',
    expectedRainfall: 52,
    historicalRainfall: 68,
    majorCrops: ['Groundnut', 'Pulses', 'Maize'],
    concern: 'Moderate onset probability. Slightly below-normal rainfall expected.',
    rainfallTrend: [
      { day: 'Mon', mm: 6, historical: 10 },
      { day: 'Tue', mm: 8, historical: 12 },
      { day: 'Wed', mm: 10, historical: 14 },
      { day: 'Thu', mm: 8, historical: 12 },
      { day: 'Fri', mm: 12, historical: 14 },
      { day: 'Sat', mm: 10, historical: 12 },
      { day: 'Sun', mm: 6, historical: 10 },
    ],
    outlook: Array.from({ length: 30 }, (_, i) => ({
      day: `D${i + 1}`,
      onset: Math.round(45 + 15 * Math.sin(i / 5) + i * 0.2),
      break: Math.round(38 + 8 * Math.cos(i / 4)),
    })),
    sevenDay: [
      { day: 'Mon', status: 'moderate', label: 'Cloudy' },
      { day: 'Tue', status: 'moderate', label: 'Partly Cloudy' },
      { day: 'Wed', status: 'moderate', label: 'Light Rain' },
      { day: 'Thu', status: 'moderate', label: 'Cloudy' },
      { day: 'Fri', status: 'favourable', label: 'Showers' },
      { day: 'Sat', status: 'moderate', label: 'Cloudy' },
      { day: 'Sun', status: 'moderate', label: 'Partly Cloudy' },
    ],
    suggestedAction: 'advisory',
    suggestedMessage:
      'Rainfall is expected to be slightly below normal. Monitor field moisture and plan sowing accordingly.',
  },
  {
    id: 'vadipatti',
    name: 'Vadipatti',
    district: 'Madurai',
    onset: 31,
    break: 68,
    expectedOnset: 'Sep 8 – Sep 13',
    possibleBreak: 'Sep 14 – Sep 18',
    status: 'attention',
    expectedRainfall: 48,
    historicalRainfall: 72,
    majorCrops: ['Paddy', 'Groundnut', 'Pulses'],
    concern: 'Delayed monsoon onset / possible dry spell.',
    rainfallTrend: [
      { day: 'Mon', mm: 2, historical: 10 },
      { day: 'Tue', mm: 4, historical: 12 },
      { day: 'Wed', mm: 3, historical: 14 },
      { day: 'Thu', mm: 6, historical: 12 },
      { day: 'Fri', mm: 8, historical: 14 },
      { day: 'Sat', mm: 5, historical: 12 },
      { day: 'Sun', mm: 3, historical: 10 },
    ],
    outlook: Array.from({ length: 30 }, (_, i) => ({
      day: `D${i + 1}`,
      onset: Math.round(28 + 12 * Math.sin(i / 6) + i * 0.1),
      break: Math.round(62 + 8 * Math.cos(i / 5)),
    })),
    sevenDay: [
      { day: 'Mon', status: 'attention', label: 'Dry' },
      { day: 'Tue', status: 'attention', label: 'Dry' },
      { day: 'Wed', status: 'moderate', label: 'Cloudy' },
      { day: 'Thu', status: 'attention', label: 'Dry' },
      { day: 'Fri', status: 'moderate', label: 'Light Rain' },
      { day: 'Sat', status: 'attention', label: 'Dry' },
      { day: 'Sun', status: 'attention', label: 'Dry' },
    ],
    suggestedAction: 'warning',
    suggestedMessage:
      'A dry spell is likely in your area during the coming week. Farmers are advised to ensure irrigation availability and monitor rainfall conditions.',
  },
  {
    id: 'perungudi',
    name: 'Perungudi',
    district: 'Madurai',
    onset: 88,
    break: 14,
    expectedOnset: 'Sep 1 – Sep 5',
    possibleBreak: 'Sep 22 – Sep 25',
    status: 'favourable',
    expectedRainfall: 84,
    historicalRainfall: 74,
    majorCrops: ['Paddy', 'Sugarcane', 'Banana'],
    concern: 'Strong onset conditions. Above-normal rainfall expected.',
    rainfallTrend: [
      { day: 'Mon', mm: 14, historical: 12 },
      { day: 'Tue', mm: 20, historical: 16 },
      { day: 'Wed', mm: 26, historical: 20 },
      { day: 'Thu', mm: 22, historical: 18 },
      { day: 'Fri', mm: 28, historical: 22 },
      { day: 'Sat', mm: 24, historical: 20 },
      { day: 'Sun', mm: 18, historical: 14 },
    ],
    outlook: Array.from({ length: 30 }, (_, i) => ({
      day: `D${i + 1}`,
      onset: Math.round(70 + 18 * Math.sin(i / 4) + i * 0.3),
      break: Math.round(16 + 6 * Math.cos(i / 5)),
    })),
    sevenDay: [
      { day: 'Mon', status: 'favourable', label: 'Rain' },
      { day: 'Tue', status: 'favourable', label: 'Rain' },
      { day: 'Wed', status: 'favourable', label: 'Heavy Rain' },
      { day: 'Thu', status: 'favourable', label: 'Showers' },
      { day: 'Fri', status: 'favourable', label: 'Rain' },
      { day: 'Sat', status: 'favourable', label: 'Showers' },
      { day: 'Sun', status: 'favourable', label: 'Rain' },
    ],
    suggestedAction: 'advisory',
    suggestedMessage:
      'Good rainfall is expected. Ideal time to begin sowing for paddy and prepare drainage to avoid waterlogging.',
  },
];

export const INITIAL_ADVISORIES: Advisory[] = [
  {
    id: 'adv-1',
    blockId: 'thirupparankundram',
    blockName: 'Thirupparankundram',
    type: 'Advisory',
    title: 'Favourable Sowing Window',
    message:
      'Monsoon onset is likely within the coming week. Prepare your field and monitor rainfall before sowing.',
    crop: 'Paddy',
    language: 'English',
    date: 'Aug 27, 2026',
    issuedBy: 'Agricultural Department',
    read: false,
    issued: true,
    severity: 'info',
  },
  {
    id: 'adv-2',
    blockId: 'vadipatti',
    blockName: 'Vadipatti',
    type: 'Warning',
    title: 'Possible Dry Spell',
    message:
      'Possible dry spell expected in your area. Ensure irrigation availability if cultivation has already started.',
    crop: 'Paddy',
    language: 'English',
    date: 'Aug 26, 2026',
    issuedBy: 'Agricultural Department',
    read: false,
    issued: true,
    severity: 'high',
  },
];

export const statusConfig: Record<Status, { label: string; color: string; bg: string; dot: string; ring: string }> = {
  favourable: {
    label: 'Favourable',
    color: 'text-leaf-700',
    bg: 'bg-leaf-200/60',
    dot: 'bg-leaf-500',
    ring: 'ring-leaf-300',
  },
  moderate: {
    label: 'Moderate',
    color: 'text-amber-700',
    bg: 'bg-amber-100',
    dot: 'bg-amber-500',
    ring: 'ring-amber-300',
  },
  attention: {
    label: 'Attention Required',
    color: 'text-red-700',
    bg: 'bg-red-100',
    dot: 'bg-red-500',
    ring: 'ring-red-300',
  },
};

export const tamilTranslations: Record<string, string> = {
  'Favourable rainfall conditions are expected in your area. Prepare your field and monitor rainfall before beginning sowing.':
    'உங்கள் பகுதியில் சாதகமான மழைப்பொழிவு எதிர்பார்க்கப்படுகிறது. விதைப்பதை தொடங்குவதற்கு முன் உங்கள் வயலை தயார் செய்து மழைப்பொழிவை கவனிக்கவும்.',
  'A dry spell is likely in your area during the coming week. Farmers are advised to ensure irrigation availability and monitor rainfall conditions.':
    'வரும் வாரத்தில் உங்கள் பகுதியில் வறண்ட காலநிலை ஏற்பட வாய்ப்புள்ளது. விவசாயிகள் நீர்ப்பாசன வசதியை உறுதி செய்து மழைப்பொழிவை கவனிக்கவும்.',
  'Monsoon onset is likely within the coming week. Prepare your field and monitor rainfall before sowing.':
    'வரும் வாரத்திற்குள் பருவமழை தொடங்க வாய்ப்புள்ளது. விதைப்பதற்கு முன் உங்கள் வயலை தயார் செய்து மழைப்பொழிவை கவனிக்கவும்.',
  'Rainfall is expected to be slightly below normal. Monitor field moisture and plan sowing accordingly.':
    'மழைப்பொழிவு சற்று குறைவாக இருக்கலாம். வயலின் ஈரப்பதத்தை கவனித்து விதைப்பை திட்டமிடவும்.',
  'Good rainfall is expected. Ideal time to begin sowing for paddy and prepare drainage to avoid waterlogging.':
    'நல்ல மழைப்பொழிவு எதிர்பார்க்கப்படுகிறது. நெல் விதைப்பதற்கு ஏற்ற நேரம். நீர் தேக்கம் தவிர்க்க வடிகால் தயார் செய்யவும்.',
};
