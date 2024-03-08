import React, { useContext } from 'react';
import { Button, Label, TextInput, Card, Spinner } from 'flowbite-react';
import {  replace, useFormik } from 'formik';
import * as yup from 'yup';
import { customAlert } from '../../config/alert/alert';
import { AxiosCliente } from '../../config/htpp-gateway/http-client';
import AuthContext from '../../config/context/auth-context';
import { useNavigate } from 'react-router-dom';



function SignInPage() {
  const {user,dispatch} = useContext(AuthContext); 
  const navigate =  useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values,{setSubmitting}) => {
      console.log(values);
      try {
        const response = await AxiosCliente({
          url: '/auth/signin',
          method:'POST',
          data:values,
        })
        if (!response?.error) {
          dispatch({type: "SIGNIN", payload: response.data});
          navigate("/admin", {replace: true});
        }else throw Error('Error');
      } catch (error) {
        console.log(error);
        customAlert("iniciar sesión", "Usuario y/o contraseña incorrectos","error")
      }finally{
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-green-800 ">
      <div className='w-full md:w-1/2 lg:w-1/2 sm:w-1/2'>
        <Card className=" bg-gradient-to-r from-green-400 to-green-800 rounded">
          <div className='flex justify-center'>
            <img src="../../img/loginLogo.jpeg" alt="" />
          </div>
          <div className='flex justify-center text-center '>
            <form className="p-8 w-full w-full md:1/2 lg:w-1/2  " noValidate
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <Label htmlFor="username1" value="username" />
                <TextInput id="username1" type="text" placeholder="Username" required name='username'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  helperText={
                    formik.errors.username && formik.touched.username ? (<span className='font-medium text-red-600'>
                      {formik.errors.username}
                    </span>) : null
                  }
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="password1" value="Your password" />
                <TextInput id="password1" type="password" required name='password' placeholder='*******'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  helperText={
                    formik.errors.password && formik.touched.password ? (<span className='font-medium text-red-600'>
                      {formik.errors.password}
                    </span>) : null
                  }
                  
                />
              </div>
              <Button className='rounded-full w-full' type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              > {
                formik.isSubmitting ? (<Spinner/> ) : (<>Iniciar Sesión</>)
              } 
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SignInPage;
