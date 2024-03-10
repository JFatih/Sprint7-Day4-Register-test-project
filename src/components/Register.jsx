import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const initialValues = {
  ad: "",
  soyad: "",
  email: "",
  password: "",
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

let regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

export const errorMessages = {
  ad: "Ad için 3 den fazla karakter girin",
  soyad: "Soyad için 3 den fazla karakter girin",
  email: "Email için doğru format kullanın",
  password: "küçük büyük harf sayı ve özel karakter kullanın",
};

export default function Register() {
  const [formData, setFormData] = useState(initialValues);

  const [errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    password: false,
  });

  const [isValid, setIsValid] = useState(true);

  const [id, setId] = useState("");

  useEffect(() => {
    if (
      formData.ad.trim().length >= 3 &&
      formData.soyad.trim().length >= 3 &&
      validateEmail(formData.email) &&
      regex.test(formData.password)
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === "ad" || name === "soyad") {
      if (value.trim().length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "password") {
      if (regex.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((response) => {
        console.log(response.data.id);
        setId(response.data.id);
      })
      .catch((error) => console.warn(error));
  };
  return (
    <>
      <Card>
        <CardHeader tag="h5">Kayıt Ol</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="ad">Ad:</Label>
              <Input
                id="ad"
                name="ad"
                placeholder="Adınızı girin"
                type="text"
                onChange={handleChange}
                value={formData.ad}
                invalid={errors.ad}
                data-cy="input-ad"
              />
              <FormFeedback>{errorMessages.ad}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="soyad">Soyad:</Label>
              <Input
                id="soyad"
                name="soyad"
                placeholder="Soyadınızı girin"
                type="text"
                onChange={handleChange}
                value={formData.soyad}
                invalid={errors.soyad}
                data-cy="input-soyad"
              />
              <FormFeedback>{errorMessages.soyad}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                id="email"
                name="email"
                placeholder="Mail girin"
                type="email"
                onChange={handleChange}
                value={formData.email}
                invalid={errors.email}
                data-cy="input-email"
              />
              <FormFeedback>{errorMessages.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Güçlü password girin"
                type="password"
                onChange={handleChange}
                value={formData.password}
                invalid={errors.password}
                data-cy="input-password"
              />
              <FormFeedback>{errorMessages.password}</FormFeedback>
            </FormGroup>
            <Button disabled={isValid} data-cy="submit-button">
              Kayıt ol
            </Button>
          </Form>
        </CardBody>
        {id && <CardFooter data-cy="response-id">id:{id}</CardFooter>}
      </Card>
    </>
  );
}
