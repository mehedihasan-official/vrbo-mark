import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';


const Registration = () => {
  const { registration, googleLogin, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', photoUrl: '', email: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'At least 6 characters required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await googleLogin();
      Swal.fire({ title: "Signed up with Google!", icon: "success", showConfirmButton: false, timer: 1500 });
      navigate("/hostingDashboard/listings");
    } catch (error) {
      Swal.fire({ title: "Google Sign-up Failed", text: error.message, icon: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await registration(formData.email, formData.password, formData.name, formData.photoUrl);
      Swal.fire({ title: "Account Created!", icon: "success", showConfirmButton: false, timer: 1500 });
      navigate('/');
    } catch (error) {
      Swal.fire({ title: "Registration Failed", text: error.message, icon: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting || loading;

  const InputField = ({ id, label, type = 'text', placeholder, autoComplete, optional = false, showToggle = false, show, onToggle }) => (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
          {label} {optional && <span className="text-gray-400 font-normal">(optional)</span>}
        </label>
      </div>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={showToggle ? (show ? 'text' : 'password') : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={formData[id]}
          onChange={handleChange}
          disabled={isDisabled}
          className={`w-full px-3.5 py-2.5 text-sm rounded-lg
            border ${errors[id] ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-600'}
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:border-transparent
            disabled:opacity-50 transition-all
            ${showToggle ? 'pr-10' : ''}`}
        />
        {showToggle && (
          <button
            type="button"
            tabIndex={-1}
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {show ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {errors[id] && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen overflow-y-auto flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-950 px-4 py-8 transition-colors duration-300">

      {/* Card */}
      <div className="w-full max-w-sm bg-white dark:bg-gray-900  px-8 py-8 flex flex-col gap-4">


        {/* Title */}
        <div className="text-center">
          <h1 className="text-[17px] font-bold text-gray-900 dark:text-white leading-snug">
            Create your account
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
            Join millions of travellers with one account across Expedia, Hotels.com, and Vrbo.
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isDisabled}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4
            border-2 border-gray-800 dark:border-gray-400 rounded-lg
            text-sm font-semibold text-gray-800 dark:text-gray-200
            bg-white dark:bg-gray-800
            hover:bg-gray-50 dark:hover:bg-gray-700
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-150"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            style={{ width: "18px", height: "18px", flexShrink: 0 }}
          />
          {isDisabled ? "Please wait..." : "Sign up with Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-400 dark:text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <InputField
            id="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
          />
          <InputField
            id="photoUrl"
            label="Photo URL"
            type="url"
            placeholder="https://example.com/photo.jpg"
            autoComplete="off"
            optional
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
          <InputField
            id="password"
            label="Password"
            placeholder="Min. 6 characters"
            autoComplete="new-password"
            showToggle
            show={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Re-enter your password"
            autoComplete="new-password"
            showToggle
            show={showConfirm}
            onToggle={() => setShowConfirm(!showConfirm)}
          />

          <button
            type="submit"
            disabled={isDisabled}
            className="w-full py-2.5 mt-1 rounded-lg text-sm font-bold
              bg-blue-700 hover:bg-blue-800 active:bg-blue-900
              dark:bg-blue-600 dark:hover:bg-blue-700 text-white
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-150 shadow-sm"
          >
            {isDisabled ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Creating account...
              </span>
            ) : "Create account"}
          </button>
        </form>

        {/* Other sign-in options */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-500">Other ways to sign up</span>
          <div className="flex items-center gap-4">
            <button
              disabled={isDisabled}
              title="Sign up with Apple"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-40"
            >
              <svg className="w-5 h-5 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-3.827 2.409-5.856 4.776-5.856 1.554 0 2.798.944 3.752.944.896 0 2.292-1.01 4.093-1.01.612 0 2.453.05 3.695 1.94zm-8.18-2.1c.666.02 1.302-.16 1.75-.48.376-.27.6-.63.6-.96 0-.56-.472-1.11-1.275-1.09-.602.01-1.18.26-1.593.59-.338.27-.54.59-.54.86 0 .39.235.76.629.95.1.04.268.12.43.13z" />
              </svg>
            </button>
            <button
              disabled={isDisabled}
              title="Sign up with Facebook"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-40"
            >
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 leading-relaxed -mt-1">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-gray-600 dark:hover:text-gray-300">Terms and Conditions</Link>,{" "}
          <Link to="/privacy" className="underline hover:text-gray-600 dark:hover:text-gray-300">Privacy Statement</Link>, and{" "}
          <Link to="/rewards-terms" className="underline hover:text-gray-600 dark:hover:text-gray-300">One Key Rewards Terms</Link>.
        </p>

        {/* Sign in link */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 -mt-2">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-700 dark:text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      
    </div>
  );
};

export default Registration;