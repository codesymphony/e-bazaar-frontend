// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primaryDark: string;
      primaryLight: string;
      shadyWhite: string;
      lightGrey: string;
      darkGrey: string;
      white: string;
      black: string;
      red: string;
    };
  }
}
