import { authSelectors } from "../state";
import authOperations from "../state/operations";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Center,
  Image,
  Input,
  Text,
  CircularProgress,
  FormErrorMessage
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormAlert } from "../../../components/formAlert/formAlert";
import { Link } from "react-router-dom";
import { authRoutes } from "../authRoutes";
import { addTestId } from "../../../utils/test.utils";

const resetFormSchema = yup.object().shape({
  email: yup.string().email()
});

type ResetFormInputs = {
  email: string;
};

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(authSelectors.isAuthLoading);
  const formSubmitError = useSelector(authSelectors.getAuthError);
  const formSubmitSuccess = useSelector(authSelectors.getResetPasswordSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetFormInputs>({
    // resolver: yupResolver(resetFormSchema)
  });

  const onSubmit = (data: ResetFormInputs) => {
    dispatch(authOperations.requestPasswordReset(data.email));
  };

  return (
    <Flex
      width="full"
      align="center"
      justifyContent="center"
      minHeight="100vh"
      backgroundImage="url('/assets/banner.png')"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="bottom"
      backgroundColor="yellow.100">
      <Box
        p={8}
        width="100%"
        maxWidth="460px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        backgroundColor="white">
        <Center mt={2} mb={8}>
          <Link to={authRoutes.ROOT}>
          </Link>
        </Center>
        <Box>
          <Heading size="xxl">Forgot Password?</Heading>
        </Box>

        <Text my={2} fontSize={"xs"}>
          Enter the email associated with your account, an email with
          instructions to reset your password
        </Text>
        <Box my={4} textAlign="left">
          {formSubmitError && (
            <FormAlert message={formSubmitError} type="error" />
          )}
          {formSubmitSuccess && (
            <FormAlert
              message="Thanks for submitting your request. You will shortly receive an
              email with instructions."
              type="success"
            />
          )}
          {!formSubmitSuccess && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                isInvalid={!!errors?.email}
                isRequired
                isDisabled={isLoading}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your email"
                  {...register("email")}
                  {...addTestId("emailField")}
                />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <Button
                colorScheme="brand"
                width="full"
                mt={4}
                type="submit"
                disabled={!!(errors.email || isLoading)}
                {...addTestId("resetPasswordButton")}>
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default ForgotPassword;
