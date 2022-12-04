import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools"
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const colors = {
  katrade: {
    100: "#c7ffd6",
    200: "#7dffa0",
    300: "#2eff66",
    400: "#00D861",
    500: "#00D861",
    600: "#009127",
  },
  kraikub: {
    blue: {
      200: "#7B65FF",
      300: "#644AFC",
      400: "#5238EC",
      500: "#2D19A6",
    }
  }
};

const fonts = {
  body: `'Inter','Kanit', sans-serif`,
  heading: `'Inter','Kanit', sans-serif`,
};

const components: { [key: string]: ComponentStyleConfig } = {
  Text: {
    baseStyle: {
      fontSize: 16,
      fontWeight: 400,
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 600,
    },
    sizes: {
      lg: {
        letterSpacing: -1,
      },
      xl: {
        fontSize: "3rem",
        letterSpacing: -2,
      },
    },
  },
  Input: {
    defaultProps: {
      fontSize: 20,
      fontWeight: 600,
    },
  },
  Button: {
    baseStyle: {
      rounded: 10,
      fontWeight: 500,
    },
    sizes: {
      lg: {
        fontSize: 16,
      },
    },
  },
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode("#ffffff", "#0c0c0c")(props),
    }
  })
}

const overrides = {
  config,
  colors,
  fonts,
  components,
  styles,
};

const theme = extendTheme(overrides);
export default theme;