import { ChakraProvider } from "@chakra-ui/react";


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  //Show color picker and date picker when args match with the regex
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withChakra = (Story) => (
  <ChakraProvider>
    <Story />
  </ChakraProvider>
);

export const decorators = [withChakra];

