import { extendTheme } from "@chakra-ui/react";

import { colors } from "./foundations/colors";
import { fonts } from "./foundations/fonts";
import { fontSizes } from "./foundations/fontSizes";

const overrides = {
  colors,
  fonts,
  fontSizes,
  config: {
    cssVarPrefix: "cl"
  }
};

export const theme = extendTheme(overrides);
