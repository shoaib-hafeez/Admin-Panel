// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for eye toggle
// import axiosClient from '../lib/axios';

// // Zod Schema for Validation
// const userSchema = z.object({
//     userName: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must not exceed 20 characters').trim(),
//     email: z.string().email('Invalid email address').trim(),
//     role: z.string().nonempty('Role is required').trim(),
//     password: z.string().min(8, 'Password must be at least 8 characters').trim(),
// });

// const SignUp = () => {
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
//     const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

//     // React Hook Form setup
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm({
//         resolver: zodResolver(userSchema), // Attach Zod schema for validation
//     });

//     // Form submission handler
//     const onSubmit = async (data) => {
//         setIsSubmitting(true); // Disable button and show "Submitting..."
//         try {
//             const response = await axiosClient.post('/users/register', data, {
//                 headers: {
//                     accept: 'application/json',
//                     'content-type': 'application/json',
//                 },
//             });

//             console.log('API Response:', response.data);

//             localStorage.setItem('E-SignUpUser', JSON.stringify(response.data));
//             alert('Signup successful! Please login.');
//             reset(); // Reset the form
//             navigate('/Login');
//         } catch (error) {
//             alert("User with email or username already exists");
//             console.error('API Error:', error.response ? error.response.data : error.message);
//         } finally {
//             setIsSubmitting(false); // Re-enable the button
//         }
//     };

//     return (
//         <div className="form_container">
//             <div className="signup_form">
//                 <h2>Sign-Up</h2>
//                 <Form onSubmit={handleSubmit(onSubmit)}>
//                     <Form.Group as={Col} controlId="formGridName">
//                         <Form.Label>User Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             {...register('userName')}
//                             placeholder="Set User Name"
//                         />
//                         {errors.userName && <span className="text-danger">{errors.userName.message}</span>}
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="formGridEmail">
//                         <br />
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             {...register('email')}
//                             placeholder="Set Your Email"
//                         />
//                         {errors.email && <span className="text-danger">{errors.email.message}</span>}
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="formGridRole">
//                         <br />
//                         <Form.Label>Role</Form.Label>
//                         <Form.Control
//                             type="text"
//                             {...register('role')}
//                             placeholder="Set Your Role"
//                         />
//                         {errors.role && <span className="text-danger">{errors.role.message}</span>}
//                     </Form.Group>

//                     <Form.Group className="mb-4" controlId="formGroupPassword">
//                         <br />
//                         <Form.Label>Password</Form.Label>
//                         <div className="password-container" style={{ position: 'relative' }}>
//                             <Form.Control
//                                 type={showPassword ? 'text' : 'password'}
//                                 {...register('password')}
//                                 placeholder="Set Your Password"
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
//                         {errors.password && <span className="text-danger">{errors.password.message}</span>}
//                     </Form.Group>

//                     <Button className="signUpBtn w-100" type="submit" disabled={isSubmitting}>
//                         {isSubmitting ? 'Submitting...' : 'Sign Up'}
//                     </Button>
//                     <br />
//                     <br />
//                     <p style={{ textAlign: 'center' }}>
//                         I already have an account{' '}
//                         <Link to="/Login" className="bg-warning p-2 rounded">
//                             Login
//                         </Link>
//                     </p>
//                 </Form>
//             </div>
//         </div>
//     );
// };

// export default SignUp;









import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import useAuthStore from '../store/Auth-Store';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for eye toggle
import axiosClient from '../lib/axios'

const SignUp = () => {
    const navigate = useNavigate();
    const { setUser, userName, email, password, setUserName, setEmail, setPassword } = useAuthStore();

    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

    const validatePassword = (password) => {
        return password.length >= 8;
      };



    const validateInputs = () => {
        const newErrors = {};
        const isPasswordValid = validatePassword(password)
        if (!userName) newErrors.userName = 'username is required.';
        if (!email) newErrors.email = 'Email is required.';
        if (!isPasswordValid) newErrors.password = 'Password must be at least 8 characters. ';
        if (!role) newErrors.role = 'Role is required.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateInputs();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const payload = {
            username: userName,
            email,
            role,
            password,
        };

        try {
            const response = await axiosClient.post('/users/register', payload, {
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                },
            });

            console.log('API Response:', response.data);

            setUser(response.data.data);
            localStorage.setItem('E-SignUpUser', JSON.stringify(response.data.data));

            setUserName('');
            setEmail('');
            setPassword('');
            setRole('');
            alert('Signup successful please Login');
            navigate('/Login');
        } catch (error) {
            alert("User with email or username already exists");
            setUserName('');
            setEmail('');
            setPassword('');
            setRole('');
            console.error('API Error:', error.response ? error.response.data : error.message);
            setErrors({ general: 'Registration failed. Please try again.' });
        }
    };

    return (
        <div className="form_container">
            <div className="signup_form">
                <h2>Sign-Up</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={userName}
                            onChange={(e) =>{ setUserName(e.target.value)
                                if (errors.userName) setErrors((prev) => ({ ...prev, userName: '' }));
                            }}
                            placeholder="Set User Name"
                            
                        />
                        {errors.userName && <span className="text-danger">{errors.userName}</span>}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <br />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) =>{ setEmail(e.target.value)
                                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                            }}
                            placeholder="Set Your Email"
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridRole">
                        <br />
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            type="text"
                            value={role}
                            onChange={(e) => {setRole(e.target.value)
                                if (errors.role) setErrors((prev) => ({ ...prev, role: '' }));
                            }}
                            placeholder="Set Your Role"
                        />
                        {errors.role && <span className="text-danger">{errors.role}</span>}
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formGroupPassword">
                        <br />
                        <Form.Label>Password</Form.Label>
                        <div className="password-container" style={{ position: 'relative' }}>
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                value={password} 
                                onChange={(e) =>{ setPassword(e.target.value)
                                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                                }}
                                placeholder="Set Your Password"
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
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </Form.Group>
                   
                    <Button className="signUpBtn w-100" type="submit">
                        SignUp 
                    </Button>
                    <br />
                    <br />
                    <p style={{ textAlign: 'center' }}>
                        I have already an account{' '}
                        <Link to="/Login" className="bg-warning p-2 rounded">
                            Login
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;      