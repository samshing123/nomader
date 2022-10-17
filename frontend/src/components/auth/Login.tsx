import styles from './Login.module.css'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import {
    FormControl,
    Input,
    Stack,
    Link,
    Button,
    Heading,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, RootThunkDispatch } from '../../redux/store'
import { loginThunk } from '../../redux/auth/authThunk'
import { useNavigate } from 'react-router'

function Login() {
    const loading = useSelector((state: RootState) => state.auth.loading)
    const dispatch = useDispatch<RootThunkDispatch>()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            // alert(JSON.stringify(values, null, 2))
            if (loading) {
                return
            }
            const res = await dispatch(loginThunk(values, navigate))
            if (res) {
                Swal.fire({
                    title: 'Oops...',
                    text: 'Wrong Username or password',
                    icon: 'error',
                })
                return
            }
            navigate('/home')
        },
    })

    return (
        <div className={styles.body}>
            <div className={styles.logoContainer}>
                <img
                    src={require('../../assets/loginBackground.jpg')}
                    alt="background"
                ></img>
                <div className={styles.logo}>Logo</div>
            </div>
            <div className={styles.loginFormContainer}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={5}>
                    <Stack align={'left'}>
                        <Heading
                            fontSize={'4xl'}
                            color={'#b0d8bc'}
                            fontWeight={'500'}
                        >
                            Login
                        </Heading>
                    </Stack>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={4}>
                            <FormControl
                                id="username"
                                color={'#b0d8bc'}
                                className={styles.box}
                            >
                                <Input
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    placeholder={'Username'}
                                />
                            </FormControl>
                            <FormControl
                                id="password"
                                color={'#b0d8bc'}
                                className={styles.box}
                            >
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    placeholder={'Password'}
                                />
                            </FormControl>
                            <Stack spacing={10} align={'center'}></Stack>
                            <Button
                                bgImage={
                                    'linear-gradient(to right,#569ee6, #67d6f8, #b0d8bc)'
                                }
                                className={styles.btn}
                                type="submit"
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                    <Stack spacing={10} align={'center'}>
                        <Link
                            color={'blue.400'}
                            onClick={() => navigate('/signUp')}
                        >
                            Sign Up
                        </Link>
                    </Stack>
                </Stack>
            </div>
        </div>
    )
}

export default Login
