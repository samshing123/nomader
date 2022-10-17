import { CloseIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2'
import { Box, Button, FormControl, Icon, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import Dock from '../common/dock/Dock'
import styles from './Forum.module.css'
import { newPost } from '../../api/user'
import { AuthState } from '../../redux/state'
import { useSelector } from 'react-redux'

function NewPost() {
    const [imageStore, setImageStore] = useState('')
    const navigate = useNavigate()
    const auth: AuthState = useSelector((state: any) => state.auth)
    const user_id = auth.id

    console.log(imageStore)
    const formik = useFormik({
        initialValues: {
            user_id: user_id as any as string,
            title: '',
            content: '',
            image: new File([''], ''),
        },
        onSubmit: async (values) => {
            if (
                formik.values.title === '' ||
                formik.values.content === '' ||
                formik.values.image.name === ''
            ) {
                Swal.fire({
                    title: 'Notice',
                    text: 'Users would like to know everything!',
                    icon: 'warning',
                })
                return
            } else {
                console.log(values)
                newPost(values).then((data: any) => {
                    const res = data.success
                    console.log('check', res)
                    if (res) {
                        Swal.fire({
                            title: 'Congrats!',
                            text: 'New post is already posted!',
                            icon: 'success',
                        })
                    }
                })
                navigate('/forum')
            }
        },
    })

    function handleImageChange(e: any) {
        const file = e.target.files[0]
        const reader = new FileReader()
        const url = reader.readAsDataURL(file)
        reader.onloadend = function (e) {
            setImageStore(reader.result as string)
            formik.setFieldValue('image', file)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.tab}>
                <button className={styles.backwardBtn}>
                    <Link to="/forum">
                        <Icon as={CloseIcon} w={6} h={6} color={'#1d1d42'} />
                    </Link>
                </button>
                <div className={styles.titleBox}>
                    <h1 className={styles.bigTitle}>New Post</h1>
                </div>
            </div>
            <Box
                maxW="sm"
                borderWidth="3px"
                borderRadius="xl"
                overflow="hidden"
                margin={6}
                padding={2}
                display="flex"
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <form className={styles.formBox} onSubmit={formik.handleSubmit}>
                    <h1 className={styles.subTitle}>Title</h1>
                    <FormControl>
                        <Box borderWidth="1px" marginBottom={5}>
                            <Input
                                type="text"
                                id="text"
                                name="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                placeholder="Write a title"
                                className={styles.input}
                            />
                        </Box>
                    </FormControl>
                    <h1 className={styles.subTitle}>Content</h1>
                    <FormControl>
                        <Box
                            borderWidth="1px"
                            height={'15rem'}
                            marginBottom={6}
                        >
                            <textarea
                                id="text"
                                name="content"
                                onChange={formik.handleChange}
                                value={formik.values.content}
                                placeholder="I would like to share..."
                                className={styles.contents}
                            />
                        </Box>
                    </FormControl>
                    <div className={styles.imageContainer}>
                        <img src={imageStore} />
                    </div>
                    <FormControl>
                        <Input
                            type="file"
                            onChange={handleImageChange}
                            id="image"
                            name="image"
                            hidden
                        ></Input>
                        <label htmlFor="image" className={styles.uploadBtn}>
                            Choose File
                        </label>
                    </FormControl>
                    <Button
                        bgImage={
                            'linear-gradient(to right,#67d6f8, #67d6f8, #bae4c7)'
                        }
                        className={styles.btn}
                        type="submit"
                    >
                        Post
                    </Button>
                </form>
            </Box>
            <Dock />
        </div>
    )
}

export default NewPost
