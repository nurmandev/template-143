# Remotion template for the video

## Naming scheme


## How to use this starter

Clone this repo.

remove origin repo and add your own with the following command

`git remote remove origin`

Create a new empty repo on github for your video template code! Have a look at what to name it below.

Then add the new repo you ust created as the origin.

`git remote add origin URLHere` 
> You can find this command when you created a new blank repo. 

Then you can install and use it like any other remotion project.
`pnpm i`

Start Remotion studio:

 `pnpm run start` or `pnpm start`

When you push for the first time you'll have to set the upstream

`git add .`
`git commit -m "add: template ..." `
`git push -u origin main`

**Template Name & Number**

name your repo TemplateNumber-template
example: template 29 would be "29-template"

### Compare

I've introduced a new thing called Compare. 

With this we can compare our video and the source video side by side in the studio.



It's a file where you'll have to change the staticFile to your video.


- create a .env file. have a look at .env.example
- use COMPARE='x' or COMPARE='y'
- You'll have to make the width or height in the Root.tsx file * 2 to show both next to each other
- Put your video File in the public/examples folder
- Change the staticFile() in Compare.tsx to the name of your video

-> Adjust the timings of our video to fit the mp4


## Text splitter

Is a component we always use for text animations.

Text animations have their own folder in /components -> /animations

Many text animations need to know where the line breaks are and we also need to make sure that the text won't overflow. 
So for that we have `useTextSplitter` hook.

```ts
const text = useTextSplitter({
  text: props.text,
  fontSize: 160,
  fontWeight: 'bold',
  maxLines: 2,
  maxWidth: 1000,
});
```

you give it all the text style as input and it will give you back:

- text that has line breaks in it and it
- css styles with adjusted fontSize so that the text won't overflow the desired width and heigth (height is calculated with `fontSize * maxLines`)


## Example root props

```ts
const props: VideoProps = {
  colors: {
    primary: '#070707',
    primaryText: '#fcfcfc',
    secondary: '#3b3a3a',
    secondaryText: '#fcfcfc',
    accent: '#251b16',
    accentText: '#fcfcfc',
    background: '#3b3a3a',
    backgroundText: '#fcfcfc',
    black: '#070707',
    white: '#fcfcfc',
  },
  fonts: {
    primary: 'Poppins',
    secondary: 'Roboto',
  },
  // See 'Backgrounds' section below
  background: {
    type: 'static',
    background: 'primary',
  },
  scene1Props: {
    logo: staticFile('Logo.png'),
    audio: staticFile('VO_1.mp3'),
    title: 'Vertex',
    subtitle: 'Financial Services',
    text: 'Where Accuracy Meets Expertise',
  },
  scene2Props: {
    logo: staticFile('Logo.png'),
    img: staticFile('Media_1.jpg'),
    audio: staticFile('VO_2.mp3'),
  },
  ...
};
```

## Scenes

Your work will be mainly in the Scenes files. 
There you can create the video with remotion

## Music

We don't need to implement the Audio voice over but we have a prop in the root for the music.
Put the music file in the /public folder.

## Consts

We have WIDTH & HEIGHT instead of using the useVideoConfig()

### Backgrounds

You create a new background like this:

```tsx
export const ImageBackground = defineBackground({
  type: 'image',
  description: 'Just a background image',
  schema: z.object({
    background: Color,
    image: ImageProps,
  }),
  component: ({ style, background, image }) => {
    return (
      <AbsoluteFill style={{ overflow: 'hidden', background: colorVar(background), ...style }}>
        <Img src={image} style={{ width: '100%', height: '100%' }} />
      </AbsoluteFill>
    );
  },
});
```

and then reference the ImageBackground in [background/index.ts](src/backgrounds/index.ts)

```ts
export const BACKGROUNDS = [
  // Added ImageBackground here
  ImageBackground,
  OtherBackground,
];
```

now your background is available in VideoProps by matching the "type" string

```ts
const props = {
    ...,
    background: {
        type: 'image',
        background: 'primary',
        image: { src: 'https://...' }
  },
}

```


Static Background is for a 1 Color Background. 

```ts
  background: {
      type: 'static',
      background: 'background',
  },
```
explanation: `type: static`, `background: 'background'`
We get the background with the type 'static' which is just a unique identifier string.
And we pass the color to it with background: 'background'. the color is coming from colors.background. 

See below for colors.

Backgrounds should be standalone components.

Meaning we could swap into any other Composition.

### Colors

We have the following structure for colors in Root.tsx:

```ts
const colors = {
  primary: '#070707',
  primaryText: '#fcfcfc',
  secondary: '#3b3a3a',
  secondaryText: '#fcfcfc',
  accent: '#251b16',
  accentText: '#fcfcfc',
  background: '#3b3a3a',
  backgroundText: '#fcfcfc',
  black: '#070707',
  white: '#fcfcfc',
};
```

Make sure to use the primary and secondary colors first. 
Same for primaryText and secondaryText.

You will have to adjust the colors to suit your video of course.

You use these colors with using the `colorVar` function, so to get primary color you would use `colorVar('primary')`. 

example: 
```ts

<p style={{
  color: colorVar('primary'),
  ...title.style,
  textAlign: 'center',
}}>Hello World</p>
```


### Fonts

For fonts we have two fonts: `primary` and `secondary`.
You set the fonts in the Root.tsx file for each Composition.

Primary font is applied to every text, so no need to apply that separately,
but you can use secondary font with `fontVar('secondary')`.

useTextSplitter() hook also has a font property.

We support 100 most popular Google fonts right now (see [fontFamily.ts](/src/lib/fontFamily.ts))

fontFamily is an output of the useTextSplitter() hook. 

example: 
`fontFamily: var(--font-primary)`

