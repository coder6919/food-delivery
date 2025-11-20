import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
  const [isSignInForm, setIsSignInForm] = useState(true);

  // --- 1. State for all form inputs ---
  // We need to store what the user types.
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    // --- Clear inputs when toggling ---
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  // --- 2. Function to handle form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading

    // --- REGISTRATION LOGIC ---
    if (!isSignInForm) {
      // Frontend validation
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      try {
        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: fullName,
            email: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          // If status is 409 or 500, it will throw an error
          throw new Error(data.message || 'Error creating user');
        }

        console.log('Registration Successful:', data);
        alert('Account created successfully! Please sign in.');
        toggleSignInForm(); // Switch to the sign-in form

      } catch (error) {
        console.error('Registration Error:', error);
        alert(error.message); // Show error from backend (e.g., "User Already Exists")
      }
    } 
    // --- LOGIN LOGIC ---
    else {
      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Invalid credentials');
        }

        console.log('Login Successful:', data);
        alert('Signed in successfully!');
        // Here you would typically save the JWT token and redirect
        // e.g., localStorage.setItem('token', data.token);
        // navigate('/dashboard');

      } catch (error) {
        console.error('Login Error:', error);
        alert(error.message); // Show error (e.g., "User Doesnot Exists" or "Invalid User Details")
      }
    }
  };

  return (
    <div>
      <section className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link to={'/'}>
            <img
              className="w-20 h-8 mr-2"
              src="/assets/swg.png"
              alt="logo"
            ></img>
          </Link>
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {isSignInForm ? 'Sign In' : 'Create an account'}
              </h1>

              {/* --- 3. Connect the handleSubmit function --- */}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit} // Changed from e.preventDefault()
              >
                {/* --- 4. ADDED fullName input for registration --- */}
                {!isSignInForm && (
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="John Doe"
                      required
                      value={fullName} // --- 5. Connect input to state ---
                      onChange={(e) => setFullName(e.target.value)}
                    ></input>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="yourmail@gmail.com"
                    required
                    value={email} // --- 5. Connect input to state ---
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    value={password} // --- 5. Connect input to state ---
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>

                {!isSignInForm && (
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                      value={confirmPassword} // --- 5. Connect input to state ---
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                  </div>
                )}
                
                {/* ... (rest of your JSX, no changes needed for terms) ... */}

                <button
                  type="submit"
                  className="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {isSignInForm ? 'Sign In' : 'Create an account'}
                </button>

                <p
                  className="text-sm font-normal text-black-500 
                             cursor-pointer hover:underline"
                  onClick={toggleSignInForm}
                >
                  {isSignInForm
                    ? 'New to Swiggy? Create an account'
                    : 'Already have an account? Login here'}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignIn;