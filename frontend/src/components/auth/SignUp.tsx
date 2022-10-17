import Swal from 'sweetalert2'
import styles from './SignUp.module.css'
import { useFormik } from 'formik'
import {
    Box,
    FormControl,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Select,
    Link,
    Center,
    Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { FaTransgender, FaBirthdayCake } from 'react-icons/fa'
import { BsFilePerson } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { RootThunkDispatch } from '../../redux/store'
import { useNavigate } from 'react-router'
import { signUpThunk } from '../../redux/auth/authThunk'
import CountryList from './CountryList'

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [nextPage, setNextPage] = useState(false)
    const [imageStore, setImageStore] = useState('')
    const dispatch = useDispatch<RootThunkDispatch>()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            gender: '',
            birthday: '',
            username: '',
            email: '',
            password: '',
            phone_num: '',
            country: '',
            profile: new File([''], ''),
            job: '',
            information: '',
        },
        onSubmit: async (values) => {
            // alert(JSON.stringify(values, null, 2))
            if (
                formik.values.profile === new File([''], '') ||
                formik.values.job === '' ||
                formik.values.information === ''
            ) {
                Swal.fire({
                    title: 'Notice',
                    text: 'Please input all the information',
                    icon: 'warning',
                })
                return
            } else {
                const res = await dispatch(signUpThunk(values, navigate))
                if (res.success) {
                    Swal.fire({
                        title: 'Congrats!',
                        text: 'Account created',
                        icon: 'success',
                    })
                }
            }
        },
    })

    function toNextPage() {
        if (
            formik.values.first_name === '' ||
            formik.values.last_name === '' ||
            formik.values.gender === '' ||
            formik.values.birthday === '' ||
            formik.values.username === '' ||
            formik.values.password === '' ||
            formik.values.email === '' ||
            formik.values.phone_num === '' ||
            formik.values.country === ''
        ) {
            Swal.fire({
                title: 'Notice',
                text: 'Please input all the information',
                icon: 'warning',
            })
            return
        } else {
            setNextPage(!nextPage)
        }
    }
    function goBack() {
        setNextPage(!nextPage)
    }

    function handleImageChange(e: any) {
        const file = e.target.files[0]
        const reader = new FileReader()
        const url = reader.readAsDataURL(file)
        reader.onloadend = function (e) {
            setImageStore(reader.result as string)
            formik.setFieldValue('profile', file)
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.logoContainer}>
                <img
                    src={require('../../assets/loginBackground.jpg')}
                    alt="background"
                ></img>
                <div className={styles.logo}>Logo</div>
            </div>
            <div className={styles.signInContainer}>
                <Stack spacing={4} mx={'auto'} maxW={'lg'} px={5}>
                    <Stack align={'left'}>
                        <Heading
                            fontSize={'4xl'}
                            color={'#b0d8bc'}
                            fontWeight={'500'}
                        >
                            Sign up
                        </Heading>
                    </Stack>
                    <form onSubmit={formik.handleSubmit}>
                        {!nextPage ? (
                            <Stack spacing={2}>
                                <HStack>
                                    <Box>
                                        <FormControl
                                            id="firstName"
                                            className={styles.box}
                                            isRequired
                                        >
                                            <Input
                                                id="firstName"
                                                name="first_name"
                                                onChange={formik.handleChange}
                                                value={formik.values.first_name}
                                                type="text"
                                                placeholder={'First Name'}
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl
                                            id="lastName"
                                            className={styles.box}
                                            isRequired
                                        >
                                            <Input
                                                id="lastName"
                                                name="last_name"
                                                onChange={formik.handleChange}
                                                value={formik.values.last_name}
                                                type="text"
                                                placeholder={'Last Name'}
                                            />
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <HStack>
                                    <Box>
                                        <FaTransgender
                                            className={styles.icon}
                                        />
                                    </Box>
                                    <Box>
                                        <FormControl
                                            className={styles.box}
                                            isRequired
                                        >
                                            <Select
                                                id="gender"
                                                name="gender"
                                                onChange={formik.handleChange}
                                                value={formik.values.gender}
                                                placeholder={'Gender'}
                                            >
                                                <option>Male</option>
                                                <option>Female</option>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FaBirthdayCake
                                            className={styles.icon}
                                        />
                                    </Box>
                                    <Box>
                                        <FormControl
                                            className={styles.box}
                                            isRequired
                                        >
                                            <Input
                                                id="birthday"
                                                name="birthday"
                                                onChange={formik.handleChange}
                                                value={formik.values.birthday}
                                                placeholder="Birthday"
                                                size="md"
                                                type="date"
                                            />
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <FormControl
                                    id="username"
                                    className={styles.box}
                                    isRequired
                                >
                                    <Input
                                        id="username"
                                        name="username"
                                        onChange={formik.handleChange}
                                        value={formik.values.username}
                                        type="text"
                                        className={styles.box}
                                        placeholder={'Username'}
                                    />
                                </FormControl>
                                <FormControl
                                    id="email"
                                    className={styles.box}
                                    isRequired
                                >
                                    <Input
                                        id="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        type="email"
                                        className={styles.box}
                                        placeholder={'Email'}
                                    />
                                </FormControl>
                                <FormControl
                                    id="password"
                                    className={styles.box}
                                    isRequired
                                >
                                    <InputGroup>
                                        <Input
                                            id="password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder={'Password'}
                                        />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowPassword(
                                                        (showPassword) =>
                                                            !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <ViewIcon />
                                                ) : (
                                                    <ViewOffIcon />
                                                )}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <FormControl
                                    className={styles.box}
                                    width={'100%'}
                                    isRequired
                                >
                                    <Select
                                        id="country"
                                        name="country"
                                        onChange={formik.handleChange}
                                        value={formik.values.country}
                                        placeholder={'Country'}
                                    >
                                        <CountryList />
                                    </Select>
                                </FormControl>

                                <FormControl className={styles.box} isRequired>
                                    <Input
                                        id="phoneNum"
                                        name="phone_num"
                                        onChange={formik.handleChange}
                                        value={formik.values.phone_num}
                                        type="number"
                                        placeholder={'Phone Number'}
                                    />
                                </FormControl>

                                <Stack spacing={10} pt={2}>
                                    <Button
                                        loadingText="Submitting"
                                        bgImage={
                                            'linear-gradient(to right,#569ee6, #67d6f8, #b0d8bc)'
                                        }
                                        className={styles.btn}
                                        onClick={() => {
                                            toNextPage()
                                        }}
                                    >
                                        Next
                                    </Button>
                                </Stack>
                                <Stack spacing={10} align={'center'}>
                                    <Link
                                        onClick={() => navigate('/login')}
                                        color={'blue.400'}
                                    >
                                        Already user? Login
                                    </Link>
                                </Stack>
                            </Stack>
                        ) : (
                            <Stack spacing={4} pt={2}>
                                <FormControl id="profile">
                                    <Stack
                                        direction={['column', 'row']}
                                        spacing={6}
                                    >
                                        <Center>
                                            <div
                                                className={
                                                    styles.profileContainer
                                                }
                                            >
                                                <div className={styles.profile}>
                                                    <BsFilePerson />
                                                    {imageStore === '' ? (
                                                        <img
                                                            src={require('../../assets/profileIcon.jpeg')}
                                                        />
                                                    ) : (
                                                        <img src={imageStore} />
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    onChange={handleImageChange}
                                                    id="profile"
                                                    name="profile"
                                                    className={styles.uploadBtn}
                                                ></input>
                                                <p className={styles.title}>
                                                    Upload Profile Picture
                                                </p>
                                            </div>
                                        </Center>
                                    </Stack>
                                </FormControl>
                                <HStack>
                                    <FormControl className={styles.box}>
                                        <Select
                                            id="job"
                                            name="job"
                                            onChange={formik.handleChange}
                                            value={formik.values.job}
                                            placeholder={'Job'}
                                        >
                                            <option value={1}>student</option>
                                            <option value={2}>slash</option>
                                            <option value={3}>designer</option>
                                            <option value={4}>
                                                programmer
                                            </option>
                                            <option value={5}>
                                                entrepreneur
                                            </option>
                                            <option value={6}>youtuber</option>
                                            <option value={7}>others</option>
                                        </Select>
                                    </FormControl>
                                </HStack>
                                <FormControl className={styles.box}>
                                    <Textarea
                                        id="information"
                                        name="information"
                                        onChange={formik.handleChange}
                                        value={formik.values.information}
                                        placeholder="Write a bio"
                                    />
                                </FormControl>
                                <Stack
                                    spacing={4}
                                    direction={['column', 'row']}
                                >
                                    <Button
                                        bgImage={
                                            'linear-gradient(to right,#314755, #26a0da)'
                                        }
                                        className={styles.btn}
                                        onClick={() => {
                                            goBack()
                                        }}
                                    >
                                        Return
                                    </Button>
                                    <Button
                                        type="submit"
                                        bgImage={
                                            'linear-gradient(to right,#569ee6, #67d6f8, #b0d8bc)'
                                        }
                                        className={styles.btn}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            </Stack>
                        )}
                    </form>
                </Stack>
            </div>
        </div>
    )
}

export default SignUp
