import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '../store/Auth-Store';
import { loginUserApi } from '../services/user.service';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuthStore();

    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

    // Zod Schema for Validation
    const schema = z.object({
        userName: z.string().nonempty('Username is required'),
        password: z.string().min(8, 'Password must be at least 8 characters.'),
    });

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema), // Use Zod schema for validation
    });

    // Form submission handler
    const onSubmit = async (data) => {
        setIsSubmitting(true); // Disable the button
        try {
            // Calling the loginUser service function
            const response = await loginUserApi(data);
    
            console.log('API Response:', response.data);
    
            // Save user data to Zustand store and localStorage
            setUser(response.data);
            localStorage.setItem('E-loginUser', JSON.stringify(response.data));
    
            alert('Logged in successfully!');
            reset(); // Clear the form fields
            navigate('/Dashboard'); // Redirect to Dashboard
        } catch (error) {
            console.error('API Error:', error.response ? error.response.data : error.message);
            alert('Invalid Username or Password. Please try again.');
        } finally {
            setIsSubmitting(false); // Re-enable the button
        }
    };

    return (
        <div className="form_container">
            <div className="login_form">
                <h2>Login Here</h2>
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Username Field */}
                    <Form.Group className="mb-2 w-100" controlId="formBasicUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Username"
                            {...register('userName')}
                        />
                        {errors.userName && <span className="text-danger">{errors.userName.message}</span>}
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group className="mb-2" controlId="formGroupPassword">
                        <br />
                        <div className="forgetLable">
                            <Form.Label>Password</Form.Label>
                            <Link to="/ForgetPassword"><Form.Label>Forgot Password?</Form.Label></Link>
                        </div>
                        <div className="password-container" style={{ position: 'relative' }}>
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                placeholder="Enter Your Password"
                            />
                            <span
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '10px',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    color: 'black',
                                }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </Form.Group>
                    <br />

                    {/* Submit Button */}
                    <Button type="submit" className="w-100 loginBtn" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                    <br />
                    <br />
                    <p style={{ textAlign: 'center' }}>
                        Don't have an account? <Link to="/" className="bg-warning p-2 rounded">Signup</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default Login;








// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import useAuthStore from '../store/Auth-Store';
// import axiosClient from '../lib/axios';


// const Login = () => {
//     const navigate = useNavigate();

//     const { userName, setUserName, password, setPassword, setUser } = useAuthStore();

//     const [passwordError, setPasswordError] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [errors, setErrors] = useState({});

//     const validateInputs = () => {
//         const newErrors = {};
//         if (!userName) newErrors.userName = 'username is required';
//         if (!password) newErrors.password = 'Password is required.';
//         return newErrors;
//     };
//     const validatePassword = (password) => {
//         return password.length >= 8;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const isPasswordValid = validatePassword(password)
//         // Validate fields
//         const newErrors = validateInputs();

//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }
//         if (!isPasswordValid) {
//             setPasswordError('Password must be at least 8 characters.');
//         } else {
//             setPasswordError('');
//         }

//         const payload = {
//             username: userName,
//             password: password,

//         };
//         try {
//             const response = await axiosClient.post('/users/login', payload, {
//                 headers: {
//                     accept: 'application/json',
//                     'content-type': 'application/json',
//                 },
//             });

//             console.log('API Response:', response.data.data);

//             // Save user data to Zustand store
//             setUser(response.data.data);
//             // Save user data to local storage
//             localStorage.setItem('E-loginUser', JSON.stringify(response.data.data));

//             // Clear input fields
//             setUserName('');
//             setPassword('');
//             alert('logged in successfully')
//             // Redirect to the layout/dashboard
//             navigate('/Dashboard');
//         } catch (error) {
//             console.error('API Error:', error.response ? error.response.data : error.message);
//             setErrors({ general: 'Invalid Username or password. Please try again.' });
//         }
//     };

//     return (
//         <div className="form_container">

//             <div className="login_form">
//                 <h2>Login Here</h2>
//                 <br />
//                 <Form onSubmit={handleSubmit}>
//                     {/* Email Field */}
//                     <Form.Group className="mb-2 w-100" controlId="formBasicUserName">
//                         <Form.Label>User Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter userName "
//                             value={userName}
//                             required
//                             onChange={(e) => {
//                                 setUserName(e.target.value);
//                                 if (errors.userName) setErrors((prev) => ({ ...prev, userName: '' })); // Clear email error on typing
//                             }}
//                         />
//                         {errors.userName && <span className="text-danger">{errors.userName}</span>}
//                     </Form.Group>

//                     {/* Password Field */}
//                     <Form.Group className="mb-2" controlId="formGroupPassword">
//                         <br />
//                         <div className='forgetLable'>
//                             <Form.Label>Password</Form.Label>
//                             <Link to={"/ForgetPassword"}><Form.Label>Forget Password</Form.Label></Link>
//                         </div>
//                         <div className="password-container" style={{ position: 'relative' }}>
//                             <Form.Control
//                                 type={showPassword ? 'text' : 'password'}
//                                 value={password}
//                                 onChange={(e) => { setPassword(e.target.value) }}
//                                 placeholder="Enter Your Password"
//                             />
//                             <span
//                                 style={{
//                                     position: 'absolute',
//                                     top: '50%',
//                                     right: '10px',
//                                     transform: 'translateY(-50%)',
//                                     cursor: 'pointer',
//                                     color: 'black',
//                                 }}
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                             </span>
//                         </div>
//                         {errors.password && <span className="text-danger">{errors.password}</span>}
//                     </Form.Group>
//                     <br />

//                     {/* General Error */}
//                     {errors.general && <span className="text-danger">{errors.general}</span>}

//                     <Button type="submit" className="w-100 loginBtn">
//                         Login
//                     </Button>
//                     <br />
//                     <br />
//                     <p style={{ textAlign: 'center' }}>Don't have an account? <Link to={'/'} className='bg-warning p-2 rounded' >Signup</Link></p>
//                 </Form>
//             </div>
//         </div>
//     );
// };

// export default Login;
