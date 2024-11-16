import { z } from 'zod'
import { FontFamily } from './lib/fontFamily'



export const Fonts = z.object({
  primary: FontFamily,
  secondary: FontFamily.optional(),
})
export type Fonts = z.infer<typeof Fonts>

export const Font = z.enum(['primary', 'secondary'])
export type Font = z.infer<typeof Font>

export const Colors = z
  .object({
    primary: z.string(),
    primaryText: z.string(),
    secondary: z.string(),
    secondaryText: z.string(),
    accent: z.string(),
    accentText: z.string(),
    background: z.string(),
    backgroundText: z.string(),
    black: z.string(),
    white: z.string(),
  })
  .describe('Hex color pa llete for the video')

export const ColorEnum = z.enum([
  'primary',
  'primaryText',
  'secondary',
  'secondaryText',
  'accent',
  'accentText',
  'background',
  'backgroundText',
  'black',
  'white',
])
export const ColorHex = z.custom<`#${string}`>((val: any) => /^#[0-9A-F]{6}$/i.test(val))
export const Color = z.union([ColorHex, ColorEnum])
export type Color = z.infer<typeof Color>
