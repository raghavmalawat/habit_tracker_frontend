import * as React from "react";
import { Box, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

export interface FormAlertProps {
  /**
   * Message to render
   */

  message: string | null | React.ReactChild;

  /**
   * Alert type
   */
  type: "success" | "error";
}

/**
 * This component is used to display server errors on form submission
 */
const FormAlert: React.FC<FormAlertProps> = ({ message, type = "success" }) => {
  if (!message) {
    return null;
  }

  return (
    <Box my={4}>
      <Alert status={type} borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
};

export { FormAlert };
