import { useState, useEffect } from "react";
import { authSelectors } from "../state";
import authOperations from "../state/operations";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Center,
  Image,
  CircularProgress,
  useBoolean,
  InputGroup,
  InputRightElement,
  FormErrorMessage
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import * as queryString from "query-string";
import { Link as RouteLink, useLocation } from "react-router-dom";
import { history } from "../../../routes/history";
import { authRoutes } from "../authRoutes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormAlert } from "../../../components/formAlert/formAlert";
import { addTestId } from "../../../utils/test.utils";

const updatePasswordFormSchema = yup.object().shape({
  password: yup.string().required().min(6),
  confirmPassword: yup.string().required().min(6)
});

type UpdatePasswordFormInputs = {
  password: string;
  confirmPassword: string;
};

interface UpdatePasswordFormProps {
  token: string | null;
  submitPasswordReset: (
    token: string,
    password: string,
    passwordConfirmation: string
  ) => any;
  isLoading: boolean;
  error: string | null;
}

const UpdatePasswordForm = ({
  token,
  submitPasswordReset,
  isLoading,
  error
}: UpdatePasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdatePasswordFormInputs>({
    // resolver: yupResolver(updatePasswordFormSchema)
  });

  const onSubmit = (data: UpdatePasswordFormInputs) =>
    token && submitPasswordReset(token, data.password, data.confirmPassword);

  const [isPasswordVisible, setPasswordVisible] = useBoolean();
  const [
    isPasswordConfirmationVisible,
    setPasswordConfirmationVisible
  ] = useBoolean();

  return (
    <Box my={4} textAlign="left">
      {error && <FormAlert message={error} type="error" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          mt={6}
          isInvalid={!!errors?.password}
          isRequired
          isDisabled={isLoading}>
          <FormLabel>Password</FormLabel>
          <InputGroup size={"md"}>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="*******"
              {...register("password")}
              {...addTestId("passwordField")}
            />

            <InputRightElement width="3rem">
              <Button
                h="8"
                size="sm"
                onClick={() => setPasswordVisible.toggle()}
                {...addTestId("showPassword")}>
                {isPasswordVisible ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          mt={6}
          isInvalid={!!errors?.confirmPassword}
          isRequired
          isDisabled={isLoading}>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size={"md"}>
            <Input
              type={isPasswordConfirmationVisible ? "text" : "password"}
              placeholder="*******"
              {...register("confirmPassword")}
              {...addTestId("passwordConfirmationField")}
            />

            <InputRightElement width="3rem">
              <Button
                h="8"
                size="sm"
                onClick={() => setPasswordConfirmationVisible.toggle()}>
                {isPasswordConfirmationVisible ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors?.confirmPassword?.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="brand"
          width="full"
          mt={4}
          type="submit"
          disabled={!!(errors.password || errors.confirmPassword || isLoading)}
          {...addTestId("submitPasswordResetButton")}>
          {isLoading ? (
            <CircularProgress isIndeterminate size="24px" color="white" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Box>
  );
};

const UpdatePassword = () => {
  const dispatch = useDispatch();

  const [token, setToken] = useState<string | null>(null);
  const { token: resetToken } = queryString.parse(useLocation().search);

  useEffect(() => {
    if (!Array.isArray(resetToken)) {
      setToken(resetToken);
    }
  }, [resetToken]);

  const isLoading = useSelector(authSelectors.isAuthLoading);
  const formSubmitError = useSelector(authSelectors.getAuthError);
  const formSubmitSuccess = useSelector(authSelectors.getSubmitPasswordStatus);
  const checkAuthentication = () => authOperations.checkAuthentication();

  const submitPasswordReset = (
    token: string,
    password: string,
    passwordConfirmation: string
  ) => {
    return dispatch(
      authOperations.submitPasswordReset(token, password, passwordConfirmation)
    );
  };

  if (checkAuthentication()) {
    history.push(authRoutes.DASHBOARD);
    return null;
  }

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
          <RouteLink to={authRoutes.ROOT}>
          </RouteLink>
        </Center>
        <Box>
          <Heading size="xxl">Create a new Password</Heading>
        </Box>
        {formSubmitSuccess ? (
          <FormAlert
            message={
              <p>
                Your password has been updated successfully. Please
                <Link
                  marginInline="1"
                  textDecoration="underline"
                  as={RouteLink}
                  to={authRoutes.LOGIN}>
                  login
                </Link>
                again.
              </p>
            }
            type="success"
          />
        ) : (
          <UpdatePasswordForm
            isLoading={isLoading}
            token={token}
            submitPasswordReset={submitPasswordReset}
            error={formSubmitError}
          />
        )}
      </Box>
    </Flex>
  );
};

export default UpdatePassword;
