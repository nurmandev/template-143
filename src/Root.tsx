import { Composition, staticFile } from 'remotion';
import Main, { MainSchema } from './Composition/Composition';
import { Compare } from './Composition/Compare';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Template"
        component={Main}
        schema={MainSchema}
        fps={30}
        width={1920}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('music.mp3'),
          colors: {
            background: '#151515',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#FFFFFF',
            secondary: '#5118DB',
            secondaryText: '#f00',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          background: {
            type: 'crosses',
            background: 'background',
            stroke: 'backgroundText',
          },
          fonts: {
            primary: 'Montserrat',
            secondary: 'Abel',
          },
          transitionDuration: 20,
          scene1Duration: 150,
          scene1Props: {
            logo: staticFile('Logo.png'),
            title: 'DEFENDING SMALL TOWN VALUES',
          },
          scene2Duration: 165,
          scene2Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_1.jpg'),
            title:
              'GEORGIA NEEDS A \n LEADER WHO \n PROTECTS OUR \n VALUES AND BUILDS \n OUR FUTURE',
          },
          scene3Duration: 180,
          scene3Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_2.jpg'),
            title:
              'RISING COSTS, \n UNSAFE COMMUNITIES, \n AND CHALLENGESS \n IN OUR SCHOOLS \n ARE HOLDING GEEORGIA',
          },
          scene4Duration: 195,
          scene4Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_3.jpg'),
            title: 'BURT WILL BOOST THE ECONOMY, ENHANCE SAFETY, AND IMPROVE EDUCATION',
          },
          scene5Duration: 170,
          scene5Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_4.jpg'),
            title: 'A BETTER GEORGIA FOR FAMILIES, BUSINESSES, AND COMMUNITIES',
          },
          scene6Duration: 180,
          scene6Props: {
            logo: staticFile('Logo.png'),
            title: 'SUPPORT BURT JONES FOR A BETTER FUTURE',
            subtitle: 'WWW.BURTJONESFORGA.COM',
          },
        }}
      />
      <Composition
        id="Compare"
        component={Compare}
        schema={MainSchema}
        fps={30}
        width={1920 * 2}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('music.mp3'),
          colors: {
            background: '#151515',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#FFFFFF',
            secondary: '#5118DB',
            secondaryText: '#f00',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          background: {
            type: 'crosses',
            background: 'background',
            stroke: 'backgroundText',
          },
          fonts: {
            primary: 'Montserrat',
            secondary: 'Abel',
          },
          transitionDuration: 20,
          scene1Duration: 150,
          scene1Props: {
            logo: staticFile('Logo.png'),
            title: 'DEFENDING SMALL TOWN VALUES',
          },
          scene2Duration: 165,
          scene2Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_1.jpg'),
            title:
              'GEORGIA NEEDS A \n LEADER WHO \n PROTECTS OUR \n VALUES AND BUILDS \n OUR FUTURE',
          },
          scene3Duration: 180,
          scene3Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_2.jpg'),
            title:
              'RISING COSTS, \n UNSAFE COMMUNITIES, \n AND CHALLENGESS \n IN OUR SCHOOLS \n ARE HOLDING GEEORGIA',
          },
          scene4Duration: 195,
          scene4Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_3.jpg'),
            title: 'BURT WILL BOOST THE ECONOMY, ENHANCE SAFETY, AND IMPROVE EDUCATION',
          },
          scene5Duration: 170,
          scene5Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_4.jpg'),
            title: 'A BETTER GEORGIA FOR FAMILIES, BUSINESSES, AND COMMUNITIES',
          },
          scene6Duration: 180,
          scene6Props: {
            logo: staticFile('Logo.png'),
            title: 'SUPPORT BURT JONES FOR A BETTER FUTURE',
            subtitle: 'WWW.BURTJONESFORGA.COM',
          },
        }}
      />
    </>
  );
};
