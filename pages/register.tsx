import type { NextPage } from "next";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";
import Layout from "../components/Layout";
import Style from "../styles/Register.module.scss";
import { Formik, FormikValues, Form, ErrorMessage, Field } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../components/Loader";
import useAuth from "../lib/useAuth";

const auth = getAuth(app);

const tryRegister = async (event: { email: string; password: string }) => {
  await createUserWithEmailAndPassword(auth, event.email, event.password);
};

const Register: NextPage<{ email: string }> = ({ email }) => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      router.push("/browse");
    }
  }, [auth.user, router]);

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <Layout hero={true} hideSignIn={true}>
      {/* Formik forms, read here: https://formik.org/docs/overview */}
      <Formik
        initialValues={{
          email: email,
          password: "",
          passwordConfirm: "",
          error: "",
        }}
        validate={(values) => {
          const errors: FormikValues = {};

          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Please enter a valid e-mail address.";
          }

          if (
            !values.password ||
            values.password.length < 6 ||
            values.password.length > 40
          ) {
            errors.password = "Password has to be between 6-40 characters.";
          }

          if (values.passwordConfirm !== values.password) {
            errors.passwordConfirm = "Passwords do not match";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          tryRegister(values)
            .then(() => setSubmitting(false))
            .catch((e) => {
              const error = e.toString();

              // Check for errors when signing in
              if (error.includes("user-not-found")) {
                setErrors({
                  error: "Couldn't find the account",
                });
              } else if (error.includes("wrong-password")) {
                setErrors({
                  error: "Wrong email or passowrd",
                });
              } else {
                setErrors({
                  error: "An error ocurred, please try again",
                });
              }

              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className={Style.form}>
            <h3 className={Style.form__title}>Register</h3>
            <ErrorMessage
              component="div"
              name="error"
              className={Style.form__errorglob}
            />
            <Field
              type="email"
              name="email"
              className={Style.form__field}
              placeholder="E-mail"
            />
            <ErrorMessage
              name="email"
              component="div"
              className={Style.form__error}
            />
            <Field
              type="password"
              name="password"
              className={Style.form__field}
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={Style.form__error}
            />
            <Field
              type="password"
              name="passwordConfirm"
              className={Style.form__field}
              placeholder="Password confirm"
            />
            <ErrorMessage
              name="passwordConfirm"
              component="div"
              className={Style.form__error}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={Style.form__submit}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export async function getServerSideProps(context: { [key: string]: any }) {
  return {
    props: {
      email: context.query.email,
    },
  };
}

export default Register;
