import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { UserFormDataType } from '../types';
import { register } from '../lib/apiWrapper';




export default function SignUp() {
    const [userFormData, setUserFormData] = useState<UserFormDataType>(
        {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        }
    )
    const [confirmPassword, setConfirmPassword] = useState('');
    const [seePassword, setSeePassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'confirmPassword'){
            console.log(e.target.name, confirmPassword)
            setConfirmPassword(e.target.value);
        } else {
            console.log(e.target.name);
         setUserFormData({...userFormData, [e.target.name]: e.target.value })
        }
       
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(userFormData);

        // eslint-disable-next-line prefer-const
        let response = await register(userFormData);
        if (response.error){
            console.error(response.error);
        } else {
            // eslint-disable-next-line prefer-const
            
            let newUser = response.data!
            console.log(`Congrats ${newUser.firstName} ${newUser.lastName} has been created with the username ${newUser.username}`)
        }
    }

    // const disableSubmit = userFormData.password.length < 5 || userFormData.password !== userFormData.confirmPassword
    // eslint-disable-next-line no-useless-escape
    const disableSubmit = !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*\!\?])(?=.*[a-zA-Z]).{8,16}$/.test(userFormData.password) || userFormData.password !== confirmPassword

    return (
        <>
            <h1 className="text-center">Sign Up Here</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label htmlFor='first_name'>First Name</Form.Label>
                        <Form.Control id='first_name' name='first_name' placeholder='Enter First Name' value={userFormData.first_name} onChange={handleInputChange}/>

                        <Form.Label htmlFor='last_name'>Last Name</Form.Label>
                        <Form.Control id='last_name' name='last_name' placeholder='Enter Last Name' value={userFormData.last_name} onChange={handleInputChange}/>

                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control id='email' name='email' type='email' placeholder='Enter Email' value={userFormData.email} onChange={handleInputChange}/>

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='password' name='password' type={seePassword ? 'text' : 'password'} placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='confirmPassword' name='confirmPassword'  type={seePassword ? 'text' : 'password'} placeholder='Confirm Password' value={confirmPassword} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <Button type='submit' variant='outline-primary' className='w-100 mt-3' disabled={disableSubmit}>Create New User</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}